"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";
import { EditableText } from "@editlayer/next";

const FROM_HEADLINE = "Build Something Amazing";
const TO_HEADLINE   = "Ship Marketing Copy Fast";
const SUBTITLE      = "The modern platform for teams that move fast. Launch landing pages and edit copy without waiting on engineering.";
const FROM_CTA      = "Get Started Free";
const TO_CTA        = "Start for Free Today";

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef     = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const demoRef     = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // ── GSAP scroll animation ─────────────────────────────────────────────────
  // NOTE: pinning is done with CSS `position: sticky` (see .stickyStage), NOT
  // GSAP `pin: true`. GSAP's pin injects a pin-spacer <div> around the node,
  // which React doesn't know about — that mismatch is what throws the
  // "removeChild ... not a child of this node" NotFoundError on re-render.
  // Here ScrollTrigger only scrubs progress; it never mutates the DOM.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const content = contentRef.current!;
      const demo    = demoRef.current!;

      // All positions/scales are measured live (re-evaluated on every refresh).
      // Demo is now responsive (CSS width: 100%), so we read actual dimensions
      // instead of assuming a fixed 1440×600 canvas.
      const m = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const isMobile = vw < 768;

        // Measure the real demo size (after CSS sets responsive width).
        const dw = demo.offsetWidth  || 1;
        const dh = demo.offsetHeight || 1;

        // How much to scale so the demo fits within the viewport with gaps.
        const topGap = 60;
        const botGap = isMobile ? 12 : 28;
        const sidePad = isMobile ? 12 : 48;
        const fitW = (vw - sidePad * 2) / dw;
        const fitH = (vh - topGap - botGap) / dh;

        // Since CSS already caps demo width to the viewport, fitW ≈ 1 on most
        // screens — scale is driven almost entirely by height.
        const endScale = Math.min(fitW, fitH, 1);
        const endY = topGap;

        // Preview: peek below hero text, no over-scale needed.
        const startScale = Math.min(fitW, 1);
        const contentBottom = content.offsetTop + content.offsetHeight;
        const startY = contentBottom + (isMobile ? 48 : 80);

        return { startScale, startY, endScale, endY };
      };

      // Entrance: fade+rise the hero text in on mount (GSAP owns the transform
      // on this element — no CSS animation here to avoid conflicts).
      gsap.from(content, { opacity: 0, y: 18, duration: 0.65, ease: "power2.out", clearProps: "y" });

      gsap.set(demo, {
        transformOrigin: "top center",
        y:     () => m().startY,
        scale: () => m().startScale,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Text: scale down + blur behind the dashboard — done by ~28% of scroll.
      tl.to(content, {
        opacity: 0,
        filter: "blur(20px)",
        scale: 0.66,
        y: -44,
        ease: "none",
        duration: 0.28,
      }, 0);

      tl.fromTo(demo,
        { y: () => m().startY, scale: () => m().startScale },
        { y: () => m().endY,   scale: () => m().endScale, ease: "none", duration: 0.28 },
        0,
      );

      // Tiny hold (0.04) so the last rendered frame is fully settled, then the
      // heroScroll track ends and the next section scrolls in immediately.
      tl.to({}, { duration: 0.04 });
    }, heroRef);

    // Recompute once everything (fonts/images) has settled.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert(); // kills all tweens + the ScrollTrigger cleanly
    };
  }, []);

  function copy() {
    navigator.clipboard.writeText("npm install @editlayer/next").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section ref={heroRef} className={styles.heroScroll} id="hero-scroll">
      {/* Sticky stage: pinned via CSS for the full scroll track (200vh) */}
      <div className={styles.stickyStage}>
        <div className={styles.glowBg} />
        <div className={styles.dotGrid} />

        {/* ── Text — GSAP blurs + scales this out ── */}
        <div ref={contentRef} className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <EditableText id="home.hero.eyebrow">Visual UI for NextJS websites</EditableText>
        </div>

        <h1 className={styles.h1}>
          <EditableText id="home.hero.title.line1">Your Next.js site.</EditableText><br />
          <span className={styles.h1Serif}>Edited <em className={styles.em}>live</em> by your team.</span>
        </h1>

        <p className={styles.sub}>
          Add <code className={styles.ic}>?edit=true</code> to any URL. Log in with a magic link.{" "}
          <EditableText id="home.hero.sub">Edit headlines, CTAs, and copy directly on the page. Vercel redeploys automatically on publish.</EditableText>
        </p>

        <div className={styles.ctaRow}>
          <a className={styles.btnPrimary} href="#setup">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <EditableText id="home.hero.cta.primary">See detailed instructions</EditableText>
          </a>
          <button className={styles.install} onClick={copy}>
            <span className={styles.dollar}>$</span>
            <span className={styles.cmd}><EditableText id="home.hero.install.cmd">npm install @editlayer/next</EditableText></span>
            <span className={styles.copyBtn}>
              {copied
                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/></svg>}
            </span>
          </button>
        </div>

        <p className={styles.scrollHint}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Scroll to reveal the demo
        </p>
      </div>

        {/* ── Demo — GSAP rises this from below ── */}
        <div className={styles.demoWrap}>
          <div id="demo" ref={demoRef} className={styles.demoInner}>
            <EditLayerDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Interactive EditLayer Demo ────────────────────────────────────────────────
type FId =
  | "home.hero.eyebrow"
  | "home.hero.title"
  | "home.hero.sub"
  | "home.hero.cta"
  | "home.hero.cta2"
  | "home.feat.0"
  | "home.feat.1"
  | "home.feat.2"
  | "home.trust";

type EKind = "eyebrow" | "large" | "sub" | "cta" | "ctaGhost" | "feat" | "trust";

const DEFAULTS: Record<FId, string> = {
  "home.hero.eyebrow": "✦  Prism 2.0, now in public beta",
  "home.hero.title":   FROM_HEADLINE,
  "home.hero.sub":     SUBTITLE,
  "home.hero.cta":     FROM_CTA,
  "home.hero.cta2":    "Book a demo",
  "home.feat.0":       "No-code page builder",
  "home.feat.1":       "Realtime collaboration",
  "home.feat.2":       "One-click Vercel deploys",
  "home.trust":        "Trusted by 2,000+ product teams",
};

const PUB_STEPS = [
  "Committing content.json to GitHub…",
  "Vercel build triggered…",
  "Build complete · redeploying…",
  "✓ Live! Reload to see changes.",
];

function EditLayerDemo() {
  const shellRef    = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef      = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const timers      = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hovRef      = useRef(false);
  const saveButtonRef    = useRef<HTMLButtonElement>(null);
  const publishButtonRef = useRef<HTMLButtonElement>(null);

  const [isHov,      setIsHov]      = useState(false);
  const [curX,       setCurX]       = useState(0);
  const [curY,       setCurY]       = useState(0);
  const [curVis,     setCurVis]     = useState(false);
  const [curClick,   setCurClick]   = useState(false);
  const [hoverFid,   setHoverFid]   = useState<FId | null>(null);
  const [vals,       setVals]       = useState({ ...DEFAULTS });
  const [unsaved,    setUnsaved]    = useState<Set<FId>>(new Set());
  const [popover,    setPopover]    = useState<{ id: FId; top: number; left: number } | null>(null);
  const [editVal,    setEditVal]    = useState("");
  const [saving,        setSaving]        = useState(false);
  const [saved,         setSaved]         = useState(false);
  const [saveDraftLog,  setSaveDraftLog]  = useState<string | null>(null);
  const [publishing,    setPublishing]    = useState(false);
  const [pubDone,       setPubDone]       = useState(false);
  const [pubStep,       setPubStep]       = useState(0); // 0=hidden 1-4=steps

  function clear() { timers.current.forEach(clearTimeout); timers.current = []; }

  function q(fn: () => void, ms: number) {
    timers.current.push(setTimeout(() => { if (!hovRef.current) fn(); }, ms));
  }

  // Layout-based offset (NOT getBoundingClientRect) so it's immune to the
  // CSS scale GSAP applies to the demo while it rises into view.
  function localOffset(el: HTMLElement, shell: HTMLElement) {
    let x = 0, y = 0;
    let node: HTMLElement | null = el;
    while (node && node !== shell) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    return { x, y };
  }

  function moveTo(elRef: React.RefObject<HTMLElement | null>, at: number) {
    q(() => {
      const shell = shellRef.current;
      const el    = elRef.current;
      if (!shell || !el) return;
      const { x, y } = localOffset(el, shell);
      setCurX(x + el.offsetWidth  / 2);
      setCurY(y + el.offsetHeight / 2);
    }, at);
  }

  function triggerClick(at: number) {
    q(() => setCurClick(true),  at);
    q(() => setCurClick(false), at + 180);
  }

  function scheduleType(from: string, to: string, id: FId, startAt: number): number {
    let t = startAt;
    for (let i = from.length; i >= 0; i--) { const s = from.slice(0,i); q(() => setVals(v=>({...v,[id]:s})), t); t+=26; }
    for (let i = 0; i <= to.length; i++)   { const s = to.slice(0,i);   q(() => setVals(v=>({...v,[id]:s})), t); t+=42; }
    return t;
  }

  const runAuto = useCallback(() => {
    clear(); hovRef.current = false;
    let t = 0;
    q(() => { setVals({...DEFAULTS}); setHoverFid(null); setCurVis(false); setUnsaved(new Set()); setSaving(false); setSaved(false); setSaveDraftLog(null); setPublishing(false); setPubDone(false); setPubStep(0); }, 0);
    // headline
    t = 900; q(() => setCurVis(true), t); moveTo(headlineRef, t+100);
    t += 950; q(() => setHoverFid("home.hero.title"), t); triggerClick(t+200);
    const h1 = scheduleType(FROM_HEADLINE, TO_HEADLINE, "home.hero.title", t+400); t=h1;
    q(() => setUnsaved(s=>new Set([...s,"home.hero.title"])), t); q(() => setHoverFid(null), t);
    // cta
    t += 600; moveTo(ctaRef, t); t+=900; q(() => setHoverFid("home.hero.cta"), t); triggerClick(t+200);
    const c1 = scheduleType(FROM_CTA, TO_CTA, "home.hero.cta", t+400); t=c1;
    q(() => setUnsaved(s=>new Set([...s,"home.hero.cta"])), t); q(() => setHoverFid(null), t);
    // save draft — show backend log below the button
    t += 600; moveTo(saveButtonRef, t); t += 700; triggerClick(t);
    q(() => { setSaving(true); setSaveDraftLog("Serializing content fields…"); }, t + 100);
    t += 450; q(() => setSaveDraftLog("Writing to editlayer/content.json"), t);
    t += 500; q(() => { setSaving(false); setSaved(true); setSaveDraftLog("Draft saved ✓"); }, t);
    t += 900; q(() => { setSaved(false); setSaveDraftLog(null); }, t);
    // publish — 4-step progress popup
    t += 500; moveTo(publishButtonRef, t); t += 700; triggerClick(t);
    q(() => { setPublishing(true); setPubStep(1); }, t + 100);
    t += 700;  q(() => setPubStep(2), t);
    t += 800;  q(() => setPubStep(3), t);
    t += 700;  q(() => { setPublishing(false); setPubDone(true); setUnsaved(new Set()); setPubStep(4); }, t);
    t += 2000; q(() => { setPubDone(false); setPubStep(0); }, t);
    // restart
    t += 600; q(() => setCurVis(false), t); t+=600; q(runAuto, t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hovRef.current = isHov;
    if (!isHov) {
      const t = setTimeout(runAuto, 1400);
      return () => { clearTimeout(t); clear(); };
    }
    clear(); setHoverFid(null); setCurVis(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHov]);

  // Interactive: open popover
  function openPopover(id: FId, el: HTMLElement) {
    const shell = shellRef.current;
    if (!shell) return;
    const { x, y } = localOffset(el, shell);
    const sw = shell.offsetWidth;
    const sh = shell.offsetHeight;
    let left = x;
    let top  = y + el.offsetHeight + 8;
    left = Math.max(8, Math.min(left, sw - 328));
    if (top + 200 > sh - 16) top = y - 210;
    top = Math.max(58, top);
    setEditVal(vals[id]);
    setPopover({ id, top, left });
  }

  function savePopover() {
    if (!popover) return;
    setVals(v => ({ ...v, [popover.id]: editVal }));
    setUnsaved(s => new Set([...s, popover.id]));
    setPopover(null);
  }

  function resetField(id: FId) {
    setVals(v => ({ ...v, [id]: DEFAULTS[id] }));
    setUnsaved(s => { const n = new Set(s); n.delete(id); return n; });
    setPopover(null);
  }

  const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

  async function handleSaveDraft() {
    setSaving(true); setSaveDraftLog("Serializing content fields…");
    await delay(400);
    setSaveDraftLog("Writing to editlayer/content.json");
    await delay(500);
    setSaving(false); setSaved(true); setSaveDraftLog("Draft saved ✓");
    await delay(1800);
    setSaved(false); setSaveDraftLog(null);
  }

  async function handlePublish() {
    setPublishing(true); setPubStep(1);
    await delay(700);  setPubStep(2);
    await delay(800);  setPubStep(3);
    await delay(700);  setPublishing(false); setPubDone(true); setUnsaved(new Set()); setPubStep(4);
    await delay(2500); setPubDone(false); setPubStep(0);
  }

  const unsavedCount = unsaved.size;
  const changeLabel  = unsavedCount > 0 ? `${unsavedCount} unsaved` : "No changes";

  const field = (id: FId, kind: EKind, elRef?: React.RefObject<HTMLDivElement | null>) => (
    <EField
      id={id}
      kind={kind}
      value={vals[id]}
      hovered={hoverFid === id}
      isUserActive={isHov}
      elRef={elRef}
      onClick={(el) => openPopover(id, el)}
    />
  );

  return (
    <div
      ref={shellRef}
      className={`${styles.demo} ${isHov ? styles.demoHov : ""}`}
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => { setIsHov(false); setPopover(null); }}
    >
      {/* Animated cursor */}
      {curVis && !isHov && (
        <div className={`${styles.cur} ${curClick ? styles.curClick : ""}`}
          style={{ left: curX, top: curY }} />
      )}

      {/* Browser chrome */}
      <div className={styles.chrome}>
        <div className={styles.dots}>
          <span className={styles.d1}/><span className={styles.d2}/><span className={styles.d3}/>
        </div>
        <div className={styles.urlBar}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" className={styles.lock}>
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          yoursite.com<span className={styles.urlParam}>/?edit=true</span>
        </div>
        <div className={styles.chromeR} />
      </div>

      {/* Real EditLayer Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.tbL}>
          <span className={styles.brand}>EditLayer</span>
          <span className={styles.roleBadge}>owner</span>
          <span className={styles.tbMeta}>/</span>
          <span className={styles.tbMeta}>editor@yoursite.com</span>
        </div>
        <span className={styles.tbSpacer} />
        <div className={styles.tbR}>
          <span className={styles.tbMeta}>{changeLabel}</span>
          <div style={{ position: "relative" }}>
            <button
              ref={saveButtonRef}
              className={`${styles.tbSave} ${(saving || saved) ? styles.tbSaveOn : ""}`}
              onClick={isHov ? handleSaveDraft : undefined}
            >
              {saving ? "Saving…" : saved ? "✓ Saved" : "Save draft"}
            </button>
            {saveDraftLog && (
              <div className={styles.saveDraftPop}>
                {saving && <span className={styles.popSpinner} />}
                {saved && <span className={styles.popCheck}>✓</span>}
                {saveDraftLog}
              </div>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <button
              ref={publishButtonRef}
              className={`${styles.tbPublish} ${publishing ? styles.tbPublishBusy : ""} ${pubDone ? styles.tbPublishDone : ""}`}
              onClick={isHov ? handlePublish : undefined}
            >
              {publishing ? "Publishing…" : pubDone ? "✓ Published" : "Publish"}
            </button>
            {pubStep > 0 && (
              <div className={styles.pubSteps}>
                {PUB_STEPS.map((label, i) => {
                  const stepN = i + 1;
                  const done   = pubStep > stepN;
                  const active = pubStep === stepN;
                  return (
                    <div
                      key={i}
                      className={`${styles.pubStepRow} ${done ? styles.pubStepDone : active ? styles.pubStepActive : styles.pubStepPending}`}
                    >
                      {done   ? <CheckTiny /> : active ? <span className={styles.pubSpinner} /> : <span className={styles.pubDot} />}
                      {label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button className={styles.tbGhost}>Access</button>
          <button className={styles.tbGhost}>History</button>
          <button className={styles.tbGhost}>Exit</button>
        </div>
      </div>

      {/* Mini website */}
      <div className={styles.site}>
        <div className={styles.siteNav}>
          <div className={styles.siteNavBrand}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="#6366f1"/>
            </svg>
            Prism
          </div>
          <div className={styles.siteNavLinks}>
            <span>Home</span><span>Features</span><span>Pricing</span><span>Blog</span>
          </div>
          <div className={styles.siteNavCta}>Get a demo</div>
        </div>

        <div className={styles.siteBody}>
          <div className={styles.siteLeft}>
            {field("home.hero.eyebrow", "eyebrow")}
            {field("home.hero.title", "large", headlineRef)}
            {field("home.hero.sub", "sub", subRef)}
            <div className={styles.siteCtaRow}>
              {field("home.hero.cta", "cta", ctaRef)}
              {field("home.hero.cta2", "ctaGhost")}
            </div>
            <div className={styles.siteFeatures}>
              {field("home.feat.0", "feat")}
              {field("home.feat.1", "feat")}
              {field("home.feat.2", "feat")}
            </div>
            {field("home.trust", "trust")}
          </div>
          <div className={styles.siteRight}><DashCard /></div>
        </div>
      </div>

      {/* EditPopover — matches real EditPopover.tsx */}
      {popover && isHov && (
        <div className={styles.popover} style={{ top: popover.top, left: popover.left }}
          onClick={e => e.stopPropagation()}>
          <div className={styles.popLabel}>{popover.id}</div>
          <div className={styles.popFieldId}>{popover.id}</div>
          <input className={styles.popInput} value={editVal}
            onChange={e => setEditVal(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter") savePopover(); if (e.key==="Escape") setPopover(null); }}
            maxLength={120} autoFocus />
          <div className={styles.popCount}>{editVal.length} / 120</div>
          <div className={styles.popRow}>
            <button className={styles.popSave} onClick={savePopover}>Save change</button>
            <button className={styles.popCancel} onClick={() => setPopover(null)}>Cancel</button>
            <span style={{ flex: 1 }} />
            {unsaved.has(popover.id) && (
              <button className={styles.popReset} onClick={() => resetField(popover.id)}>Reset</button>
            )}
          </div>
        </div>
      )}

      {isHov && !popover && (
        <div className={styles.hoverHint}>
          <span className={styles.hoverDot} />
          Click any green field to edit it
        </div>
      )}
    </div>
  );
}

// ── Editable Field ────────────────────────────────────────────────────────────
function EField({
  id, value, hovered, isUserActive, kind, onClick, elRef,
}: {
  id: string;
  value: string;
  hovered: boolean;
  isUserActive: boolean;
  kind: EKind;
  onClick: (el: HTMLElement) => void;
  elRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const r = elRef ?? localRef;

  const variant = {
    eyebrow:  styles.efEyebrow,
    large:    styles.efLarge,
    sub:      styles.efSub,
    cta:      styles.efCta,
    ctaGhost: styles.efCtaGhost,
    feat:     styles.efFeat,
    trust:    styles.efTrust,
  }[kind];

  return (
    <div
      ref={r}
      data-editlayer-id={id}
      className={[
        styles.ef,
        variant,
        (isUserActive || hovered) ? styles.efHover : "",
        hovered ? styles.efActive : "",
      ].filter(Boolean).join(" ")}
      onClick={isUserActive ? () => { if (r.current) onClick(r.current); } : undefined}
      title={isUserActive ? `Click to edit: ${id}` : undefined}
    >
      <span className={styles.efBadge}><PenTiny /></span>
      {kind === "feat" && <span className={styles.featCheck}><CheckTiny /></span>}
      {value}
      {hovered && !isUserActive && <span className={styles.caret} />}
    </div>
  );
}

// ── Dashboard card ─────────────────────────────────────────────────────────────
const DASH_ACTIVITY = [
  { kind: "pub",  text: "Published “Ship Marketing Copy Fast”", time: "just now" },
  { kind: "edit", text: "Maya edited home.hero.cta",            time: "2m ago" },
  { kind: "draft",text: "Draft saved · pricing page",           time: "14m ago" },
  { kind: "edit", text: "Leo edited home.feat.1",               time: "1h ago" },
];

function DashCard() {
  return (
    <div className={styles.dash}>
      <div className={styles.dashHead}>
        <div>
          <div className={styles.dashTitle}>Analytics overview</div>
          <div className={styles.dashSubtitle}>All pages · last 14 days</div>
        </div>
        <div className={styles.dashTabs}>
          <span className={styles.dashTabOn}>14D</span>
          <span className={styles.dashTab}>30D</span>
          <span className={styles.dashTab}>90D</span>
        </div>
      </div>

      <div className={styles.dashGrid}>
        {[
          {v:"12,840",l:"Visitors",u:"↑ 18%"},
          {v:"3.4%",  l:"Conversion",u:"↑ 2.1%"},
          {v:"$9.2k", l:"Revenue",u:"↑ 8.4%"},
        ].map(m => (
          <div key={m.l} className={styles.dashCell}>
            <div className={styles.dashV}>{m.v}</div>
            <div className={styles.dashL}>{m.l}</div>
            <div className={styles.dashU}>{m.u}</div>
          </div>
        ))}
      </div>

      <div className={styles.dashChartWrap}>
        <div className={styles.dashChartHead}>
          <span className={styles.dashChartTitle}>Visitors</span>
          <span className={styles.dashLive}><span className={styles.dashLiveDot} />Live</span>
        </div>
        <div className={styles.dashChart}>
          {[42,68,54,82,74,92,76,88,61,96,73,89,70,95].map((h,i)=>(
            <div key={i} className={styles.dashBar} style={{height:`${h}%`}}/>
          ))}
        </div>
      </div>

      <div className={styles.dashActivity}>
        <div className={styles.dashActHead}>Recent activity</div>
        {DASH_ACTIVITY.map((a,i) => (
          <div key={i} className={styles.dashActRow}>
            <span className={`${styles.dashActDot} ${styles[`act_${a.kind}`]}`} />
            <span className={styles.dashActText}>{a.text}</span>
            <span className={styles.dashActTime}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PenTiny() {
  return (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckTiny() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
