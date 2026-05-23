/* Privacy page — content migrated from the previous run2therescue.org/privacy page,
   restyled to match the refreshed site. */
function PrivacyPage() {
  const sections = [
    {
      h: "1. Information We Collect",
      body: ["We collect information that you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, mailing address, phone number, and payment information."],
    },
    {
      h: "2. How We Use Your Information",
      body: ["We use the information we collect to:"],
      list: [
        "Process and fulfill your orders",
        "Send you order confirmations and updates",
        "Respond to your comments and questions",
        "Improve our website and services",
        "Send you marketing communications (with your consent)",
      ],
    },
    {
      h: "3. Information Sharing",
      body: ["We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential."],
    },
    {
      h: "4. Data Security",
      body: ["We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."],
    },
    {
      h: "5. Your Rights",
      body: ["You have the right to access, update, or delete your personal information at any time. You may also opt out of receiving marketing communications from us."],
    },
    {
      h: "6. Cookies",
      body: ["We use cookies to enhance your experience on our website. You can choose to disable cookies through your browser settings, though this may affect the functionality of the site."],
    },
    {
      h: "7. Changes to This Policy",
      body: ["We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page."],
    },
  ];
  return (
    <>
      <header className="section-dark" style={{ padding: "100px 0 64px", position: "relative", overflow: "hidden" }}>
        <PawS className="paw" style={{ top: 70, right: "8%", width: 60, height: 60, color: "#fff", opacity: 0.1 }} />
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div className="eyebrow" style={{ color: "var(--purple-400)", marginBottom: 14 }}>✦ Legal</div>
          <h1 className="display" style={{ fontSize: "clamp(40px, 6vw, 76px)", margin: "0 0 16px", color: "#fff", lineHeight: 1.0 }}>
            Privacy Policy
          </h1>
          <p style={{ color: "var(--on-dark-2)", fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
            This privacy policy describes how we collect, use, and protect your personal information when you use our website and services.
          </p>
        </div>
      </header>

      <section className="section-light" style={{ padding: "64px 0 96px" }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          {sections.map((s, i) => (
            <div key={i} className="reveal" style={{ marginBottom: 36 }}>
              <h2 className="display" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", margin: "0 0 12px", color: "var(--ink)" }}>
                {s.h}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)", margin: "0 0 10px" }}>{p}</p>
              ))}
              {s.list && (
                <ul style={{ margin: "6px 0 0", paddingLeft: 22, color: "var(--ink-2)", fontSize: 15, lineHeight: 1.7 }}>
                  {s.list.map((li, k) => (
                    <li key={k} style={{ marginBottom: 4 }}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="reveal" style={{ marginBottom: 8 }}>
            <h2 className="display" style={{ fontSize: "clamp(20px, 2.4vw, 28px)", margin: "0 0 12px", color: "var(--ink)" }}>
              8. Contact Us
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)", margin: 0 }}>
              If you have any questions about this Privacy Policy, please reach out through our{" "}
              <a href="Contact.html" style={{ color: "var(--purple-600)", fontWeight: 600 }}>contact page</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { PrivacyPage });
