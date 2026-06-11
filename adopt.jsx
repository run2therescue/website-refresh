/* Adopt page — every dog comes live from Shelterluv via /api/animals.
   New dogs appear, profiles update, and adopted dogs drop off automatically;
   nothing on this page is hand-maintained. */

const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

/* Filter options — only dimensions Shelterluv actually provides data for.
   (No "energy" or location filter: Shelterluv has no field behind them.) */
const FILTER_OPTS = {
  age: ["Any", "Puppy", "Young", "Adult", "Senior"],
  size: ["Any", "Small", "Medium", "Large"],
  good: ["Any", "Kids", "Dogs", "Cats"],
};

/* A Shelterluv-normalized animal -> the shape this page's cards render. */
function mapAnimal(a) {
  const photos = (a.photos && a.photos.length) ? a.photos : (a.cover ? [a.cover] : []);
  return {
    id: a.id,
    name: a.name,
    breed: a.breed || "Mixed breed",
    sex: a.sex || "",
    age: a.ageGroup || "",
    ageMonths: a.ageMonths == null ? 999 : a.ageMonths,
    size: a.size || "",
    weight: a.weightLb != null ? a.weightLb + " lbs" : "",
    ageText: a.ageText || "",
    altered: a.altered || "",
    inFoster: a.inFoster === true,
    color: a.color || "",
    pattern: a.pattern || "",
    bio: a.blurb || "",
    img: a.cover,
    gallery: photos,
    videos: a.videos || [],
    good: a.goodWith || [],
    daysInCare: a.daysInCare,
    isNew: a.daysInCare != null && a.daysInCare <= 30,
    location: a.location || "",
  };
}

/* ---- Hero -------------------------------------------------------------- */
function AdoptHero({ variant }) {
  if (variant === "editorial") return <AdoptHeroEditorial />;
  return <AdoptHeroFilter />;
}

function AdoptHeroFilter() {
  const { animals } = useAnimalsS();
  const count = animals.filter((a) => a.available !== false).length;
  return (
    <header className="adopt-hero-filter">
      <PawS className="paw" style={{ top: 80, left: "6%", width: 60, height: 60, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ bottom: 60, right: "8%", width: 72, height: 72, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ top: 40, right: "25%", width: 40, height: 40, color: "#fff", opacity: 0.08 }} />

      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 40px" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 24 }}>✦ Adopt a Survivor</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 7.6vw, 104px)", margin: "0 0 20px", color: "#fff" }}>
            Find your next <em>best friend.</em>
          </h1>
          <p style={{ fontSize: 17, color: "var(--on-dark-2)", margin: "0 auto", maxWidth: 560, lineHeight: 1.55 }}>
            Rescued from the dog meat trade. Medically cleared. Ready for a home. Filter for a match, or scroll the whole family.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 40, flexWrap: "wrap" }}>
          <HeroStat num={count || 0} label="Dogs waiting" />
          <HeroStat num={800} suffix="+" label="Adopted since 2024" />
          <HeroStat num={2} label="Years rescuing" />
        </div>
      </div>
    </header>
  );
}

function HeroStat({ num, suffix = "", label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="display" style={{ fontSize: 40, color: "#fff" }}>
        <CountUpS to={num} /><span style={{ color: "var(--purple-400)" }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--on-dark-3)", marginTop: 6 }}>{label}</div>
    </div>
  );
}

function AdoptHeroEditorial() {
  const { animals } = useAnimalsS();
  const feat = animals.map(mapAnimal).find((d) => d.img) || null;
  return (
    <header className="adopt-hero-edit">
      <PawS className="paw" style={{ top: 60, right: "5%", width: 52, height: 52, color: "var(--purple-500)", opacity: 0.15 }} />
      <PawS className="paw" style={{ bottom: 40, left: "4%", width: 44, height: 44, color: "var(--purple-500)", opacity: 0.15 }} />

      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 64, alignItems: "center" }} className="hero-grid">
          <div>
            <div className="eyebrow-dark" style={{ color: "var(--purple-600)", marginBottom: 24 }}>✦ This Week's Featured Survivor</div>
            <h1 className="display" style={{ fontSize: "clamp(44px, 6.8vw, 92px)", margin: "0 0 24px", color: "var(--ink)" }}>
              Meet <em>{feat ? feat.name : "our survivors"}.</em><br />Ready to come home.
            </h1>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 480, margin: "0 0 28px", lineHeight: 1.6 }}>
              {feat ? feat.bio : "Every dog we rescue is medically cleared and waiting for a loving home."}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <MagneticS><a href="#directory" className="btn btn-accent">Browse all survivors <span className="arrow">→</span></a></MagneticS>
            </div>
          </div>
          <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", maxHeight: 520, background: "var(--lav-200)" }}>
            {feat && <ImgS src={feat.img} alt={feat.name} />}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---- Filter bar -------------------------------------------------------- */
function FilterBarInner({ filters, setFilters, count }) {
  const [openRow, setOpenRow] = uS(null);
  const update = (k, v) => setFilters({ ...filters, [k]: v });

  const chips = [
    { key: "age", label: "Age" },
    { key: "size", label: "Size" },
    { key: "good", label: "Good with" },
  ];
  const anyActive = Object.entries(filters).some(([k, v]) => v && v !== "Any");

  return (
    <div className="filter-bar-v2">
      <div className="filter-row">
        <span className="filter-prompt">Find a match</span>
        {chips.map((c) => {
          const isActive = filters[c.key] && filters[c.key] !== "Any";
          const isOpen = openRow === c.key;
          return (
            <button key={c.key}
              className={`filter-chip ${isActive ? "active" : ""} ${isOpen ? "open" : ""}`}
              onClick={() => setOpenRow(isOpen ? null : c.key)}>
              <span className="label">{c.label}</span>
              {isActive && <span className="value">{filters[c.key]}</span>}
            </button>
          );
        })}
        {anyActive && (
          <button onClick={() => { setFilters({ age: "Any", size: "Any", good: "Any" }); setOpenRow(null); }}
            className="filter-clear">Clear</button>
        )}
        <span className="filter-count">{count} match{count === 1 ? "" : "es"}</span>
      </div>
      {openRow && (
        <div className="filter-options">
          {FILTER_OPTS[openRow].map((opt) => (
            <button key={opt}
              className={`opt ${filters[openRow] === opt ? "sel" : ""}`}
              onClick={() => update(openRow, opt)}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Directory --------------------------------------------------------- */
function AdoptDirectory() {
  const { status, animals, error } = useAnimalsS();
  const dogs = uM(
    () => animals.filter((a) => a.available !== false).map(mapAnimal),
    [animals]
  );

  const [filters, setFilters] = uS({ age: "Any", size: "Any", good: "Any" });
  const [sort, setSort] = uS("newest");
  const [favs, setFavs] = uS(() => {
    try { return JSON.parse(localStorage.getItem("r2r:favs") || "[]"); } catch { return []; }
  });
  const [selectedId, setSelectedId] = uS(null);

  uE(() => { localStorage.setItem("r2r:favs", JSON.stringify(favs)); }, [favs]);

  // The "Different Dogs" strip above dispatches this to open a dog's profile here.
  uE(() => {
    const open = (e) => { if (e.detail && e.detail.id != null) setSelectedId(e.detail.id); };
    window.addEventListener("r2r-open-dog", open);
    return () => window.removeEventListener("r2r-open-dog", open);
  }, []);

  const filtered = uM(() => {
    let r = dogs.filter((d) => {
      if (filters.age !== "Any" && d.age !== filters.age) return false;
      if (filters.size !== "Any" && d.size !== filters.size) return false;
      if (filters.good !== "Any" && !d.good.includes(filters.good.toLowerCase())) return false;
      return true;
    });
    if (sort === "newest") r = r.slice().sort((a, b) => (a.daysInCare == null ? 9e9 : a.daysInCare) - (b.daysInCare == null ? 9e9 : b.daysInCare));
    else if (sort === "longest") r = r.slice().sort((a, b) => (b.daysInCare || 0) - (a.daysInCare || 0));
    else if (sort === "youngest") r = r.slice().sort((a, b) => a.ageMonths - b.ageMonths);
    else if (sort === "oldest") r = r.slice().sort((a, b) => b.ageMonths - a.ageMonths);
    return r;
  }, [dogs, filters, sort]);

  const selected = dogs.find((d) => d.id === selectedId);
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <section id="directory" className="directory">
      <PawS className="paw paw-light" style={{ top: 40, right: "4%", width: 48, height: 48 }} />
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 28 }}>
          <div>
            <div className="eyebrow-dark" style={{ marginBottom: 8 }}>Available for adoption</div>
            <h2 className="display" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", margin: 0, color: "var(--ink)" }}>
              {status === "ready"
                ? `${filtered.length} dog${filtered.length === 1 ? "" : "s"} waiting to come home`
                : "Our survivors waiting to come home"}
            </h2>
          </div>
          {status === "ready" && dogs.length > 0 && <SortMenu sort={sort} setSort={setSort} />}
        </div>

        {status === "ready" && dogs.length > 0 && (
          <FilterBarInner filters={filters} setFilters={setFilters} count={filtered.length} />
        )}

        {status === "loading" && <DirectoryMessage>Fetching our survivors…</DirectoryMessage>}

        {status === "error" && (
          <DirectoryMessage>
            <div className="display" style={{ fontSize: 22, color: "var(--ink)", margin: "0 0 8px" }}>We couldn't load our dogs just now.</div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: 0 }}>Please refresh the page in a moment. Our adoption list updates live from our shelter system.</p>
          </DirectoryMessage>
        )}

        {status === "ready" && dogs.length === 0 && (
          <DirectoryMessage>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
            <div className="display" style={{ fontSize: 22, color: "var(--ink)", margin: "0 0 8px" }}>No dogs are listed right now.</div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 16px" }}>Every survivor here has found a home. Check back soon, or reach out about fostering.</p>
            <a className="btn btn-accent" href="/foster">Become a Foster</a>
          </DirectoryMessage>
        )}

        {status === "ready" && dogs.length > 0 && filtered.length === 0 && (
          <DirectoryMessage>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
            <div className="display" style={{ fontSize: 22, color: "var(--ink)", margin: "0 0 8px" }}>No dogs match those filters.</div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 16px" }}>Try loosening a filter to see more survivors.</p>
            <button className="btn btn-accent" onClick={() => setFilters({ age: "Any", size: "Any", good: "Any" })}>Clear filters</button>
          </DirectoryMessage>
        )}

        {status === "ready" && filtered.length > 0 && (
          <div className="dog-grid">
            {filtered.map((d) => (
              <DogCard key={d.id} dog={d} fav={favs.includes(d.id)} onFav={() => toggleFav(d.id)} onOpen={() => setSelectedId(d.id)} />
            ))}
          </div>
        )}
      </div>

      {selected && <ProfileModal dog={selected} fav={favs.includes(selected.id)} onFav={() => toggleFav(selected.id)} onClose={() => setSelectedId(null)} />}
    </section>
  );
}

function DirectoryMessage({ children }) {
  return (
    <div style={{ padding: "72px 20px", textAlign: "center", background: "#fff", borderRadius: 20, border: "1px dashed var(--line-light)" }}>
      {children}
    </div>
  );
}

function SortMenu({ sort, setSort }) {
  const opts = [
    ["newest", "Just arrived"],
    ["longest", "Waiting longest"],
    ["youngest", "Youngest first"],
    ["oldest", "Oldest first"],
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>Sort</span>
      <select value={sort} onChange={(e) => setSort(e.target.value)}
        style={{ background: "#fff", border: "1px solid var(--line-light)", borderRadius: 10, padding: "8px 12px", fontSize: 13, color: "var(--ink)", cursor: "pointer", fontFamily: "var(--font-ui)" }}>
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
}

function DogCard({ dog, fav, onFav, onOpen }) {
  return (
    <button className="dog-card reveal" onClick={onOpen}>
      <div className="img-wrap" style={{ aspectRatio: "4 / 5" }}>
        <ImgS src={dog.img} alt={dog.name} />
        {dog.isNew && <span className="new-pill">Just arrived</span>}
        <span className={`fav-btn ${fav ? "on" : ""}`} onClick={(e) => { e.stopPropagation(); onFav(); }} role="button" aria-label="Favorite">
          {fav ? "♥" : "♡"}
        </span>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <div className="display" style={{ fontSize: 22, color: "var(--ink)" }}>{dog.name}</div>
          {dog.age && <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase" }}>{dog.age}</span>}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--purple-600)", fontWeight: 600, marginBottom: 10 }}>
          {dog.breed}
        </div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>
          {dog.bio.length > 116 ? dog.bio.slice(0, 116).trim() + "…" : dog.bio}
        </p>
        {dog.good.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {dog.good.map((g) => <span key={g} className="trait">Good with {g}</span>)}
          </div>
        )}
      </div>
    </button>
  );
}

/* ---- Profile modal ----------------------------------------------------- */
function ProfileModal({ dog, fav, onFav, onClose }) {
  const [photoIdx, setPhotoIdx] = uS(0);
  const [step, setStep] = uS("profile"); // profile | form | sent
  const [form, setForm] = uS({ name: "", email: "", phone: "", home: "house", why: "" });

  uE(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const [sending, setSending] = uS(false);
  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    await submitForm(
      {
        dog_name: dog.name,
        dog_id: dog.id || "",
        applicant_name: form.name,
        email: form.email,
        phone: form.phone,
        home: form.home,
        why: form.why,
      },
      "Adoption Application"
    );
    setSending(false);
    setStep("sent");
  };
  const gallery = dog.gallery.length ? dog.gallery : [dog.img];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="gallery">
          <ImgS src={gallery[photoIdx] || dog.img} alt={dog.name} />
          {dog.isNew && (
            <span className="new-pill" style={{ top: 16, left: 16 }}>Just arrived</span>
          )}
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.95)", color: "var(--ink)", display: "grid", placeItems: "center", fontSize: 16 }} aria-label="Close">✕</button>
          {gallery.length > 1 && (
            <div className="thumb-row">
              {gallery.map((g, i) => (
                <div key={i} className={`thumb ${i === photoIdx ? "sel" : ""}`} onClick={() => setPhotoIdx(i)}>
                  <ImgS src={g} alt="" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="body">
          {step === "profile" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <h2 className="display" style={{ fontSize: 36, margin: 0, color: "var(--ink)" }}>{dog.name}</h2>
                <button onClick={onFav} style={{ fontSize: 22, color: fav ? "oklch(0.55 0.2 25)" : "var(--ink-3)", lineHeight: 1 }} aria-label="Favorite">{fav ? "♥" : "♡"}</button>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--purple-600)", fontWeight: 600, marginBottom: 20 }}>
                {dog.breed}{(dog.ageText || dog.age) ? ` · ${dog.ageText || dog.age}` : ""}
              </div>

              <div className="stat-pair">
                <div className="sp"><div className="k">Size</div><div className="v">{[dog.size, dog.weight].filter(Boolean).join(" · ") || "—"}</div></div>
                <div className="sp"><div className="k">Sex</div><div className="v">{dog.sex || "—"}</div></div>
                <div className="sp"><div className="k">In care</div><div className="v">{dog.daysInCare != null ? `${dog.daysInCare} days` : "—"}</div></div>
                <div className="sp"><div className="k">Good with</div><div className="v" style={{ textTransform: "capitalize" }}>{dog.good.length ? dog.good.join(", ") : "—"}</div></div>
                {dog.altered && <div className="sp"><div className="k">Spay / neuter</div><div className="v">{dog.altered}</div></div>}
                {(dog.color || dog.pattern) && <div className="sp"><div className="k">Coat</div><div className="v">{[dog.color, dog.pattern].filter(Boolean).join(" · ")}</div></div>}
                {dog.inFoster && <div className="sp"><div className="k">Currently</div><div className="v">In a foster home</div></div>}
              </div>

              {dog.good.length > 0 && (
                <div className="traits">
                  {dog.good.map((g) => <span key={g} className="trait">Good with {g}</span>)}
                </div>
              )}

              <p style={{ margin: "0 0 16px", color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6 }}>{dog.bio}</p>

              {dog.videos.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8, fontWeight: 600 }}>
                    Watch {dog.name}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {dog.videos.map((v, i) => (
                      <div key={i} style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 12, overflow: "hidden", background: "var(--lav-200)" }}>
                        <iframe
                          src={v.embed}
                          title={`${dog.name} — video ${i + 1}`}
                          loading="lazy"
                          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn-accent" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep("form")}>
                  Apply to adopt {dog.name}
                </button>
                <button className="btn btn-outline-dark" style={{ borderColor: "var(--line-light)", color: "var(--ink-2)" }} onClick={onClose}>Close</button>
              </div>
            </>
          )}

          {step === "form" && (
            <form onSubmit={submit}>
              <BotcheckS />
              <button type="button" onClick={() => setStep("profile")} style={{ fontSize: 13, color: "var(--purple-600)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>← Back to {dog.name}'s profile</button>
              <h2 className="display" style={{ fontSize: 28, margin: "0 0 6px", color: "var(--ink)" }}>Apply to adopt {dog.name}</h2>
              <p style={{ margin: "0 0 20px", color: "var(--ink-2)", fontSize: 13 }}>We'll review your application within 48 hours. No obligation, this just starts the conversation.</p>

              <FormField label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <FormField label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <FormField label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />

              <label style={formLabelStyle}>Home type</label>
              <div className="segmented" style={{ background: "var(--lav-100)", borderRadius: 10, padding: 3, display: "flex", marginBottom: 16 }}>
                {[["house", "House"], ["apt", "Apartment"], ["other", "Other"]].map(([v, l]) => (
                  <button key={v} type="button" aria-pressed={form.home === v} onClick={() => setForm({ ...form, home: v })}
                    style={{ flex: 1, padding: "9px 8px", borderRadius: 7, fontSize: 13, background: form.home === v ? "#fff" : "transparent", color: form.home === v ? "var(--ink)" : "var(--ink-2)", boxShadow: form.home === v ? "var(--shadow-sm)" : "none" }}>{l}</button>
                ))}
              </div>

              <FormField label={`Tell us why ${dog.name} would be a great fit`} textarea value={form.why} onChange={(v) => setForm({ ...form, why: v })} />

              <button type="submit" className="btn btn-accent" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} disabled={sending}>{sending ? "Sending..." : "Submit application →"}</button>
            </form>
          )}

          {step === "sent" && (
            <div style={{ textAlign: "center", margin: "auto 0", padding: "20px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--purple-soft)", display: "grid", placeItems: "center", margin: "0 auto 20px", fontSize: 28, color: "var(--purple-700)" }}>♥</div>
              <h2 className="display" style={{ fontSize: 30, margin: "0 0 10px", color: "var(--ink)" }}>Application received!</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 15, margin: "0 0 24px", lineHeight: 1.6 }}>
                Thank you for opening your heart to {dog.name}. Our adoption team will reach out within 48 hours.
              </p>
              <button className="btn btn-accent" onClick={onClose}>Continue browsing</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const formLabelStyle = {
  display: "block", fontFamily: "var(--font-mono)", fontSize: 10,
  letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)",
  marginBottom: 6, fontWeight: 600,
};

function FormField({ label, required, type = "text", textarea, value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={formLabelStyle}>{label}{required && <span style={{ color: "var(--purple-600)" }}> *</span>}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} style={inputStyle} />
      ) : (
        <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
    </div>
  );
}
const inputStyle = {
  width: "100%", padding: "11px 14px",
  background: "var(--lav-100)", border: "1px solid transparent",
  borderRadius: 10, fontSize: 14, color: "var(--ink)", fontFamily: "var(--font-ui)",
  outline: "none", resize: "vertical",
  transition: "border-color .2s, background .2s",
};

/* ---- Adoption process -------------------------------------------------- */
function AdoptProcess() {
  const steps = [
    { n: "01", t: "Apply", d: "Fill out the application on any dog's profile. Takes 5 minutes." },
    { n: "02", t: "Meet", d: "We schedule a video meet and greet with your potential match." },
    { n: "03", t: "Home check", d: "A few photos or a short video of your space, so we can confirm a safe environment." },
    { n: "04", t: "Welcome home", d: "Sign the adoption agreement, pay the fee, and bring them home. Lifetime support included." },
  ];
  return (
    <section className="process-section">
      <PawS className="paw paw-dark" style={{ top: 60, left: "5%", width: 44, height: 44 }} />
      <PawS className="paw paw-dark" style={{ bottom: 60, right: "6%", width: 52, height: 52 }} />
      <div className="wrap">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 12 }}>✦ How adoption works</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", margin: "0 0 12px", color: "#fff" }}>
            Four steps, one new family member.
          </h2>
          <p style={{ color: "var(--on-dark-2)", fontSize: 15, margin: 0 }}>
            Thorough, because every survivor deserves a forever match.
          </p>
        </div>
        <div className="process-grid">
          {steps.map((s) => (
            <div key={s.n} className="process-step reveal">
              <div className="num">{s.n}</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- FAQ --------------------------------------------------------------- */
const ADOPT_FAQ = [
  {
    q: "Why rescue dogs from China instead of American shelters?",
    a: "We work to save all dogs but have chosen to specialize in dog meat trade rescue because of the tremendous trauma suffered by these survivors. Our partners on the ground conduct high-risk rescues. Every rescued dog goes straight to the veterinarian to receive the care they need. The dogs are then rehabilitated and socialized at our sanctuary in China. When they are ready for their new homes, that's when you as an adopter step in."
  },
  {
    q: "Aren't these dogs too traumatized to be normal pets?",
    a: "Most settle into normal family life faster than people expect. The phrase we use is trauma to trust. A dog who has been caged or abused still wants what every dog wants: a soft bed, a quiet routine, a person who shows up. And most of all, love. We have seen extraordinary transformations in these dogs once they are safe."
  },
  {
    q: "What medical care have they had before adoption?",
    a: "Every dog arrives spayed or neutered, fully vaccinated (DHPP, rabies, bordetella), microchipped, dewormed, and tested for the diseases that matter for international transport (heartworm, distemper, parvo, and the tick-borne panel). Anything chronic is treated or stabilized before they're listed for adoption. The medical history travels with them, and our vet partners are available to your vet for questions after you take them home."
  },
  {
    q: "How are they with kids, other dogs, and cats?",
    a: "It depends on the dog, and we tell you exactly what we know. Every profile is honest about what we have observed at our sanctuary: kids, other dogs, cats, men, women, leashes, stairs, car rides. We never sell a match. If a dog is still working through a fear, we say so, and we match accordingly. The goal isn't to place them fast, it's to place them once."
  },
  {
    q: "What support do I get after I bring them home?",
    a: "Lifetime. That's not a slogan, it's the adoption contract. A dedicated coordinator answers texts and emails for as long as you have the dog. And if life ever changes and you can't keep them, the contract requires the dog comes back to us, never to a shelter. We are their safety net forever."
  },
  {
    q: "How long until they feel like a normal dog at home?",
    a: "The three-three-three rule is a useful sketch: three days to decompress, three weeks to learn your routine, three months to feel fully at home. Some dogs are couch surfing by day two, others quietly observe for a month and then bloom. Both are normal. We coach you through every phase, and we celebrate the small wins with you (the first time they ask to be petted is a real moment)."
  },
];

function AdoptFAQ() {
  const [open, setOpen] = uS(0);
  return (
    <section style={{ background: "var(--lav-50)", padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <PawS className="paw paw-light" style={{ top: 60, left: "5%", width: 44, height: 44 }} />
      <PawS className="paw paw-light" style={{ bottom: 60, right: "6%", width: 52, height: 52 }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
          <div className="eyebrow-dark" style={{ marginBottom: 12 }}>✦ Honest answers</div>
          <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", margin: "0 0 12px", color: "var(--ink)" }}>
            The questions we get asked the most.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
            Hesitation is fair. These dogs have a long story. Here's what we tell every adopter, plainly.
          </p>
        </div>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 14 }}>
          {ADOPT_FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="reveal"
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: isOpen ? "1px solid var(--purple-400)" : "1px solid var(--line-light)",
                  boxShadow: isOpen ? "0 8px 24px rgba(80,40,140,0.10)" : "0 1px 2px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                  transition: "border-color .2s ease, box-shadow .2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{
                    display: "flex", width: "100%", alignItems: "center", gap: 16,
                    padding: "20px 22px", background: "transparent", border: 0, cursor: "pointer",
                    textAlign: "left", color: "var(--ink)",
                    fontFamily: "var(--font-ui)", fontSize: 16, fontWeight: 600, lineHeight: 1.4,
                  }}
                >
                  <span style={{ flex: 1 }}>{item.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: isOpen ? "var(--purple-500)" : "var(--lav-100)",
                      color: isOpen ? "#fff" : "var(--purple-700)",
                      display: "grid", placeItems: "center", flexShrink: 0,
                      transition: "background .2s ease, color .2s ease, transform .25s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: "0 22px 22px",
                    color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65,
                    borderTop: "1px solid var(--lav-100)", paddingTop: 16, marginTop: 0,
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "0 0 14px" }}>
            Still wondering about something specific?
          </p>
          <a href="/contact" className="btn btn-outline-soft">Ask us anything →</a>
        </div>
      </div>
    </section>
  );
}

/* ---- Bottom CTA -------------------------------------------------------- */
function AdoptCTA() {
  return (
    <section style={{ background: "var(--lav-50)", padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <PawS className="paw paw-light" style={{ top: 40, right: "8%", width: 44, height: 44 }} />
      <div className="wrap" style={{ textAlign: "center", maxWidth: 720 }}>
        <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", margin: "0 0 16px", color: "var(--ink)" }}>
          Not ready to adopt?
        </h2>
        <p style={{ fontSize: 16, color: "var(--ink-2)", margin: "0 0 28px", lineHeight: 1.6 }}>
          Foster, sponsor, donate. Each one keeps a survivor moving home.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/foster" className="btn btn-outline-soft">Become a Foster</a>
          <a href="/sponsor" className="btn btn-outline-soft">Sponsor a Dog</a>
          <a href="/donate" className="btn btn-outline-soft">Donate</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AdoptHero, AdoptDirectory, AdoptProcess, AdoptFAQ, AdoptCTA });
