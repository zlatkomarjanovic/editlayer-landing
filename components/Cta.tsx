import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <div className={styles.wrap}>
      <div className={styles.glow} />
      <div className={styles.noise} />
      <p className={styles.label}>Start today</p>
      <h2 className={styles.h2}>One command away<br />from a live editor.</h2>
      <p className={styles.sub}>
        Your marketing team won&apos;t need to open a code editor just to change a headline. Give them the power to edit — safely.
      </p>
      <div className={styles.actions}>
        <a className={styles.btnPrimary} href="#setup">
          Read the setup guide
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a className={styles.btnMono} href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">
          npm install @editlayer/next
        </a>
      </div>
      <div className={styles.meta}>
        <span className={styles.pill}>v0.3.1</span>
        <span className={styles.dot}>·</span>
        <span className={styles.muted}>TypeScript</span>
        <span className={styles.dot}>·</span>
        <span className={styles.muted}>Next.js App Router</span>
        <span className={styles.dot}>·</span>
        <span className={styles.muted}>MIT License</span>
      </div>
    </div>
  );
}
