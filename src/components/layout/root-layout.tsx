import { Gabarito, Nunito } from "next/font/google";
import { BookingProvider } from "@/components/booking/booking-provider";
import { bookingStorageDir } from "@/lib/server/booking-storage";
import type { Metadata } from "next";
import { ContactActions } from "@/components/layout/contact-actions";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/config/site";
import "@/app/globals.css";
import "@/app/experience.css";
const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/media/photos/om-sakthi-bus.webp",
        width: 1080,
        height: 1350,
        alt: "Handcrafted OM SAKTHI miniature bus by TINY DOT’S",
      },
    ],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${gabarito.variable} ${nunito.variable} light`}
      style={{ colorScheme: "light" }}
    >
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              description: site.description,
            }).replace(/</g, "\\u003c"),
          }}
        />
        <BookingProvider available={Boolean(bookingStorageDir())}>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">
            <Reveal>{children}</Reveal>
          </main>
          <Footer />
          <ContactActions />
        </BookingProvider>
      </body>
    </html>
  );
}
