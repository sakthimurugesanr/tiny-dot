"use client";
import Link from "next/link";
import { BookingButton } from "@/components/booking/booking-provider";
import { usePathname } from "next/navigation";
import { X, CircleDot, Phone, MessageCircle } from "lucide-react";
import { useState, type CSSProperties } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { site, navigation } from "@/config/site";
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header header-solid">
      <Link
        prefetch={false}
        href="/"
        className="brand"
        aria-label="TINY DOT’S miniatures home"
      >
        <CircleDot className="brand-icon" strokeWidth={1} />
        <span>
          TINY DOT’S<small>miniatures</small>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation
          .filter(([, url]) =>
            ["/", "/portfolio", "/services", "/about", "/contact"].includes(
              url,
            ),
          )
          .map(([label, url]) => (
            <Link
              prefetch={false}
              key={url}
              href={url}
              aria-current={path === url ? "page" : undefined}
              className={path === url ? "active" : ""}
            >
              {label}
            </Link>
          ))}
      </nav>
      <div className="header-actions">
        <BookingButton className="project-link">
          Book a consultation
        </BookingButton>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className="menu-trigger"
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <span className="hamburger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="mobile-menu">
              <Dialog.Title className="eyebrow">
                EXPLORE TINY DOT’S MINIATURES
              </Dialog.Title>
              <Dialog.Description className="sr-only">
                Studio navigation
              </Dialog.Description>
              <Dialog.Close
                className="menu-close"
                aria-label="Close navigation"
              >
                <X />
              </Dialog.Close>
              <nav aria-label="Expanded studio navigation">
                {navigation.map(([label, url], i) => (
                  <Link
                    prefetch={false}
                    className="mobile-link"
                    style={
                      { "--link-delay": `${i * 45 + 90}ms` } as CSSProperties
                    }
                    key={url}
                    href={url}
                    onClick={() => setOpen(false)}
                    aria-current={path === url ? "page" : undefined}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="mobile-menu-note">
                <span className="eyebrow">LET’S MAKE SOMETHING PERSONAL</span>
                <p>
                  Small details.
                  <br />
                  Made with heart.
                </p>
                <div className="mobile-menu-contact">
                  <a href={site.phoneHref}>
                    <Phone size={17} />
                    Call the studio
                  </a>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={17} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
