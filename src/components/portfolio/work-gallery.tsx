"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Play, ImageIcon, Film, ChevronLeft, ChevronRight } from "lucide-react";
import { mediaImages, mediaVideos, mediaCategories } from "@/data/media";
const PhotoViewer = dynamic(() => import("./photo-viewer"));
const FilmPlayer = dynamic(() => import("./film-player"));
type Photo = (typeof mediaImages)[number];
type Clip = (typeof mediaVideos)[number];
const PhotoCard = memo(function PhotoCard({
  item,
  onSelect,
}: {
  item: Photo;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      className="work-photo"
      onClick={() => onSelect(item.id)}
      aria-label={`View ${item.title}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        loading="lazy"
        sizes="(max-width:600px) 90vw, (max-width:900px) 45vw, 45vw"
      />
      <span className="work-photo-caption">
        <small>
          {item.category === "architecture"
            ? "Homes & architecture"
            : item.category === "vehicles"
              ? "Vehicle miniatures"
              : "Craft & making"}
        </small>
        <strong>{item.title}</strong>
      </span>
    </button>
  );
});
export function WorkGallery({
  preview = false,
  initialType = "photos",
}: {
  preview?: boolean;
  initialType?: string;
}) {
  const [category, setCategory] = useState("all");
  const [type, setType] = useState(initialType);
  const [selected, setSelected] = useState<number | null>(null);
  const photos = useMemo(
    () =>
      mediaImages.filter(
        (item) => category === "all" || item.category === category,
      ),
    [category],
  );
  const visiblePhotos = useMemo(
    () => (preview ? photos.slice(0, 8) : photos),
    [photos, preview],
  );
  const clips = useMemo(
    () =>
      mediaVideos.filter(
        (item) => category === "all" || item.category === category,
      ),
    [category],
  );
  const selectPhoto = useCallback(
    (id: string) => setSelected(visiblePhotos.findIndex((p) => p.id === id)),
    [visiblePhotos],
  );
  const closePhoto = useCallback(() => setSelected(null), []);
  return (
    <>
      {!preview && (
        <div className="work-toolbar">
          <div className="work-tabs" role="group" aria-label="Media type">
            <button
              aria-pressed={type === "photos"}
              onClick={() => setType("photos")}
            >
              <ImageIcon size={16} />
              Photos
            </button>
            <button
              aria-pressed={type === "videos"}
              onClick={() => setType("videos")}
            >
              <Film size={16} />
              Films
            </button>
          </div>
          <div
            className="work-filters"
            role="group"
            aria-label="Filter client work"
          >
            {mediaCategories.map((c) => (
              <button
                key={c.slug}
                aria-pressed={category === c.slug}
                onClick={() => setCategory(c.slug)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {preview || type === "photos" ? (
        <>
          <p className="work-count" role="status">
            {preview
              ? "A few favourites from the workbench"
              : "Handmade by Tiny Dot’s"}
          </p>
          <div
            className={`work-mosaic ${preview ? "work-mosaic-preview" : ""}`}
          >
            {visiblePhotos.map((item) => (
              <PhotoCard key={item.id} item={item} onSelect={selectPhoto} />
            ))}
          </div>
        </>
      ) : (
        <VideoGrid items={clips} />
      )}{" "}
      {preview && (
        <div className="gallery-bottom">
          <p>Stories in the little details.</p>
          <Link className="button button-outline" href="/portfolio">
            Explore all our work
          </Link>
        </div>
      )}
      {selected !== null && selected >= 0 && (
        <PhotoViewer
          photos={photos}
          initialIndex={selected}
          onClose={closePhoto}
        />
      )}
    </>
  );
}
const FilmCard = memo(function FilmCard({
  item,
  onSelect,
}: {
  item: Clip;
  onSelect: (item: Clip) => void;
}) {
  return (
    <button
      className="film-card"
      onClick={() => onSelect(item)}
      aria-label={`Play ${item.title}`}
    >
      <div className="film-poster">
        <Image
          src={item.poster}
          alt={item.title}
          fill
          loading="lazy"
          sizes="(max-width:600px) 72vw, (max-width:1000px) 40vw, 27vw"
        />
        <span className="film-play">
          <Play size={21} fill="currentColor" />
        </span>
        <span className="film-kind">Studio film</span>
      </div>
      <h3>{item.title}</h3>
      <span>Press play. Look a little closer.</span>
    </button>
  );
});
export const VideoGrid = memo(function VideoGrid({
  items = mediaVideos,
  preview = false,
}: {
  items?: readonly Clip[];
  preview?: boolean;
}) {
  const [active, setActive] = useState<Clip | null>(null);
  const [scrollState, setScrollState] = useState({ back: false, next: true });
  const track = useRef<HTMLDivElement>(null);
  const visible = useMemo(
    () => (preview ? items.slice(0, 6) : items),
    [items, preview],
  );
  const selectFilm = useCallback((film: Clip) => setActive(film), []);
  const closeFilm = useCallback(() => setActive(null), []);
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setScrollState((previous) => {
      const back = el.scrollLeft > 8,
        next = el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
      return previous.back === back && previous.next === next
        ? previous
        : { back, next };
    });
  }, []);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure, visible]);
  const scroll = useCallback((direction: number) => {
    const el = track.current;
    if (!el) return;
    const card =
      el.firstElementChild?.getBoundingClientRect().width ||
      el.clientWidth * 0.75;
    el.scrollBy({
      left: direction * (card + 22),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);
  return (
    <div className="film-carousel">
      <div className="film-carousel-top">
        <p>Swipe or use the arrows to explore</p>
        <div className="film-arrows">
          <button
            aria-label="Previous films"
            onClick={() => scroll(-1)}
            disabled={!scrollState.back}
          >
            <ChevronLeft size={21} />
          </button>
          <button
            aria-label="Next films"
            onClick={() => scroll(1)}
            disabled={!scrollState.next}
          >
            <ChevronRight size={21} />
          </button>
        </div>
      </div>
      <div
        className={`film-grid film-track ${preview ? "film-grid-preview" : ""}`}
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Scrollable studio films"
      >
        {visible.map((item) => (
          <FilmCard key={item.id} item={item} onSelect={selectFilm} />
        ))}
      </div>
      {active && <FilmPlayer film={active} onClose={closeFilm} />}
    </div>
  );
});
