/* Adopt page: "Take them with you" QR band (sits between the FAQ and the
   bottom CTA in Adopt.html).

   Desktop / tablet: a QR code, so a visitor can keep browsing on their phone
   or show it to someone at an event. On phones the QR is pointless (you can't
   scan your own screen), so it is hidden and the Share button does the work
   (native share sheet, or copy-link where that isn't available).

   Every link is UTM-tagged so GA4 separates these visits
   (Reports > Acquisition > Traffic acquisition > Session source / medium):
     QR on this page         adopt_page / qr
     Share button            adopt_page / share
     Printed business cards  business_card / qr   (separate printed code; not on the site)

   The QR is plain SVG data (no library, no image request). To change the
   link, regenerate ADOPT_QR_PATH for the new URL; the path must be
   ADOPT_QR_MODULES x ADOPT_QR_MODULES modules. */

const ADOPT_QR_URL = "https://run2therescue.org/adopt?utm_source=adopt_page&utm_medium=qr";
const ADOPT_SHARE_URL = "https://run2therescue.org/adopt?utm_source=adopt_page&utm_medium=share";
const ADOPT_QR_MODULES = 37;
const ADOPT_QR_PATH = "M0 0h7v1h-7zM8 0h1v1h-1zM10 0h2v1h-2zM13 0h1v1h-1zM15 0h5v1h-5zM21 0h6v1h-6zM30 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h3v1h-3zM13 1h3v1h-3zM18 1h2v1h-2zM21 1h2v1h-2zM25 1h1v1h-1zM28 1h1v1h-1zM30 1h1v1h-1zM36 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h2v1h-2zM11 2h1v1h-1zM13 2h1v1h-1zM15 2h4v1h-4zM21 2h1v1h-1zM24 2h3v1h-3zM30 2h1v1h-1zM32 2h3v1h-3zM36 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM9 3h6v1h-6zM17 3h5v1h-5zM25 3h4v1h-4zM30 3h1v1h-1zM32 3h3v1h-3zM36 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM9 4h2v1h-2zM13 4h1v1h-1zM15 4h1v1h-1zM17 4h2v1h-2zM22 4h1v1h-1zM26 4h1v1h-1zM30 4h1v1h-1zM32 4h3v1h-3zM36 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h2v1h-2zM16 5h1v1h-1zM20 5h3v1h-3zM26 5h1v1h-1zM28 5h1v1h-1zM30 5h1v1h-1zM36 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h1v1h-1zM24 6h1v1h-1zM26 6h1v1h-1zM28 6h1v1h-1zM30 6h7v1h-7zM11 7h1v1h-1zM13 7h4v1h-4zM18 7h1v1h-1zM20 7h2v1h-2zM23 7h1v1h-1zM26 7h1v1h-1zM28 7h1v1h-1zM0 8h1v1h-1zM2 8h1v1h-1zM6 8h2v1h-2zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h4v1h-4zM21 8h1v1h-1zM23 8h1v1h-1zM27 8h1v1h-1zM31 8h1v1h-1zM34 8h1v1h-1zM36 8h1v1h-1zM0 9h1v1h-1zM2 9h1v1h-1zM5 9h1v1h-1zM8 9h1v1h-1zM10 9h3v1h-3zM14 9h1v1h-1zM16 9h3v1h-3zM21 9h1v1h-1zM23 9h2v1h-2zM28 9h1v1h-1zM30 9h2v1h-2zM33 9h1v1h-1zM35 9h2v1h-2zM1 10h6v1h-6zM8 10h1v1h-1zM10 10h1v1h-1zM12 10h3v1h-3zM16 10h2v1h-2zM19 10h1v1h-1zM23 10h1v1h-1zM25 10h1v1h-1zM27 10h1v1h-1zM29 10h2v1h-2zM32 10h3v1h-3zM36 10h1v1h-1zM2 11h2v1h-2zM7 11h2v1h-2zM10 11h7v1h-7zM18 11h1v1h-1zM22 11h1v1h-1zM26 11h1v1h-1zM28 11h1v1h-1zM30 11h1v1h-1zM33 11h1v1h-1zM0 12h1v1h-1zM3 12h1v1h-1zM6 12h5v1h-5zM13 12h2v1h-2zM16 12h2v1h-2zM19 12h1v1h-1zM23 12h1v1h-1zM28 12h1v1h-1zM30 12h1v1h-1zM33 12h1v1h-1zM36 12h1v1h-1zM0 13h2v1h-2zM3 13h3v1h-3zM7 13h3v1h-3zM15 13h6v1h-6zM23 13h2v1h-2zM26 13h6v1h-6zM33 13h1v1h-1zM36 13h1v1h-1zM2 14h2v1h-2zM6 14h3v1h-3zM10 14h1v1h-1zM12 14h1v1h-1zM15 14h1v1h-1zM19 14h1v1h-1zM21 14h3v1h-3zM25 14h1v1h-1zM27 14h2v1h-2zM30 14h1v1h-1zM33 14h2v1h-2zM36 14h1v1h-1zM0 15h2v1h-2zM3 15h1v1h-1zM5 15h1v1h-1zM7 15h1v1h-1zM9 15h2v1h-2zM12 15h2v1h-2zM15 15h1v1h-1zM17 15h1v1h-1zM19 15h2v1h-2zM22 15h3v1h-3zM26 15h1v1h-1zM29 15h5v1h-5zM35 15h1v1h-1zM2 16h3v1h-3zM6 16h2v1h-2zM9 16h2v1h-2zM15 16h1v1h-1zM17 16h1v1h-1zM20 16h3v1h-3zM28 16h1v1h-1zM30 16h2v1h-2zM35 16h2v1h-2zM1 17h1v1h-1zM4 17h1v1h-1zM7 17h3v1h-3zM12 17h2v1h-2zM17 17h1v1h-1zM20 17h1v1h-1zM22 17h3v1h-3zM27 17h2v1h-2zM30 17h2v1h-2zM33 17h4v1h-4zM1 18h4v1h-4zM6 18h1v1h-1zM8 18h3v1h-3zM12 18h1v1h-1zM14 18h2v1h-2zM20 18h4v1h-4zM26 18h3v1h-3zM30 18h3v1h-3zM36 18h1v1h-1zM2 19h2v1h-2zM5 19h1v1h-1zM9 19h3v1h-3zM13 19h1v1h-1zM18 19h3v1h-3zM22 19h1v1h-1zM24 19h1v1h-1zM26 19h1v1h-1zM28 19h2v1h-2zM33 19h1v1h-1zM0 20h1v1h-1zM2 20h2v1h-2zM5 20h3v1h-3zM10 20h7v1h-7zM24 20h1v1h-1zM27 20h2v1h-2zM30 20h2v1h-2zM35 20h1v1h-1zM0 21h3v1h-3zM4 21h2v1h-2zM12 21h1v1h-1zM15 21h2v1h-2zM18 21h2v1h-2zM21 21h1v1h-1zM23 21h2v1h-2zM27 21h2v1h-2zM30 21h1v1h-1zM36 21h1v1h-1zM0 22h2v1h-2zM3 22h1v1h-1zM5 22h3v1h-3zM10 22h4v1h-4zM15 22h6v1h-6zM23 22h3v1h-3zM27 22h2v1h-2zM30 22h1v1h-1zM33 22h2v1h-2zM36 22h1v1h-1zM1 23h3v1h-3zM7 23h1v1h-1zM14 23h2v1h-2zM18 23h1v1h-1zM20 23h2v1h-2zM23 23h2v1h-2zM28 23h2v1h-2zM31 23h3v1h-3zM35 23h1v1h-1zM2 24h1v1h-1zM5 24h2v1h-2zM8 24h1v1h-1zM11 24h2v1h-2zM15 24h5v1h-5zM21 24h1v1h-1zM27 24h1v1h-1zM29 24h2v1h-2zM5 25h1v1h-1zM9 25h1v1h-1zM12 25h2v1h-2zM16 25h1v1h-1zM18 25h1v1h-1zM23 25h1v1h-1zM27 25h2v1h-2zM30 25h2v1h-2zM36 25h1v1h-1zM0 26h7v1h-7zM8 26h1v1h-1zM10 26h1v1h-1zM12 26h1v1h-1zM14 26h1v1h-1zM16 26h1v1h-1zM18 26h2v1h-2zM21 26h1v1h-1zM23 26h1v1h-1zM26 26h2v1h-2zM33 26h2v1h-2zM36 26h1v1h-1zM7 27h1v1h-1zM9 27h1v1h-1zM14 27h3v1h-3zM18 27h1v1h-1zM24 27h1v1h-1zM26 27h1v1h-1zM28 27h1v1h-1zM30 27h4v1h-4zM35 27h2v1h-2zM0 28h2v1h-2zM6 28h1v1h-1zM8 28h1v1h-1zM14 28h1v1h-1zM19 28h1v1h-1zM24 28h1v1h-1zM27 28h6v1h-6zM35 28h2v1h-2zM8 29h3v1h-3zM13 29h5v1h-5zM19 29h2v1h-2zM23 29h1v1h-1zM25 29h4v1h-4zM32 29h1v1h-1zM35 29h2v1h-2zM0 30h7v1h-7zM8 30h3v1h-3zM12 30h2v1h-2zM15 30h1v1h-1zM19 30h5v1h-5zM25 30h2v1h-2zM28 30h1v1h-1zM30 30h1v1h-1zM32 30h1v1h-1zM35 30h2v1h-2zM0 31h1v1h-1zM6 31h1v1h-1zM9 31h3v1h-3zM13 31h2v1h-2zM16 31h2v1h-2zM22 31h1v1h-1zM24 31h1v1h-1zM26 31h3v1h-3zM32 31h1v1h-1zM35 31h1v1h-1zM0 32h1v1h-1zM2 32h3v1h-3zM6 32h1v1h-1zM9 32h2v1h-2zM12 32h1v1h-1zM15 32h1v1h-1zM17 32h1v1h-1zM19 32h6v1h-6zM27 32h6v1h-6zM36 32h1v1h-1zM0 33h1v1h-1zM2 33h3v1h-3zM6 33h1v1h-1zM11 33h2v1h-2zM14 33h1v1h-1zM17 33h1v1h-1zM20 33h5v1h-5zM26 33h1v1h-1zM28 33h1v1h-1zM32 33h2v1h-2zM0 34h1v1h-1zM2 34h3v1h-3zM6 34h1v1h-1zM8 34h1v1h-1zM12 34h4v1h-4zM20 34h1v1h-1zM23 34h1v1h-1zM25 34h1v1h-1zM27 34h2v1h-2zM31 34h4v1h-4zM36 34h1v1h-1zM0 35h1v1h-1zM6 35h1v1h-1zM9 35h2v1h-2zM18 35h3v1h-3zM22 35h1v1h-1zM24 35h1v1h-1zM26 35h4v1h-4zM32 35h2v1h-2zM0 36h7v1h-7zM8 36h3v1h-3zM12 36h4v1h-4zM23 36h2v1h-2zM28 36h2v1h-2zM31 36h1v1h-1zM34 36h1v1h-1zM36 36h1v1h-1z";

function AdoptShareQR() {
  const [copied, setCopied] = React.useState(false);
  const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  async function share() {
    if (window.track) window.track("share_adopt_page", { method: canShare ? "native" : "copy_link" });
    if (canShare) {
      try {
        await navigator.share({
          title: "Adopt a rescue dog · Run 2 The Rescue",
          text: "Meet dogs rescued from the dog meat trade who are ready for a home.",
          url: ADOPT_SHARE_URL,
        });
      } catch (e) { /* share sheet dismissed */ }
      return;
    }
    try {
      await navigator.clipboard.writeText(ADOPT_SHARE_URL);
      setCopied(true);
    } catch (e) { /* clipboard blocked: nothing else to do quietly */ }
  }

  const q = 4; // quiet zone, in modules (QR spec minimum)
  const box = ADOPT_QR_MODULES + q * 2;

  return (
    <section className="adopt-qr-section" aria-labelledby="adopt-qr-title">
      <style>{`
        .adopt-qr-section { background: var(--lav-50); padding: 8px 0 0; }
        .adopt-qr-card { max-width: 820px; margin: 0 auto; background: #fff; border: 1px solid var(--lav-200);
          border-radius: 22px; padding: 28px 32px; display: grid; grid-template-columns: 172px minmax(0, 1fr);
          gap: 32px; align-items: center; }
        .adopt-qr-code { width: 172px; height: 172px; border-radius: 14px; overflow: hidden;
          box-shadow: 0 0 0 1px var(--lav-200), 0 10px 28px oklch(0.3 0.06 310 / 0.10); background: #fff; }
        .adopt-qr-code svg { display: block; width: 100%; height: 100%; }
        .adopt-qr-hint { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--ink-3); text-align: center; margin-top: 10px; }
        .adopt-qr-mob { display: none; }
        @media (max-width: 640px) {
          .adopt-qr-card { grid-template-columns: 1fr; text-align: center; padding: 26px 22px; gap: 0; }
          .adopt-qr-visual, .adopt-qr-desk { display: none; }
          .adopt-qr-mob { display: inline; }
        }
      `}</style>
      <div className="wrap">
        <div className="adopt-qr-card">
          <div className="adopt-qr-visual">
            <div className="adopt-qr-code" role="img" aria-label="QR code that opens run2therescue.org/adopt">
              <svg viewBox={`${-q} ${-q} ${box} ${box}`} shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
                <rect x={-q} y={-q} width={box} height={box} fill="#fff" />
                <path d={ADOPT_QR_PATH} fill="#1a1025" />
              </svg>
            </div>
            <div className="adopt-qr-hint" aria-hidden="true">Point your camera here</div>
          </div>
          <div>
            <div className="eyebrow-dark" style={{ marginBottom: 10 }}><PawGlyphS />Take them with you</div>
            <h2 id="adopt-qr-title" className="display" style={{ fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 10px", color: "var(--ink)", lineHeight: 1.08 }}>
              <span className="adopt-qr-desk">Keep browsing on your phone</span>
              <span className="adopt-qr-mob">Share these dogs</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 20px", maxWidth: 480 }}>
              <span className="adopt-qr-desk">Scan the code to bring these dogs with you, or share the page with someone who has been thinking about adopting.</span>
              <span className="adopt-qr-mob">Know someone who has been thinking about adopting? Send them this page.</span>
            </p>
            <button type="button" className="btn btn-outline-soft" onClick={share} aria-live="polite">
              {copied ? "Link copied" : canShare ? "Share this page" : "Copy link"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AdoptShareQR });
