import styles from "./Cta.module.css";
import { EditableText } from "@editlayer/next";

export default function Cta() {
  return (
    <div className={styles.wrap}>
      <div className={styles.glow} />
      <div className={styles.noise} />
      <p className={styles.label}><EditableText id="cta.label">Start today</EditableText></p>
      <h2 className={styles.h2}>
        <EditableText id="cta.title.line1">One command away from a</EditableText>
        <br />
        <span className={styles.h2Serif}>
          <EditableText id="cta.title.line2">live editor.</EditableText>
        </span>
      </h2>
      <p className={styles.sub}>
        <EditableText id="cta.sub">Your marketing team won&apos;t need to open a code editor just to change a headline. Give them the power to edit, safely.</EditableText>
      </p>
      <div className={styles.actions}>
        <a className={styles.btnPrimary} href="#setup">
          <EditableText id="cta.cta.primary">Read the setup guide</EditableText>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <a className={styles.btnMono} href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">
          <EditableText id="cta.cta.secondary">npm install @editlayer/next</EditableText>
        </a>
      </div>
      <div className={styles.meta}>
        <span className={styles.pill}>v0.3.1</span>
        <span className={styles.dot}>·</span>
        <span className={styles.muted}>TypeScript</span>
        <span className={styles.dot}>·</span>
        <span className={styles.muted}>Next.js App Router</span>
      </div>
    </div>
  );
}
