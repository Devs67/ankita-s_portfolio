// Drawing kit for the ABC incident picture stories (3 panels, 360x260 each).
// Plain script: paste into a use_figma call to draw the Figma frames, and
// `npm run art` turns it into public/incidents/*.svg + src/data/incidentStories.ts for the site.

const INK = '#1e2b6f', RED = '#b3342d', HAIR = '#2a2230', HAIR2 = '#4a2e22', BLUSH = '#f8d5cf', MINT = '#cdeee4', SKY = '#d6e1fb';
const BUTTER = '#fbe7a6', TAPE = '#f1c75b', RULE = '#c8d4ea', WHITE = '#ffffff', STEEL = '#9fb0d8', SAND = '#f3dca0';
const SEAT = '#6f87d8', SEAT2 = '#5670c4', WATER = '#8fbcf0', PANTS = '#3b4a8a', CHEEK = '#e48a78', WOOD = '#e9c48a', WOOD2 = '#c99a5b', MOUTH = '#8a3434';
const SKINS = ['#c68863', '#a86b4a', '#d9a27c', '#8d5a3b'];
const S = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;
const S2 = `stroke="${INK}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"`;
const SK = `stroke="${INK}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;
const F = `fill="none" ${SK}`;
const B = `fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
const r1 = (n) => Math.round(n * 10) / 10;
const g = (x, y, body, { s = 1, flip = false, rot = 0 } = {}) =>
  `<g transform="translate(${r1(x)} ${r1(y)})${rot ? ` rotate(${rot})` : ''}${s !== 1 || flip ? ` scale(${flip ? -s : s} ${s})` : ''}">${body}</g>`;
const limb = (d, c, w = 8) =>
  `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w - 4}" stroke-linecap="round" stroke-linejoin="round"/>`;

/* ---------- faces ---------- */
const face = (cx, cy, mood) => {
  const p = (dx, dy) => `${r1(cx + dx)} ${r1(cy + dy)}`;
  const eyes = `<circle cx="${r1(cx - 5.5)}" cy="${r1(cy + 2)}" r="1.9" fill="${INK}"/><circle cx="${r1(cx + 5.5)}" cy="${r1(cy + 2)}" r="1.9" fill="${INK}"/>`;
  const cheeks = `<circle cx="${r1(cx - 9.5)}" cy="${r1(cy + 7)}" r="2.6" fill="${CHEEK}" fill-opacity="0.8"/><circle cx="${r1(cx + 9.5)}" cy="${r1(cy + 7)}" r="2.6" fill="${CHEEK}" fill-opacity="0.8"/>`;
  const closed = `<path d="M${p(-7.5, 2.5)} Q${p(-5.5, -0.5)} ${p(-3.5, 2.5)}" ${F}/><path d="M${p(3.5, 2.5)} Q${p(5.5, -0.5)} ${p(7.5, 2.5)}" ${F}/>`;
  const shut = `<path d="M${p(-7.5, 2)} L${p(-3.5, 2.6)}" ${F}/><path d="M${p(3.5, 2.6)} L${p(7.5, 2)}" ${F}/>`;
  const angry = `<path d="M${p(-8.5, -3)} L${p(-3, -0.5)}" ${B}/><path d="M${p(8.5, -3)} L${p(3, -0.5)}" ${B}/>`;
  const sad = `<path d="M${p(-8, -1)} L${p(-3, -3.5)}" ${B}/><path d="M${p(8, -1)} L${p(3, -3.5)}" ${B}/>`;
  const raised = `<path d="M${p(-7.5, -2)} Q${p(-5, -4.5)} ${p(-3, -2.5)}" ${F}/><path d="M${p(3, -2.5)} Q${p(5, -4.5)} ${p(7.5, -2)}" ${F}/>`;
  const smile = (w, d) => `<path d="M${p(-w, 7)} Q${p(0, 7 + d)} ${p(w, 7)}" ${F}/>`;
  const frown = `<path d="M${p(-5, 11)} Q${p(0, 6)} ${p(5, 11)}" ${F}/>`;
  const wobble = `<path d="M${p(-4.5, 9.5)} Q${p(-2, 7.5)} ${p(0, 9.5)} Q${p(2, 11.5)} ${p(4.5, 9)}" ${F}/>`;
  const flat = `<path d="M${p(-3.5, 9.5)} L${p(3.5, 9.5)}" ${F}/>`;
  const open = (rx, ry) => `<ellipse cx="${r1(cx)}" cy="${r1(cy + 9.5)}" rx="${rx}" ry="${ry}" fill="${MOUTH}" ${SK}/>`;
  const laughM = `<path d="M${p(-5.5, 7)} Q${p(0, 16)} ${p(5.5, 7)} Z" fill="${MOUTH}" ${SK}/>`;
  const oh = `<circle cx="${r1(cx)}" cy="${r1(cy + 10)}" r="2.4" fill="${MOUTH}" ${SK}/>`;
  switch (mood) {
    case 'kind': return eyes + cheeks + smile(5, 5);
    case 'happy': return eyes + cheeks + smile(6, 7);
    case 'calm': return eyes + smile(3.5, 2.5);
    case 'unsure': return eyes + raised + wobble;
    case 'worried': return eyes + sad + wobble;
    case 'cross': return eyes + angry + frown;
    case 'upset': return eyes + sad + frown;
    case 'shout': return eyes + angry + open(3.5, 4.5);
    case 'stern': return eyes + angry + open(3, 3.2);
    case 'laugh': return closed + cheeks + laughM;
    case 'relieved': return closed + cheeks + smile(5.5, 6);
    case 'sulk': return shut + flat;
    case 'surprised': return eyes + raised + oh;
    case 'focus': return eyes + flat;
  }
  return eyes;
};

/* ---------- heads and hair ---------- */
const head = (cx, cy, { mood, hair = 'bob', hc = HAIR, skin, hood = null, r = 15 }) => {
  const fringe = `<path d="M${cx - r - 1} ${cy - 1} Q${cx - r + 1} ${cy - r - 3} ${cx} ${cy - r - 3} Q${cx + r - 1} ${cy - r - 3} ${cx + r + 1} ${cy - 1} Q${cx} ${cy - 10} ${cx - r - 1} ${cy - 1} Z" fill="${hc}"/>`;
  let back = '', front = '';
  if (hood) {
    back = `<circle cx="${cx}" cy="${cy + 1}" r="${r + 6}" fill="${hood}" ${S}/>`;
    front = `<path d="M${cx - r - 1} ${cy + 4} Q${cx - r} ${cy - r - 4} ${cx} ${cy - r - 4} Q${cx + r} ${cy - r - 4} ${cx + r + 1} ${cy + 4} Q${cx} ${cy - 2} ${cx - r - 1} ${cy + 4} Z" fill="${hood}" ${S}/>`;
  } else if (hair === 'bob') {
    back = `<rect x="${cx - r - 4}" y="${cy - 12}" width="${2 * r + 8}" height="31" rx="12" fill="${hc}"/>`;
    front = fringe;
  } else if (hair === 'bun') {
    back = `<circle cx="${cx}" cy="${cy - r - 5}" r="8" fill="${hc}"/>`;
    front = fringe;
  } else if (hair === 'pony') {
    back = `<ellipse cx="${cx + r + 3}" cy="${cy + 3}" rx="6" ry="12" fill="${hc}"/>`;
    front = fringe;
  } else if (hair === 'puffs') {
    back = `<circle cx="${cx - r}" cy="${cy - 11}" r="7.5" fill="${hc}"/><circle cx="${cx + r}" cy="${cy - 11}" r="7.5" fill="${hc}"/>`;
    front = fringe;
  } else if (hair === 'short') {
    front = `<path d="M${cx - r} ${cy - 1} Q${cx - r} ${cy - r - 3} ${cx} ${cy - r - 3} Q${cx + r} ${cy - r - 3} ${cx + r} ${cy - 1} Q${cx + 7} ${cy - 10} ${cx - 2} ${cy - 8} Q${cx - 10} ${cy - 7} ${cx - r} ${cy - 1} Z" fill="${hc}"/>`;
  } else if (hair === 'cap') {
    front = `<path d="M${cx - r} ${cy - 3} Q${cx - r} ${cy - r - 4} ${cx} ${cy - r - 4} Q${cx + r} ${cy - r - 4} ${cx + r} ${cy - 3} Z" fill="${SEAT2}" ${S2}/><path d="M${cx - 2} ${cy - 3} L${cx + r + 9} ${cy - 3}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  }
  const f = face(cx, cy, mood);
  return back + `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${skin}" ${S}/>` + (hood ? f + front : front + f);
};

/* ---------- children: feet at (0,0) ---------- */
const ARMS = {
  down: ['M-13 -56 L-22 -32', 'M13 -56 L22 -32'],
  up: ['M-13 -56 L-26 -86', 'M13 -56 L26 -86'],
  reach: ['M-13 -56 L-22 -32', 'M13 -56 L42 -62'],
  throw: ['M-13 -56 L-30 -40', 'M13 -56 L32 -86'],
  tap: ['M-13 -56 L-22 -32', 'M13 -56 L38 -48'],
  lock: ['M-13 -56 L-22 -32', 'M13 -56 L30 -44'],
};
const kid = (x, y, o) => {
  const { s = 1, flip = false, rot = 0, pose = 'stand', arms = 'down', mood = 'calm', hair = 'bob', hc = HAIR, shirt = BLUSH, pants = INK, shoe = RED, skin = SKINS[0], hood = null } = o;
  const H = (cy) => head(0, cy, { mood, hair, hc, skin, hood });
  const folded = (yy) => `<rect x="-18" y="${yy}" width="36" height="11" rx="5.5" fill="${skin}" ${S}/>`;
  const hold = (yy) => limb(`M-13 ${yy - 16} L-6 ${yy}`, skin) + limb(`M13 ${yy - 16} L6 ${yy}`, skin);
  let b = '';
  if (pose === 'floor') {
    b += `<path d="M-36 0 Q-30 -18 0 -13 Q30 -18 36 0 Q0 9 -36 0 Z" fill="${pants}" ${S}/>`;
    if (arms === 'down') b += limb('M-13 -40 L-22 -14', skin) + limb('M13 -40 L22 -14', skin);
    b += `<path d="M-20 -8 L-14 -46 Q0 -54 14 -46 L20 -8 Z" fill="${shirt}" ${S}/>`;
    if (arms === 'folded') b += folded(-36);
    if (arms === 'hold') b += hold(-24);
    b += H(-67);
  } else if (pose === 'chair') {
    b += `<path d="M-20 -30 L-14 -64 Q0 -72 14 -64 L20 -30 Z" fill="${shirt}" ${S}/>`;
    b += `<rect x="-12" y="-20" width="9" height="16" rx="3" fill="${pants}"/><rect x="3" y="-20" width="9" height="16" rx="3" fill="${pants}"/>`;
    b += `<rect x="-15" y="-7" width="12" height="7" rx="3.5" fill="${shoe}"/><rect x="3" y="-7" width="12" height="7" rx="3.5" fill="${shoe}"/>`;
    b += `<rect x="-23" y="-36" width="46" height="17" rx="8" fill="${pants}" ${S}/>`;
    if (arms === 'down') b += limb('M-13 -58 L-17 -34', skin) + limb('M13 -58 L17 -34', skin);
    if (arms === 'folded') b += folded(-50);
    if (arms === 'hold') b += hold(-40);
    if (arms === 'reach') b += limb('M-13 -58 L-17 -34', skin) + limb('M13 -58 L36 -54', skin);
    b += H(-86);
  } else {
    if (pose === 'run') {
      b += limb('M-4 -26 L-18 -6', pants, 11) + limb('M4 -26 L16 -14 L26 -8', pants, 11);
      b += `<circle cx="-20" cy="-4" r="5" fill="${shoe}" ${S2}/><circle cx="29" cy="-7" r="5" fill="${shoe}" ${S2}/>`;
    } else if (pose === 'kick') {
      b += limb('M-5 -26 L-6 -3', pants, 11) + limb('M5 -26 L30 -26', pants, 11);
      b += `<rect x="-14" y="-6" width="13" height="7" rx="3.5" fill="${shoe}"/><circle cx="34" cy="-26" r="5.5" fill="${shoe}" ${S2}/>`;
    } else {
      b += `<rect x="-11" y="-28" width="8" height="26" rx="3" fill="${pants}"/><rect x="3" y="-28" width="8" height="26" rx="3" fill="${pants}"/>`;
      b += `<rect x="-15" y="-5" width="13" height="7" rx="3.5" fill="${shoe}"/><rect x="2" y="-5" width="13" height="7" rx="3.5" fill="${shoe}"/>`;
    }
    if (ARMS[arms]) b += limb(ARMS[arms][0], skin) + limb(ARMS[arms][1], skin);
    b += `<path d="M-21 -22 L-14 -62 Q0 -70 14 -62 L21 -22 Z" fill="${shirt}" ${S}/>`;
    if (arms === 'folded') b += folded(-50);
    if (arms === 'hold') b += hold(-40);
    if (arms === 'ears') b += limb('M-13 -56 Q-30 -66 -17 -82', skin) + limb('M13 -56 Q30 -66 17 -82', skin);
    b += H(-83);
    if (arms === 'ears') b += `<circle cx="-17" cy="-82" r="5" fill="${skin}" ${S2}/><circle cx="17" cy="-82" r="5" fill="${skin}" ${S2}/>`;
  }
  return g(x, y, b, { s, flip, rot });
};

/* ---------- adults: feet at (0,0) ---------- */
const adult = (x, y, o) => {
  const { s = 1, flip = false, pose = 'stand', arms = 'down', mood = 'kind', hair = 'bun', hc = HAIR, shirt = MINT, pants = INK, skin = SKINS[0], card = true } = o;
  let b = '';
  if (pose === 'crouch') {
    b += limb('M-10 -28 L-24 -16 L-18 -2', pants, 13) + limb('M10 -28 L24 -14 L20 -2', pants, 13);
    b += `<rect x="-26" y="-5" width="15" height="7" rx="3.5" fill="${INK}"/><rect x="14" y="-5" width="15" height="7" rx="3.5" fill="${INK}"/>`;
    if (arms === 'down') b += limb('M-16 -78 L-22 -44', skin);
    b += `<path d="M-24 -24 L-18 -84 Q0 -94 18 -84 L24 -24 Z" fill="${shirt}" ${S}/>`;
    if (card) b += `<rect x="-6" y="-64" width="12" height="15" rx="2" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>`;
    b += limb(arms === 'down' ? 'M14 -78 L22 -44' : 'M14 -78 L44 -60', skin);
    b += head(0, -108, { mood, hair, hc, skin, r: 16 });
    return g(x, y, b, { s, flip });
  }
  if (pose === 'run') {
    b += limb('M-6 -38 L-24 -6', pants, 13) + limb('M6 -38 L20 -20 L32 -12', pants, 13);
    b += `<circle cx="-26" cy="-4" r="5.5" fill="${INK}"/><circle cx="35" cy="-10" r="5.5" fill="${INK}"/>`;
  } else {
    b += `<rect x="-14" y="-40" width="11" height="38" rx="3" fill="${pants}"/><rect x="3" y="-40" width="11" height="38" rx="3" fill="${pants}"/>`;
    b += `<rect x="-17" y="-5" width="15" height="7" rx="3.5" fill="${INK}"/><rect x="2" y="-5" width="15" height="7" rx="3.5" fill="${INK}"/>`;
  }
  const L = { down: 'M-17 -98 L-24 -58', out: 'M-17 -98 L-48 -82', up: 'M-17 -98 L-30 -132', hold: 'M-17 -98 L-8 -76' }[arms === 'out' ? 'out' : arms === 'hold' ? 'hold' : 'down'];
  const R = {
    down: 'M15 -98 L24 -58', point: 'M15 -98 L50 -112', reach: 'M15 -98 L48 -84', out: 'M15 -98 L46 -82',
    whistle: 'M15 -98 Q30 -108 10 -122', hold: 'M15 -98 L8 -76', shout: 'M15 -98 L36 -126',
  }[arms] || 'M15 -98 L24 -58';
  if (arms !== 'hold') b += limb(L, skin);
  b += `<path d="M-26 -36 L-19 -104 Q0 -114 19 -104 L26 -36 Z" fill="${shirt}" ${S}/>`;
  if (card) b += `<rect x="-6" y="-82" width="12" height="15" rx="2" fill="${WHITE}" stroke="${INK}" stroke-width="2"/>`;
  if (arms === 'hold') b += limb(L, skin);
  b += limb(R, skin);
  b += head(0, -128, { mood, hair, hc, skin, r: 16 });
  if (arms === 'whistle') b += `<rect x="4" y="-121" width="12" height="7" rx="3" fill="${TAPE}" ${S2}/>`;
  return g(x, y, b, { s, flip });
};

/* ---------- rooms ---------- */
const wall = (c = '#f7f9fd') => `<rect width="360" height="260" fill="${c}"/>`;
const floor = (c = '#dfe5f1') =>
  `<rect y="200" width="360" height="60" fill="${c}"/><line x1="0" y1="224" x2="360" y2="224" stroke="${RULE}" stroke-width="2"/><line x1="0" y1="246" x2="360" y2="246" stroke="${RULE}" stroke-width="2"/><line x1="0" y1="200" x2="360" y2="200" ${S}/>`;
const pane = (x, y, w = 100, h = 62) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${SKY}"/>` +
  `<path d="M${x + 3} ${y + h - 10} Q${x + w * 0.3} ${y + h - 30} ${x + w * 0.52} ${y + h - 16} T${x + w - 3} ${y + h - 20} L${x + w - 3} ${y + h - 4} Q${x + w / 2} ${y + h + 2} ${x + 3} ${y + h - 4} Z" fill="${MINT}"/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" ${S}/>`;
const board = (x, y, w = 150, h = 70) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${WHITE}" ${S}/>` +
  `<path d="M${x + 16} ${y + 20} h${w * 0.45} M${x + 16} ${y + 34} h${w * 0.6} M${x + 16} ${y + 48} h${w * 0.3}" stroke="${RULE}" stroke-width="4" stroke-linecap="round"/>` +
  `<rect x="${x + w * 0.35}" y="${y + h}" width="${w * 0.3}" height="6" rx="3" fill="${STEEL}" ${S2}/>`;
const classroom = ({ rug = false, boardX = 24, win = true } = {}) =>
  wall() + board(boardX, 22) + (win ? pane(240, 22, 96, 62) : '') + floor() +
  (rug ? `<ellipse cx="180" cy="232" rx="160" ry="22" fill="${BUTTER}" ${S}/><ellipse cx="180" cy="232" rx="138" ry="14" fill="none" stroke="${TAPE}" stroke-width="3"/>` : '');
const flask = (x, y, c) =>
  `<path d="M${x - 4} ${y - 26} L${x - 4} ${y - 16} L${x - 13} ${y} L${x + 13} ${y} L${x + 4} ${y - 16} L${x + 4} ${y - 26} Z" fill="#eef4fd" ${S2}/>` +
  `<path d="M${x - 9.5} ${y - 6} L${x + 9.5} ${y - 6} L${x + 12} ${y - 1.5} L${x - 12} ${y - 1.5} Z" fill="${c}"/>`;
const lab = () =>
  wall() + `<rect x="24" y="22" width="70" height="50" rx="6" fill="${WHITE}" ${S}/><circle cx="59" cy="47" r="6" fill="${BUTTER}" ${S2}/><ellipse cx="59" cy="47" rx="20" ry="8" fill="none" ${S2}/><ellipse cx="59" cy="47" rx="20" ry="8" fill="none" ${S2} transform="rotate(60 59 47)"/>` +
  `<line x1="130" y1="78" x2="340" y2="78" ${S}/>` + flask(160, 77, MINT) + flask(200, 77, BUTTER) + flask(290, 77, BLUSH) +
  `<rect x="232" y="52" width="16" height="25" rx="3" fill="#eef4fd" ${S2}/><rect x="314" y="56" width="14" height="21" rx="3" fill="#eef4fd" ${S2}/>` + floor();
const bench = (x, w, top = 150) =>
  `<rect x="${x + 8}" y="${top + 10}" width="${w - 16}" height="${200 - top - 10}" fill="${SKY}" ${S}/><line x1="${x + w / 2}" y1="${top + 14}" x2="${x + w / 2}" y2="196" stroke="${INK}" stroke-width="2"/>` +
  `<rect x="${x}" y="${top}" width="${w}" height="12" rx="3" fill="${STEEL}" ${S}/>`;
const desk = (x, w, top = 160) =>
  `<rect x="${x + 8}" y="${top + 8}" width="6" height="${200 - top - 8}" fill="${INK}"/><rect x="${x + w - 14}" y="${top + 8}" width="6" height="${200 - top - 8}" fill="${INK}"/>` +
  `<rect x="${x}" y="${top}" width="${w}" height="11" rx="3" fill="${WOOD}" ${S}/>`;
const chair = (x, y, rot = 0) =>
  g(x, y, `<rect x="-22" y="-84" width="44" height="52" rx="8" fill="${WOOD}" ${S}/><rect x="-22" y="-30" width="5" height="30" fill="${INK}"/><rect x="17" y="-30" width="5" height="30" fill="${INK}"/><rect x="-26" y="-38" width="52" height="9" rx="4" fill="${WOOD2}" ${S}/>`, { rot });
const playground = () =>
  `<rect width="360" height="260" fill="#e9f0fc"/>` +
  `<path d="M40 44 q8 -14 22 -6 q10 -10 22 0 q12 0 10 12 h-58 q-6 -4 4 -6 Z" fill="${WHITE}" ${S2}/><path d="M250 30 q8 -12 20 -5 q10 -8 20 1 q10 1 8 10 h-52 q-4 -4 4 -6 Z" fill="${WHITE}" ${S2}/>` +
  `<rect y="150" width="360" height="110" fill="${MINT}"/><line x1="0" y1="150" x2="360" y2="150" ${S}/>` +
  `<path d="M30 230 l4 -8 l4 8 M120 248 l4 -8 l4 8 M300 238 l4 -8 l4 8 M210 222 l4 -8 l4 8" fill="none" stroke="#7fc3ad" stroke-width="2" stroke-linecap="round"/>`;
const fence = (x0, x1, y = 150) => {
  let s = `<line x1="${x0}" y1="${y - 24}" x2="${x1}" y2="${y - 24}" ${S}/><line x1="${x0}" y1="${y - 10}" x2="${x1}" y2="${y - 10}" ${S}/>`;
  for (let x = x0; x <= x1; x += 22) s += `<rect x="${x - 3}" y="${y - 36}" width="6" height="36" rx="2" fill="${WHITE}" ${S2}/>`;
  return s;
};
const cafeteria = () => {
  let s = wall();
  for (let x = 0; x <= 360; x += 30) s += `<line x1="${x}" y1="0" x2="${x}" y2="108" stroke="${RULE}" stroke-width="1.5"/>`;
  for (let y = 18; y <= 108; y += 30) s += `<line x1="0" y1="${y}" x2="360" y2="${y}" stroke="${RULE}" stroke-width="1.5"/>`;
  s += `<rect x="0" y="108" width="360" height="40" fill="${STEEL}" ${S}/><rect x="0" y="100" width="360" height="10" fill="${WHITE}" ${S}/>`;
  s += `<path d="M60 100 q0 -18 26 -18 q26 0 26 18 Z" fill="${SKY}" ${S2}/><path d="M250 100 q0 -18 26 -18 q26 0 26 18 Z" fill="${SKY}" ${S2}/>`;
  s += `<path d="M78 72 q-5 -6 0 -12 q5 -6 0 -12 M94 72 q-5 -6 0 -12 q5 -6 0 -12 M276 72 q-5 -6 0 -12 q5 -6 0 -12" fill="none" stroke="${STEEL}" stroke-width="2.5" stroke-linecap="round"/>`;
  return s + floor();
};
const hallway = () => {
  let s = wall();
  for (let x = 4; x < 360; x += 50) {
    s += `<rect x="${x}" y="26" width="46" height="174" rx="4" fill="#cfdcf5" ${S}/>`;
    s += `<path d="M${x + 12} 40 h22 M${x + 12} 47 h22 M${x + 12} 54 h22" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
    s += `<rect x="${x + 36}" y="104" width="5" height="18" rx="2" fill="${INK}"/>`;
  }
  return s + floor();
};
const busSeat = (x) =>
  `<rect x="${x}" y="104" width="112" height="74" rx="16" fill="${SEAT}" ${S}/>` +
  `<line x1="${x + 16}" y1="124" x2="${x + 96}" y2="124" stroke="${SEAT2}" stroke-width="3" stroke-linecap="round"/>` +
  `<rect x="${x + 4}" y="194" width="10" height="7" fill="${INK}"/><rect x="${x + 98}" y="194" width="10" height="7" fill="${INK}"/>` +
  `<rect x="${x - 8}" y="170" width="128" height="25" rx="10" fill="${SEAT2}" ${S}/>`;
const bus = (seats) => {
  let s = wall();
  for (const x of [20, 130, 240]) s += pane(x, 22);
  s += `<line x1="0" y1="98" x2="360" y2="98" stroke="${RULE}" stroke-width="2"/>` + floor();
  for (const x of seats) s += busSeat(x);
  return s;
};

/* ---------- props ---------- */
const book = (x, y, rot = 0, c = SKY) => g(x, y, `<rect x="-16" y="-11" width="32" height="22" rx="2" fill="${c}" ${S2}/><line x1="-10" y1="-11" x2="-10" y2="11" stroke="${INK}" stroke-width="2"/><path d="M-4 -4 h14 M-4 2 h10" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`, { rot });
const tablet = (x, y, rot = 0) => g(x, y, `<rect x="-16" y="-11" width="32" height="22" rx="3" fill="${INK}"/><rect x="-13" y="-8" width="26" height="16" rx="1.5" fill="${SKY}"/><circle cx="-4" cy="0" r="3.5" fill="${TAPE}"/><rect x="2" y="-3" width="7" height="6" rx="1" fill="${BLUSH}"/>`, { rot });
const beaker = (x, y, rot = 0) => g(x, y, `<path d="M-9 -22 L-9 -3 Q-9 1 -5 1 L5 1 Q9 1 9 -3 L9 -22" fill="#eef4fd" ${S2}/><path d="M-7.5 -10 L7.5 -10 L7.5 -3 Q7.5 -0.5 5 -0.5 L-5 -0.5 Q-7.5 -0.5 -7.5 -3 Z" fill="${MINT}"/><path d="M-12 -22 L-9 -22" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`, { rot });
const marker = (x, y, rot, c) => g(x, y, `<rect x="-11" y="-3" width="20" height="6" rx="2" fill="${c}" stroke="${INK}" stroke-width="1.5"/><rect x="8" y="-3" width="5" height="6" rx="1.5" fill="${INK}"/>`, { rot });
const bottle = (x, y, rot = 0) => g(x, y, `<rect x="-6" y="-24" width="12" height="24" rx="4" fill="${SKY}" ${S2}/><rect x="-4" y="-30" width="8" height="7" rx="2" fill="${RED}" ${S2}/>`, { rot });
const puddle = (x, y, rx = 30) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${Math.round(rx / 5)}" fill="${WATER}" ${S2}/>`;
const backpack = (x, y, rot = 0) => g(x, y, `<path d="M-8 -18 Q0 -28 8 -18" fill="none" ${S}/><rect x="-15" y="-18" width="30" height="34" rx="9" fill="${TAPE}" ${S}/><rect x="-9" y="2" width="18" height="10" rx="3" fill="${BUTTER}" ${S2}/>`, { rot });
const phone = (x, y, rot = 0) => g(x, y, `<rect x="-6" y="-10" width="12" height="20" rx="2.5" fill="${INK}"/><rect x="-4" y="-7" width="8" height="13" rx="1" fill="${SKY}"/>`, { rot });
const tray = (x, y, spill = false) => g(x, y, `<path d="M-12 -16 L12 -16 Q11 -4 0 -4 Q-11 -4 -12 -16 Z" fill="${WHITE}" ${S2}/><ellipse cx="0" cy="-16" rx="12" ry="3" fill="#f0b45e" ${S2}/><rect x="-24" y="-5" width="48" height="7" rx="2" fill="${STEEL}" ${S2}/>` + (spill ? `<path d="M10 -18 q8 -6 14 2 q-4 6 2 10" fill="#f0b45e" ${S2}/>` : `<path d="M-4 -24 q-3 -4 0 -8 M4 -24 q-3 -4 0 -8" fill="none" stroke="${STEEL}" stroke-width="2" stroke-linecap="round"/>`));
const bin = (x, y) => `<path d="M${x - 14} ${y - 30} L${x + 14} ${y - 30} L${x + 11} ${y} L${x - 11} ${y} Z" fill="${STEEL}" ${S2}/><rect x="${x - 16}" y="${y - 34}" width="32" height="6" rx="2" fill="${SKY}" ${S2}/>`;
const paperBall = (x, y) => `<circle cx="${x}" cy="${y}" r="7" fill="${WHITE}" ${S2}/><path d="M${x - 4} ${y - 2} l3 2 l3 -3 M${x - 1} ${y + 3} l4 -1" fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round"/>`;
const paper = (x, y, rot = 0, mark = '3') => g(x, y, `<rect x="-12" y="-16" width="24" height="32" rx="2" fill="${WHITE}" ${S2}/><path d="M-7 -9 h10 M-7 -4 h14" stroke="${RULE}" stroke-width="2.4" stroke-linecap="round"/><circle cx="2" cy="7" r="6.5" fill="none" stroke="${RED}" stroke-width="2"/>`, { rot });
const padlock = (x, y) => `<path d="M${x - 5} ${y - 4} v-5 a5 5 0 0 1 10 0 v5" fill="none" stroke="${INK}" stroke-width="2.5"/><rect x="${x - 8}" y="${y - 4}" width="16" height="13" rx="3" fill="${TAPE}" ${S2}/>`;
const sandbox = (x, w) => `<rect x="${x}" y="196" width="${w}" height="30" rx="6" fill="${SAND}" stroke="${WOOD2}" stroke-width="5"/><path d="M${x + 20} 206 q8 -6 16 0 M${x + w - 50} 214 q8 -6 16 0" fill="none" stroke="${WOOD}" stroke-width="2.5" stroke-linecap="round"/>`;
const bucket = (x, y) => `<path d="M${x - 9} ${y - 16} L${x + 9} ${y - 16} L${x + 7} ${y} L${x - 7} ${y} Z" fill="${RED}" ${S2}/><path d="M${x - 8} ${y - 16} Q${x} ${y - 28} ${x + 8} ${y - 16}" fill="none" ${S2}/>`;
const blocks = (x, y) => `<rect x="${x}" y="${y - 14}" width="14" height="14" rx="2" fill="${TAPE}" ${S2}/><rect x="${x + 16}" y="${y - 14}" width="14" height="14" rx="2" fill="${MINT}" ${S2}/><rect x="${x + 8}" y="${y - 28}" width="14" height="14" rx="2" fill="${BLUSH}" ${S2}/>`;
const clockBadge = (x, y) => `<circle cx="${x}" cy="${y}" r="17" fill="${WHITE}" ${S}/><path d="M${x} ${y - 10} V${y} L${x + 7} ${y + 4}" fill="none" ${S}/>`;
const burst = (x, y, r = 16, n = 5, from = -150, to = -30) => {
  let s = '';
  for (let i = 0; i < n; i++) {
    const a = ((from + ((to - from) * i) / Math.max(1, n - 1)) * Math.PI) / 180;
    s += `M${r1(x + Math.cos(a) * r)} ${r1(y + Math.sin(a) * r)} L${r1(x + Math.cos(a) * (r + 9))} ${r1(y + Math.sin(a) * (r + 9))} `;
  }
  return `<path d="${s.trim()}" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/>`;
};
const speed = (x, y, flip = false) => {
  const d = flip ? -1 : 1;
  return `<path d="M${x} ${y} h${-22 * d} M${x - 4 * d} ${y + 10} h${-30 * d} M${x} ${y + 20} h${-20 * d}" stroke="${RULE}" stroke-width="3" stroke-linecap="round"/>`;
};
const arc = (d) => `<path d="${d}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="2 7"/>`;
const spin = (cx, cy) =>
  `<path d="M${cx - 34} ${cy} A34 12 0 0 0 ${cx + 30} ${cy + 6}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/><path d="M${cx + 22} ${cy + 1} L${cx + 31} ${cy + 6} L${cx + 23} ${cy + 13}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>` +
  `<path d="M${cx + 30} ${cy - 30} A30 10 0 0 0 ${cx - 28} ${cy - 34}" fill="none" stroke="${RED}" stroke-width="2.5" stroke-linecap="round"/>`;
const bubble = (x, y, w, tx, ty) =>
  `<path d="M${x + w / 2 - 9} ${y + 30} L${tx} ${ty} L${x + w / 2 + 9} ${y + 32} Z" fill="${WHITE}" ${S}/>` +
  `<rect x="${x}" y="${y}" width="${w}" height="34" rx="17" fill="${WHITE}" ${S}/>` +
  `<path d="M${x + w / 2 - 11} ${y + 31} L${x + w / 2 + 11} ${y + 31}" stroke="${WHITE}" stroke-width="4"/>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="260" viewBox="0 0 360 260" fill="none">${body}</svg>`;

/* A panel: parts (SVG strings), says (speech bubbles), words (loose hand-lettered words), caption. */
const panel = (parts, caption, says = [], words = []) => {
  let body = parts.join('');
  for (const b of says) body += bubble(b.x, b.y, b.w, b.tx, b.ty);
  return { svg: svg(body), caption, says, words };
};
const say = (text, x, y, w, tx, ty, red = false) => ({ text, x, y, w, tx, ty, red });
const word = (text, x, y, size = 18, red = true, rot = 0) => ({ text, x, y, size, red, rot });

/* ---------- the cast ---------- */
const TEACHER = { hair: 'bun', shirt: MINT, skin: SKINS[0] };
const AIDE = { hair: 'short', hc: HAIR2, shirt: BUTTER, skin: SKINS[1], pants: PANTS };
const AIDE2 = { hair: 'bun', shirt: SKY, skin: SKINS[2] };
const STU_A = { hair: 'short', shirt: SKY, skin: SKINS[1] };
const STU_B = { hair: 'pony', shirt: BUTTER, skin: SKINS[2], s: 1.12 };
const STU_D = { hair: 'puffs', shirt: BUTTER, skin: SKINS[3], s: 0.85 };
const STU_E = { hair: 'short', shirt: SKY, skin: SKINS[0], s: 1.15, pants: PANTS };
const STU_F = { hair: 'bob', shirt: MINT, skin: SKINS[2], s: 0.9 };
const STU_G = { hair: 'short', hc: HAIR2, shirt: TAPE, skin: SKINS[0], s: 1.15, pants: PANTS };
const STU_I = { hair: 'pony', shirt: BLUSH, skin: SKINS[1], s: 0.85 };
const STU_J = { hair: 'bob', hc: HAIR2, shirt: SKY, skin: SKINS[3] };
const P1 = { hair: 'bob', shirt: BLUSH, skin: SKINS[2] };
const P2 = { hair: 'short', shirt: MINT, skin: SKINS[3] };
const P3 = { hair: 'puffs', shirt: SKY, skin: SKINS[0] };

const INCIDENTS = [
  {
    id: 'abc-101', name: 'Incident — Journal writing', kicker: 'Observation record · Classroom', title: 'Journal writing time',
    fn: 'Escape · avoids the writing task', tile: SKY, note: 'the coaxing became a break from writing',
    panels: [
      panel([classroom(), adult(70, 204, { ...TEACHER, arms: 'point' }), chair(250, 214), kid(250, 214, { ...STU_A, pose: 'chair', mood: 'unsure' }), desk(196, 108, 168), blocks(212, 168), book(280, 160, 0, BLUSH)],
        'Play time ends. The teacher asks the class to write in their journals.', [say('Journals out, please!', 92, 14, 176, 104, 70)]),
      panel([classroom(), desk(30, 110, 168), chair(286, 214, 72), book(150, 226, -18, BLUSH), kid(200, 214, { ...STU_A, arms: 'folded', mood: 'cross' }), burst(286, 176, 14, 4, -170, -60)],
        'Pushes the chair back, sweeps the journal off and folds their arms.', [say('I won’t write this!', 88, 30, 168, 186, 108, true)]),
      panel([classroom(), chair(140, 214), kid(140, 214, { ...STU_A, pose: 'chair', mood: 'sulk' }), desk(86, 108, 168), book(124, 160, 0, BLUSH), adult(256, 214, { ...TEACHER, pose: 'crouch', arms: 'reach', flip: true }), kid(40, 214, { ...P1, mood: 'surprised', s: 0.85 }), kid(330, 214, { ...P2, mood: 'surprised', s: 0.85 })],
        'Classmates go quiet. The teacher stops the lesson to coax them back.', [say('Just one line?', 196, 30, 130, 248, 82)]),
    ],
  },
  {
    id: 'abc-102', name: 'Incident — Shared lab tablet', kicker: 'Observation record · Science lab', title: 'Sharing the lab tablet',
    fn: 'Tangible · keeps the tablet', tile: MINT, note: 'the tablet stayed theirs, so shouting worked',
    panels: [
      panel([lab(), kid(130, 196, { ...STU_B, arms: 'hold', mood: 'focus' }), tablet(130, 152), kid(236, 196, { ...P2, s: 1.1, arms: 'reach', flip: true, mood: 'calm' }), bench(30, 300, 160), beaker(80, 160), beaker(290, 160)],
        'A lab partner asks for a turn recording on the shared tablet.', [say('My turn?', 220, 52, 96, 240, 96)]),
      panel([lab(), kid(126, 196, { ...STU_B, arms: 'up', mood: 'shout' }), kid(286, 196, { ...P2, s: 1.1, flip: true, mood: 'surprised' }), bench(30, 300, 160), book(186, 154, -6, SKY), burst(186, 150, 14, 5), beaker(232, 166, 88), puddle(258, 168, 22), tablet(70, 154, -10)],
        'Shouts, slams the lab manual down and knocks a beaker over.', [say('Hands off my log!', 16, 18, 160, 106, 70, true)]),
      panel([lab(), adult(70, 210, { ...AIDE2, arms: 'point' }), kid(266, 196, { ...STU_B, arms: 'hold', mood: 'happy' }), tablet(266, 152), bench(196, 140, 160)],
        'The partner backs away. The teacher gives them a station of their own.', [say('Use this bench.', 96, 16, 130, 92, 64)]),
    ],
  },
  {
    id: 'abc-104', name: 'Incident — End of recess', kicker: 'Observation record · Playground', title: 'Recess is over',
    fn: 'Attention · the chase is the fun', tile: BUTTER, note: 'being chased turned into the game',
    panels: [
      panel([playground(), fence(220, 350), sandbox(26, 150), bucket(140, 214), kid(86, 214, { ...STU_D, pose: 'floor', mood: 'happy' }), adult(276, 210, { ...AIDE, arms: 'whistle', flip: true, mood: 'calm' })],
        'The whistle blows: time to leave the sandbox for circle time.', [], [word('Tweet!', 186, 40, 22)]),
      panel([playground(), fence(220, 350), adult(96, 222, { ...AIDE, pose: 'run', arms: 'reach', mood: 'worried' }), kid(260, 214, { ...STU_D, pose: 'run', arms: 'up', mood: 'laugh' }), speed(220, 150)],
        'Runs across the field toward the fence, laughing as an adult follows.', [], [word('hee hee!', 270, 70, 20)]),
      panel([playground(), fence(220, 350), kid(22, 168, { ...P1, s: 0.62, arms: 'up', mood: 'laugh' }), kid(50, 168, { ...P3, s: 0.62, arms: 'up', mood: 'happy' }), kid(78, 168, { ...P2, s: 0.62, arms: 'up', mood: 'laugh' }),
        adult(130, 236, { ...AIDE, pose: 'run', arms: 'reach', mood: 'worried' }), adult(214, 236, { ...AIDE2, pose: 'run', arms: 'reach', mood: 'worried' }), kid(316, 222, { ...STU_D, pose: 'run', arms: 'up', mood: 'laugh' })],
        'Two assistants chase across the field while classmates cheer.', [say('Go! Go!', 14, 34, 90, 50, 96)]),
    ],
  },
  {
    id: 'abc-105', name: 'Incident — Lunch line bump', kicker: 'Observation record · Lunch hall', title: 'Bumped in the lunch line',
    fn: 'Sensory · too much noise and touch', tile: BLUSH, note: 'space and quiet were what calmed it',
    panels: [
      panel([cafeteria(), kid(46, 210, { ...P3, s: 1.05, mood: 'calm' }), kid(160, 212, { ...STU_E, mood: 'surprised' }), kid(226, 214, { ...P1, s: 1.1, arms: 'hold', flip: true, mood: 'surprised' }), tray(226, 170), burst(194, 140, 10, 4, -160, -20)],
        'In a crowded lunch line, a classmate carrying soup bumps into them.', [], [word('bump!', 172, 66, 22)]),
      panel([cafeteria(), kid(150, 214, { ...STU_E, arms: 'ears', mood: 'shout' }), burst(150, 98, 30, 7, -200, 20), kid(290, 216, { ...P1, s: 1.1, arms: 'hold', flip: true, mood: 'upset' }), tray(290, 172, true)],
        'Pushes the classmate away, shouts, then covers both ears and paces.', [], [word('too loud!', 12, 48, 20, true, -6)]),
      panel([cafeteria(), kid(70, 214, { ...STU_E, arms: 'ears', mood: 'worried' }), adult(180, 216, { ...AIDE2, arms: 'out', mood: 'calm' }), kid(300, 216, { ...P1, s: 1.1, mood: 'calm' })],
        'A supervisor steps between them, and the others give them space.', [say('Let’s give space.', 196, 18, 150, 196, 74)]),
    ],
  },
  {
    id: 'abc-106', name: 'Incident — iPad time ends', kicker: 'Observation record · Classroom', title: 'Time to put the iPad away',
    fn: 'Tangible · keeps the iPad', tile: MINT, note: 'extra screen time taught that flopping works',
    panels: [
      panel([classroom({ rug: true }), chair(100, 210), kid(100, 210, { ...STU_F, pose: 'chair', mood: 'happy' }), desk(48, 108, 164), tablet(104, 158, -4), adult(270, 214, { ...TEACHER, arms: 'point', flip: true })],
        'The maths game ends. Next is group reading on the carpet.', [say('Carpet time!', 150, 30, 116, 230, 84)]),
      panel([classroom({ rug: true }), kid(160, 222, { ...STU_F, rot: -90, arms: 'hold', mood: 'shout' }), tablet(124, 214, 90), burst(78, 196, 18, 5, -160, -40)],
        'Holds the iPad tight, drops to the floor and screams.', [say('No no no, mine!', 120, 46, 150, 96, 184, true)]),
      panel([classroom({ rug: true }), kid(130, 230, { ...STU_F, pose: 'floor', arms: 'hold', mood: 'happy' }), tablet(130, 196), adult(238, 230, { ...AIDE, pose: 'crouch', arms: 'reach', flip: true })],
        'An assistant offers two more minutes of screen time to get them up.', [say('Two more minutes?', 150, 24, 160, 226, 80)]),
    ],
  },
  {
    id: 'abc-107', name: 'Incident — Stuck locker', kicker: 'Observation record · Corridor', title: 'The locker won’t open',
    fn: 'Escape · ends a frustrating moment', tile: SKY, note: 'a stuck lock is small, but it can feel huge',
    panels: [
      panel([hallway(), padlock(228, 160), kid(190, 216, { ...STU_G, arms: 'lock', mood: 'worried' }), kid(48, 222, { ...P1, s: 1.05, mood: 'calm' }), kid(318, 222, { ...P2, s: 1.05, mood: 'calm', flip: true })],
        'Between lessons, in a busy corridor, the lock fails for the third time.', [], [word('click… click…', 234, 72, 17)]),
      panel([hallway(), kid(160, 216, { ...STU_G, pose: 'kick', mood: 'cross' }), burst(204, 186, 10, 5, -60, 60), backpack(60, 226, -30), speed(96, 214, true)],
        'Kicks and punches the locker, then kicks the backpack down the hall.', [], [word('BANG!', 236, 120, 24, true, 8)]),
      panel([hallway(), kid(60, 220, { ...P1, s: 1.05, arms: 'reach', mood: 'laugh' }), phone(104, 150, 10), kid(120, 222, { ...P2, s: 1.05, mood: 'laugh' }), kid(204, 216, { ...STU_G, mood: 'upset' }), adult(300, 216, { ...AIDE, arms: 'shout', mood: 'stern', flip: true })],
        'Other students laugh and film. A monitor runs over, shouting.', [say('Detention!', 196, 20, 110, 284, 74, true)]),
    ],
  },
  {
    id: 'abc-109', name: 'Incident — Group poster', kicker: 'Observation record · Classroom', title: 'Who writes the title?',
    fn: 'Escape · gets out of group work', tile: SKY, note: 'sitting alone meant no more group work',
    panels: [
      panel([classroom(), kid(80, 196, { ...P1, arms: 'reach', mood: 'happy' }), kid(180, 196, { ...STU_A, mood: 'unsure' }), kid(280, 196, { ...P3, mood: 'calm', flip: true }), desk(30, 300, 160),
        `<path d="M120 160 L240 160 L232 150 L128 150 Z" fill="${WHITE}" ${S2}/>`, marker(150, 142, -60, RED), marker(166, 142, -80, TAPE), marker(182, 142, -100, SEAT)],
        'The group has to agree who writes the title on the poster.', [say('I’ll write the title!', 14, 22, 168, 76, 94)]),
      panel([classroom(), kid(80, 196, { ...P1, mood: 'surprised' }), kid(180, 196, { ...STU_A, arms: 'throw', mood: 'shout' }), kid(280, 196, { ...P3, mood: 'surprised', flip: true }), desk(30, 300, 160),
        marker(226, 46, 30, RED), marker(262, 70, -20, TAPE), marker(300, 40, 60, SEAT), marker(250, 226, 15, MINT), bottle(126, 158, -90), puddle(98, 166, 22)],
        'Throws the markers across the carpet and tips a water bottle over.', [], [word('whoosh', 192, 14, 18)]),
      panel([classroom(), kid(60, 196, { ...P1, mood: 'unsure' }), kid(130, 196, { ...P3, mood: 'unsure' }), desk(16, 160, 160), adult(218, 210, { ...TEACHER, arms: 'point', mood: 'focus' }), chair(318, 196), kid(318, 196, { ...STU_A, pose: 'chair', mood: 'sulk', s: 0.82 }), desk(282, 72, 160)],
        'The group stops. The teacher sends them to sit alone at the back.', [say('Sit at the back.', 140, 18, 136, 210, 62)]),
    ],
  },
  {
    id: 'abc-110', name: 'Incident — Story time', kicker: 'Observation record · Classroom', title: 'Story time on the carpet',
    fn: 'Sensory · needs to move', tile: BLUSH, note: '20 minutes of sitting still was too long',
    panels: [
      panel([classroom({ rug: true, win: false }), adult(66, 214, { ...TEACHER, arms: 'hold', mood: 'happy' }), book(66, 136, 0, TAPE), kid(170, 234, { ...P1, pose: 'floor', s: 0.8, mood: 'calm' }), kid(240, 234, { ...STU_I, pose: 'floor', mood: 'unsure' }), kid(310, 234, { ...P2, pose: 'floor', s: 0.8, mood: 'calm' })],
        'Morning carpet time: the teacher reads a picture book aloud.'),
      panel([classroom({ rug: true, win: false }), adult(66, 214, { ...TEACHER, arms: 'hold', mood: 'unsure' }), book(66, 136, 0, TAPE), kid(160, 234, { ...P1, pose: 'floor', s: 0.8, mood: 'surprised' }), spin(240, 186), kid(240, 236, { ...STU_I, arms: 'tap', mood: 'laugh' }), kid(316, 234, { ...P2, pose: 'floor', s: 0.8, mood: 'unsure', flip: true })],
        'Spins on the carpet, chirps like a bird and taps a classmate.', [], [word('tweet tweet!', 196, 66, 20)]),
      panel([classroom({ rug: true, win: false }), adult(66, 214, { ...TEACHER, arms: 'hold', mood: 'cross' }), book(66, 136, 0, TAPE), kid(170, 234, { ...P1, pose: 'floor', s: 0.8, mood: 'laugh' }), kid(240, 236, { ...STU_I, arms: 'up', mood: 'happy' }), kid(310, 234, { ...P2, pose: 'floor', s: 0.8, mood: 'laugh' })],
        'The teacher keeps saying “shh, sit down”, and classmates giggle.', [say('Shh… sit down!', 108, 20, 136, 98, 70)], [word('hee hee', 276, 136, 16)]),
    ],
  },
  {
    id: 'abc-111', name: 'Incident — Assessment returned', kicker: 'Observation record · Science lab', title: 'Getting a grade back',
    fn: 'Attention · one-to-one time', tile: BUTTER, note: 'ten minutes of one-to-one time followed',
    panels: [
      panel([lab(), adult(110, 210, { ...AIDE2, arms: 'reach', mood: 'kind' }), paper(166, 124, 8), chair(250, 214), kid(250, 214, { ...STU_B, pose: 'chair', mood: 'unsure' }), desk(196, 120, 168)],
        'Design work comes back marked 3: not yet at the standard.', [], [word('3', 160, 118, 15)]),
      panel([lab(), chair(250, 214), kid(250, 214, { ...STU_B, pose: 'chair', mood: 'sulk', hood: BUTTER }), desk(196, 120, 168), bin(60, 200), arc('M220 120 Q150 40 104 186'), paperBall(104, 192)],
        'Crumples the rubric, throws it at the bin and hides inside the hoodie.', [], [word('missed!', 124, 194, 17)]),
      panel([lab(), chair(250, 214), kid(250, 214, { ...STU_B, pose: 'chair', mood: 'calm', hood: BUTTER }), desk(196, 120, 168), adult(150, 222, { ...AIDE2, pose: 'crouch', arms: 'reach', mood: 'kind' }), clockBadge(56, 120)],
        'The teacher crouches by the desk and reassures them for 10 minutes.', [say('You did well on…', 30, 22, 150, 140, 92)], [word('10 min', 74, 146, 16)]),
    ],
  },
  {
    id: 'abc-112', name: 'Incident — Assigned bus seat', kicker: 'Observation record · Transitions', title: 'A different seat',
    fn: 'Tangible · the favourite seat', tile: MINT, note: 'the long wait kept the favourite seat in play',
    panels: [
      panel([bus([16, 240]), adult(176, 208, { ...AIDE, hair: 'cap', arms: 'point', flip: true, mood: 'kind' }), kid(296, 212, { ...STU_J, mood: 'unsure' })],
        'The driver asks them to sit in seat 14B, not the back window seat.', [say('Seat 14B, please.', 96, 14, 150, 176, 64)], [word('14B', 56, 138, 18, false)]),
      panel([bus([16, 240]), kid(180, 216, { ...STU_J, pose: 'kick', arms: 'up', mood: 'shout' }), burst(232, 170, 10, 4, -80, 60)],
        'Stands in the aisle, kicks a seat and shouts at the driver.', [say('You’re not my boss!', 20, 22, 170, 160, 110, true)]),
      panel([bus([16, 240]), adult(110, 210, { ...AIDE2, arms: 'out', mood: 'calm' }), kid(230, 216, { ...STU_J, arms: 'folded', mood: 'cross' }), clockBadge(318, 60)],
        'A monitor talks with them for 15 minutes. The bus leaves late.', [say('Let’s talk it through.', 22, 18, 178, 104, 62)], [word('15 min', 296, 86, 16)]),
    ],
  },
];
