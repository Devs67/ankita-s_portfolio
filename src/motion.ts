import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/*
  Scroll motion, after the feel of theschoolofraya.com:
  - Lenis gives the page a smooth, slightly weighted scroll.
  - Blocks rise into place as they come up the screen, and sink back down
    when you scroll up past them again.
  Both are skipped when the visitor asks for reduced motion.
*/

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || reducedMotion()) return;
  lenis = new Lenis({ lerp: 0.1, autoRaf: true });
}

/** Scroll to an element (smoothly) or to a y position (instantly, for page changes). */
export function scrollToTarget(target: HTMLElement | number) {
  if (lenis) lenis.scrollTo(target, { immediate: typeof target === 'number', force: true });
  else if (typeof target === 'number') window.scrollTo(0, target);
  else target.scrollIntoView();
}

// The blocks that move: headings, text, cards, list items and grid cells.
// When a block is chosen, nothing inside it is chosen too, so things never move twice.
// A grid cell that is really a layout column (it holds a heading or a list) is looked inside instead.
const UNITS = 'h1, h2, h3, p, blockquote, figure, article, dl, details, svg[role="img"], ol > li, ul > li';
const TARGETS = `:is(${UNITS}, .grid > *)`;
const isLayoutColumn = (el: Element) => !el.matches(UNITS) && el.querySelector('h1, h2, .grid, ul, ol') !== null;
const RISE = [
  { opacity: 0, transform: 'translateY(56px)' },
  { opacity: 1, transform: 'translateY(0)' },
];
const STAGGER_MS = 90;

/** Sets up the rise/sink reveals inside `root`. Returns a cleanup function. */
export function revealOnScroll(root: HTMLElement): () => void {
  if (reducedMotion() || !('IntersectionObserver' in window) || !root.animate) return () => {};

  const chosen = new Set<Element>();
  for (const el of root.querySelectorAll(TARGETS)) {
    if (el.closest('[data-static]')) continue; // has its own motion (the stacking experience cards)
    let p = el.parentElement;
    while (p && p !== root && !chosen.has(p)) p = p.parentElement;
    if ((p && p !== root) || isLayoutColumn(el)) continue;
    chosen.add(el);
  }

  const anims = new Map<Element, Animation>();
  for (const el of chosen) {
    const a = el.animate(RISE, { duration: 1000, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' });
    a.pause();
    a.currentTime = 0; // start hidden
    anims.set(el, a);
  }

  const timers = new Map<Element, number>();
  const seen = new WeakSet<Element>();
  const at = (a: Animation) => Number(a.currentTime ?? 0);

  const io = new IntersectionObserver(
    (entries) => {
      let n = 0;
      for (const e of entries) {
        const a = anims.get(e.target)!;
        const first = !seen.has(e.target);
        seen.add(e.target);
        clearTimeout(timers.get(e.target));
        timers.delete(e.target);
        if (e.isIntersecting) {
          // Coming up the screen: rise in, a little after the one before it
          if (a.playbackRate > 0 && (a.playState === 'running' || at(a) >= 1000)) continue;
          const el = e.target;
          timers.set(
            el,
            window.setTimeout(() => {
              timers.delete(el);
              a.playbackRate = 1;
              a.play();
            }, Math.min(n++, 6) * STAGGER_MS),
          );
        } else if (e.boundingClientRect.top < (e.rootBounds?.top ?? 0)) {
          // Above the screen: if the page opened below it, just show it
          if (first) a.finish();
        } else if (!first && at(a) > 0) {
          // Leaving through the bottom as you scroll up: sink back down
          a.playbackRate = -1.4;
          a.play();
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  for (const el of chosen) io.observe(el);

  return () => {
    io.disconnect();
    for (const t of timers.values()) clearTimeout(t);
    for (const a of anims.values()) a.cancel();
  };
}
