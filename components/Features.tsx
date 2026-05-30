import styles from "./Section.module.css";

const features = [
  { icon: "🔐", title: "Magic link auth", body: "Email-only login with short-lived signed tokens. No passwords, no OAuth config. HTTP-only cookies for sessions." },
  { icon: "✏️", title: "In-page editing", body: "Green outlines on hover. Click to open an inline editor. Live preview of changes before publishing." },
  {
    icon: "🚀",
    title: "GitHub → Vercel",
    body: (<>Publishing commits <code>content.json</code> to your repo. Vercel detects the push and redeploys. Zero extra infra.</>),
  },
  { icon: "👥", title: "Roles & access", body: "Owners publish. Editors save drafts. Add team members via env vars. No database required." },
  { icon: "🛡️", title: "Secure by default", body: "Origin validation, rate limiting, field ID allowlists, content sanitization. Plain text only — no arbitrary HTML." },
  { icon: "📦", title: "Zero dependencies", body: "No CMS subscription. No hosted service. No vendor lock-in. Just an npm package and your existing Vercel project." },
];

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>What you get</p>
        <h2 className={styles.h2}>Everything you need.<br />Nothing you don&apos;t.</h2>
        <p className={styles.sub}>
          Built for developers who want to hand control to their clients — without handing over their codebase.
        </p>

        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.feature}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
