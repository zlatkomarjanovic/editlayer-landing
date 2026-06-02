"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [banner, setBanner] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120);
      setScrolled(y > 40);
      lastY.current = y;
      if (menuOpen) setMenuOpen(false);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  function handleSeeDemo(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setMenuOpen(false);
    const outer = document.getElementById("hero-scroll");
    if (!outer) return;
    const target = outer.offsetTop + outer.offsetHeight - window.innerHeight;
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(Math.max(0, target));
    else window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
  }

  return (
    <header className={`${styles.header} ${hidden ? styles.headerHidden : ""} ${scrolled ? styles.headerScrolled : styles.headerTop}`}>
      {banner && (
        <div className={styles.banner}>
          <span className={styles.bannerDot} />
          <span className={styles.bannerText}>
            EditLayer v0.3.1: magic-link auth, editor roles &amp; GitHub autodeploy
          </span>
          <a
            className={styles.bannerLink}
            href="https://www.npmjs.com/package/@editlayer/next"
            target="_blank"
            rel="noreferrer"
          >
            View on npm →
          </a>
          <button className={styles.bannerClose} onClick={() => setBanner(false)} aria-label="Dismiss">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
      <nav className={styles.nav}>
        <a className={styles.logo} href="/">
          <LogoIcon />
          EditLayer
        </a>
        <div className={styles.links}>
          <a className={styles.ghost} href="#how-it-works">How it works</a>
          <a className={styles.ghost} href="#setup">Docs</a>
          <a className={styles.ghost} href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">
            npm
          </a>
          <a className={styles.primary} href="#demo" onClick={handleSeeDemo}>
            See demo
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        {/* Hamburger — mobile only */}
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`${styles.hbar} ${menuOpen ? styles.hbar1Open : ""}`} />
          <span className={`${styles.hbar} ${menuOpen ? styles.hbar2Open : ""}`} />
          <span className={`${styles.hbar} ${menuOpen ? styles.hbar3Open : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.drawer} onClick={() => setMenuOpen(false)}>
          <a className={styles.drawerLink} href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a className={styles.drawerLink} href="#setup" onClick={() => setMenuOpen(false)}>Docs</a>
          <a className={styles.drawerLink} href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>npm</a>
          <a className={styles.drawerPrimary} href="#demo" onClick={handleSeeDemo}>
            See demo →
          </a>
        </div>
      )}
    </header>
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
