"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = "main > *, section, article, [data-reveal='true']";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const observedElements = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            target.setAttribute("data-scroll-reveal", "done");
            observer.unobserve(target);
            observedElements.delete(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.01,
      }
    );

    const collectRevealTargets = () => {
      const targets = document.querySelectorAll(REVEAL_SELECTOR);
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      let revealIndex = 0;

      targets.forEach((element) => {
        const target = element as HTMLElement;

        if (target.closest("[data-no-reveal='true']")) {
          return;
        }

        if (target.getAttribute("data-scroll-reveal") === "done") {
          return;
        }

        if (!observedElements.has(target)) {
          const rect = target.getBoundingClientRect();
          const isAlreadyInView = rect.top <= viewportHeight * 0.92;

          if (isAlreadyInView) {
            target.setAttribute("data-scroll-reveal", "done");
            return;
          }

          target.style.setProperty("--reveal-delay", `${Math.min(revealIndex, 5) * 60}ms`);
          target.setAttribute("data-scroll-reveal", "pending");
          observer.observe(target);
          observedElements.add(target);
          revealIndex += 1;
        }
      });
    };

    const rafId = window.requestAnimationFrame(collectRevealTargets);

    const mutationObserver = new MutationObserver(() => {
      collectRevealTargets();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      mutationObserver.disconnect();
      observer.disconnect();
      observedElements.clear();
    };
  }, [pathname]);

  return null;
}
