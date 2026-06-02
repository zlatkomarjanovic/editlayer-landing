import styles from "./Footer.module.css";
import { EditableText } from "@editlayer/next";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#16a34a"/>
              <path d="M8 10h16M8 16h10M8 22h13" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="24" cy="22" r="4" fill="#4ade80"/>
              <path d="M22.5 22l1 1 2-2" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>EditLayer</span>
          </div>
          <p className={styles.tagline}>
            <EditableText id="footer.tagline">Inline content editing for Next.js. No CMS required.</EditableText>
          </p>
          <div className={styles.socialLinks}>
            <a href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer" className={styles.social} aria-label="npm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M0 7.334v8h6.667v1.333H12v-1.333h8V7.334H0zm6.667 6.667H5.333v-4H6.67v4zm4 0V9.001h1.333v4.001h1.334V9.001H15.33v4.001h1.333v-4h1.334v4h1.333V8.001H10.667v5.999zm4.001 0v-4H20v4h-2.332z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}><EditableText id="footer.col0.title">Product</EditableText></h4>
            <a href="#how-it-works">How it works</a>
            <a href="#setup">Setup guide</a>
            <a href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">npm package</a>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}><EditableText id="footer.col1.title">Resources</EditableText></h4>
            <a href="#setup">Documentation</a>
            <a href="#faq">FAQ</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} EditLayer.</span>
        <span><EditableText id="footer.bottom">Built for developers who ship fast.</EditableText></span>
      </div>
    </footer>
  );
}
