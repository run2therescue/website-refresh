/* Site-wide campaign bar — currently "Help Save Mickey".
 * ---------------------------------------------------------------------------
 * WHY IT LOADS FROM analytics.js: analytics.js is the one script every page on
 * the site already includes, so loading this file from there puts the bar on
 * every page without editing ten HTML files (and taking it down is one line).
 *
 * TO CHANGE THE WORDS OR THE LINK: edit CAMPAIGN below. Bump `id` whenever you
 * start a NEW campaign — the id is what remembers a dismissal, so a new id
 * shows the bar again to everyone who closed the previous one.
 *
 * TO TAKE THE CAMPAIGN DOWN: delete the loader block at the bottom of
 * analytics.js (search for "campaign-mickey"). Nothing else references this file.
 *
 * Plain JavaScript on purpose: no React, no Babel, so the bar paints with the
 * first HTML instead of waiting for the page's app to boot.
 *
 * Clicks are already measured: analytics.js watches every link to zeffy.com and
 * sends a `donate_outbound` event, and the utm_content below arrives in GA4 as
 * the `dog` parameter, so banner clicks are separable from the other placements.
 */
(function () {
  var CAMPAIGN = {
    id: "mickey",
    text: "Mickey survived the dog meat trade at 13. Now he needs one more rescue.",
    cta: "Help Save Mickey",
    url: "https://www.zeffy.com/en-US/donation-form/helpsave-mickey?utm_source=r2tr_site&utm_medium=banner&utm_campaign=mickey&utm_content=mickey-banner",
    hideDays: 7,
  };

  var KEY = "r2r_campaign_hidden_" + CAMPAIGN.id;

  function hiddenAlready() {
    try {
      var at = Number(window.localStorage.getItem(KEY) || 0);
      return at > 0 && Date.now() - at < CAMPAIGN.hideDays * 24 * 60 * 60 * 1000;
    } catch (e) { return false; }
  }
  function remember() {
    try { window.localStorage.setItem(KEY, String(Date.now())); } catch (e) { /* private mode */ }
  }

  function build() {
    if (hiddenAlready() || document.getElementById("r2r-campaign")) return;

    var css = document.createElement("style");
    css.textContent =
      "#r2r-campaign{background:#241634;border-bottom:1px solid oklch(0.5 0.15 305 / 0.45);" +
      "color:#fff;font-family:var(--font-ui,'Inter Tight',system-ui,sans-serif);position:relative;z-index:70}" +
      "#r2r-campaign .r2r-cmp-in{max-width:1200px;margin:0 auto;padding:10px 52px 10px 20px;display:flex;" +
      "align-items:center;justify-content:center;gap:14px;flex-wrap:wrap}" +
      "#r2r-campaign .r2r-cmp-txt{font-size:14px;line-height:1.4;margin:0}" +
      "#r2r-campaign .r2r-cmp-txt b{font-weight:600}" +
      "#r2r-campaign .r2r-cmp-cta{display:inline-flex;align-items:center;gap:7px;background:oklch(0.63 0.16 305);" +
      "color:#fff;text-decoration:none;font-size:13.5px;font-weight:600;padding:8px 16px;border-radius:999px;" +
      "white-space:nowrap;transition:background .2s ease}" +
      "#r2r-campaign .r2r-cmp-cta:hover{background:oklch(0.54 0.17 305)}" +
      "#r2r-campaign .r2r-cmp-x{position:absolute;top:50%;right:12px;transform:translateY(-50%);width:30px;height:30px;" +
      "border:0;border-radius:50%;background:transparent;color:oklch(0.80 0.03 300);font-size:17px;line-height:1;" +
      "cursor:pointer;transition:background .2s ease,color .2s ease}" +
      "#r2r-campaign .r2r-cmp-x:hover{background:oklch(0.30 0.05 310);color:#fff}" +
      "@media (max-width:640px){#r2r-campaign .r2r-cmp-in{padding:11px 44px 11px 16px;gap:10px;flex-direction:column;" +
      "align-items:flex-start;text-align:left}#r2r-campaign .r2r-cmp-txt{font-size:13.5px}}" +
      "@media (prefers-reduced-motion:reduce){#r2r-campaign .r2r-cmp-cta,#r2r-campaign .r2r-cmp-x{transition:none}}";
    document.head.appendChild(css);

    var bar = document.createElement("aside");
    bar.id = "r2r-campaign";
    bar.setAttribute("aria-label", "Urgent appeal");

    var inner = document.createElement("div");
    inner.className = "r2r-cmp-in";

    var p = document.createElement("p");
    p.className = "r2r-cmp-txt";
    p.innerHTML = "<b>" + CAMPAIGN.text + "</b>";

    var a = document.createElement("a");
    a.className = "r2r-cmp-cta";
    a.href = CAMPAIGN.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = CAMPAIGN.cta;
    var arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    a.appendChild(arrow);

    var x = document.createElement("button");
    x.className = "r2r-cmp-x";
    x.type = "button";
    x.setAttribute("aria-label", "Hide this message");
    x.innerHTML = "&times;";
    x.addEventListener("click", function () {
      remember();
      bar.remove();
      if (window.track) window.track("campaign_dismiss", { campaign: CAMPAIGN.id });
    });

    inner.appendChild(p);
    inner.appendChild(a);
    bar.appendChild(inner);
    bar.appendChild(x);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
