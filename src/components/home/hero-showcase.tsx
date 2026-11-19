"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-provider";
import { mediaImages } from "@/data/media";

const stories = [
  {
    id: "om-sakthi-bus",
    label: "VEHICLE MINIATURES",
    quote: "Every familiar journey deserves a little keepsake.",
  },
  {
    id: "modern-home",
    label: "HOMES & MEMORIES",
    quote: "Some places stay with us. Keep yours a little closer.",
  },
  {
    id: "campus-model",
    label: "IDEAS IN MINIATURE",
    quote: "A little imagination. A world of possibilities.",
  },
].map((story) => ({
  ...story,
  photo: mediaImages.find((photo) => photo.id === story.id)!,
}));

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [loaded, setLoaded] = useState<readonly string[]>([]);
  const section = useRef<HTMLElement>(null);
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
    if (paused || reducedMotion || !visible || loaded.length < stories.length)
      return;
    const timer = setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % stories.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused, reducedMotion, visible, loaded.length]);
  return (
    <section
      ref={section}
      className="cinematic-hero"
      aria-label="Handmade miniatures by TINY DOT’S"
    >
      <div className="hero-background" aria-hidden="true">
        {stories.map(({ photo }, index) => (
          <div
            className="hero-background-slide"
            data-active={active === index}
            key={photo.id}
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width:800px) 100vw, 65vw"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              onLoad={() =>
                setLoaded((previous) =>
                  previous.includes(photo.id)
                    ? previous
                    : [...previous, photo.id],
                )
              }
            />
          </div>
        ))}
      </div>
      <div className="cinematic-hero-copy">
        <span className="hero-studio-label">
          TINY DOT’S · HANDMADE MINIATURES
        </span>
        <h1>
          Little worlds.
          <br />
          <span>Personal stories.</span>
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
      <div className="hero-story-card">
        <div className="hero-stories">
          {stories.map((story, index) => (
            <div
              className="hero-story"
              data-active={index === active}
              aria-hidden={index !== active}
              key={story.id}
            >
              <span>{story.label}</span>
              <blockquote>“{story.quote}”</blockquote>
            </div>
          ))}
        </div>
        <div className="hero-story-controls">
          <div
            className="hero-story-tabs"
            role="group"
            aria-label="Choose a featured project"
          >
            {stories.map((story, index) => (
              <button
                key={story.id}
                aria-label={`Show ${story.photo.title}`}
                aria-pressed={index === active}
                onClick={() => {
                  setActive(index);
                  setPaused(true);
                }}
              />
            ))}
          </div>
          <button
            className="hero-pause"
            aria-label={
              paused || reducedMotion
                ? "Play photo transitions"
                : "Pause photo transitions"
            }
            onClick={() => {
              setReducedMotion(false);
              setPaused(!(paused || reducedMotion));
            }}
          >
            {paused || reducedMotion ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
