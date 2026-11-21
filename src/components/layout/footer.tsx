import Link from "next/link";
import { site } from "@/config/site";
import { ContactLinks } from "@/components/layout/contact-links";
export function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div>
          <span className="eyebrow">A little detail. A lot of heart.</span>
          <h2>
            Made small.
            <br />
            <em>Remembered always.</em>
          </h2>
          <Link className="text-link" href="/commissions">
            Let’s talk about your idea
          </Link>
        </div>
        <div className="footer-links">
          <div>
            <span className="eyebrow">Explore</span>
            {[
              ["Our work", "/portfolio"],
              ["Our services", "/services"],
              ["About Tiny Dot’s", "/about"],
              ["Project enquiry", "/commissions"],
              ["Contact", "/contact"],
            ].map(([name, href]) => (
              <Link key={href} href={href}>
                {name}
              </Link>
            ))}
          </div>
          <div>
            <span className="eyebrow">Let’s connect</span>
            <ContactLinks />
          </div>
        </div>
      </div>
      <div className="footer-wordmark">
        Tiny Dot’s<span>miniatures</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Handmade miniatures · Custom craft & scale models</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
