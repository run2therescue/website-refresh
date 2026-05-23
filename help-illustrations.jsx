/* Artwork + icons for the "How You Can Help" section.
   - HelpIllustration: four hand-picked PNG illustrations that fill the white
     panel edge to edge (the PNGs have white backgrounds, so the panel reads
     as one clean surface — no square-in-square).
   - HelpIcon: small line icons shown in the colored label chip. */

function HelpIllustration({ kind }) {
  const map = {
    adopt:   "assets/help-adopt.png",
    foster:  "assets/help-foster.png",
    sponsor: "assets/help-sponsor.png",
    donate:  "assets/help-donate.png",
  };
  const src = map[kind];
  if (!src) return null;
  return (
    <div className="help-illust-bg">
      <img className="help-illust-img" src={src} alt="" aria-hidden="true" />
    </div>
  );
}

function HelpIcon({ kind }) {
  const s = {
    viewBox: "0 0 24 24", fill: "none", stroke: "#fff",
    strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round",
    "aria-hidden": "true",
  };
  switch (kind) {
    case "adopt": /* heart — bringing a survivor home */
      return (
        <svg {...s}>
          <path d="M12 20s-7-4.35-9.5-9C1 8 3 4 6.5 4 9.3 4 12 7 12 7s2.7-3 5.5-3C21 4 23 8 21.5 11 19 15.65 12 20 12 20Z" />
        </svg>
      );
    case "foster": /* house — a temporary safe home */
      return (
        <svg {...s}>
          <path d="M3 11.3 12 4l9 7.3" />
          <path d="M5.5 9.8V19h13V9.8" />
          <path d="M10 19v-5.2h4V19" />
        </svg>
      );
    case "sponsor": /* star — ongoing commitment */
      return (
        <svg {...s}>
          <path d="M12 3.6l2.55 5.45 6 .8-4.35 4.2 1.05 5.95L12 17.6 6.7 20l1.05-5.95L3.4 9.85l6-.8Z" />
        </svg>
      );
    case "donate": /* coin — a gift that funds the work */
      return (
        <svg {...s}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v10" />
          <path d="M14.7 9.1c-.65-.85-1.7-1.2-2.7-1.2-1.5 0-2.7.85-2.7 2.1 0 3 5.4 1.7 5.4 4.6 0 1.35-1.25 2.2-2.8 2.2-1.15 0-2.3-.45-2.95-1.4" />
        </svg>
      );
    default:
      return null;
  }
}

Object.assign(window, { HelpIllustration, HelpIcon });
