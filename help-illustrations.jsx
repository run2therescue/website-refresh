/* Four custom SVG illustrations for the "How You Can Help" section.
   Style: flat, editorial, brand colors (plum/purple/lavender/cream + accent).
   Each sits inside a soft gradient tile; meant to be static but with subtle
   CSS transitions on hover.
   
   Common palette tokens (read from styles.css, but also hardcoded so SVG
   exports correctly):
     plum-900 oklch(0.22 0.06 310)
     plum-800 oklch(0.28 0.08 305)
     purple-500 oklch(0.55 0.18 305)
     purple-400 oklch(0.7 0.12 305)
     lav-200 oklch(0.92 0.03 305)
     cream oklch(0.95 0.03 60)
     accent oklch(0.65 0.15 35)     // warm coral for hearts
*/

function HelpIllustration({ kind }) {
  switch (kind) {
    case "adopt":   return <IllustAdopt />;
    case "foster":  return <IllustFoster />;
    case "sponsor": return <IllustSponsor />;
    case "donate":  return <IllustDonate />;
    default: return null;
  }
}

/* Shared — subtle floor shadow, decorative dots */
function Dots({ color = "#ffffff30" }) {
  return (
    <g>
      <circle cx="40" cy="40" r="3" fill={color} />
      <circle cx="280" cy="30" r="2.5" fill={color} />
      <circle cx="260" cy="210" r="3" fill={color} />
      <circle cx="30" cy="200" r="2" fill={color} />
      <circle cx="130" cy="25" r="2" fill={color} />
    </g>
  );
}

/* ADOPT — a friendly dog face inside a heart. Simple, front-facing, clearly
   a dog. Warm lavender background with a coral heart behind. */
function IllustAdopt() {
  return (
    <div className="help-illust-bg help-illust-adopt">
      <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Dots color="oklch(1 0 0 / 0.22)" />
        {/* Heart backdrop */}
        <path d="M160 210 C 70 148, 42 82, 98 58 C 128 46, 152 66, 160 86 C 168 66, 192 46, 222 58 C 278 82, 250 148, 160 210 Z"
          fill="oklch(0.65 0.15 35 / 0.95)" />
        {/* Dog face — front view */}
        <g transform="translate(160 128)">
          {/* left ear */}
          <path d="M -56 -24 Q -72 -10 -62 26 Q -48 10 -42 -14 Z"
            fill="oklch(0.16 0.05 310)" />
          {/* right ear */}
          <path d="M 56 -24 Q 72 -10 62 26 Q 48 10 42 -14 Z"
            fill="oklch(0.16 0.05 310)" />
          {/* head */}
          <ellipse cx="0" cy="0" rx="52" ry="46" fill="oklch(0.22 0.06 310)" />
          {/* muzzle */}
          <ellipse cx="0" cy="20" rx="26" ry="20" fill="oklch(0.78 0.06 60)" />
          {/* nose */}
          <ellipse cx="0" cy="8" rx="7" ry="5" fill="#0a0a0a" />
          {/* mouth */}
          <path d="M 0 13 L 0 24 M 0 24 Q -6 30 -10 26 M 0 24 Q 6 30 10 26"
            stroke="#0a0a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* eyes */}
          <circle cx="-18" cy="-8" r="5" fill="#fff" />
          <circle cx="18" cy="-8" r="5" fill="#fff" />
          <circle cx="-17" cy="-7" r="3" fill="#0a0a0a" />
          <circle cx="19" cy="-7" r="3" fill="#0a0a0a" />
          <circle cx="-16" cy="-8" r="1" fill="#fff" />
          <circle cx="20" cy="-8" r="1" fill="#fff" />
          {/* cheek blush */}
          <circle cx="-32" cy="16" r="5" fill="oklch(0.72 0.13 25 / 0.55)" />
          <circle cx="32" cy="16" r="5" fill="oklch(0.72 0.13 25 / 0.55)" />
        </g>
        {/* Sparkles */}
        <path d="M 255 68 L 259 76 L 267 80 L 259 84 L 255 92 L 251 84 L 243 80 L 251 76 Z"
          fill="oklch(0.95 0.03 60)" opacity="0.9" />
        <circle cx="62" cy="75" r="3" fill="oklch(0.95 0.03 60)" opacity="0.8" />
      </svg>
    </div>
  );
}

/* FOSTER — a cozy house/tent shape with a dog peeking inside.
   Warmest of the four. Purple tent, cream window, tiny paw on the ground. */
function IllustFoster() {
  return (
    <div className="help-illust-bg help-illust-foster">
      <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Dots color="oklch(1 0 0 / 0.18)" />
        {/* Ground line */}
        <line x1="20" y1="205" x2="300" y2="205" stroke="oklch(1 0 0 / 0.25)" strokeWidth="1.5" strokeDasharray="3 5" />
        {/* House outline (shifted right a bit) */}
        <g transform="translate(160 120)">
          {/* Back wall shadow */}
          <path d="M -70 -10 L 0 -65 L 70 -10 L 70 85 L -70 85 Z"
            fill="oklch(0.28 0.08 305)" />
          {/* Roof */}
          <path d="M -78 -5 L 0 -72 L 78 -5 L 70 0 L 0 -60 L -70 0 Z"
            fill="oklch(0.65 0.15 35)" />
          {/* Chimney */}
          <rect x="30" y="-52" width="14" height="22" fill="oklch(0.4 0.14 35)" />
          {/* Door / archway with dog peeking */}
          <path d="M -22 85 L -22 20 Q -22 -5 0 -5 Q 22 -5 22 20 L 22 85 Z"
            fill="oklch(0.22 0.06 310)" />
          {/* Dog head peeking from door */}
          <g transform="translate(0 28)">
            {/* ears behind head */}
            <path d="M -18 -8 Q -26 0 -22 14 Q -14 6 -12 -4 Z" fill="oklch(0.4 0.1 45)" />
            <path d="M 18 -8 Q 26 0 22 14 Q 14 6 12 -4 Z" fill="oklch(0.4 0.1 45)" />
            {/* head */}
            <ellipse cx="0" cy="0" rx="20" ry="18" fill="oklch(0.78 0.09 60)" />
            {/* muzzle */}
            <ellipse cx="0" cy="7" rx="10" ry="7" fill="oklch(0.9 0.05 60)" />
            {/* nose */}
            <ellipse cx="0" cy="3" rx="2.5" ry="2" fill="#0a0a0a" />
            {/* smile */}
            <path d="M 0 6 L 0 10 M 0 10 Q -3 13 -5 11 M 0 10 Q 3 13 5 11"
              stroke="#0a0a0a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            {/* eyes */}
            <circle cx="-7" cy="-3" r="2" fill="#0a0a0a" />
            <circle cx="7" cy="-3" r="2" fill="#0a0a0a" />
            <circle cx="-6" cy="-4" r="0.7" fill="#fff" />
            <circle cx="8" cy="-4" r="0.7" fill="#fff" />
          </g>
          {/* Heart window */}
          <path d="M -50 20 C -58 15, -55 5, -50 8 C -45 5, -42 15, -50 20 Z"
            fill="oklch(0.95 0.03 60)" />
        </g>
        {/* Tiny paw prints leading toward door */}
        <g fill="oklch(1 0 0 / 0.35)">
          <g transform="translate(50 195)">
            <circle cx="0" cy="0" r="3" />
            <circle cx="-4" cy="-5" r="1.8" />
            <circle cx="4" cy="-5" r="1.8" />
            <circle cx="-6" cy="-1" r="1.5" />
            <circle cx="6" cy="-1" r="1.5" />
          </g>
          <g transform="translate(85 180)">
            <circle cx="0" cy="0" r="3" />
            <circle cx="-4" cy="-5" r="1.8" />
            <circle cx="4" cy="-5" r="1.8" />
            <circle cx="-6" cy="-1" r="1.5" />
            <circle cx="6" cy="-1" r="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* SPONSOR — a dog tag/medal with a ribbon. Symbolic of ongoing
   commitment. Lavender base, cream + purple tag. */
function IllustSponsor() {
  return (
    <div className="help-illust-bg help-illust-sponsor">
      <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Dots color="oklch(0.22 0.06 310 / 0.18)" />
        {/* Ribbon */}
        <g transform="translate(160 120)">
          <path d="M -55 -80 L -20 -20 L 0 -30 L 20 -20 L 55 -80 L 35 -80 L 0 -50 L -35 -80 Z"
            fill="oklch(0.55 0.18 305)" />
          {/* Ribbon shadow fold */}
          <path d="M -55 -80 L -20 -20 L -10 -25 L -45 -80 Z"
            fill="oklch(0.4 0.14 305)" opacity="0.6" />
          <path d="M 55 -80 L 20 -20 L 10 -25 L 45 -80 Z"
            fill="oklch(0.4 0.14 305)" opacity="0.6" />
        </g>
        {/* Tag body (big circle with border) */}
        <g transform="translate(160 120)">
          <circle r="58" fill="oklch(0.95 0.03 60)" />
          <circle r="58" fill="none" stroke="oklch(0.22 0.06 310)" strokeWidth="4" />
          <circle r="48" fill="none" stroke="oklch(0.22 0.06 310)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.45" />
          {/* Paw print inside tag */}
          <g fill="oklch(0.55 0.18 305)">
            <ellipse cx="0" cy="10" rx="14" ry="11" />
            <ellipse cx="-14" cy="-6" rx="6" ry="9" transform="rotate(-20 -14 -6)" />
            <ellipse cx="14" cy="-6" rx="6" ry="9" transform="rotate(20 14 -6)" />
            <ellipse cx="-22" cy="6" rx="5" ry="7" transform="rotate(-30 -22 6)" />
            <ellipse cx="22" cy="6" rx="5" ry="7" transform="rotate(30 22 6)" />
          </g>
          {/* Clasp ring at top */}
          <circle cx="0" cy="-58" r="8" fill="none" stroke="oklch(0.22 0.06 310)" strokeWidth="4" />
        </g>
        {/* Small stars */}
        <g fill="oklch(0.55 0.18 305 / 0.55)">
          <circle cx="60" cy="60" r="4" />
          <circle cx="255" cy="65" r="5" />
          <circle cx="250" cy="175" r="3" />
        </g>
      </svg>
    </div>
  );
}

/* DONATE — coins dropping into a jar, with a heart on the jar.
   Deep plum background, gold coins (accent). */
function IllustDonate() {
  return (
    <div className="help-illust-bg help-illust-donate">
      <svg viewBox="0 0 320 240" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <Dots color="oklch(1 0 0 / 0.25)" />
        {/* Falling coins */}
        <g>
          <ellipse cx="80" cy="40" rx="13" ry="5" fill="oklch(0.8 0.15 85)" />
          <ellipse cx="80" cy="38" rx="13" ry="10" fill="oklch(0.85 0.17 85)" />
          <text x="80" y="42" textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fontWeight="700" fill="oklch(0.4 0.12 60)">$</text>

          <ellipse cx="130" cy="68" rx="11" ry="4" fill="oklch(0.8 0.15 85)" />
          <ellipse cx="130" cy="66" rx="11" ry="8" fill="oklch(0.85 0.17 85)" />

          <ellipse cx="110" cy="100" rx="10" ry="4" fill="oklch(0.8 0.15 85)" />
          <ellipse cx="110" cy="98" rx="10" ry="7" fill="oklch(0.85 0.17 85)" />
          <text x="110" y="101" textAnchor="middle" fontFamily="var(--font-display)" fontSize="9" fontWeight="700" fill="oklch(0.4 0.12 60)">$</text>
        </g>

        {/* Jar */}
        <g transform="translate(195 115)">
          {/* lid */}
          <rect x="-45" y="-5" width="90" height="14" rx="3" fill="oklch(0.55 0.18 305)" />
          <rect x="-42" y="-10" width="84" height="8" rx="2" fill="oklch(0.7 0.12 305)" />
          {/* jar body */}
          <path d="M -50 10 Q -50 15 -45 18 L -45 95 Q -45 105 -35 105 L 35 105 Q 45 105 45 95 L 45 18 Q 50 15 50 10 L 50 8 L -50 8 Z"
            fill="oklch(0.95 0.03 60 / 0.28)" stroke="oklch(0.95 0.03 60)" strokeWidth="2.5" />
          {/* heart on jar */}
          <path d="M 0 72 C -22 56, -22 38, -10 38 C -4 38, 0 44, 0 48 C 0 44, 4 38, 10 38 C 22 38, 22 56, 0 72 Z"
            fill="oklch(0.65 0.15 35)" />
          {/* coins inside */}
          <ellipse cx="-18" cy="92" rx="10" ry="5" fill="oklch(0.8 0.15 85)" />
          <ellipse cx="5" cy="90" rx="11" ry="5" fill="oklch(0.8 0.15 85)" />
          <ellipse cx="24" cy="93" rx="9" ry="4" fill="oklch(0.8 0.15 85)" />
        </g>

        {/* Sparkles */}
        <g fill="oklch(0.85 0.17 85 / 0.9)">
          <path d="M 40 155 L 43 162 L 50 165 L 43 168 L 40 175 L 37 168 L 30 165 L 37 162 Z" />
          <path d="M 280 100 L 282 105 L 287 107 L 282 109 L 280 114 L 278 109 L 273 107 L 278 105 Z" />
        </g>
      </svg>
    </div>
  );
}

Object.assign(window, { HelpIllustration });
