import Image from "next/image";
import Link from "next/link";
import { Hand, Ruler, Heart, BadgeCheck, MessageCircle } from "lucide-react";
import { BookingButton } from "@/components/booking/booking-provider";
import { site } from "@/config/site";
export function AboutStudio() {
  return (
    <>
      <section className="section about-intro">
        <div>
          <span className="eyebrow">
            The people. The patience. The little details.
          </span>
          <h1>
            Small models.
            <br />
            <em>A personal story.</em>
          </h1>
          <p>
            Tiny Dot’s miniatures is a place for ideas that deserve a closer
            look. We create handmade vehicle models, miniature homes, academic
            projects and bespoke craft pieces, shaped around the details that
            matter to you.
          </p>
          <div className="button-row">
            <BookingButton>Meet your next little idea</BookingButton>
            <a
              className="button button-outline"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} />
              Say hello on WhatsApp
            </a>
          </div>
        </div>
        <div className="about-main-image">
          <Image
            src="/media/photos/maker-and-bus.webp"
            alt="The Tiny Dot’s maker holding a handcrafted bus"
            fill
            preload
            sizes="(max-width:800px) 90vw, 45vw"
          />
        </div>
      </section>
      <section className="section about-values">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Our way of making</span>
            <h2>
              Thoughtful from
              <br />
              the first detail.
            </h2>
          </div>
          <p>
            A model is more than its size. It is a way to keep a place,
            recognise a favourite vehicle or bring an idea into the real world.
          </p>
        </div>
        <div className="about-value-grid">
          {[
            [
              Hand,
              "Made by hand",
              "Cutting, shaping, assembling and finishing give each model its own character. Small details receive the time and attention they need.",
            ],
            [
              Ruler,
              "Led by your references",
              "Your photographs, drawings and project brief guide the conversation about proportion, colour, materials and presentation.",
            ],
            [
              Heart,
              "Personal in its purpose",
              "A model can mark an occasion, honour a memory, explain an idea or become a display piece. We start by understanding what it means to you.",
            ],
          ].map(([Icon, title, text]) => {
            const Mark = Icon as typeof Hand;
            return (
              <article key={title as string}>
                <Mark size={26} />
                <h3>{title as string}</h3>
                <p>{text as string}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="section studio-quote">
        <span className="eyebrow">A studio note</span>
        <blockquote>
          “Made with patience.
          <br />
          Kept with meaning.”
        </blockquote>
        <p>Our approach to a world built one small detail at a time.</p>
      </section>
      <section className="section about-detail-story">
        <div className="about-detail-image">
          <Image
            src="/media/photos/temple-model.webp"
            alt="Columns and courtyard details in a handmade architectural model"
            fill
            loading="lazy"
            sizes="(max-width:800px) 90vw, 45vw"
          />
        </div>
        <div>
          <span className="eyebrow">The conversation before the craft</span>
          <h2>
            Bring the story.
            <br />
            We’ll explore the scale.
          </h2>
          <p>
            Maybe it is a bus you see every day. Maybe it is a home that holds
            years of memories. Or a project you want to present with pride. You
            don’t need to arrive with every answer.
          </p>
          <ul>
            {[
              "Tell us what makes your idea special.",
              "Share the references you already have.",
              "Discuss the details, size and finish.",
              "Agree on the scope, price and timing directly.",
            ].map((text) => (
              <li key={text}>
                <BadgeCheck size={16} />
                {text}
              </li>
            ))}
          </ul>
          <Link href="/portfolio" className="text-link">
            Explore the work behind the words
          </Link>
        </div>
      </section>
      <section className="section brief-banner enhanced-cta">
        <span className="eyebrow">Your story is a good place to start</span>
        <h2>Let’s make it personal.</h2>
        <p>
          Explore an idea for a model, a gift or a project in a simple
          consultation.
        </p>
        <BookingButton>Book a conversation</BookingButton>
      </section>
    </>
  );
}
