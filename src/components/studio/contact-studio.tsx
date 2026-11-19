import Image from "next/image";
import { Phone, MessageCircle, Camera, Video, Check } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-provider";
import { site } from "@/config/site";
export function ContactStudio() {
  return (
    <>
      <section className="section contact-intro">
        <div>
          <span className="eyebrow">LET’S START SOMETHING SMALL</span>
          <h1>
            Good ideas start
            <br />
            <em>with a hello.</em>
          </h1>
          <p>
            A question, a reference photo or a project you have been thinking
            about—bring it along. Choose the way you’d like to connect, and
            we’ll talk through the possibilities.
          </p>
          <BookingButton>Request a convenient time to talk</BookingButton>
        </div>
        <div className="contact-image">
          <Image
            src="/media/photos/campus-model.webp"
            alt="The maker presenting a detailed handmade building and landscape model"
            fill
            preload
            sizes="(max-width:800px) 90vw, 42vw"
          />
          <span>Made around an idea. Started with a conversation.</span>
        </div>
      </section>
      <section className="section contact-ways">
        <a href={site.phoneHref}>
          <Phone size={27} />
          <small>A DIRECT CONVERSATION</small>
          <h2>Give us a call.</h2>
          <strong>{site.phone}</strong>
          <p>
            Talk about your model, references and the details you have in mind.
          </p>
          <span>Call TINY DOT’S</span>
        </a>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={28} />
          <small>START WITH A MESSAGE</small>
          <h2>Say it on WhatsApp.</h2>
          <strong>Share your idea</strong>
          <p>
            Open a chat to discuss a model or share the references you want to
            talk through.
          </p>
          <span>Open WhatsApp</span>
        </a>
        <article>
          <Camera size={27} />
          <small>FOLLOW THE MAKING</small>
          <h2>A little inspiration.</h2>
          <p>
            Explore the original social channels for miniature details and
            updates.
          </p>
          <div>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              <Camera size={16} />
              Instagram
            </a>
            <a href={site.youtube} target="_blank" rel="noopener noreferrer">
              <Video size={17} />
              YouTube Shorts
            </a>
          </div>
        </article>
      </section>
      <section className="section contact-preparation">
        <div>
          <span className="eyebrow">MAKE THE FIRST CONVERSATION COUNT</span>
          <h2>
            A few things
            <br />
            to bring along.
          </h2>
          <p>You don’t need a complete plan. A starting point is enough.</p>
        </div>
        <ul>
          {[
            [
              "Your idea",
              "A vehicle, home, academic model or custom craft piece.",
            ],
            [
              "A reference",
              "Photographs, a sketch or a link to the details you like.",
            ],
            [
              "A little context",
              "Your preferred size, occasion, budget or target date.",
            ],
            [
              "Your questions",
              "Ask about materials, display cases, timing and delivery.",
            ],
          ].map(([title, text]) => (
            <li key={title}>
              <Check size={17} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="section brief-banner enhanced-cta">
        <span className="eyebrow">PREFER TO PLAN A CONVERSATION?</span>
        <h2>
          A simple request.
          <br />A personal response.
        </h2>
        <p>
          Share your details and a preferred time. Appointment availability and
          project scope are confirmed directly.
        </p>
        <BookingButton>Book an appointment</BookingButton>
      </section>
    </>
  );
}
