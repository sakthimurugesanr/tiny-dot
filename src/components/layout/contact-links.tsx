import { Phone, MessageCircle } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { site } from "@/config/site";
export function ContactLinks() {
  return (
    <div className="contact-links">
      <a href={site.phoneHref}>
        <Phone size={20} />
        <span>
          <small>Call for custom orders</small>
          <strong>{site.phone}</strong>
        </span>
      </a>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={20} />
        <span>
          <small>Whatsapp enquiries</small>
          <strong>Discuss your miniature</strong>
        </span>
      </a>
      <a href={site.youtube} target="_blank" rel="noopener noreferrer">
        <YoutubeIcon size={20} />
        <span>
          <small>Youtube shorts</small>
          <strong>@tinydotsminiatures3747</strong>
        </span>
      </a>
      <a href={site.instagram} target="_blank" rel="noopener noreferrer">
        <InstagramIcon size={20} />
        <span>
          <small>Instagram</small>
          <strong>@tinydots_miniatures1</strong>
        </span>
      </a>
    </div>
  );
}
