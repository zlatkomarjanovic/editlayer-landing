import styles from "./Section.module.css";

const steps = [
  {
    n: "01",
    title: "Install the package",
    body: (
      <>
        Run <code>npm install @editlayer/next</code> and <code>npx editlayer init</code> inside your Next.js project. The CLI scaffolds the API routes and config file automatically.
      </>
    ),
  },
  {
    n: "02",
    title: "Mark editable fields",
    body: (
      <>
        Wrap any headline, paragraph, or link with <code>{"<EditableText>"}</code>. Keep your existing markup — EditLayer wraps around it, never rewrites it.
      </>
    ),
  },
  {
    n: "03",
    title: "Set env vars, deploy",
    body: "Add your secret, site URL, and Resend API key to Vercel. Add your owner emails. Push. That's the entire backend — no database, no server to run.",
  },
  {
    n: "04",
    title: "Edit live",
    body: (
      <>
        Visit <code>yoursite.com/?edit=true</code>. Enter your email. Click the magic link. Green outlines appear on every editable field. Click, type, save, publish.
      </>
    ),
  },
  {
    n: "05",
    title: "Commit → redeploy",
    body: (
      <>
        Publishing commits <code>editlayer/content.json</code> directly to your GitHub repo via the API. Vercel detects the commit and redeploys automatically.
      </>
    ),
  },
  {
    n: "06",
    title: "Invite your team",
    body: "Add editor emails in your env vars or use the in-site Access panel. Editors save drafts; only owners publish. Role-based, secure by default.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>How it works</p>
        <h2 className={styles.h2}>Simple by design</h2>
        <p className={styles.sub}>No third-party CMS to configure. No schema to model. No pipeline to maintain. Your site is the editor.</p>

        <div className={styles.grid}>
          {steps.map((s) => (
            <div key={s.n} className={styles.card}>
              <div className={styles.stepNum}>{s.n}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
