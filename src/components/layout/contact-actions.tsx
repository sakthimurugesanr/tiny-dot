"use client";
import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { site } from "@/config/site";
import { BookingButton } from "@/components/booking/booking-provider";
export function ContactActions() {
  return (
    <aside className="contact-action-dock" aria-label="Quick contact">
      <a href={site.phoneHref}>
        <Phone size={19} />
        <span>Call</span>
      </a>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
      >
        <MessageCircle size={20} />
        <span>WhatsApp</span>
      </a>
      <BookingButton className="dock-booking">
        <CalendarDays size={18} />
        <span>Enquiry</span>
      </BookingButton>
    </aside>
  );
}
