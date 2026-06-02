import styles from "./HowItWorks.module.css";
import AnimateIn from "./AnimateIn";

const steps = [
  { n: "01", title: "Install the package",   body: "Run one command to install and scaffold. The CLI creates the API routes and config file automatically. Nothing to build from scratch.", tag: "npm install @editlayer/next" },
  { n: "02", title: "Mark editable content", body: "Wrap any headline, paragraph, or link with EditableText. Keep your existing className and styles. EditLayer wraps around them, never rewrites them.", tag: "<EditableText id=\"...\">" },
  { n: "03", title: "Set env vars & deploy", body: "Add your secret, site URL, Resend API key, and GitHub token to Vercel. Push to GitHub. That's the entire backend.", tag: "4 env vars" },
  { n: "04", title: "Open edit mode",        body: "Visit yoursite.com/?edit=true. Enter your email, click the magic link. Green outlines appear on every editable field immediately.", tag: "?edit=true" },
  { n: "05", title: "Click, type, publish",  body: "Click any field to edit inline. See the live preview as you type. Save a draft to share, or hit Publish to commit directly to GitHub.", tag: "git commit" },
  { n: "06", title: "Vercel redeploys",      body: "Publishing writes editlayer/content.json to your repo via the GitHub API. Vercel detects the commit and redeploys automatically.", tag: "zero infra" },
];

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <AnimateIn>
          <div className={styles.header}>
            <p className={styles.label}>How it works</p>
            <h2 className={styles.h2}>Up and running in minutes.</h2>
            <p className={styles.sub}>Six steps from install to live editing. No database, no third-party CMS, no pipeline changes.</p>
          </div>
        </AnimateIn>

        <AnimateIn delay={120}>
          <div className={styles.grid}>
            {steps.map((s) => (
              <div key={s.n} className={styles.step}>
                <div className={styles.stepTop}>
                  <span className={styles.num}>{s.n}</span>
                  {s.tag && <code className={styles.tag}>{s.tag}</code>}
                </div>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.body}>{s.body}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
