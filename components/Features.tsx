import styles from "./Section.module.css";
import AnimateIn from "./AnimateIn";

const features = [
  { icon: <LockIcon />,   title: "Magic link auth",   body: "Email-only login with short-lived signed tokens. No passwords, no OAuth config. HTTP-only cookies for sessions." },
  { icon: <PenIcon />,    title: "In-page editing",   body: "Green outlines on hover. Click to open an inline editor. Live preview of changes before publishing." },
  { icon: <RocketIcon />, title: "GitHub → Vercel",   body: (<>Publishing commits <code>content.json</code> to your repo. Vercel detects the push and redeploys. Zero extra infra.</>) },
  { icon: <UsersIcon />,  title: "Roles & access",    body: "Owners publish. Editors save drafts. Add team members via env vars. No database required." },
  { icon: <ShieldIcon />, title: "Secure by default", body: "Origin validation, rate limiting, field ID allowlists, content sanitization. Plain text only, no arbitrary HTML." },
  { icon: <BoxIcon />,    title: "Zero dependencies", body: "No CMS subscription. No hosted service. No vendor lock-in. Just an npm package and your existing Vercel project." },
];

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <AnimateIn>
          <p className={styles.label}>What you get</p>
          <h2 className={styles.h2}>Everything you need.<br />Nothing you don&apos;t.</h2>
          <p className={styles.sub}>Built for developers who want to hand editing control to their clients, without handing over their codebase.</p>
        </AnimateIn>

        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <AnimateIn key={f.title} delay={i * 60}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBody}>{f.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function LockIcon()   { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>; }
function PenIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>; }
function RocketIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>; }
function UsersIcon()  { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>; }
function ShieldIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function BoxIcon()    { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>; }
