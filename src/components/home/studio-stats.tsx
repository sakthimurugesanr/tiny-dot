"use client";
import { memo, useEffect, useRef } from "react";
import { PackageCheck, Shapes, Layers3, Images } from "lucide-react";
import { serviceOptions, serviceGroups } from "@/data/services";
import { mediaImages } from "@/data/media";
const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Miniatures successfully delivered",
    icon: PackageCheck,
  },
  {
    value: serviceOptions.length,
    suffix: "",
    label: "Services to explore",
    icon: Shapes,
  },
  {
    value: serviceGroups.length,
    suffix: "",
    label: "Creative categories",
    icon: Layers3,
  },
  {
    value: mediaImages.length,
    suffix: "",
    label: "Photos from our workbench",
    icon: Images,
  },
];
export const StudioStats = memo(function StudioStats() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const { gsap } = await import("gsap");
        if (cancelled || !root.current) return;
        const context = gsap.context(() => {
          root.current
            ?.querySelectorAll<HTMLElement>("[data-count]")
            .forEach((element, index) => {
              const counter = { value: 0 };
              gsap.to(counter, {
                value: stats[index].value,
                duration: 1.6,
                ease: "power2.out",
                onUpdate: () => {
                  element.textContent =
                    Math.round(counter.value) + stats[index].suffix;
                },
              });
            });
        }, root.current);
        revert = () => context.revert();
      },
      { threshold: 0.25 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      cancelled = true;
      observer.disconnect();
      revert?.();
    };
  }, []);
  return (
    <section
      ref={root}
      className="section studio-stats"
      aria-label="Tiny Dot’s in numbers"
    >
      {stats.map(({ value, suffix, label, icon: Icon }) => (
        <div key={label}>
          <Icon size={26} strokeWidth={1.5} />
          <strong aria-label={value + suffix} data-count>
            {value}
            {suffix}
          </strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
});
