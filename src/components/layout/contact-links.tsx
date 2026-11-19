import { Phone, Video, Camera, MessageCircle } from "lucide-react";
import { site } from "@/config/site";
export function ContactLinks() {
  return (
    <div className="contact-links">
      <a href={site.phoneHref}>
        <Phone size={20} />
        <span>
          <small>CALL FOR CUSTOM ORDERS</small>
          <strong>{site.phone}</strong>
        </span>
      </a>
      <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={20} />
        <span>
          <small>WHATSAPP ENQUIRIES</small>
          <strong>Discuss your miniature</strong>
        </span>
      </a>
      <a href={site.youtube} target="_blank" rel="noopener noreferrer">
        <Video size={20} />
        <span>
          <small>YOUTUBE SHORTS</small>
          <strong>@tinydotsminiatures3747</strong>
        </span>
      </a>
      <a href={site.instagram} target="_blank" rel="noopener noreferrer">
        <Camera size={20} />
        <span>
          <small>INSTAGRAM</small>
          <strong>@tinydots_miniatures1</strong>
        </span>
      </a>
    </div>
  );
}
