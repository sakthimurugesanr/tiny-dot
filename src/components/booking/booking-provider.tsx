"use client";
import { createContext, useCallback, useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
const BookingForm = dynamic(
  () => import("@/components/booking/booking-form").then((m) => m.BookingForm),
  {
    loading: () => <p className="booking-loading">Opening the booking form…</p>,
  },
);
import { Button } from "@/components/ui/button";
const BookingContext = createContext<((service?: string) => void) | null>(null);
export function BookingButton({
  children = "Book an appointment",
  service,
  className = "button",
}: {
  children?: React.ReactNode;
  service?: string;
  className?: string;
}) {
  const open = useContext(BookingContext);
  return (
    <Button className={className} onClick={() => open?.(service)}>
      {children}
    </Button>
  );
}
export function BookingProvider({
  children,
  available,
}: {
  children: React.ReactNode;
  available: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<string>();
  const begin = useCallback((value?: string) => {
    setService(value);
    setOpen(true);
  }, []);
  return (
    <BookingContext value={begin}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="booking-overlay" />
          <Dialog.Content className="booking-drawer">
            <div className="booking-drawer-heading">
              <span className="eyebrow">Let’s talk about your idea</span>
              <Dialog.Close
                className="booking-close"
                aria-label="Close appointment drawer"
              >
                <X size={22} />
              </Dialog.Close>
              <Dialog.Title>
                Little details.
                <br />A simple first step.
              </Dialog.Title>
              <Dialog.Description>
                Tell us what you have in mind. We’ll discuss the model and
                confirm a convenient time to connect.
              </Dialog.Description>
            </div>
            <BookingForm
              key={service || "general"}
              service={service}
              available={available}
              onDone={() => setOpen(false)}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </BookingContext>
  );
}
