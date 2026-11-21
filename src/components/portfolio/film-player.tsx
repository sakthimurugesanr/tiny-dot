"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { mediaVideos } from "@/data/media";
export default function FilmPlayer({
  film,
  onClose,
}: {
  film: (typeof mediaVideos)[number];
  onClose: () => void;
}) {
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="media-overlay" />
        <Dialog.Content className="video-dialog">
          <Dialog.Close className="media-close" aria-label="Close film">
            <X />
          </Dialog.Close>
          <Dialog.Title>{film.title}</Dialog.Title>
          <Dialog.Description>
            A closer look at the Tiny Dot’s collection.
          </Dialog.Description>
          <video
            key={film.id}
            src={film.src}
            poster={film.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={film.title}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
