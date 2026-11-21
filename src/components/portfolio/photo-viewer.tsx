"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import type { mediaImages } from "@/data/media";
import { BookingButton } from "@/components/booking/booking-provider";
type Photo = (typeof mediaImages)[number];
export default function PhotoViewer({
  photos,
  initialIndex,
  onClose,
}: {
  photos: readonly Photo[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const viewport = useRef<HTMLDivElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);
  const lastTap = useRef(0);
  const lastTouch = useRef(0);
  const photo = photos[index];
  const finishPointer = (pointerId: number) => {
    pointers.current.delete(pointerId);
    pinch.current = null;
    drag.current = null;
  };
  // Measure the actual viewer, not the window, so zoom bounds stay correct on mobile.
  useLayoutEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const limits = useMemo(() => {
    const fit = Math.min(size.width / photo.width, size.height / photo.height);
    return {
      x: Math.max(0, (photo.width * fit * zoom - size.width) / 2),
      y: Math.max(0, (photo.height * fit * zoom - size.height) / 2),
    };
  }, [photo, size, zoom]);
  const reset = useCallback(() => {
    pointers.current.clear();
    pinch.current = null;
    drag.current = null;
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);
  const change = useCallback(
    (direction: number) => {
      setIndex((i) => (i + direction + photos.length) % photos.length);
      reset();
    },
    [photos.length, reset],
  );
  const select = useCallback(
    (i: number) => {
      setIndex(i);
      reset();
    },
    [reset],
  );
  const adjustZoom = useCallback((delta: number) => {
    setZoom((z) => Math.min(3, Math.max(1, z + delta)));
    setPan({ x: 0, y: 0 });
  }, []);
  useEffect(() => {
    thumbs.current?.children[index]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [index]);
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="media-overlay" />
        <Dialog.Content
          className="photo-dialog zoom-dialog"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              change(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              change(-1);
            }
          }}
        >
          <div className="viewer-top">
            <span>Studio collection</span>
            <Dialog.Title>{photo.title}</Dialog.Title>
            <Dialog.Close className="viewer-icon" aria-label="Close photograph">
              <X size={21} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Use the arrow buttons or arrow keys to browse. Zoom in and drag to
            inspect the details.
          </Dialog.Description>
          <div
            className="zoom-stage"
            ref={viewport}
            onDoubleClick={(event) => {
              if (
                (event.target as Element).closest("button") ||
                Date.now() - lastTouch.current < 500
              )
                return;
              setZoom((z) => (z === 1 ? 2 : 1));
              setPan({ x: 0, y: 0 });
            }}
            onPointerDown={(e) => {
              if ((e.target as Element).closest("button")) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
              if (pointers.current.size === 2) {
                const [a, b] = [...pointers.current.values()];
                pinch.current = {
                  distance: Math.hypot(a.x - b.x, a.y - b.y),
                  zoom,
                };
                drag.current = null;
                return;
              }
              if (e.pointerType === "touch") {
                lastTouch.current = Date.now();
                const now = Date.now();
                if (now - lastTap.current < 280) {
                  setZoom((value) => (value === 1 ? 2 : 1));
                  setPan({ x: 0, y: 0 });
                  lastTap.current = 0;
                } else lastTap.current = now;
              }
              if (zoom <= 1) return;
              drag.current = {
                x: e.clientX,
                y: e.clientY,
                panX: pan.x,
                panY: pan.y,
              };
            }}
            onPointerMove={(e) => {
              if (!pointers.current.has(e.pointerId)) return;
              pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
              if (pinch.current && pointers.current.size === 2) {
                const [a, b] = [...pointers.current.values()];
                const distance = Math.hypot(a.x - b.x, a.y - b.y);
                setZoom(
                  Math.min(
                    3,
                    Math.max(
                      1,
                      (pinch.current.zoom * distance) /
                        Math.max(1, pinch.current.distance),
                    ),
                  ),
                );
                setPan({ x: 0, y: 0 });
                return;
              }
              if (!drag.current) return;
              lastTap.current = 0;
              setPan({
                x: Math.max(
                  -limits.x,
                  Math.min(
                    limits.x,
                    drag.current.panX + e.clientX - drag.current.x,
                  ),
                ),
                y: Math.max(
                  -limits.y,
                  Math.min(
                    limits.y,
                    drag.current.panY + e.clientY - drag.current.y,
                  ),
                ),
              });
            }}
            onPointerUp={(event) => finishPointer(event.pointerId)}
            onPointerCancel={(event) => finishPointer(event.pointerId)}
            onLostPointerCapture={(event) => finishPointer(event.pointerId)}
            style={{
              cursor: zoom > 1 ? "grab" : "zoom-in",
              touchAction: "none",
            }}
          >
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width:700px) 94vw, 85vw"
              draggable={false}
              style={{
                objectFit: "contain",
                transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
                transition: "none",
              }}
            />
            <button
              className="viewer-arrow viewer-prev"
              aria-label="Previous photograph"
              onClick={(e) => {
                e.stopPropagation();
                change(-1);
              }}
            >
              <ChevronLeft />
            </button>
            <button
              className="viewer-arrow viewer-next"
              aria-label="Next photograph"
              onClick={(e) => {
                e.stopPropagation();
                change(1);
              }}
            >
              <ChevronRight />
            </button>
          </div>
          <div className="viewer-bottom">
            <div
              className="viewer-zoom"
              role="group"
              aria-label="Photograph zoom"
            >
              <button
                className="viewer-icon"
                aria-label="Zoom out"
                disabled={zoom === 1}
                onClick={() => adjustZoom(-0.5)}
              >
                <Minus size={17} />
              </button>
              <output aria-label="Zoom level">{Math.round(zoom * 100)}%</output>
              <button
                className="viewer-icon"
                aria-label="Zoom in"
                disabled={zoom === 3}
                onClick={() => adjustZoom(0.5)}
              >
                <Plus size={17} />
              </button>
              <button
                className="viewer-icon"
                aria-label="Reset photograph view"
                onClick={reset}
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <span className="viewer-hint">
              Pinch or double-tap to zoom · Drag to explore
            </span>
            <BookingButton className="button viewer-booking">
              Make it personal
            </BookingButton>
          </div>
          <div
            className="viewer-thumbnails"
            ref={thumbs}
            role="group"
            aria-label="Select a photograph"
          >
            {photos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => select(i)}
                aria-label={`Select photograph ${i + 1}: ${p.title}`}
                aria-pressed={i === index}
              >
                <Image src={p.src} alt="" fill sizes="64px" loading="lazy" />
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
