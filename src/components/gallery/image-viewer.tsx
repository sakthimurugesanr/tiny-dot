"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  X,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Maximize,
  Columns2,
} from "lucide-react";
type Photo = { src: string; caption: string };
export function ImageViewer({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [compare, setCompare] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const pointer = useRef<{
    x: number;
    y: number;
    px: number;
    py: number;
  } | null>(null);
  const content = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const reset = () => {
    setCompare(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  const move = (delta: number) => {
    setIndex((v) => (v + delta + photos.length) % photos.length);
    reset();
  };
  return (
    <>
      <div className="gallery-grid">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={(event) => {
              trigger.current = event.currentTarget;
              setIndex(i);
              reset();
              setOpen(true);
            }}
            aria-label={`Open ${p.caption}`}
          >
            <Image
              src={p.src}
              alt={p.caption}
              fill
              sizes={i === 0 ? "90vw" : "45vw"}
            />
            <span>
              {p.caption} <ZoomIn size={13} className="inline" />
            </span>
          </button>
        ))}
      </div>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="lightbox-overlay" />
          <Dialog.Content
            ref={content}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              trigger.current?.focus();
            }}
            className="lightbox"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                move(1);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                move(-1);
              }
            }}
          >
            <Dialog.Title className="sr-only">
              Artwork image viewer
            </Dialog.Title>
            <Dialog.Description className="lightbox-help">
              Arrow keys to browse · Drag to pan when zoomed · Escape to close
            </Dialog.Description>
            <Dialog.Close
              className="lightbox-close"
              aria-label="Close image viewer"
            >
              <X />
            </Dialog.Close>
            <div
              className="lightbox-viewport"
              onPointerDown={(e) => {
                pointer.current = {
                  x: e.clientX,
                  y: e.clientY,
                  px: pan.x,
                  py: pan.y,
                };
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (pointer.current && zoom > 1) {
                  const maxX = (e.currentTarget.clientWidth * (zoom - 1)) / 2;
                  const maxY = (e.currentTarget.clientHeight * (zoom - 1)) / 2;
                  setPan({
                    x: Math.max(
                      -maxX,
                      Math.min(
                        maxX,
                        pointer.current.px + e.clientX - pointer.current.x,
                      ),
                    ),
                    y: Math.max(
                      -maxY,
                      Math.min(
                        maxY,
                        pointer.current.py + e.clientY - pointer.current.y,
                      ),
                    ),
                  });
                }
              }}
              onPointerUp={(e) => {
                if (
                  pointer.current &&
                  zoom === 1 &&
                  Math.abs(e.clientX - pointer.current.x) > 50
                )
                  move(e.clientX < pointer.current.x ? 1 : -1);
                pointer.current = null;
              }}
              onPointerCancel={() => (pointer.current = null)}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  right: compare ? "50%" : 0,
                  transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
                }}
              >
                <Image
                  src={photos[index].src}
                  alt={photos[index].caption}
                  fill
                  sizes="90vw"
                  quality={95}
                  style={{ objectFit: "contain", pointerEvents: "none" }}
                />
              </div>
              {compare && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "50%",
                    right: 0,
                    borderLeft: "1px solid #d9a86c",
                  }}
                >
                  <Image
                    src={photos[(index + 1) % photos.length].src}
                    alt={`Comparison view: ${photos[(index + 1) % photos.length].caption}`}
                    fill
                    sizes="45vw"
                    style={{ objectFit: "contain", pointerEvents: "none" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      fontSize: 9,
                      color: "#ddd",
                    }}
                  >
                    Alternate concept view · not a before/after
                  </span>
                </div>
              )}
            </div>
            <div className="lightbox-controls">
              {photos.length > 1 && (
                <button
                  onClick={() => {
                    setZoom(1);
                    setPan({ x: 0, y: 0 });
                    setCompare((v) => !v);
                  }}
                  aria-label="Compare concept views"
                  aria-pressed={compare}
                >
                  <Columns2 size={18} />
                </button>
              )}
              <button onClick={() => move(-1)} aria-label="Previous image">
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => {
                  setZoom((v) => Math.max(1, v - 0.5));
                  setPan({ x: 0, y: 0 });
                }}
                disabled={zoom <= 1}
                aria-label="Zoom out"
              >
                <ZoomOut size={18} />
              </button>
              <button
                onClick={() => setZoom((v) => Math.min(2, v + 0.5))}
                disabled={zoom >= 2 || compare}
                aria-label="Zoom in"
              >
                <ZoomIn size={18} />
              </button>
              <button onClick={reset} aria-label="Reset zoom and position">
                <RotateCcw size={18} />
              </button>
              <button
                onClick={() => {
                  if (document.fullscreenElement)
                    document.exitFullscreen()?.catch(() => {});
                  else content.current?.requestFullscreen()?.catch(() => {});
                }}
                aria-label="Toggle fullscreen"
              >
                <Maximize size={18} />
              </button>
              <button onClick={() => move(1)} aria-label="Next image">
                <ArrowRight size={18} />
              </button>
              <div className="lightbox-thumbnails">
                {photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIndex(i);
                      reset();
                    }}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === index}
                    style={{ borderColor: i === index ? "#d9a86c" : undefined }}
                  >
                    <Image src={p.src} alt="" fill sizes="45px" />
                  </button>
                ))}
              </div>
            </div>
            <p className="lightbox-caption">
              {photos[index].caption} ·{" "}
              {Math.round(zoom * 100)}%
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
