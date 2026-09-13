/* Homepage campaign block — "Help Save Mickey".
 *
 * Sits between the press strip and Mission on the homepage (see index.html),
 * high enough that a first-time visitor meets Mickey without scrolling far,
 * and dark so it separates the two light sections around it.
 *
 * The photo is Mickey's from the Zeffy campaign, served through Vercel's image
 * optimizer (res.cloudinary.com is allow-listed in vercel.json), so it is
 * resized, cached on our own domain, and needs no change to the site's CSP.
 *
 * Clicks are measured by analytics.js: every zeffy.com link fires
 * donate_outbound, and utm_content lands in GA4 as `dog`, which is what
 * separates homepage clicks from the banner and the donate page.
 *
 * WHEN MICKEY IS HOME: delete <MickeyStory /> from index.html. */

const MICKEY_ZEFFY = "https://www.zeffy.com/en-US/donation-form/helpsave-mickey";
const MICKEY_PHOTO_SRC = "https://res.cloudinary.com/hxn9dbuhd/image/upload/f_jpg,c_limit,w_1000,q_auto/v1789314535/organizations/2/1/0/2/210276f5-bea9-43f5-88d4-7b17e935a6ca/d0087642-e5ec-4732-90d2-136873dfec23.png";

/* Vercel image optimizer: same-origin URL, cached for a day (vercel.json). */
function mickeyPhoto(w) {
  return "/_vercel/image?url=" + encodeURIComponent(MICKEY_PHOTO_SRC) + "&w=" + w + "&q=75";
}
function mickeyLink(placement) {
  return MICKEY_ZEFFY + "?utm_source=r2tr_site&utm_medium=" + placement +
    "&utm_campaign=mickey&utm_content=mickey-" + placement;
}

function MickeyStory() {
  return (
    <section className="mickey-band" aria-labelledby="mickey-title">
      <style>{`
        .mickey-band { background: #1a1025; padding: 56px 0; position: relative; overflow: hidden; }
        .mickey-grid { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 36px; align-items: center;
          max-width: 940px; margin: 0 auto; }
        .mickey-photo { width: 280px; height: 280px; border-radius: 20px; overflow: hidden; background: oklch(0.26 0.05 310);
          box-shadow: 0 18px 44px oklch(0.10 0.03 310 / 0.55); }
        .mickey-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .mickey-goal { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 13px;
          color: var(--on-dark-2); margin: 0 0 22px; }
        .mickey-goal b { color: #fff; font-weight: 600; }
        @media (max-width: 760px) {
          .mickey-band { padding: 44px 0; }
          .mickey-grid { grid-template-columns: 1fr; gap: 22px; justify-items: center; text-align: center; }
          .mickey-photo { width: 100%; max-width: 320px; height: auto; aspect-ratio: 1 / 1; }
          .mickey-goal { justify-content: center; }
        }
      `}</style>
      <div className="wrap">
        <div className="mickey-grid">
          <div className="mickey-photo">
            <img src={mickeyPhoto(640)} alt="Mickey, a 13-year-old golden retriever, looking up at the camera" width="640" height="640" loading="lazy" />
          </div>
          <div>
            <h2 id="mickey-title" className="display" style={{ fontSize: "clamp(28px, 3.6vw, 44px)", margin: "0 0 14px", color: "#fff", lineHeight: 1.1 }}>
              Mickey is 13. He survived the meat trade. <em>Now he needs one more rescue.</em>
            </h2>
            <p style={{ fontSize: 16, color: "var(--on-dark-2)", lineHeight: 1.6, margin: "0 0 18px", maxWidth: 520 }}>
              We have been treating Mickey, a golden retriever, for Leishmaniasis, a devastating disease. Despite everything stacked against him, he is recovering. Every dollar keeps him tested, fed, and cared for in hospital until this sweet boy gets the second chance he deserves.
            </p>
            <p className="mickey-goal">
              <b>$5,000 goal</b>
              <span aria-hidden="true">·</span>
              <span>100% of your gift reaches Mickey. Zeffy charges no fees.</span>
            </p>
            <a href={mickeyLink("homepage")} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Help Save Mickey <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MickeyStory, mickeyPhoto, mickeyLink });
