"use client";

import { useState } from "react";
import styles from "./Setup.module.css";
import { EditableText } from "@editlayer/next";

const CURSOR_PROMPT = `I have installed @editlayer/next (v0.3.1) in this Next.js App Router project. Your task is to complete the full integration following the exact pattern documented below. Do not deviate from these conventions.

━━ PACKAGE OVERVIEW ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

@editlayer/next is a self-hosted visual editing layer. It reads content from
editlayer/content.json at build time and writes back to it via GitHub API on publish.
There is no database, no external dashboard, and no CMS. All configuration is via
environment variables already added to .env.local and Vercel.

━━ STEP 1: ENSURE API ROUTES EXIST ━━━━━━━━━━━━━━━━━━━━

Check whether app/api/editlayer/ exists with these route files:
  login/route.ts, verify/route.ts, session/route.ts,
  logout/route.ts, publish/route.ts, drafts/route.ts

If any are missing, run: npx editlayer init
Each route file must export the corresponding handler from @editlayer/next/server:

  // app/api/editlayer/login/route.ts
  export { handleEditLayerLogin as POST } from "@editlayer/next/server"

  // app/api/editlayer/verify/route.ts
  export { handleEditLayerVerify as GET } from "@editlayer/next/server"

  // app/api/editlayer/session/route.ts
  export { handleEditLayerSession as GET } from "@editlayer/next/server"

  // app/api/editlayer/logout/route.ts
  export { handleEditLayerLogout as POST } from "@editlayer/next/server"

  // app/api/editlayer/publish/route.ts
  export { handleEditLayerPublish as POST } from "@editlayer/next/server"

  // app/api/editlayer/drafts/route.ts
  export { handleEditLayerDrafts as GET, handleEditLayerDrafts as POST } from "@editlayer/next/server"

━━ STEP 2: WRAP ROOT LAYOUT ━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open app/layout.tsx. Add the provider wrapper:

  import { EditLayerProvider } from "@editlayer/next"
  import { loadEditLayerContent } from "@editlayer/next/server"

  export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const content = await loadEditLayerContent()
    return (
      <html lang="en">
        <body>
          <EditLayerProvider content={content}>
            {children}
          </EditLayerProvider>
        </body>
      </html>
    )
  }

Do not remove any existing providers or imports — wrap them inside EditLayerProvider.

━━ STEP 3: MARK EDITABLE CONTENT ━━━━━━━━━━━━━━━━━━━━━━

Scan every .tsx and .jsx file in app/ and components/ for hardcoded marketing copy:
  - h1, h2, h3, h4 headings
  - p paragraph text (marketing, not UI labels)
  - Button/link labels, nav item labels, CTA text
  - Section titles, feature names, testimonial quotes
  - Footer text

Convert each to EditableText using this exact pattern:

  BEFORE: <h1 className="...">Your headline here</h1>
  AFTER:  <EditableText id="home.hero.title" as="h1" className="...">Your headline here</EditableText>

  BEFORE: <p className="...">Subheading copy</p>
  AFTER:  <EditableText id="home.hero.subtitle" as="p" className="...">Subheading copy</EditableText>

ID naming convention: "[page].[section].[field]"
  Examples: home.hero.title, home.hero.cta, pricing.header.subtitle,
            about.team.description, nav.cta.label, footer.tagline

Import at top of each file:
  import { EditableText, EditableLink } from "@editlayer/next"

For anchor tags and buttons with href:
  BEFORE: <a href="/contact" className="...">Book a call</a>
  AFTER:  <EditableLink id="home.hero.cta" href="/contact" className="...">Book a call</EditableLink>

IMPORTANT RULES:
  - Keep all existing className, style, and other props untouched
  - Only replace the text node, not the element structure
  - Do not wrap complex children (icons + text) — only wrap pure text strings
  - Do not touch code comments, console.log strings, or non-visible strings

━━ STEP 4: UPDATE content.json ━━━━━━━━━━━━━━━━━━━━━━━━

Create or update editlayer/content.json with the default value for every field you marked:

  {
    "version": 1,
    "fields": {
      "home.hero.title": "Your original headline text",
      "home.hero.subtitle": "Your original subheading text",
      ...all other fields you converted...
    },
    "meta": {
      "updatedAt": "[current ISO timestamp]",
      "updatedBy": "init",
      "commitSha": null
    }
  }

━━ DONE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After completing all steps, tell me:
  1. How many fields were marked editable across how many files
  2. Any files you skipped and why
  3. Confirm the API routes are in place`;

// Syntax-highlighted HTML for each code block (developer-authored, not user input — safe to use dangerouslySetInnerHTML)
const CODE_BLOCKS: Record<string, string> = {
  install: `<span class="c"># Inside your Next.js project</span>
npm install <span class="s">@editlayer/next</span>
npx editlayer init

<span class="c"># Creates editlayer.config.ts, editlayer/content.json,
# and scaffolds the API routes in app/api/editlayer/</span>`,

  envvars: `<span class="c"># .env.local — and add to Vercel → Settings → Environment Variables</span>

<span class="c"># Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"</span>
<span class="p">EDITLAYER_SECRET</span>=<span class="s">your-32-char-random-secret</span>
<span class="p">EDITLAYER_SITE_URL</span>=<span class="s">https://yoursite.com</span>

<span class="c"># Magic link emails — free tier at resend.com</span>
<span class="p">EDITLAYER_RESEND_API_KEY</span>=<span class="s">re_xxxxxxxxxxxx</span>
<span class="p">EDITLAYER_EMAIL_FROM</span>=<span class="s">EditLayer &lt;edit@yoursite.com&gt;</span>

<span class="c"># Who can log in and publish vs. draft-only</span>
<span class="p">EDITLAYER_OWNERS</span>=<span class="s">owner@yoursite.com</span>
<span class="p">EDITLAYER_EDITORS</span>=<span class="s">marketing@yoursite.com</span>

<span class="c"># GitHub fine-grained token — repo contents read/write</span>
<span class="p">EDITLAYER_GITHUB_TOKEN</span>=<span class="s">github_pat_xxxx</span>
<span class="p">EDITLAYER_GITHUB_REPO</span>=<span class="s">yourname/your-repo</span>`,

  layout: `<span class="c">// app/layout.tsx</span>
<span class="k">import</span> { EditLayerProvider } <span class="k">from</span> <span class="s">"@editlayer/next"</span>
<span class="k">import</span> { loadEditLayerContent } <span class="k">from</span> <span class="s">"@editlayer/next/server"</span>

<span class="k">export default async function</span> <span class="p">RootLayout</span>({ children }) {
  <span class="k">const</span> content = <span class="k">await</span> <span class="p">loadEditLayerContent</span>()
  <span class="k">return</span> (
    <span class="t">&lt;html&gt;&lt;body&gt;</span>
      <span class="t">&lt;EditLayerProvider</span> <span class="p">content</span>={content}<span class="t">&gt;</span>
        {children}
      <span class="t">&lt;/EditLayerProvider&gt;</span>
    <span class="t">&lt;/body&gt;&lt;/html&gt;</span>
  )
}`,

  marking: `<span class="c">// Any component — wrap static copy, keep everything else</span>
<span class="k">import</span> { EditableText, EditableLink } <span class="k">from</span> <span class="s">"@editlayer/next"</span>

<span class="k">export function</span> <span class="p">Hero</span>() {
  <span class="k">return</span> (
    <span class="t">&lt;section&gt;</span>
      <span class="t">&lt;EditableText</span> <span class="p">id</span>=<span class="s">"home.hero.title"</span> <span class="p">as</span>=<span class="s">"h1"</span><span class="t">&gt;</span>
        Your original headline
      <span class="t">&lt;/EditableText&gt;</span>

      <span class="t">&lt;EditableText</span> <span class="p">id</span>=<span class="s">"home.hero.sub"</span> <span class="p">as</span>=<span class="s">"p"</span><span class="t">&gt;</span>
        Your original subheadline
      <span class="t">&lt;/EditableText&gt;</span>

      <span class="t">&lt;EditableLink</span> <span class="p">id</span>=<span class="s">"home.hero.cta"</span> <span class="p">href</span>=<span class="s">"/contact"</span><span class="t">&gt;</span>
        Book a call
      <span class="t">&lt;/EditableLink&gt;</span>
    <span class="t">&lt;/section&gt;</span>
  )
}`,

  deploy: `<span class="c"># Push to GitHub — Vercel deploys automatically</span>
git add .
git commit -m <span class="s">"Add EditLayer"</span>
git push

<span class="c"># Then visit your live site with ?edit=true
# → Enter your owner email
# → Click the magic link in your inbox
# → Green outlines appear on every editable field
# → Click any field, edit, Save Draft or Publish
# → Publish commits content.json → Vercel redeploys</span>`,
};

interface CardProps {
  step: string;
  title: string;
  codeKey: string;
}

function Card({ step, title, codeKey }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <span className={styles.cardStep}>{step}</span>
      </div>
      <pre
        className={styles.pre}
        dangerouslySetInnerHTML={{ __html: CODE_BLOCKS[codeKey] }}
      />
    </div>
  );
}

function CopyPromptCard() {
  const [state, setState] = useState<"idle" | "copied">("idle");

  function copy() {
    navigator.clipboard.writeText(CURSOR_PROMPT).then(() => {
      setState("copied");
      setTimeout(() => setState("idle"), 2500);
    });
  }

  return (
    <div className={styles.cursorCard}>
      <div className={styles.cursorHeader}>
        <span className={styles.cursorTitle}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Option A: Paste into Cursor AI and it wires everything automatically
        </span>
        <span className={styles.recommended}>Recommended</span>
      </div>
      <p className={styles.cursorDesc}>
        Open Cursor, start a new chat, and paste the prompt below. The agent will wrap your layout,
        find every hardcoded string, and convert them to{" "}
        <code className={styles.ic}>&lt;EditableText&gt;</code> components across your entire project.
      </p>
      <div className={styles.promptWrap}>
        <div className={styles.promptLabel}>CURSOR PROMPT</div>
        <pre className={styles.prompt}>{CURSOR_PROMPT}</pre>
        <button className={styles.copyPromptBtn} onClick={copy}>
          {state === "copied" ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Setup() {
  return (
    <section className={styles.section} id="setup">
      <div className={styles.inner}>
        <p className={styles.label}><EditableText id="setup.label">Setup guide</EditableText></p>
        <h2 className={styles.h2}>
          <EditableText id="setup.title">From zero to editable in under 5 minutes</EditableText>
        </h2>
        <p className={styles.sub}>
          <EditableText id="setup.sub">Copy, paste, deploy. Every command and env var you need. Nothing more.</EditableText>
        </p>

        <div className={styles.cards}>
          <Card step="Step 1" title="Install & init" codeKey="install" />
          <Card step="Step 2" title="Environment variables" codeKey="envvars" />
          <CopyPromptCard />
          <div className={styles.orDivider}>
            <div className={styles.orLine} />
            <span>OR DO IT MANUALLY: STEPS 3 &amp; 4 BELOW</span>
            <div className={styles.orLine} />
          </div>
          <Card step="Step 3" title="Wrap your root layout" codeKey="layout" />
          <Card step="Step 4" title="Mark your content editable" codeKey="marking" />
          <Card step="Step 5" title="Deploy, then edit" codeKey="deploy" />
        </div>
      </div>
    </section>
  );
}
