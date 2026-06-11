/* Donate popup + Tweaks panel */

/* Giving methods. Zeffy is the recommended, fee-free path; PayPal and Venmo
   are offered for donors who prefer them. Each opens the provider in a new
   tab — nothing is embedded on the site. */
const GIVE_LINKS = {
  zeffy:  "https://www.zeffy.com/en-US/donation-form/provide-food-and-medical",
  paypal: "https://www.paypal.com/donate/?hosted_button_id=5YFAYGX4FKHW6",
  venmo:  "https://venmo.com/u/Run2TheRescue",
};

function GiveMethod({ href, onClick, name, note, badge }) {
  const baseStyle = {
    display: "flex", alignItems: "center", gap: 14, padding: "15px 18px",
    borderRadius: 14, border: "1.5px solid var(--line-light)", background: "#fff",
    textDecoration: "none", textAlign: "left", width: "100%", cursor: "pointer",
    font: "inherit",
    transition: "border-color .2s ease, background .2s ease",
  };
  const onEnter = e => { e.currentTarget.style.borderColor = "var(--purple-400)"; e.currentTarget.style.background = "var(--lav-50)"; };
  const onLeave = e => { e.currentTarget.style.borderColor = "var(--line-light)"; e.currentTarget.style.background = "#fff"; };
  const inner = (
    <>
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
    </>
  );
  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {inner}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {inner}
    </a>
  );
}

/* Information panel shown when the donor picks "Donor Advised Fund" — the
   donor takes our legal name + EIN to their DAF provider's portal and
   recommends a grant from there. Works with every DAF provider, no
   third-party integration required. */
function DafInfo() {
  return (
    <div>
      <p style={{ fontSize: 14, color: "var(--ink-2)", margin: "0 0 14px", lineHeight: 1.55 }}>
        Your DAF provider can send a grant directly. Use these details when you log into their portal:
      </p>
      <div style={{ background: "var(--lav-50)", border: "1px solid var(--line-light)", borderRadius: 12, padding: "16px 18px", marginBottom: 14 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 4 }}>Legal name</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>Run to the Rescue</div>
        <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 4, fontStyle: "italic" }}>Note: the "2" is dropped in our IRS filing, so use exactly the name above.</div>
        <div style={{ height: 1, background: "var(--line-light)", margin: "14px 0" }} />
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 4 }}>EIN</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>99-4240461</div>
      </div>
      <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 14 }}>
        <div><b>1.</b> Log in to your DAF provider (Fidelity Charitable, Schwab Charitable, Vanguard Charitable, etc.).</div>
        <div><b>2.</b> Recommend a grant using the legal name or EIN above.</div>
        <div><b>3.</b> We'll receive the gift within 7 to 14 days.</div>
      </div>
      <p style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
        Questions? Email <a href="mailto:info@run2therescue.org" style={{ color: "var(--purple-600)" }}>info@run2therescue.org</a>.
      </p>
    </div>
  );
}

function DonateModal({ open, onClose }) {
  const [view, setView] = useState("chooser"); // "chooser" | "daf"
  useEffect(() => {
    if (!open) return;
    setView("chooser");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const isDaf = view === "daf";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div style={{ padding: "24px 26px 6px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img src="assets/r2r-logo.png" alt="" style={{ width: 30, height: 30 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
                {isDaf ? "Donor Advised Fund" : "Make a donation"}
              </span>
            </div>
            <h3 className="display" style={{ fontSize: 26, margin: 0, color: "var(--ink)" }}>
              {isDaf ? "Give from your DAF" : "Choose how to give"}
            </h3>
            {isDaf && (
              <button type="button" onClick={() => setView("chooser")} style={{
                marginTop: 8, fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--purple-600)",
                background: "transparent", border: 0, padding: 0, cursor: "pointer", letterSpacing: "0.04em",
              }}>← All options</button>
            )}
          </div>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: 24, color: "var(--ink-3)", lineHeight: 1 }}>×</button>
        </div>
        {isDaf ? (
          <div style={{ padding: "14px 26px 26px" }}>
            <DafInfo />
          </div>
        ) : (
          <div style={{ padding: "14px 26px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
            <GiveMethod href={GIVE_LINKS.zeffy} name="Card or bank transfer"
              note="Secure checkout. Zeffy covers the fees, so your gift reaches a survivor." />
            <GiveMethod href={GIVE_LINKS.paypal} name="PayPal"
              note="Give with your PayPal balance or a linked card." />
            <GiveMethod href={GIVE_LINKS.venmo} name="Venmo"
              note="Send your gift straight from the Venmo app." />
            <GiveMethod onClick={() => setView("daf")} name="Donor Advised Fund (DAF)"
              note="Recommend a grant from your DAF using our legal name and EIN." />
            <p style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center", margin: "6px 0 0", lineHeight: 1.5 }}>
              Run 2 The Rescue is a 501(c)(3) nonprofit. Your gift is tax deductible.
            </p>
          </div>
        )}
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

  /* Internal review tool: keep it out of the CI prerender snapshot so crawlers
     and no-JS visitors never see it as page content. */
  if (typeof navigator !== "undefined" && navigator.webdriver === true) return null;

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
