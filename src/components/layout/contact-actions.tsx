"use client";
import { Phone, MessageCircle } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-provider";
import { site } from "@/config/site";
export function ContactActions() {
  return (
    <>
      <BookingButton className="mobile-enquiry-tab">
        <span className="enquiry-label-text">For enquiry</span>
      </BookingButton>
      <aside className="contact-action-dock" aria-label="Quick contact">
        <a href={site.phoneHref} aria-label="Call Tiny Dot’s">
          <Phone size={19} />
          <span>Call</span>
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
          aria-label="WhatsApp Tiny Dot’s"
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
      </aside>
    </>
  );
}
