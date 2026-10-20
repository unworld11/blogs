"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Content is visible by default; the rise only applies once this has run.
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".wk");
    if (!root) return;
    root.classList.add("js");
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-rise]"));
    els.forEach((el) => el.classList.remove("in"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
