/* Donate popup + Tweaks panel */

/* The donate popup opens the live Zeffy donation form. Zeffy owns the whole
   payment flow — card, receipt, tax handling — so the site only embeds it.
   To change which form this opens, swap the slug below. */
const ZEFFY_DONATE_EMBED = "https://www.zeffy.com/embed/donation-form/provide-food-and-medical";

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
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 560,
        height: "86vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", boxShadow: "var(--shadow)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 18px", borderBottom: "1px solid var(--line-light)", flexShrink: 0,
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <img src="assets/r2r-logo.png" alt="" style={{ width: 26, height: 26 }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)" }}>
              Donate · Run 2 The Rescue
            </span>
          </span>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: 24, color: "var(--ink-3)", lineHeight: 1 }}>×</button>
        </div>
        <iframe
          title="Donate to Run 2 The Rescue"
          src={ZEFFY_DONATE_EMBED}
          allow="payment"
          style={{ flex: 1, width: "100%", border: 0 }}
        />
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
