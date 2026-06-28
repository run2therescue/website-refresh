/* Google Analytics 4 — Run 2 The Rescue
 * ---------------------------------------------------------------------------
 * ONE thing to do to go live: paste your GA4 Measurement ID below (it looks
 * like "G-XXXXXXXXXX" — find it in GA4 → Admin → Data Streams → Web).
 * Until a real ID is set, this file is a no-op (nothing is sent, no errors).
 *
 * What this gives you, on every page, automatically:
 *   • page_view + GA4 Enhanced Measurement (scrolls, outbound links, etc.)
 *   • donate_outbound — clicks heading to Zeffy / PayPal / Venmo (with the
 *     destination + amount/dog when present in the URL). This is your closest
 *     proxy for "someone went to give."
 *   • form_submit — adoption, foster, contact, and newsletter forms
 *     (wired in submitForm) with the form name.
 *   • find_match — when someone completes the "Find your match" quiz on Adopt.
 *   • cta_click — any element tagged with data-track="..." (optional, future).
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

  // Auto-track outbound donation clicks + any data-track CTA. Capture phase so
  // it still fires for links that open a new tab.
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest ? e.target.closest("a, button") : null;
    if (!el) return;
    var href = el.getAttribute("href") || "";
    var label = (el.getAttribute("data-track") || el.textContent || "").trim().slice(0, 80);

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
    }

    var cta = el.getAttribute("data-track");
    if (cta) window.track("cta_click", { cta: cta, label: label });
  }, true);
})();
