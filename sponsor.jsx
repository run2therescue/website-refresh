/* Sponsor page — the custom UI (dog picker + tiers) is the pitch; the actual
   monthly sponsorship is completed on Zeffy's hosted form, opened in a new tab.
   Nothing is embedded.

   VERIFIED Zeffy behavior (tested live on the hosted form, JS-rendered):
   - `?amount=<n>`      → ✅ pre-fills the custom amount field, and it persists
                           when the donor switches to the Monthly tab.
   - `?frequency=monthly` → ❌ IGNORED. The form always loads on the One-time
                           tab; the donor taps "Monthly" once themselves.
   - `?utm_content=...` → ❌ STRIPPED on redirect, so dog attribution can NOT
                           ride on the UTM tag.

   Because of the above, the honest design is: carry the amount (works), set the
   expectation that the donor taps "Monthly" on Zeffy, and DON'T claim automatic
   per-dog attribution until R2R adds a "Which survivor?" question to the Zeffy
   form (see DOG_FIELD_KEY below). That's the Option-1 upgrade for later. */

const { useState: spS, useEffect: spE } = React;

/* Zeffy hosted sponsorship form (recurring donation). */
const SPONSOR_URL = "https://www.zeffy.com/en-US/donation-form/help-the-abandoned-dogs-come-home";

/* OPTION-1 UPGRADE HOOK — leave null until R2R adds a required text question to
   the Zeffy form (e.g. "Which survivor are you sponsoring?"). Once added, Zeffy
   exposes a URL key for that field; set it here and the dog's name pre-fills on
   checkout AND lands in the Zeffy export for clean per-dog attribution. While
   this is null we deliberately do not promise automatic tracking in the copy. */
const DOG_FIELD_KEY = null;

/* Lower-case, hyphen-safe slug. Strips combining diacritical marks (U+0300–
   U+036F) so names like "Léa" become "lea". */
const slugify = (s) => String(s || "")
  .toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/* Builds the Zeffy URL. Both args optional — with no dog it's still a valid
   generic sponsorship link. `amount` is verified to pre-fill on Zeffy. */
function buildSponsorUrl(dog, amount) {
  const u = new URL(SPONSOR_URL);
  u.searchParams.set("utm_source", "r2r-site");
  u.searchParams.set("utm_campaign", "sponsor");
  if (dog && dog.slug && dog.id) {
    u.searchParams.set("utm_content", `${dog.slug}-${dog.id}`);
  }
  if (amount) u.searchParams.set("amount", String(amount)); // ✅ pre-fills on Zeffy
  // Pre-fill the dog name into the Zeffy custom question once it exists.
  if (DOG_FIELD_KEY && dog && dog.name) u.searchParams.set(DOG_FIELD_KEY, dog.name);
  return u.toString();
}

/* The fee menu in the confirm modal is tailored to the chosen dog's Shelterluv
   size: one monthly Sponsor Angel amount, the flat CDC fee, and the one-time
   flight that matches the dog's size — so a medium dog only ever sees the
   med/large flight, not the small or XL ones. Cadence is honest: "/mo" vs
   "one-time". Falls back to the med/large tier when size is unknown. */
function relevantAmounts(size) {
  const s = String(size || "").toLowerCase();
  const isSmall = s === "small";
  const isXL = s.startsWith("x") || s.includes("xl") || s.includes("extra");
  const care = isSmall
    ? { value: 65, note: "a small dog's care", cadence: "mo", featured: true }
    : { value: 85, note: "a large dog's care", cadence: "mo", featured: true };
  const flight = isSmall
    ? { value: 1500, note: "a small dog's flight", cadence: "once" }
    : isXL
      ? { value: 3000, note: "an XL dog's flight", cadence: "once" }
      : { value: 2000, note: "a med/large dog's flight", cadence: "once" };
  return [care, { value: 900, note: "CDC fees, one dog", cadence: "once" }, flight];
}
const perLabel = (cadence) => (cadence === "once" ? "one-time" : "/mo");
const cadenceWord = (cadence) => (cadence === "once" ? "One-time" : "Monthly");

/* Sponsor confirmation modal — pops the INSTANT a dog is selected (issue #1:
   nothing is buried below the grid). The donor confirms the amount right here,
   sees exactly what happens next on Zeffy, then hands off in one tap. */
function SponsorConfirmModal({ open, dog, amount, onClose }) {
  const amounts = relevantAmounts(dog && dog.size);
  const [amt, setAmt] = spS(amount || amounts[0].value);
  spE(() => { if (open) setAmt(amount || relevantAmounts(dog && dog.size)[0].value); }, [open, amount, dog]);
  spE(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  if (!open || !dog) return null;
  const url = buildSponsorUrl(dog, amt);
  const amtCadence = (amounts.find((a) => a.value === amt) || {}).cadence || "mo";
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal sp-confirm" onClick={(e) => e.stopPropagation()}
           role="dialog" aria-modal="true" aria-label={`Sponsor ${dog.name}`}>
        <button onClick={onClose} aria-label="Close" className="sp-confirm-close">×</button>
        <div className="sp-confirm-photo">
          {dog.photo
            ? <img src={vimgS(dog.photo, 480)} alt={dog.name} loading="lazy" />
            : <div className="sp-confirm-photo-fallback" aria-hidden="true">🐾</div>}
        </div>
        <div className="sp-confirm-body">
          <div className="sp-confirm-eyebrow">You're sponsoring</div>
          <h3 className="display sp-confirm-title">{dog.name}</h3>

          <div className="sp-confirm-amounts sp-confirm-amounts-3" role="group" aria-label="Choose an amount">
            {amounts.map((a) => (
              <button key={a.value} type="button"
                onClick={() => setAmt(a.value)}
                className={`sp-confirm-chip ${amt === a.value ? "sel" : ""}`}
                aria-pressed={amt === a.value}>
                <span className="sp-confirm-chip-amt">${a.value.toLocaleString()}<span className="per">{perLabel(a.cadence)}</span></span>
                <span className="sp-confirm-chip-note">{a.note}</span>
              </button>
            ))}
          </div>

          <div className="sp-confirm-card">
            <div className="sp-confirm-row">
              <span className="sp-confirm-label">Survivor</span>
              <span className="sp-confirm-val">{dog.name}</span>
            </div>
            <div className="sp-confirm-divider" />
            <div className="sp-confirm-row">
              <span className="sp-confirm-label">{cadenceWord(amtCadence)} gift</span>
              <span className="sp-confirm-val sp-confirm-amt">${amt.toLocaleString()}<span className="per">{perLabel(amtCadence)}</span></span>
            </div>
          </div>

          <p className="sp-confirm-handoff">
            {amtCadence === "once" ? (
              <>Next, our secure checkout (powered by <strong>Zeffy</strong>, 100% fee-free) opens
              with your <strong>${amt.toLocaleString()}</strong> gift already filled in to help bring {dog.name} home.</>
            ) : (
              <>Next, our secure checkout (powered by <strong>Zeffy</strong>, 100% fee-free) opens
              with your <strong>${amt}</strong> already filled in. Just tap <strong>“Monthly”</strong> there
              to start your recurring gift for {dog.name}.</>
            )}
          </p>

          <a href={url} target="_blank" rel="noopener noreferrer"
             onClick={() => { setTimeout(onClose, 200); }}
             className="btn btn-accent sp-confirm-cta">
            Continue to secure checkout <span className="arrow">→</span>
          </a>
          <button type="button" onClick={onClose} className="sp-confirm-back">
            ← Pick a different survivor
          </button>
        </div>
      </div>
    </div>
  );
}

function SponsorHero() {
  return (
    <header className="sponsor-hero">
      <PawS className="paw" style={{ top: 80, left: "6%", width: 56, height: 56, color: "#fff", opacity: 0.12 }} />
      <PawS className="paw" style={{ bottom: 60, right: "8%", width: 72, height: 72, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ top: 140, right: "22%", width: 36, height: 36, color: "#fff", opacity: 0.08 }} />

      <div className="wrap" style={{ position: "relative", textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 24 }}><PawGlyphS />Sponsor a Survivor</div>
        <h1 className="display" style={{ fontSize: "clamp(44px, 7vw, 96px)", margin: "0 0 20px", color: "#fff" }}>
          Be a <em>lifeline</em> while they wait.
        </h1>
        <p style={{ fontSize: 17, color: "var(--on-dark-2)", margin: "0 auto 32px", maxWidth: 580, lineHeight: 1.6 }}>
          Not every dog finds their family on day one. Sponsoring covers the food, vet care, and foster costs that keep them healthy and hopeful until they do.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <MagneticS><a href="#pick" className="btn btn-accent">Meet the survivors <span className="arrow">→</span></a></MagneticS>
          <a href="#start" className="btn btn-outline-light">How it works</a>
        </div>
      </div>
    </header>
  );
}

/* How it works — the same content as before, rebalanced into two columns so the
   section reads horizontally instead of as a tall centered stack: the pitch + CTA
   on the left, the founder's line as the counterweight on the right. */
function SponsorStart({ selectedDog, onSponsor }) {
  const ctaHref = buildSponsorUrl(selectedDog, null);
  const ctaLabel = selectedDog
    ? <>Sponsor {selectedDog.name} monthly <span className="arrow">→</span></>
    : <>Start your monthly sponsorship <span className="arrow">→</span></>;
  return (
    <section id="start" className="sponsor-start">
      <PawS className="paw paw-light" style={{ bottom: 24, right: "4%", width: 56, height: 56 }} />
      <div className="wrap">
        <div className="sp-start-grid">
          <div className="sp-start-copy">
            <div className="eyebrow-dark" style={{ marginBottom: 14 }}>How it works</div>
            <h2 className="display" style={{ fontSize: "clamp(30px, 3.8vw, 46px)", margin: 0, color: "var(--ink)", lineHeight: 1.08 }}>
              Become a Sponsor Angel
            </h2>
            <p className="sp-body">
              Pick a survivor, choose any monthly amount, and it goes straight to their food, vet care, and foster costs. You'll get updates as their story unfolds.
            </p>
            <div>
              <MagneticS>
                {selectedDog ? (
                  <button type="button" onClick={() => onSponsor(selectedDog)} className="btn btn-accent" style={{ fontSize: 15 }}>
                    {ctaLabel}
                  </button>
                ) : (
                  <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-accent" style={{ fontSize: 15 }}>
                    {ctaLabel}
                  </a>
                )}
              </MagneticS>
              <p style={{ fontSize: 12, color: "var(--ink-3)", margin: "12px 0 0" }}>
                Secure checkout through Zeffy. Tax deductible. Cancel anytime.
              </p>
            </div>
          </div>
          <div className="sp-start-aside">
            <blockquote className="sp-quote">
              "We cannot do this without you. Together, we can make change happen."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Picker — dogs come live from Shelterluv. Selecting a dog highlights its card
   AND immediately opens the confirm modal (issue #1: the next step is a pop-up,
   never buried). A slim "Sponsoring <Name>" bar stays below the grid as a
   reminder + a way to re-open the modal or clear the pick. */
function SponsorPicker({ animals, status, selectedDog, setSelectedDog, onSponsor }) {
  const dogs = animals.map((a) => ({
    id: a.id,
    name: a.name,
    slug: slugify(a.name),
    meta: [a.breed, a.ageGroup].filter(Boolean).join(" · "),
    img: a.cover,
    size: a.size,
  }));
  const choose = (d) => {
    const dog = { id: d.id, name: d.name, slug: d.slug, photo: d.img, size: d.size };
    setSelectedDog(dog);
    onSponsor(dog); // pop the modal right away (amount defaults to the size-appropriate tier)
  };
  return (
    <section id="pick" className="sponsor-picker">
      <PawS className="paw paw-light" style={{ top: 40, right: "5%", width: 48, height: 48 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 8px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>Meet the survivors you'd support</div>
          <h2 className="display" style={{ fontSize: "clamp(28px, 3.8vw, 44px)", margin: "0 0 12px", color: "var(--ink)" }}>
            Every sponsorship reaches a <em style={{ color: "var(--purple-600)" }}>real dog</em>.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0 }}>
            Tap a survivor to pair your monthly gift with them. You'll confirm the amount in the next step.
          </p>
        </div>
        {status === "error" ? (
          <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 14, marginTop: 24 }}>
            Our live dog list is briefly unavailable. You can still start a sponsorship and we'll match you.
          </p>
        ) : (
          <div className="pick-grid">
            {dogs.map((d) => (
              <button key={d.id}
                className={`pick-card ${selectedDog && selectedDog.id === d.id ? "sel" : ""}`}
                aria-pressed={!!(selectedDog && selectedDog.id === d.id)}
                onClick={() => choose(d)}>
                <div className="img">
                  {d.img
                    ? <ImgS src={d.img} alt={d.name} />
                    : <div style={{ width: "100%", height: "100%", background: "var(--lav-200)" }} />}
                </div>
                <div className="body">
                  <div className="name">{d.name}</div>
                  <div className="meta">{d.meta}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        {status === "loading" && (
          <p style={{ textAlign: "center", color: "var(--ink-3)", fontSize: 13, marginTop: 16 }}>Loading our survivors…</p>
        )}
        {/* No reminder bar / no tiers — the pop-up modal is now the single place
            to confirm dog + amount. Re-tapping a selected card re-opens it. */}
      </div>
    </section>
  );
}

function SponsorPage() {
  const { status, animals } = useAnimalsS();
  const available = animals.filter((a) => a.available !== false && !isHiddenDog(a));
  // selectedDog: null | { id, name, slug, photo } — carried through to every
  // CTA so the donor's chosen survivor is reflected.
  const [selectedDog, setSelectedDog] = spS(null);
  // confirm: null | { dog, amount } — drives the SponsorConfirmModal. Opens the
  // moment a dog is picked (or a tier is clicked with a dog selected).
  const [confirm, setConfirm] = spS(null);
  const onSponsor = (dog, amount) => setConfirm({ dog, amount });
  const closeConfirm = () => setConfirm(null);

  // The "Different Dogs" strip above dispatches this to open the sponsor flow here.
  spE(() => {
    const open = (e) => { if (e.detail) { setSelectedDog(e.detail); setConfirm({ dog: e.detail }); } };
    window.addEventListener("r2r-open-dog", open);
    return () => window.removeEventListener("r2r-open-dog", open);
  }, []);

  return (
    <>
      <SponsorHero />
      <SponsorStart selectedDog={selectedDog} onSponsor={onSponsor} />
      <SponsorPicker animals={available} status={status}
        selectedDog={selectedDog} setSelectedDog={setSelectedDog}
        onSponsor={onSponsor} />
      <SponsorConfirmModal
        open={!!confirm}
        dog={confirm && confirm.dog}
        amount={confirm && confirm.amount}
        onClose={closeConfirm} />
    </>
  );
}

Object.assign(window, { SponsorPage });
