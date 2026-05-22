/* Adopt page React components */

const { useState: uS, useEffect: uE, useRef: uR, useMemo: uM } = React;

/* Dog dataset */
const DOGS = [
  { id: "bella", name: "Bella", breed: "Jindo Mix", age: "Young", ageN: 2, size: "Medium", energy: "Medium", good: ["dogs", "kids"], location: "CA", status: "available", urgency: null, arrived: "2 weeks ago", isNew: true,
    img: IMG_BANK.dog1, gallery: [IMG_BANK.dog1, IMG_BANK.dog5, IMG_BANK.dog8],
    bio: "Sweet and gentle, Bella is looking for a quiet home where she can feel safe and loved. She walks calmly on leash and adores soft beds and sunny windows.",
    traits: ["Gentle", "House-trained", "Loves belly rubs"], weight: "38 lbs", story: "Rescued from a Seoul meat farm in late 2025, Bella arrived shy but quickly blossomed in her foster home.",
    ratio: "4/5" },
  { id: "max", name: "Max", breed: "Golden Retriever Mix", age: "Adult", ageN: 4, size: "Large", energy: "High", good: ["dogs", "kids", "cats"], location: "NY", status: "available", urgency: null, arrived: "1 month ago",
    img: IMG_BANK.dog2, gallery: [IMG_BANK.dog2, IMG_BANK.dog6],
    bio: "A big goofball who loves everyone he meets. Max is ready for adventures and cuddles, and long hikes are his love language.",
    traits: ["Playful", "Good with cats", "Loves car rides"], weight: "65 lbs", story: "Transported from Yulin to JFK after a partner rescue operation. Max gives zoomies whenever he hears a doorbell.",
    ratio: "4/5" },
  { id: "luna", name: "Luna", breed: "Terrier Mix", age: "Young", ageN: 1, size: "Small", energy: "High", good: ["dogs"], location: "TX", status: "available", urgency: 42, arrived: "3 months ago",
    img: IMG_BANK.dog3, gallery: [IMG_BANK.dog3, IMG_BANK.dog7],
    bio: "Full of energy and spunk! Luna needs an active family to keep up with her playful spirit. She's been waiting a long time.",
    traits: ["Spunky", "Athletic", "Quick learner"], weight: "22 lbs", story: "Luna has been in foster care for 42 days. She's ready for a forever home that loves long walks.",
    ratio: "3/4" },
  { id: "charlie", name: "Charlie", breed: "Corgi Mix", age: "Adult", ageN: 3, size: "Small", energy: "Medium", good: ["dogs", "kids"], location: "CA", status: "available", urgency: null, arrived: "5 weeks ago",
    img: IMG_BANK.dog4, gallery: [IMG_BANK.dog4, IMG_BANK.dog9],
    bio: "Short legs, big heart. Charlie is a loyal companion who loves belly rubs and short walks around the neighborhood.",
    traits: ["Loyal", "Low-key", "Sofa connoisseur"], weight: "28 lbs", story: "Surrendered after a family change, Charlie is a gentle soul who thrives on routine.",
    ratio: "4/5" },
  { id: "willa", name: "Willa", breed: "Lab Mix", age: "Adult", ageN: 5, size: "Large", energy: "Low", good: ["dogs"], location: "CA", status: "available", urgency: 42, arrived: "2 months ago",
    img: IMG_BANK.dog5, gallery: [IMG_BANK.dog5, IMG_BANK.dog1],
    bio: "Shy, gentle, loves other dogs. Working through some kennel fear, needs a patient home with a calm resident dog.",
    traits: ["Gentle", "Quiet", "Needs a dog friend"], weight: "52 lbs", story: "Willa spent three years in a breeding facility before being rescued. She's slowly learning to trust.",
    ratio: "5/4" },
  { id: "daisy", name: "Daisy", breed: "Poodle Mix", age: "Senior", ageN: 8, size: "Small", energy: "Low", good: ["dogs", "kids", "cats"], location: "NY", status: "available", urgency: null, arrived: "3 weeks ago", special: true,
    img: IMG_BANK.dog6, gallery: [IMG_BANK.dog6, IMG_BANK.dog2],
    bio: "Calm, affectionate, and great with kids. Daisy is the perfect addition to any family looking for a gentle senior.",
    traits: ["Affectionate", "Kid-friendly", "Mellow"], weight: "16 lbs", story: "Daisy came to us with mild arthritis but a big heart. She still loves a good nap in a sunbeam.",
    ratio: "4/5" },
  { id: "rocky", name: "Rocky", breed: "Husky Mix", age: "Adult", ageN: 3, size: "Large", energy: "High", good: ["dogs"], location: "WA", status: "available", urgency: null, arrived: "6 weeks ago",
    img: IMG_BANK.dog7, gallery: [IMG_BANK.dog7, IMG_BANK.dog10],
    bio: "Striking blue eyes and a playful personality. Rocky needs space to run and play, ideally with a securely fenced yard.",
    traits: ["Energetic", "Vocal", "Adventure-ready"], weight: "58 lbs", story: "Rocky was pulled from a crowded shelter hours before closing. He's a snow-lover at heart.",
    ratio: "4/5" },
  { id: "otis", name: "Otis", breed: "Beagle Mix", age: "Young", ageN: 2, size: "Medium", energy: "Medium", good: ["dogs", "kids"], location: "TX", status: "available", urgency: 18, arrived: "1 month ago",
    img: IMG_BANK.dog8, gallery: [IMG_BANK.dog8, IMG_BANK.dog3],
    bio: "Survivor of a Seoul slaughterhouse raid. Ready for a forever home in November. Incredibly resilient little guy.",
    traits: ["Resilient", "Curious", "Foodie"], weight: "32 lbs", story: "Otis was one of 47 dogs freed in a coordinated raid. He loves snuffle mats and slow-feeder bowls.",
    ratio: "5/4" },
  { id: "nori", name: "Nori", breed: "Shiba Mix", age: "Puppy", ageN: 0.6, size: "Small", energy: "High", good: ["dogs", "kids"], location: "NY", status: "available", urgency: null, arrived: "1 week ago", isNew: true,
    img: IMG_BANK.dog9, gallery: [IMG_BANK.dog9, IMG_BANK.dog4],
    bio: "Seven-month-old puppy with a fox-like face and endless curiosity. Nori is learning basics and does great in puppy class.",
    traits: ["Puppy energy", "Smart", "Crate-training"], weight: "12 lbs", story: "Nori was rescued with her mother and five siblings. She'll grow into a medium-sized cutie.",
    ratio: "4/5" },
  { id: "bao", name: "Bao", breed: "Chow Mix", age: "Adult", ageN: 4, size: "Medium", energy: "Low", good: ["dogs"], location: "CA", status: "available", urgency: null, arrived: "2 months ago",
    img: IMG_BANK.dog10, gallery: [IMG_BANK.dog10, IMG_BANK.dog11],
    bio: "Serious face, soft heart. Bao is a one-person dog who bonds deeply. Would do best as an only pet in a quiet home.",
    traits: ["Bonded", "Mellow", "Watchful"], weight: "45 lbs", story: "Bao came from a meat market in Guangzhou. After six months of recovery he is finally ready for a home.",
    ratio: "3/4" },
  { id: "juno", name: "Juno", breed: "Mixed Breed", age: "Young", ageN: 2, size: "Medium", energy: "Medium", good: ["dogs", "kids", "cats"], location: "OR", status: "available", urgency: null, arrived: "3 weeks ago",
    img: IMG_BANK.dog11, gallery: [IMG_BANK.dog11, IMG_BANK.dog7],
    bio: "A couch professional in the making. Juno is calm, crate-trained, and gets along with every animal she's met.",
    traits: ["Couch potato", "Easy-going", "Crate-trained"], weight: "40 lbs", story: "Juno was a long-term stray before being transported stateside. She's adjusted beautifully.",
    ratio: "4/5" },
  { id: "mochi", name: "Mochi", breed: "Pom Mix", age: "Senior", ageN: 9, size: "Small", energy: "Low", good: ["dogs", "cats"], location: "CA", status: "available", urgency: null, arrived: "5 weeks ago", special: true,
    img: IMG_BANK.dog12, gallery: [IMG_BANK.dog12, IMG_BANK.dog6],
    bio: "Once too afraid to be touched. Mochi now loves gentle scritches and sleeping on laps. Senior, special-needs home preferred.",
    traits: ["Lap dog", "Shy but sweet", "Senior discount"], weight: "9 lbs", story: "Mochi has some dental issues we're treating. She came around slowly but completely.",
    ratio: "4/5" },
];

const FILTER_OPTS = {
  size: ["Any", "Small", "Medium", "Large"],
  energy: ["Any", "Low", "Medium", "High"],
  good: ["Any", "Kids", "Dogs", "Cats"],
  age: ["Any", "Puppy", "Young", "Adult", "Senior"],
  location: ["Any", "CA", "NY", "TX", "WA", "OR"],
};

/* Palette key used by card background gradients, derived from coat. */
const CARD_BG_PALETTE = {
  cream: "cream", golden: "gold", tan: "gold",
  black: "lavender", husky: "sky", gray: "sky",
  choco: "rose", brindle: "rose", red: "rose",
  tricolor: "sage",
};

/* HERO, Variant A: Filter-led */
function AdoptHero({ variant }) {
  if (variant === "editorial") return <AdoptHeroEditorial />;
  return <AdoptHeroFilter />;
}

function AdoptHeroFilter() {
  return (
    <header className="adopt-hero-filter">
      <PawS className="paw" style={{ top: 80, left: "6%", width: 60, height: 60, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ bottom: 60, right: "8%", width: 72, height: 72, color: "#fff", opacity: 0.1 }} />
      <PawS className="paw" style={{ top: 40, right: "25%", width: 40, height: 40, color: "#fff", opacity: 0.08 }} />

      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto 40px" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 24 }}>✦ Adopt a Survivor</div>
          <h1 className="display" style={{
            fontSize: "clamp(48px, 7.6vw, 104px)", margin: "0 0 20px", color: "#fff",
          }}>Find your next <em>best friend.</em></h1>
          <p style={{ fontSize: 17, color: "var(--on-dark-2)", margin: "0 auto", maxWidth: 560, lineHeight: 1.55 }}>
            Every dog below was pulled from the meat trade, medically cleared, and is ready to come home. Start with a filter, or scroll the whole family.
          </p>
        </div>

        {/* Quick stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 48, marginTop: 40, flexWrap: "wrap",
        }}>
          <HeroStat num={DOGS.length} label="Dogs waiting" />
          <HeroStat num={800} suffix="+" label="Adopted since 2012" />
          <HeroStat num={14} label="Years rescuing" />
          <HeroStat num={2} label="Countries · CN · KR" />
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
  const feat = DOGS.find(d => d.id === "nori") || DOGS[0];
  return (
    <header className="adopt-hero-edit">
      <PawS className="paw" style={{ top: 60, right: "5%", width: 52, height: 52, color: "var(--purple-500)", opacity: 0.15 }} />
      <PawS className="paw" style={{ bottom: 40, left: "4%", width: 44, height: 44, color: "var(--purple-500)", opacity: 0.15 }} />

      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)", gap: 64, alignItems: "center" }} className="hero-grid">
          <div>
            <div className="eyebrow-dark" style={{ color: "var(--purple-600)", marginBottom: 24 }}>✦ This Week's Featured Survivor</div>
            <h1 className="display" style={{
              fontSize: "clamp(44px, 6.8vw, 92px)", margin: "0 0 24px", color: "var(--ink)",
            }}>Meet <em>{feat.name}.</em><br/>She's ready to come home.</h1>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 480, margin: "0 0 28px", lineHeight: 1.6 }}>
              {feat.bio}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <MagneticS><button className="btn btn-accent" onClick={() => document.getElementById("directory").scrollIntoView({behavior:"smooth"})}>Meet {feat.name} <span className="arrow">→</span></button></MagneticS>
              <a href="#directory" className="btn btn-outline-dark">Browse all survivors</a>
            </div>
            <div style={{ display: "flex", gap: 24, fontSize: 13, color: "var(--ink-2)" }}>
              <div><strong style={{ color: "var(--ink)" }}>{feat.age}</strong> · {feat.breed}</div>
              <div>•</div>
              <div><strong style={{ color: "var(--ink)" }}>{feat.size}</strong> · {feat.weight}</div>
              <div>•</div>
              <div><strong style={{ color: "var(--ink)" }}>In foster</strong> · {feat.location}</div>
            </div>
          </div>
          <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", maxHeight: 520, background: "var(--lav-200)" }}>
            <ImgS src={feat.img} alt={feat.name} />
            <div style={{
              position: "absolute", left: 20, bottom: 20,
              background: "rgba(255,255,255,0.95)", color: "var(--ink)",
              padding: "12px 16px", borderRadius: 14,
              fontSize: 12,
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 2 }}>New this week</div>
              <div style={{ fontWeight: 600 }}>{feat.arrived}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* Filter bar with dropdowns + state lifted up via context ish */
const FilterContext = React.createContext(null);

function FilterBar() {
  const ctx = React.useContext(FilterContext);
  if (!ctx) return null; // hero-only presentation
  return <FilterBarInner {...ctx} />;
}

/* Standalone filter bar for hero variant A (decorative but functional scroll target) */
function AdoptHeroFilterWrapped() {
  // Not actually used, FilterBar inside directory owns state.
  return null;
}

/* Streamlined filter: three primary pills with inline option rows.
   Click a pill to toggle its row of options open. No dropdowns. */
function FilterBarInner({ filters, setFilters, count }) {
  const [openRow, setOpenRow] = uS(null);
  const update = (k, v) => setFilters({ ...filters, [k]: v });

  const chips = [
    { key: "size",   label: "Size" },
    { key: "energy", label: "Energy" },
    { key: "good",  label: "Good with" },
  ];
  const anyActive = Object.entries(filters).some(([k, v]) => v && v !== "Any");

  return (
    <div className="filter-bar-v2">
      <div className="filter-row">
        <span className="filter-prompt">Find a match</span>
        {chips.map(c => {
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
          <button onClick={() => { setFilters({ age: "Any", size: "Any", energy: "Any", good: "Any", location: "Any" }); setOpenRow(null); }}
            className="filter-clear">Clear</button>
        )}
        <span className="filter-count">{count} match{count === 1 ? "" : "es"}</span>
      </div>
      {openRow && (
        <div className="filter-options">
          {FILTER_OPTS[openRow].map(opt => (
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

/* Directory section: filter bar + grid + modal */
function AdoptDirectory() {
  const [filters, setFilters] = uS({ age: "Any", size: "Any", energy: "Any", good: "Any", location: "Any" });
  const [sort, setSort] = uS("urgency");
  const [favs, setFavs] = uS(() => {
    try { return JSON.parse(localStorage.getItem("r2r:favs") || "[]"); } catch { return []; }
  });
  const [selectedId, setSelectedId] = uS(null);

  uE(() => { localStorage.setItem("r2r:favs", JSON.stringify(favs)); }, [favs]);

  const filtered = uM(() => {
    let r = DOGS.filter(d => {
      if (filters.age !== "Any" && d.age !== filters.age) return false;
      if (filters.size !== "Any" && d.size !== filters.size) return false;
      if (filters.energy !== "Any" && d.energy !== filters.energy) return false;
      if (filters.good !== "Any" && !d.good.includes(filters.good.toLowerCase())) return false;
      if (filters.location !== "Any" && d.location !== filters.location) return false;
      return true;
    });
    if (sort === "urgency") r = r.sort((a, b) => (b.urgency || 0) - (a.urgency || 0));
    else if (sort === "newest") r = r.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else if (sort === "youngest") r = r.sort((a, b) => a.ageN - b.ageN);
    else if (sort === "oldest") r = r.sort((a, b) => b.ageN - a.ageN);
    return r;
  }, [filters, sort]);

  const selected = DOGS.find(d => d.id === selectedId);

  const toggleFav = (id) => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const activePills = Object.entries(filters).filter(([k, v]) => v && v !== "Any");

  return (
    <section id="directory" className="directory">
      <PawS className="paw paw-light" style={{ top: 40, right: "4%", width: 48, height: 48 }} />
      <div className="wrap">
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20,
          marginBottom: 28,
        }}>
          <div>
            <div className="eyebrow-dark" style={{ marginBottom: 8 }}>Available for adoption</div>
            <h2 className="display" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", margin: 0, color: "var(--ink)" }}>
              {filtered.length} dog{filtered.length === 1 ? "" : "s"} waiting to come home
            </h2>
          </div>
          <SortMenu sort={sort} setSort={setSort} />
        </div>

        <FilterBarInner filters={filters} setFilters={setFilters} count={filtered.length} />

        <div id="grid-anchor" />

        {filtered.length === 0 ? (
          <div style={{
            padding: "80px 20px", textAlign: "center",
            background: "#fff", borderRadius: 20, border: "1px dashed var(--line-light)",
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🐾</div>
            <div className="display" style={{ fontSize: 22, color: "var(--ink)", margin: "0 0 8px" }}>No dogs match those filters.</div>
            <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 16px" }}>Try loosening a filter, or let us know what you're looking for.</p>
            <button className="btn btn-accent" onClick={() => setFilters({ age: "Any", size: "Any", energy: "Any", good: "Any", location: "Any" })}>Clear filters</button>
          </div>
        ) : (
          <div className="dog-grid">
            {filtered.map(d => (
              <DogCard key={d.id} dog={d} fav={favs.includes(d.id)} onFav={() => toggleFav(d.id)} onOpen={() => setSelectedId(d.id)} />
            ))}
          </div>
        )}
      </div>

      {selected && <ProfileModal dog={selected} fav={favs.includes(selected.id)} onFav={() => toggleFav(selected.id)} onClose={() => setSelectedId(null)} />}
    </section>
  );
}

function SortMenu({ sort, setSort }) {
  const opts = [
    ["urgency", "Waiting longest"],
    ["newest", "Just arrived"],
    ["youngest", "Youngest first"],
    ["oldest", "Oldest first"],
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)" }}>Sort</span>
      <select value={sort} onChange={e => setSort(e.target.value)}
        style={{
          background: "#fff", border: "1px solid var(--line-light)", borderRadius: 10,
          padding: "8px 12px", fontSize: 13, color: "var(--ink)", cursor: "pointer", fontFamily: "var(--font-ui)",
        }}>
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );
}

function DogCard({ dog, fav, onFav, onOpen }) {
  return (
    <button className="dog-card reveal" onClick={onOpen}>
      <div className="img-wrap" style={{ aspectRatio: dog.ratio }}>
        <ImgS src={dog.img} alt={dog.name} />
        {dog.urgency && <span className="urgency-pill">{dog.urgency}d waiting</span>}
        {!dog.urgency && dog.isNew && <span className="new-pill">New · {dog.arrived}</span>}
        <span className={`fav-btn ${fav ? "on" : ""}`} onClick={(e) => { e.stopPropagation(); onFav(); }} role="button" aria-label="Favorite">
          {fav ? "♥" : "♡"}
        </span>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <div className="display" style={{ fontSize: 22, color: "var(--ink)" }}>{dog.name}</div>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase" }}>{dog.age}</span>
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--purple-600)", fontWeight: 600, marginBottom: 10 }}>
          {dog.breed}
        </div>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>{dog.bio.length > 110 ? dog.bio.slice(0, 110) + "…" : dog.bio}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {dog.traits.slice(0, 2).map(t => <span key={t} className="trait">{t}</span>)}
          <span style={{ fontSize: 11, color: "var(--ink-3)", alignSelf: "center" }}>· {dog.location}</span>
        </div>
      </div>
    </button>
  );
}

/* Profile modal */
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

  const submit = (e) => {
    e.preventDefault();
    setStep("sent");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <div className="gallery">
          <ImgS src={dog.gallery[photoIdx]} alt={dog.name} />
          {dog.urgency && (
            <span className="urgency-pill" style={{ top: 16, left: 16, fontSize: 11 }}>
              {dog.urgency}d waiting
            </span>
          )}
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 16,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.95)", color: "var(--ink)",
            display: "grid", placeItems: "center", fontSize: 16,
          }} aria-label="Close">✕</button>
          {dog.gallery.length > 1 && (
            <div className="thumb-row">
              {dog.gallery.map((g, i) => (
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
                {dog.breed} · {dog.age}
              </div>

              <div className="stat-pair">
                <div className="sp"><div className="k">Size</div><div className="v">{dog.size} · {dog.weight}</div></div>
                <div className="sp"><div className="k">Energy</div><div className="v">{dog.energy}</div></div>
                <div className="sp"><div className="k">In foster</div><div className="v">{dog.location}</div></div>
                <div className="sp"><div className="k">Good with</div><div className="v" style={{ textTransform: "capitalize" }}>{dog.good.join(", ")}</div></div>
              </div>

              <div className="traits">
                {dog.traits.map(t => <span key={t} className="trait">{t}</span>)}
              </div>

              <p style={{ margin: "0 0 16px", color: "var(--ink-2)", fontSize: 14, lineHeight: 1.6 }}>{dog.bio}</p>
              <p style={{ margin: "0 0 24px", color: "var(--ink-2)", fontSize: 13, lineHeight: 1.6, fontStyle: "italic" }}>{dog.story}</p>

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
              <button type="button" onClick={() => setStep("profile")} style={{ fontSize: 13, color: "var(--purple-600)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>← Back to {dog.name}'s profile</button>
              <h2 className="display" style={{ fontSize: 28, margin: "0 0 6px", color: "var(--ink)" }}>Apply to adopt {dog.name}</h2>
              <p style={{ margin: "0 0 20px", color: "var(--ink-2)", fontSize: 13 }}>We'll review your application within 48 hours. No obligation, this just starts the conversation.</p>

              <FormField label="Full name" required value={form.name} onChange={v => setForm({ ...form, name: v })} />
              <FormField label="Email" type="email" required value={form.email} onChange={v => setForm({ ...form, email: v })} />
              <FormField label="Phone" type="tel" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />

              <label style={formLabelStyle}>Home type</label>
              <div className="segmented" style={{ background: "var(--lav-100)", borderRadius: 10, padding: 3, display: "flex", marginBottom: 16 }}>
                {[["house", "House"], ["apt", "Apartment"], ["other", "Other"]].map(([v, l]) => (
                  <button key={v} type="button" aria-pressed={form.home === v} onClick={() => setForm({ ...form, home: v })}
                    style={{
                      flex: 1, padding: "9px 8px", borderRadius: 7, fontSize: 13,
                      background: form.home === v ? "#fff" : "transparent",
                      color: form.home === v ? "var(--ink)" : "var(--ink-2)",
                      boxShadow: form.home === v ? "var(--shadow-sm)" : "none",
                    }}>{l}</button>
                ))}
              </div>

              <FormField label={`Tell us why ${dog.name} would be a great fit`} textarea value={form.why} onChange={v => setForm({ ...form, why: v })} />

              <button type="submit" className="btn btn-accent" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>Submit application →</button>
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
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
          style={inputStyle} />
      ) : (
        <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)}
          style={inputStyle} />
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

/* Adoption process */
function AdoptProcess() {
  const steps = [
    { n: "01", t: "Apply", d: "Fill out the application on any dog's profile. Takes 5 minutes." },
    { n: "02", t: "Meet", d: "We schedule a video or in-person meet-and-greet with your potential match." },
    { n: "03", t: "Home check", d: "A quick home visit, virtual or in-person, to confirm a safe environment." },
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
            Our process is thorough because every survivor deserves a forever match. It usually takes 1 to 3 weeks start to finish.
          </p>
        </div>
        <div className="process-grid">
          {steps.map(s => (
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

/* Bottom CTA */
function AdoptCTA() {
  return (
    <section style={{ background: "var(--lav-50)", padding: "72px 0", position: "relative", overflow: "hidden" }}>
      <PawS className="paw paw-light" style={{ top: 40, right: "8%", width: 44, height: 44 }} />
      <div className="wrap" style={{ textAlign: "center", maxWidth: 720 }}>
        <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", margin: "0 0 16px", color: "var(--ink)" }}>
          Not ready to adopt, but want to <em style={{ color: "var(--purple-600)" }}>help</em>?
        </h2>
        <p style={{ fontSize: 16, color: "var(--ink-2)", margin: "0 0 28px", lineHeight: 1.6 }}>
          Fostering, sponsoring, and donating all keep our survivors moving toward their forever homes.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <MagneticS><a href="Foster.html" className="btn btn-accent">Become a Foster</a></MagneticS>
          <a href="Sponsor.html" className="btn btn-outline-dark">Sponsor a Dog</a>
          <a href="Donate.html" className="btn btn-outline-dark" style={{ borderColor: "var(--line-light)", color: "var(--ink-2)" }}>Donate</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AdoptHero, AdoptDirectory, AdoptProcess, AdoptCTA });
