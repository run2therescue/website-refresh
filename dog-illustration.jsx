/* Custom SVG dog illustration — procedurally parameterized per dog.
   Side-view friendly cartoon. Each dog looks distinct via palette,
   ear, tail, snout + accent.
   
   Palettes are keyed off a seed (dog.id) and chosen from a small curated set
   so everything stays on-brand (plum/lavender accents, warm dog tones). */

const COAT_PALETTES = {
  cream:   { body: "#f2dcc2", belly: "#fff1de", accent: "#caa57d", snout: "#3a2419" },
  tan:     { body: "#d6a472", belly: "#f0c9a2", accent: "#8f5f35", snout: "#2d1a11" },
  black:   { body: "#3a3036", belly: "#5a4a52", accent: "#1e181c", snout: "#0a0708" },
  choco:   { body: "#7a4a33", belly: "#a06846", accent: "#4a2812", snout: "#1f0e05" },
  gray:    { body: "#9ea3ad", belly: "#c2c6cf", accent: "#6d7380", snout: "#2b2e33" },
  golden:  { body: "#e6b77a", belly: "#f6d6a8", accent: "#b27e3e", snout: "#3a2414" },
  red:     { body: "#c27a44", belly: "#e09a65", accent: "#8a4a1e", snout: "#2a1408" },
  husky:   { body: "#e8e8ed", belly: "#ffffff", accent: "#3c3e47", snout: "#20222a" },
  brindle: { body: "#7a5236", belly: "#a47548", accent: "#3a2414", snout: "#1a0c06" },
  tricolor:{ body: "#f5e0c2", belly: "#ffffff", accent: "#5a3a22", snout: "#1a0c06" },
};

/* Per-dog preset — deterministic, hand-tuned for personality */
const DOG_LOOKS = {
  bella:   { coat: "cream",  ears: "flop",  tail: "curl", size: "m", collar: "#9b7cc7", spot: null },
  max:     { coat: "golden", ears: "flop",  tail: "plume", size: "l", collar: "#e0a86a", spot: null },
  luna:    { coat: "tan",    ears: "prick", tail: "perky", size: "s", collar: "#c27a8e", spot: null },
  charlie: { coat: "tricolor", ears: "prick-bent", tail: "short", size: "s", collar: "#9b7cc7", spot: "back" },
  willa:   { coat: "black",  ears: "flop",  tail: "wag", size: "l", collar: "#7d9a72", spot: "chest" },
  daisy:   { coat: "cream",  ears: "flop-curly", tail: "curl", size: "s", collar: "#c27a8e", spot: null },
  rocky:   { coat: "husky",  ears: "prick", tail: "curl", size: "l", collar: "#6d88a8", spot: "eye" },
  otis:    { coat: "tricolor", ears: "flop", tail: "wag", size: "m", collar: "#e0a86a", spot: "back" },
  nori:    { coat: "red",    ears: "prick", tail: "curl", size: "s", collar: "#9b7cc7", spot: null },
  bao:     { coat: "choco",  ears: "flop",  tail: "curl", size: "m", collar: "#b85c3a", spot: null },
  juno:    { coat: "brindle", ears: "flop", tail: "wag", size: "m", collar: "#9b7cc7", spot: null },
  mochi:   { coat: "cream",  ears: "prick", tail: "plume", size: "s", collar: "#c27a8e", spot: null },
};

function DogIllustration({ dogId, animate = true, style = {}, bg = "var(--lav-100)" }) {
  const look = DOG_LOOKS[dogId] || DOG_LOOKS.bella;
  const p = COAT_PALETTES[look.coat];
  const sizeScale = { s: 0.85, m: 1.0, l: 1.12 }[look.size] || 1.0;
  const cx = 200; // center-x baseline
  const cy = 175; // center-y baseline (body center)

  return (
    <div style={{
      width: "100%", height: "100%",
      background: bg,
      display: "grid", placeItems: "center",
      overflow: "hidden", position: "relative",
      ...style,
    }}>
      {/* Soft spotlight */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 60%, oklch(1 0 0 / 0.28), transparent 70%)",
        pointerEvents: "none",
      }} />
      <svg viewBox="0 0 400 320" style={{
        width: "82%", height: "82%",
        overflow: "visible",
      }} aria-label={`Illustration of ${dogId}`}>
        <defs>
          <linearGradient id={`body-${dogId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.body} />
            <stop offset="100%" stopColor={p.accent} stopOpacity="0.5" />
          </linearGradient>
          <filter id={`soft-${dogId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="200" cy="280" rx="110" ry="10" fill="oklch(0 0 0 / 0.12)">
          {animate && <animate attributeName="rx" values="108;114;108" dur="3.2s" repeatCount="indefinite" />}
        </ellipse>

        {/* Tail — positioned behind body */}
        <Tail style={look.tail} palette={p} animate={animate} />

        {/* Body group (breathes) */}
        <g style={animate ? { transformOrigin: "200px 180px", animation: "dogBreathe 3.2s ease-in-out infinite" } : undefined}>
          {/* Back legs */}
          <ellipse cx="150" cy="245" rx="18" ry="28" fill={p.accent} />
          <ellipse cx="150" cy="265" rx="16" ry="12" fill={p.body} />
          <ellipse cx="245" cy="245" rx="18" ry="28" fill={p.accent} />
          <ellipse cx="245" cy="265" rx="16" ry="12" fill={p.body} />

          {/* Body — big rounded capsule */}
          <path d={`M 120 180
                    Q 120 135 170 130
                    Q 220 125 260 135
                    Q 300 145 298 200
                    Q 296 245 260 250
                    Q 200 258 150 248
                    Q 118 240 120 180 Z`}
            fill={`url(#body-${dogId})`} stroke={p.accent} strokeWidth="1" />

          {/* Chest highlight / belly */}
          <ellipse cx="200" cy="220" rx="60" ry="22" fill={p.belly} opacity="0.85" />

          {/* Optional spot */}
          {look.spot === "back" && (
            <ellipse cx="170" cy="165" rx="28" ry="18" fill={p.accent} opacity="0.7" transform="rotate(-8 170 165)" />
          )}
          {look.spot === "chest" && (
            <ellipse cx="210" cy="215" rx="24" ry="30" fill={p.belly} opacity="1" />
          )}

          {/* Front legs */}
          <rect x="170" y="235" width="20" height="50" rx="9" fill={p.body} />
          <ellipse cx="180" cy="285" rx="13" ry="7" fill={p.accent} />
          <rect x="215" y="235" width="20" height="50" rx="9" fill={p.body} />
          <ellipse cx="225" cy="285" rx="13" ry="7" fill={p.accent} />

          {/* Collar */}
          <path d={`M 235 145 Q 265 148 290 160`} stroke={look.collar} strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="290" cy="162" r="5" fill={look.collar} />
          <circle cx="290" cy="162" r="2" fill={p.accent} opacity="0.6" />

          {/* Head group (gentle tilt + blink) */}
          <g style={animate ? { transformOrigin: "275px 150px", animation: "dogHead 5s ease-in-out infinite" } : undefined}>
            {/* Head */}
            <ellipse cx="280" cy="155" rx="48" ry="42" fill={`url(#body-${dogId})`} stroke={p.accent} strokeWidth="1" />

            {/* Ears */}
            <Ear style={look.ears} palette={p} animate={animate} />

            {/* Eye patch for husky */}
            {look.spot === "eye" && (
              <ellipse cx="300" cy="150" rx="16" ry="13" fill={p.accent} opacity="0.7" />
            )}

            {/* Snout */}
            <ellipse cx="320" cy="165" rx="22" ry="18" fill={p.belly} opacity="0.9" />
            <ellipse cx="330" cy="162" rx="6" ry="5" fill={p.snout} />
            {/* Mouth line */}
            <path d="M 330 168 Q 325 176 315 172" stroke={p.snout} strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Eye (single side-view eye) */}
            <g>
              <ellipse cx="300" cy="148" rx="5" ry="5.5" fill={p.snout}>
                {animate && (
                  <animate attributeName="ry" values="5.5;5.5;0.5;5.5;5.5"
                    keyTimes="0;0.42;0.46;0.50;1"
                    dur="4.5s" repeatCount="indefinite" />
                )}
              </ellipse>
              <ellipse cx="301" cy="146" rx="1.5" ry="1.5" fill="#fff" />
            </g>

            {/* Eyebrow tuft for tan/golden dogs */}
            {(look.coat === "tan" || look.coat === "golden" || look.coat === "tricolor") && (
              <ellipse cx="298" cy="140" rx="6" ry="3" fill={p.accent} opacity="0.5" transform="rotate(-15 298 140)" />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}

function Ear({ style, palette, animate }) {
  const p = palette;
  const wag = animate ? { transformOrigin: "258px 120px", animation: "dogEar 4s ease-in-out infinite" } : undefined;
  if (style === "prick") {
    return (
      <g style={wag}>
        <path d="M 255 110 L 248 72 L 272 100 Z" fill={p.accent} />
        <path d="M 258 108 L 254 80 L 268 100 Z" fill={p.body} opacity="0.5" />
      </g>
    );
  }
  if (style === "prick-bent") {
    return (
      <g style={wag}>
        <path d="M 258 108 Q 250 80 258 68 Q 278 78 276 104 Z" fill={p.accent} />
        <path d="M 262 105 Q 258 84 262 76 Q 272 82 270 100 Z" fill={p.body} opacity="0.4" />
      </g>
    );
  }
  if (style === "flop-curly") {
    return (
      <g style={wag}>
        <path d="M 252 115 Q 220 118 216 148 Q 216 170 238 175 Q 258 170 265 150 Q 265 125 252 115 Z" fill={p.accent} />
        <circle cx="230" cy="140" r="7" fill={p.body} opacity="0.4" />
        <circle cx="240" cy="158" r="6" fill={p.body} opacity="0.4" />
        <circle cx="252" cy="145" r="6" fill={p.body} opacity="0.4" />
      </g>
    );
  }
  // flop
  return (
    <g style={wag}>
      <path d="M 252 115 Q 225 115 222 150 Q 225 180 252 178 Q 270 175 270 150 Q 268 120 252 115 Z" fill={p.accent} />
      <path d="M 255 120 Q 234 122 230 150 Q 234 172 252 172" fill={p.body} opacity="0.35" />
    </g>
  );
}

function Tail({ style, palette, animate }) {
  const p = palette;
  const wag = animate ? { transformOrigin: "130px 185px", animation: "dogTail 0.9s ease-in-out infinite" } : undefined;
  if (style === "curl") {
    return (
      <g style={wag}>
        <path d="M 130 180 Q 100 180 100 150 Q 100 125 130 130 Q 155 135 148 155" stroke={p.accent} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 130 180 Q 100 180 100 150 Q 100 125 130 130 Q 155 135 148 155" stroke={p.body} strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.6" />
      </g>
    );
  }
  if (style === "plume") {
    return (
      <g style={wag}>
        <path d="M 125 180 Q 95 170 80 150 Q 70 130 75 110" stroke={p.accent} strokeWidth="16" fill="none" strokeLinecap="round" />
        <ellipse cx="80" cy="110" rx="14" ry="20" fill={p.accent} transform="rotate(-20 80 110)" />
        <ellipse cx="78" cy="108" rx="9" ry="14" fill={p.body} opacity="0.4" transform="rotate(-20 78 108)" />
      </g>
    );
  }
  if (style === "perky") {
    return (
      <g style={wag}>
        <path d="M 130 180 Q 115 160 110 140 Q 108 125 118 115" stroke={p.accent} strokeWidth="12" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  if (style === "short") {
    return (
      <g style={wag}>
        <ellipse cx="120" cy="175" rx="14" ry="9" fill={p.accent} transform="rotate(-20 120 175)" />
      </g>
    );
  }
  // wag (horizontal)
  return (
    <g style={wag}>
      <path d="M 130 180 Q 95 170 78 180" stroke={p.accent} strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M 130 180 Q 95 170 78 180" stroke={p.body} strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.5" />
    </g>
  );
}

Object.assign(window, { DogIllustration, DOG_LOOKS, COAT_PALETTES });
