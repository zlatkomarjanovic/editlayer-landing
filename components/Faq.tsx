"use client";
import { useState } from "react";
import styles from "./Faq.module.css";
import AnimateIn from "./AnimateIn";

const faqs = [
  { q: "Is EditLayer a CMS?", a: "No. EditLayer is a thin editing layer that sits on top of your existing Next.js app. There's no external service, no dashboard, and no content schema. Your content lives in a JSON file committed directly to your GitHub repo." },
  { q: "Where does my content get stored?", a: "In editlayer/content.json inside your own GitHub repository. When you publish, EditLayer commits the file via the GitHub API. Vercel detects the commit and redeploys automatically. You own everything." },
  { q: "What if an editor breaks the site?", a: "Editors can only save drafts — they can't publish. Only owners (set via env vars) can push changes live. Every publish is a real git commit, so you can always revert via GitHub if something goes wrong." },
  { q: "Do I need a database or server?", a: "No. There is zero infrastructure to run. All state lives in your GitHub repo. The only services you need are already part of your stack: Next.js, Vercel, and GitHub." },
  { q: "Which Next.js versions are supported?", a: "EditLayer supports Next.js 13+ with the App Router. It uses React Server Components for content loading and client components for the editing UI. Pages Router is not currently supported." },
  { q: "Is it free? What's the license?", a: "EditLayer is MIT licensed and completely free — forever. It's self-hosted, so there's no subscription, no usage cap, and no vendor lock-in." },
  { q: "How is this different from a headless CMS?", a: "A headless CMS requires a separate service, schema setup, and often a monthly fee. EditLayer requires none of that. Your site is the editor — marketers edit copy directly on the live page, changes deploy via your existing Vercel pipeline." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <AnimateIn>
          <p className={styles.label}>FAQ</p>
          <h2 className={styles.h2}>Frequently asked questions</h2>
          <p className={styles.sub}>Everything you need to know before installing.</p>
        </AnimateIn>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <AnimateIn key={i} delay={i * 40}>
              <div className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}>
                <button className={styles.question} onClick={() => toggle(i)}>
                  <span>{faq.q}</span>
                  <span className={`${styles.icon} ${open === i ? styles.iconOpen : ""}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {open === i && <p className={styles.answer}>{faq.a}</p>}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
