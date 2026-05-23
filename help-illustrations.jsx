/* Illustrations for the "How You Can Help" section.
   Uses four hand-picked PNG illustrations (transparent background) sitting
   inside a soft gradient tile. The gradient + hover-scale come from
   styles.css (.help-illust-bg / .help-illust-{kind}). */

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
    <div className={`help-illust-bg help-illust-${kind}`}>
      <img className="help-illust-img" src={src} alt="" aria-hidden="true" />
    </div>
  );
}

Object.assign(window, { HelpIllustration });
