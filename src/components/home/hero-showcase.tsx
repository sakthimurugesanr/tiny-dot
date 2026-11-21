"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookingButton } from "@/components/booking/booking-provider";
import { mediaImages } from "@/data/media";

const stories = [
  { id: "om-sakthi-bus", title: "Little worlds.", accent: "Personal stories." },
  { id: "modern-home", title: "Your memories.", accent: "Made miniature." },
  {
    id: "campus-model",
    title: "Big imagination.",
    accent: "Beautiful details.",
  },
  {
    id: "portrait-sketching",
    title: "Made by hand.",
    accent: "Kept by heart.",
  },
  { id: "temple-model", title: "Familiar places.", accent: "Closer to home." },
].map((story) => ({
  ...story,
  photo: mediaImages.find((photo) => photo.id === story.id)!,
}));

const HeroPhoto = memo(function HeroPhoto({
  photo,
  active,
  eager,
  onReady,
}: {
  photo: (typeof mediaImages)[number];
  active: boolean;
  eager: boolean;
  onReady: (id: string) => void;
}) {
  const onLoad = useCallback(() => onReady(photo.id), [onReady, photo.id]);
  return (
    <div className="hero-background-slide" data-active={active}>
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="(max-width:800px) 100vw, 65vw"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        onLoad={onLoad}
      />
    </div>
  );
});

export const HeroShowcase = memo(function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [loaded, setLoaded] = useState<readonly string[]>([]);
  const section = useRef<HTMLElement>(null);
  const onReady = useCallback(
    (id: string) =>
      setLoaded((previous) =>
        previous.includes(id) ? previous : [...previous, id],
      ),
    [],
  );
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
    };
  }, []);
  useEffect(() => {
    if (reducedMotion || !visible || loaded.length < stories.length) return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % stories.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [reducedMotion, visible, loaded.length]);
  return (
    <section
      ref={section}
      className="cinematic-hero"
      aria-label="Handmade miniatures by Tiny Dot’s"
    >
      <div className="hero-background" aria-hidden="true">
        {stories.map(({ photo }, index) => (
          <HeroPhoto
            key={photo.id}
            photo={photo}
            active={active === index}
            eager={index === 0}
            onReady={onReady}
          />
        ))}
      </div>
      <div className="cinematic-hero-copy">
        <h1 className="rotating-headline">
          {stories.map((story, index) => (
            <span
              className="hero-headline"
              data-active={index === active}
              aria-hidden={index !== active}
              key={story.id}
            >
              {story.title}
              <br />
              <span>{story.accent}</span>
            </span>
          ))}
        </h1>
        <p>
          A favourite bus. A home full of memories. An idea brought to life.
          Made by hand, around the details that matter to you.
        </p>
        <div className="cinematic-hero-actions">
          <BookingButton>Create your miniature</BookingButton>
          <Link className="hero-explore" href="#our-work">
            Explore our work
          </Link>
        </div>
        <span className="hero-personal-note">
          Your idea. Our hands. Something to keep.
        </span>
      </div>
    </section>
  );
});
