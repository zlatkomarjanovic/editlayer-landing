"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText("npm install @editlayer/next").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className={styles.hero}>
      <div className={styles.badge}>
        <span className={styles.dot} /> Self-hosted · No database · No CMS
      </div>

      <h1 className={styles.h1}>
        Your Next.js site.<br />Edited <em className={styles.em}>live</em> by your team.
      </h1>

      <p className={styles.sub}>
        Add{" "}
        <code className={styles.code}>?edit=true</code>
        {" "}to any URL. Log in with a magic link. Edit your headlines, CTAs, and copy
        directly on the page. Publish and Vercel redeploys automatically — no CMS, no
        dashboard, no compromise.
      </p>

      <div className={styles.actions}>
        <a className={styles.btnHero} href="#setup">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Set up in 5 minutes
        </a>
        <a className={styles.btnOutline} href="https://www.npmjs.com/package/@editlayer/next" target="_blank" rel="noreferrer">
          <NpmIcon />
          View on npm
        </a>
      </div>

      <button className={styles.install} onClick={copy}>
        <span className={styles.cmd}>npm install @editlayer/next</span>
        {copied ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
          </svg>
        )}
      </button>
    </div>
  );
}

function NpmIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0zm6.5 6.5h11v11H6.5z"/>
      <path d="M11 11h3.5v3.5H11z" fill="#080808"/>
    </svg>
  );
}
