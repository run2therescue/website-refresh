/* News page, In The Press */

const FEATURED = {
  eyebrow: "Featured Story",
  title: "'Broken' Dog Who Spent His Life In A Cage Has No Idea He's A Little Different",
  blurb: "Kronk's story is a reminder that even after trauma, a hopeful spirit can shine. Follow his journey from rescue to healing and finally, a safe home.",
  youtubeId: "tjAKV840UpI",
  href: "https://www.thedodo.com/daily-dodo/broken-dog-who-spent-his-life-in-a-cage-has-no-idea-hes-a-little-different",
  ctaLabel: "Read the full story on the Dodo",
};

const PRESS = [
  {
    id: "patch-forgotten-dogs",
    source: "Patch",
    title: "ARF Hamptons Welcomes Abandoned, 'Forgotten Dogs Of China'",
    excerpt: "Patch covers the \"Forgotten Dogs of China\", four French Bulldogs rescued from a slaughterhouse outside Wuhan, stranded for years mid-rescue, and finally brought to safety at ARF Hamptons through a partnership led by Run 2 The Rescue.",
    href: "https://patch.com/new-york/easthampton/arf-hamptons-welcomes-abandoned-forgotten-dogs-china",
    date: "Apr 16, 2025",
  },
  {
    id: "people-kronk",
    source: "People",
    title: "Injured Malamute with a Crooked Head and Sideways Walk Transforms After His Rescue from Dog Meat Trade",
    excerpt: "Run 2 The Rescue helped Kronk the dog recuperate in China before flying the canine to the U.S. to find a forever home.",
    href: "https://people.com/injured-malamute-with-crooked-head-transforms-after-dog-meat-farm-rescue-11904110",
    date: "2025",
  },
  {
    id: "nypost-nyers",
    source: "New York Post",
    title: "Meet the NYers Saving Hundreds of Adorable Dogs From Ending Up on the Menu",
    excerpt: "The New York Post profiles the New Yorkers behind Run 2 The Rescue and their mission to pull dogs out of the East Asia meat trade and into forever homes.",
    href: "https://nypost.com/2026/04/26/us-news/meet-the-nyers-saving-hundreds-of-adorable-dogs-from-ending-up-on-the-menu/",
    date: "Apr 26, 2026",
  },
  {
    id: "lipress-advocate",
    source: "Long Island Press",
    title: "How a Long Island Advocate Is Rescuing Dogs From the Global Meat Trade",
    excerpt: "Long Island Press features the local advocate driving Run 2 The Rescue's work against the global dog meat trade.",
    href: "https://www.longislandpress.com/2026/01/27/how-a-long-island-advocate-is-rescuing-dogs-from-the-global-meat-trade/",
    date: "Jan 27, 2026",
  },
];

function NewsPage() {
  return (
    <>
      <header className="news-hero">
        <PawS className="paw" style={{ top: 80, left: "6%", width: 56, height: 56, color: "#fff", opacity: 0.1 }} />
        <PawS className="paw" style={{ bottom: 40, right: "8%", width: 72, height: 72, color: "#fff", opacity: 0.1 }} />
        <div className="wrap" style={{ maxWidth: 820, textAlign: "center", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 16 }}>✦ Media Coverage</div>
          <h1 className="display" style={{ fontSize: "clamp(48px, 7vw, 96px)", margin: "0 0 18px", color: "#fff", lineHeight: 0.98 }}>
            In <em>The Press.</em>
          </h1>
          <p style={{ fontSize: 17, color: "var(--on-dark-2)", margin: "0 auto", lineHeight: 1.55, maxWidth: 580 }}>
            Stories from our rescue work, as told by the journalists covering the dog meat trade and the dogs who made it home.
          </p>
        </div>
      </header>

      <section className="featured-story-section">
        <div className="wrap">
          <article className="featured-story reveal">
            <div className="featured-eyebrow">✦ {FEATURED.eyebrow}</div>
            <h2 className="featured-title">{FEATURED.title}</h2>
            <div className="featured-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${FEATURED.youtubeId}?rel=0`}
                title={FEATURED.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="featured-blurb">{FEATURED.blurb}</p>
            <a className="btn btn-accent featured-cta" href={FEATURED.href} target="_blank" rel="noopener noreferrer">
              {FEATURED.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ marginLeft: 8 }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </article>
        </div>
      </section>

      <section className="press-section">
        <div className="wrap">
          <div className="press-section-heading">
            <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 10 }}>✦ More Coverage</div>
            <h2 className="press-section-title">Other stories in the press.</h2>
          </div>
          <div className="press-grid">
            {PRESS.map(p => (
              <a key={p.id} className="press-card reveal" href={p.href} target="_blank" rel="noopener noreferrer">
                <div className="press-source">{p.source}</div>
                <h2 className="press-title">{p.title}</h2>
                <p className="press-excerpt">{p.excerpt}</p>
                <div className="press-cta">
                  Read article
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 17L17 7" />
                    <polyline points="8 7 17 7 17 16" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="press-newsletter">
        <div className="wrap">
          <div className="newsletter-box reveal">
            <div>
              <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 10 }}>✦ Newsletter</div>
              <h3 className="headline">Get the monthly Survivor Circle.</h3>
              <p style={{ color: "var(--on-dark-2)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>
                One letter a month. New arrivals, field updates, and the occasional happy-ending photo that'll ruin your workday in the best way.
              </p>
            </div>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input type="email" placeholder="your@email.com" className="input-dark" style={{ flex: "1 1 200px", minWidth: 180 }} />
              <button type="submit" className="btn btn-accent">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { NewsPage });
