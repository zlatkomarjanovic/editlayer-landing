"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimateIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 24 });
    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      anim.kill();
      (anim as gsap.core.Tween & { scrollTrigger?: ScrollTrigger }).scrollTrigger?.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
