/* Donate popup + Tweaks panel */

/* Giving methods. Zeffy is the recommended, fee-free path; PayPal and Venmo
   are offered for donors who prefer them. Each opens the provider in a new
   tab — nothing is embedded on the site. */
const GIVE_LINKS = {
  zeffy:  "https://www.zeffy.com/en-US/donation-form/provide-food-and-medical",
  paypal: "https://www.paypal.com/donate/?hosted_button_id=5YFAYGX4FKHW6",
  venmo:  "https://venmo.com/u/Run2TheRescue",
};

function GiveMethod({ href, name, note, badge }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "center", gap: 14, padding: "15px 18px",
      borderRadius: 14, border: "1.5px solid var(--line-light)", background: "#fff",
      textDecoration: "none",
      transition: "border-color .2s ease, background .2s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--purple-400)"; e.currentTarget.style.background = "var(--lav-50)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line-light)"; e.currentTarget.style.background = "#fff"; }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink)" }}>{name}</span>
          {badge && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--purple-700)", background: "var(--purple-soft)", padding: "3px 8px", borderRadius: 999, fontWeight: 600,
            }}>{badge}</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 3, lineHeight: 1.45 }}>{note}</div>
      </div>
      <span aria-hidden="true" style={{ color: "var(--purple-500)", fontSize: 18, flexShrink: 0 }}>→</span>
    </a>
  );
}

function DonateModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div style={{ padding: "24px 26px 6px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img src="assets/r2r-logo.png" alt="" style={{ width: 30, height: 30 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>Make a donation</span>
            </div>
            <h3 className="display" style={{ fontSize: 26, margin: 0, color: "var(--ink)" }}>Choose how to give</h3>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: 24, color: "var(--ink-3)", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "14px 26px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
          <GiveMethod href={GIVE_LINKS.zeffy} name="Card or bank transfer" badge="100% to the dogs"
            note="Secure checkout — Zeffy covers the fees, so every cent reaches a survivor." />
          <GiveMethod href={GIVE_LINKS.paypal} name="PayPal"
            note="Give with your PayPal balance or a linked card." />
          <GiveMethod href={GIVE_LINKS.venmo} name="Venmo"
            note="Send your gift straight from the Venmo app." />
          <p style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", margin: "6px 0 0", lineHeight: 1.5 }}>
            Run 2 The Rescue is a 501(c)(3) nonprofit. Your gift is tax-deductible.
          </p>
        </div>
      </div>
    </div>
  );
}

function Tweaks({ state, onChange }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setOpen(true);
      if (e.data.type === "__deactivate_edit_mode") setOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const set = (k, v) => {
    onChange({ ...state, [k]: v });
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  return (
    <div className={"tweaks" + (open ? " open" : "")}>
      <header>
        <span>Tweaks</span>
        <span style={{ color: "var(--purple-500)" }}>●</span>
      </header>
      <div className="row">
        <label>Accent</label>
        <div className="swatches">
          {[
            ["plum", "oklch(0.63 0.16 305)"],
            ["lilac", "oklch(0.68 0.13 290)"],
            ["rose", "oklch(0.62 0.14 350)"],
            ["teal", "oklch(0.60 0.10 195)"],
          ].map(([k, c]) => (
            <button key={k} className="sw" aria-pressed={state.palette === k}
              style={{ background: c }} onClick={() => set("palette", k)} title={k} />
          ))}
        </div>
      </div>
      <div className="row">
        <label>Hero layout</label>
        <div className="segmented">
          {["centered", "split", "editorial"].map(k => (
            <button key={k} aria-pressed={state.hero === k} onClick={() => set("hero", k)}>{k}</button>
          ))}
        </div>
      </div>
      <div className="row">
        <label>Paw decorations</label>
        <div className="segmented">
          {["on", "off"].map(k => (
            <button key={k} aria-pressed={state.paws === k} onClick={() => set("paws", k)}>{k}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DonateModal, Tweaks });
