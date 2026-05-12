/* Floating feedback widget — prototype review tool.
   Vanilla JS so it works on every page regardless of React state.
   Collects feedback in a textarea and copies to clipboard. */
(function () {
  if (window.__r2rFeedbackLoaded) return;
  window.__r2rFeedbackLoaded = true;

  const PAGE_LABEL = (document.title || location.pathname).replace(/\s+—.*$/, "").trim();

  // Inject styles
  const style = document.createElement("style");
  style.textContent = `
    .r2r-fb-btn {
      position: fixed; right: 20px; bottom: 20px; z-index: 9998;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 18px; border: 0; border-radius: 999px; cursor: pointer;
      font: 600 13px/1 "Inter Tight", system-ui, -apple-system, sans-serif;
      color: #fff; background: linear-gradient(135deg, #a855f7, #7c3aed);
      box-shadow: 0 10px 30px rgba(124, 58, 237, .35), 0 2px 6px rgba(0,0,0,.2);
      transition: transform .2s ease, box-shadow .2s ease;
      letter-spacing: .01em;
    }
    .r2r-fb-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(124, 58, 237, .45), 0 2px 8px rgba(0,0,0,.25); }
    .r2r-fb-btn svg { width: 16px; height: 16px; }
    .r2r-fb-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(10, 5, 25, .6); backdrop-filter: blur(6px);
      display: none; align-items: center; justify-content: center;
      padding: 24px;
    }
    .r2r-fb-overlay.open { display: flex; }
    .r2r-fb-modal {
      width: 100%; max-width: 520px;
      background: #fff; color: #1a1025;
      border-radius: 18px; overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,.35);
      font-family: "Inter Tight", system-ui, -apple-system, sans-serif;
      animation: r2rFbIn .2s ease-out;
    }
    @keyframes r2rFbIn { from { transform: translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }
    .r2r-fb-modal header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 22px; border-bottom: 1px solid #eee;
    }
    .r2r-fb-modal header h3 {
      margin: 0; font: 600 16px/1.2 "Bricolage Grotesque", "Inter Tight", sans-serif;
    }
    .r2r-fb-modal header small {
      display: block; margin-top: 4px;
      font: 500 11px/1.2 "JetBrains Mono", ui-monospace, monospace;
      color: #7a6b8a; letter-spacing: .08em; text-transform: uppercase;
    }
    .r2r-fb-close {
      width: 32px; height: 32px; border: 0; background: transparent;
      border-radius: 8px; cursor: pointer; color: #6b5b7a; font-size: 18px;
    }
    .r2r-fb-close:hover { background: #f3eaff; color: #7c3aed; }
    .r2r-fb-body { padding: 18px 22px; }
    .r2r-fb-body label {
      display: block; font: 600 12px/1 "JetBrains Mono", monospace;
      letter-spacing: .1em; text-transform: uppercase; color: #6b5b7a;
      margin-bottom: 8px;
    }
    .r2r-fb-body textarea {
      width: 100%; min-height: 160px; resize: vertical;
      padding: 12px 14px; border: 1.5px solid #e5d6fa; border-radius: 10px;
      font: 400 14px/1.5 "Inter Tight", sans-serif; color: #1a1025;
      background: #faf7ff; outline: none;
      transition: border-color .15s ease, background .15s ease;
      box-sizing: border-box;
    }
    .r2r-fb-body textarea:focus { border-color: #a855f7; background: #fff; }
    .r2r-fb-hint {
      font: 400 12px/1.4 "Inter Tight", sans-serif; color: #6b5b7a; margin: 10px 0 0;
    }
    .r2r-fb-actions {
      padding: 14px 22px 20px; display: flex; gap: 10px; justify-content: flex-end;
      border-top: 1px solid #f3eaff;
    }
    .r2r-fb-actions button {
      padding: 10px 16px; border-radius: 999px; border: 0; cursor: pointer;
      font: 600 13px/1 "Inter Tight", sans-serif;
    }
    .r2r-fb-btn-secondary { background: #f3eaff; color: #5b2db8; }
    .r2r-fb-btn-secondary:hover { background: #e5d6fa; }
    .r2r-fb-btn-primary { background: linear-gradient(135deg, #a855f7, #7c3aed); color: #fff; }
    .r2r-fb-btn-primary:hover { filter: brightness(1.05); }
    .r2r-fb-btn-primary:disabled { opacity: .6; cursor: not-allowed; }
    .r2r-fb-toast {
      position: fixed; left: 50%; bottom: 90px; transform: translateX(-50%);
      z-index: 10000;
      background: #1a1025; color: #fff;
      padding: 10px 16px; border-radius: 999px;
      font: 500 13px/1 "Inter Tight", sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,.3);
      opacity: 0; pointer-events: none; transition: opacity .2s ease, transform .2s ease;
    }
    .r2r-fb-toast.show { opacity: 1; transform: translateX(-50%) translateY(-4px); }
    @media (max-width: 480px) {
      .r2r-fb-btn { right: 14px; bottom: 14px; padding: 11px 16px; font-size: 12px; }
    }
  `;
  document.head.appendChild(style);

  // Inject markup
  const btn = document.createElement("button");
  btn.className = "r2r-fb-btn";
  btn.setAttribute("aria-label", "Send feedback on this page");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
    Send feedback
  `;
  document.body.appendChild(btn);

  const overlay = document.createElement("div");
  overlay.className = "r2r-fb-overlay";
  overlay.innerHTML = `
    <div class="r2r-fb-modal" role="dialog" aria-modal="true" aria-labelledby="r2r-fb-title">
      <header>
        <div>
          <h3 id="r2r-fb-title">Share your feedback</h3>
          <small>Page: ${PAGE_LABEL}</small>
        </div>
        <button class="r2r-fb-close" aria-label="Close">×</button>
      </header>
      <div class="r2r-fb-body">
        <label for="r2r-fb-text">Your thoughts</label>
        <textarea id="r2r-fb-text" placeholder="What's working? What's not? Anything to change or add?"></textarea>
        <p class="r2r-fb-hint">Click <strong>Copy</strong> to copy your feedback with the page context, then paste it into an email or Slack message.</p>
      </div>
      <div class="r2r-fb-actions">
        <button class="r2r-fb-btn-secondary" data-close>Cancel</button>
        <button class="r2r-fb-btn-primary" data-copy>Copy to clipboard</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const toast = document.createElement("div");
  toast.className = "r2r-fb-toast";
  toast.textContent = "Copied!";
  document.body.appendChild(toast);

  // Wire events
  const textarea = overlay.querySelector("#r2r-fb-text");
  const open = () => {
    overlay.classList.add("open");
    setTimeout(() => textarea.focus(), 60);
  };
  const close = () => overlay.classList.remove("open");

  btn.addEventListener("click", open);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
  overlay.querySelector(".r2r-fb-close").addEventListener("click", close);
  overlay.querySelector("[data-close]").addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  overlay.querySelector("[data-copy]").addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (!text) { textarea.focus(); return; }
    const payload = `Feedback on: ${PAGE_LABEL}\nURL: ${location.href}\nDate: ${new Date().toLocaleString()}\n\n${text}`;
    try {
      await navigator.clipboard.writeText(payload);
    } catch (err) {
      // Fallback for non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = payload; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta);
    }
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
    setTimeout(close, 400);
  });
})();
