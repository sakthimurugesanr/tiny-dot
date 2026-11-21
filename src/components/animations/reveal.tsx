"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function Reveal({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function initialize() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed || !container.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 801px)",
        },
        (context) => {
          const root = container.current;
          if (!root || !context.conditions?.motion) return;
          const distance = context.conditions.desktop ? 5 : 3;
          root
            .querySelectorAll<HTMLElement>(
              ".hero-background, .section-intro-photo img, .occasion-image img, .about-detail-image img, .contact-image img",
            )
            .forEach((image) => {
              const trigger = image.closest("section") || image.parentElement;
              gsap.fromTo(
                image,
                { yPercent: -distance, scale: 1.14 },
                {
                  yPercent: distance,
                  scale: 1.14,
                  ease: "none",
                  scrollTrigger: {
                    trigger,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });
          root
            .querySelectorAll<HTMLElement>(
              ".section > .section-heading, .studio-quote, .maker-story, .booking-faq, .quote-inline, .brief-banner, .service-quote-card, .service-care-grid > article",
            )
            .forEach((section) => {
              gsap.fromTo(
                section,
                { opacity: 0, y: 22 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top 96%",
                    once: true,
                  },
                },
              );
            });
          const registered = new WeakSet<Element>();
          const cardSelector =
            ".visual-service-card, .occasion-grid > article, .booking-steps > article, .detail-points-grid > article, .social-cards > a, .studio-stats > div";
          const cards = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                cards.unobserve(entry.target);
                context.add(() =>
                  gsap.fromTo(
                    entry.target,
                    { opacity: 0, y: 20 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.75,
                      ease: "power3.out",
                      clearProps: "transform,opacity",
                    },
                  ),
                );
              });
            },
            { threshold: 0.07, rootMargin: "0px 0px -18px 0px" },
          );
          const observeCards = () =>
            root.querySelectorAll(cardSelector).forEach((card) => {
              if (registered.has(card)) return;
              registered.add(card);
              cards.observe(card);
            });
          observeCards();
          const changedCards = new MutationObserver(observeCards);
          root
            .querySelectorAll(".service-grid")
            .forEach((grid) => changedCards.observe(grid, { childList: true }));
          return () => {
            cards.disconnect();
            changedCards.disconnect();
          };
        },
        container.current,
      );
      const refresh = () => ScrollTrigger.refresh();
      const observer = new ResizeObserver(refresh);
      observer.observe(container.current);
      void document.fonts.ready.then(() => {
        if (!disposed) refresh();
      });
      cleanup = () => {
        observer.disconnect();
        media.revert();
      };
    }

    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(() => void initialize(), { timeout: 1200 })
        : undefined;
    const fallback =
      idle === undefined ? setTimeout(() => void initialize(), 0) : undefined;
    return () => {
      disposed = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (fallback !== undefined) clearTimeout(fallback);
      cleanup?.();
    };
  }, [pathname]);

  return (
    <div ref={container} className="page-content">
      {children}
    </div>
  );
}
