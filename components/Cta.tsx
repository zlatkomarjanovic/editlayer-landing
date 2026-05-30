import styles from "./Cta.module.css";

export default function Cta() {
  return (
    <div className={styles.wrap}>
      <div className={styles.glow} />
      <p className={styles.label}>Get started now</p>
      <h2 className={styles.h2}>One command away<br />from a live editor</h2>
      <p className={styles.sub}>
        Your marketing team won&apos;t need to open Cursor again just to change a headline.
      </p>
      <div className={styles.actions}>
        <a className={styles.btnHero} href="#setup">Read the setup guide →</a>
        <a className={styles.btnOutline} href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">
          npm install @editlayer/next
        </a>
      </div>
      <div className={styles.meta}>
        <span className={styles.pill}>v0.3.1</span>
        <span className={styles.muted}>TypeScript · Next.js App Router · MIT</span>
      </div>
    </div>
  );
}
