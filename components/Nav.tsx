import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <LogoIcon />
        EditLayer
      </div>
      <div className={styles.links}>
        <a className={styles.ghost} href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">npm</a>
        <a className={styles.ghost} href="https://github.com/editlayer" target="_blank" rel="noreferrer">GitHub</a>
        <a className={styles.primary} href="#setup">
          Get started
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </nav>
  );
}

function LogoIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#16a34a"/>
      <path d="M8 10h16M8 16h10M8 22h13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="22" r="4" fill="#4ade80"/>
      <path d="M22.5 22l1 1 2-2" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
