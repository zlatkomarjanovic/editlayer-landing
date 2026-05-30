import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#16a34a"/>
          <path d="M8 10h16M8 16h10M8 22h13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        EditLayer
      </div>
      <div className={styles.links}>
        <a href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">npm</a>
        <a href="https://github.com/editlayer" target="_blank" rel="noreferrer">GitHub</a>
        <a href="#setup">Docs</a>
      </div>
      <p className={styles.copy}>MIT License · Built for developers</p>
    </footer>
  );
}
