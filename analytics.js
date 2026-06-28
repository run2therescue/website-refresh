/* Google Analytics 4 — Run 2 The Rescue
 * ---------------------------------------------------------------------------
 * Measurement ID lives in GA_MEASUREMENT_ID below (GA4 → Admin → Data Streams).
 * Until a real ID is set, this file is a no-op (nothing is sent, no errors).
 *
 * WHAT WE TRACK (the whole point: get more people to ADOPT and DONATE, and
 * learn where they come from so we can do more of what works).
 *
 * Acquisition — handled automatically by GA4 (no code needed):
 *   • page_view on every page, with the source/medium/campaign of the visit.
 *   • Organic Social / Paid Social / Referral / Organic Search channels, so you
 *     can see which platform (Instagram, TikTok, Facebook, YouTube, Google…)
 *     is sending people to the site. NOTE: tag your social links with UTMs so
 *     in-app browsers (which hide the referrer) still attribute correctly —
 *     see ANALYTICS_TRACKING_PLAN.md for ready-to-paste tagged links.
 *   • Enhanced Measurement: scroll depth, outbound clicks, site search,
 *     video engagement, file downloads.
 *
 * Behavior + conversions — the custom events wired below:
 *   • donate_outbound   — clicks heading to Zeffy / PayPal / Venmo / GiveButter
 *                         (captures destination + amount + dog when present).
 *                         Your closest proxy for "someone went to give."
 *   • form_submit       — adoption, foster, contact, newsletter forms (wired in
 *                         submitForm) with the form name.
 *   • view_dog          — opening a dog's profile on Adopt (top adoption signal).
 *   • adopt_application_start — clicking "Apply to adopt {dog}".
 *   • find_match        — completing the "Find your match" quiz.
 *   • social_click      — clicking out to our own social channels (which
 *                         platform), so we can see what grows the audience.
 *   • contact_click     — email / phone clicks.
 *   • cta_click         — any element tagged data-track="..." (optional, future).
 * --------------------------------------------------------------------------- */
(function () {
  var GA_MEASUREMENT_ID = "G-4XYY862JTW"; // GA4 property: Run 2 The Rescue (webmaster@run2therescue.org)

  // Stay a no-op until a real ID is in place.
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) {
    window.track = function () {}; // safe stub so callers never error
    return;
  }

  // Load the gtag library.
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  // Tiny helper the rest of the site calls: window.track("event_name", {...}).
  window.track = function (name, params) {
    try { gtag("event", name, params || {}); } catch (e) { /* never break the page */ }
  };

  // Our own social channels, matched by destination host.
  var SOCIAL = [
    [/facebook\.com/i, "facebook"],
    [/instagram\.com/i, "instagram"],
    [/tiktok\.com/i, "tiktok"],
    [/youtube\.com|youtu\.be/i, "youtube"],
    [/(?:twitter\.com|\/\/x\.com)/i, "twitter"],
    [/linkedin\.com/i, "linkedin"],
    [/threads\.net/i, "threads"],
  ];

  // One delegated listener for the whole site. Capture phase so it still fires
  // for links that open in a new tab. Never throws — analytics must not break UI.
  document.addEventListener("click", function (e) {
    try {
      var el = e.target && e.target.closest ? e.target.closest("a, button") : null;
      if (!el) return;
      var href = el.getAttribute("href") || "";
      var label = (el.getAttribute("data-track") || el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 80);

      // 1) Outbound donation clicks (the money funnel).
      if (/zeffy\.com|paypal\.com|venmo\.com|givebutter\.com/i.test(href)) {
        var amount = null, dog = null;
        try {
          var u = new URL(href, location.href);
          amount = u.searchParams.get("amount");
          dog = u.searchParams.get("utm_content");
        } catch (_) {}
        window.track("donate_outbound", {
          destination: href.split("?")[0],
          amount: amount || undefined,
          dog: dog || undefined,
          label: label,
        });
        return;
      }

      // 2) Clicks out to our own social channels (audience growth signal).
      for (var i = 0; i < SOCIAL.length; i++) {
        if (SOCIAL[i][0].test(href)) {
          window.track("social_click", { platform: SOCIAL[i][1], label: label });
          return;
        }
      }

      // 3) Contact intent.
      if (/^mailto:/i.test(href)) { window.track("contact_click", { method: "email", label: label }); return; }
      if (/^tel:/i.test(href))    { window.track("contact_click", { method: "phone", label: label }); return; }

      // 4) Any element explicitly tagged for tracking.
      var cta = el.getAttribute("data-track");
      if (cta) window.track("cta_click", { cta: cta, label: label });
    } catch (_) { /* swallow — never break the page */ }
  }, true);
})();
