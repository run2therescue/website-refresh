/* Sponsor/Donate modal + Tweaks + Sticky bar */

function DonateModal({ open, prefillName, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    target: prefillName || "Any survivor", amount: 50, kind: "monthly", name: "", email: "",
  });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) { setStep(1); setDone(false); }
    else setForm(f => ({ ...f, target: prefillName || "Any survivor" }));
  }, [open, prefillName]);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  const canStep2 = form.name.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--line-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src="assets/r2r-logo.png" alt="" style={{ width: 32, height: 32 }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {done ? "Thank you" : `Step ${step} of 2`}
            </span>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ fontSize: 24, color: "var(--ink-3)", lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: "28px 28px 22px" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "24px 0 12px" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "var(--purple-soft)", color: "var(--purple-600)",
                display: "grid", placeItems: "center", margin: "0 auto 20px",
                fontSize: 34,
              }}>♡</div>
              <h3 className="display" style={{ fontSize: 32, margin: "0 0 10px", color: "var(--ink)" }}>
                Thank you, {form.name.split(" ")[0] || "friend"}.
              </h3>
              <p style={{ color: "var(--ink-2)", margin: "0 0 24px", maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
                Your <b style={{ color: "var(--ink)" }}>${form.amount}/{form.kind === "monthly" ? "mo" : "one-time"}</b> donation for
                {" "}<b style={{ color: "var(--ink)" }}>{form.target}</b> is confirmed. Receipt on the way to <b style={{ color: "var(--ink)" }}>{form.email}</b>.
              </p>
              <button className="btn btn-accent" onClick={onClose}>Back to the site</button>
            </div>
          ) : step === 1 ? (
            <div>
              <h3 className="display" style={{ fontSize: 28, margin: "0 0 6px", color: "var(--ink)" }}>
                {prefillName ? `Sponsor ${prefillName}` : "Make a Donation"}
              </h3>
              <p style={{ color: "var(--ink-2)", margin: "0 0 20px", fontSize: 14 }}>Pick an amount and a cadence. We'll send updates with photos.</p>
              <div style={{
                display: "flex", background: "var(--lav-100)", borderRadius: 10, padding: 3, marginBottom: 16,
              }}>
                {["monthly", "one-time"].map(k => (
                  <button key={k} onClick={() => setForm({ ...form, kind: k })} style={{
                    flex: 1, padding: "10px 0", borderRadius: 8,
                    background: form.kind === k ? "#fff" : "transparent",
                    color: form.kind === k ? "var(--ink)" : "var(--ink-3)",
                    boxShadow: form.kind === k ? "var(--shadow-sm)" : "none",
                    fontSize: 13, fontWeight: 500,
                  }}>{k}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {[25, 50, 120, 500].map(v => (
                  <button key={v} onClick={() => setForm({ ...form, amount: v })} style={{
                    padding: "18px 0", borderRadius: 12,
                    border: form.amount === v ? "2px solid var(--purple-500)" : "1px solid var(--line-light)",
                    background: form.amount === v ? "var(--purple-soft)" : "#fff",
                    color: form.amount === v ? "var(--purple-700)" : "var(--ink)",
                    fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 500,
                  }}>${v}</button>
                ))}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 14, textAlign: "center" }}>
                {form.amount === 25 && "= a week of meds"}
                {form.amount === 50 && "= a month of food"}
                {form.amount === 120 && "= full heartworm treatment"}
                {form.amount === 500 && "= one rescue flight"}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="display" style={{ fontSize: 28, margin: "0 0 18px", color: "var(--ink)" }}>Where do we send updates?</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <Field label="Full name" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Bea Patel" />
                <Field label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="you@example.com" type="email" />
              </div>
              <div style={{
                marginTop: 22, padding: 18, background: "var(--lav-100)", borderRadius: 14,
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
              }}>
                <div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>Donating to {form.target}</div>
                  <div className="display" style={{ fontSize: 28, color: "var(--ink)" }}>${form.amount}/{form.kind === "monthly" ? "mo" : "once"}</div>
                </div>
                <button className="btn" style={{ height: 36, fontSize: 12, padding: "0 14px", background: "transparent", border: "1px solid var(--line-light)" }} onClick={() => setStep(1)}>Edit</button>
              </div>
            </div>
          )}
        </div>

        {!done && (
          <div style={{ padding: "18px 28px", borderTop: "1px solid var(--line-light)", display: "flex", justifyContent: "space-between", gap: 10 }}>
            <button className="btn" style={{ background: "transparent", border: "1px solid var(--line-light)", color: "var(--ink)" }} onClick={() => step === 1 ? onClose() : setStep(step - 1)}>
              {step === 1 ? "Cancel" : "Back"}
            </button>
            <button
              className="btn btn-accent"
              disabled={step === 2 && !canStep2}
              style={{ opacity: (step === 2 && !canStep2) ? 0.5 : 1 }}
              onClick={() => { if (step < 2) setStep(2); else setDone(true); }}>
              {step < 2 ? "Continue" : "Confirm donation"} <span className="arrow">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", padding: "14px 16px", border: "1px solid var(--line-light)", borderRadius: 12,
          fontFamily: "var(--font-ui)", fontSize: 15, background: "#fff", color: "var(--ink)",
          outline: "none",
        }}
        onFocus={e => e.target.style.borderColor = "var(--purple-500)"}
        onBlur={e => e.target.style.borderColor = "var(--line-light)"}
      />
    </label>
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
