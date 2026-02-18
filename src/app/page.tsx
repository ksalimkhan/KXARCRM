import styles from "./landing.module.css";

export default function LandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.logoDot} />
          <span>KXARCRM</span>
        </div>

        <nav className={styles.navLinks}>
          {/* placeholders for now */}
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a className={styles.secondary} href="/login"> 
            Sign in
          </a>
        </nav>
      </header>

      <main className={styles.container}>
        <section className={styles.hero}>
          <div>
            <h1 className={styles.h1}>Run your CRM like a cockpit.</h1>
            <p className={styles.sub}>
              KXARCRM helps you track customers, manage pipelines, and keep your team aligned —
              with a clean UI and fast workflows.
            </p>

            <div className={styles.ctas}>
              {/* keep as # for now; we’ll wire routing later */}
              <a className={styles.primary} href="#">
                Get started
              </a>
              <a className={styles.secondary} href="#features">
                See features
              </a>
            </div>

            <div id="features" className={styles.cardGrid}>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Pipelines</p>
                <p className={styles.cardText}>
                  Move deals across stages with clarity and speed.
                </p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Contacts</p>
                <p className={styles.cardText}>
                  Keep customer context in one place — notes, history, and status.
                </p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitle}>Insights</p>
                <p className={styles.cardText}>
                  Lightweight reporting to spot trends and stay on target.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.mock} aria-label="App preview mock">
            <div className={styles.mockTop}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.mockLine} style={{ width: "70%" }} />
            <div className={styles.mockLine} style={{ width: "90%" }} />
            <div className={styles.mockLine} style={{ width: "55%" }} />
            <div className={styles.mockLine} style={{ width: "80%" }} />
            <div className={styles.mockLine} style={{ width: "62%" }} />
          </div>
        </section>

        <section id="pricing" style={{ marginTop: 28, opacity: 0.9 }}>
          <h2 style={{ margin: "18px 0 8px" }}>Pricing (placeholder)</h2>
          <p style={{ color: "rgba(232, 238, 252, 0.75)", lineHeight: 1.6 }}>
            We’ll fill this in later. For now, this section proves scrolling/nav anchors work.
          </p>
        </section>

        <section id="contact" style={{ marginTop: 28, opacity: 0.9 }}>
          <h2 style={{ margin: "18px 0 8px" }}>Contact (placeholder)</h2>
          <p style={{ color: "rgba(232, 238, 252, 0.75)", lineHeight: 1.6 }}>
            Add an email, demo request form, or link to your team later.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} KXARCRM — All rights reserved.
      </footer>
    </div>
  );
}
