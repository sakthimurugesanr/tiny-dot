import Image from "next/image";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/social-icons";
import Link from "next/link";
import { Phone, CalendarDays, MessageCircle } from "lucide-react";
import { WorkGallery, VideoGrid } from "@/components/portfolio/work-gallery";
import { ServiceGrid } from "@/components/portfolio/service-grid";
import { BookingButton } from "@/components/booking/booking-provider";
import { mediaImages } from "@/data/media";
import { site } from "@/config/site";
import { HeroShowcase } from "./hero-showcase";
import { StudioStats } from "./studio-stats";
import { services } from "@/data/services";
const maker = mediaImages.find((p) => p.id === "maker-and-bus")!;
export default function Home() {
  return (
    <>
      <HeroShowcase />
      <StudioStats />
      <section className="section services-section home-services" id="services">
        <div className="section-heading faded-section-intro">
          <div className="section-intro-photo" aria-hidden="true">
            <Image
              src="/images/services/home.webp"
              alt=""
              fill
              sizes="(max-width:800px) 100vw, 65vw"
            />
          </div>
          <div>
            <span className="eyebrow">What we can make</span>
            <h2>
              A small scale.
              <br />
              Plenty of possibility.
            </h2>
          </div>
        </div>
        <ServiceGrid
          compact
          items={services.filter((service) =>
            ["personalized", "architecture", "vehicles", "craft"].includes(
              service.category,
            ),
          )}
        />
      </section>
      <section className="section real-work-section" id="our-work">
        <div className="section-heading">
          <div>
            <span className="eyebrow">From our own workbench</span>
            <h2>
              Small things.
              <br />
              Extraordinary details.
            </h2>
          </div>
          <p>
            A curated selection of our buses, homes, architecture and craft
            work. Real photographs from the Tiny Dot’s collection.
          </p>
        </div>
        <WorkGallery preview />
      </section>
      <section className="section detail-points-section">
        <div>
          <span className="eyebrow">It’s all in the details</span>
          <h2>
            Make it yours.
            <br />
            Right down to
            <br />
            the little things.
          </h2>
          <p>The details you notice are the details we want to hear about.</p>
          <BookingButton>Discuss your custom details</BookingButton>
        </div>
        <div className="detail-points-grid">
          {[
            [
              "Colours & lettering",
              "A familiar paint scheme, route board or name can make a model feel like your own.",
            ],
            [
              "Interiors & small features",
              "Talk through seats, windows, doors, lights and the features you want to include.",
            ],
            [
              "Scale & presentation",
              "Find a size that works for your space and discuss a display base or protective case.",
            ],
            [
              "References & memories",
              "Photos, sketches and personal stories help establish what matters most to you.",
            ],
          ].map(([title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section studio-films">
        <div className="section-heading">
          <div>
            <h2>
              Watch a little
              <br />
              world come alive.
            </h2>
          </div>
          <p>
            From a closer look at a finished model to patient work at the table.
            Press play and step into the details.
          </p>
        </div>
        <VideoGrid preview />
        <div className="gallery-bottom">
          <span>Studio stories, ready to explore.</span>
          <Link className="button button-outline" href="/portfolio?view=videos">
            Watch all films
          </Link>
        </div>
      </section>
      <section className="section occasion-section">
        <div className="section-heading faded-section-intro">
          <div className="section-intro-photo" aria-hidden="true">
            <Image
              src="/images/services/handcraft.webp"
              alt=""
              fill
              sizes="(max-width:800px) 100vw, 65vw"
            />
          </div>
          <div>
            <span className="eyebrow">For your kind of story</span>
            <h2>
              A little world.
              <br />A bigger meaning.
            </h2>
          </div>
        </div>
        <div className="occasion-grid">
          {[
            {
              image: "/media/photos/om-sakthi-profile.webp",
              title: "A gift with a story",
              text: "A familiar vehicle, a personal detail, a thoughtful surprise. Explore a keepsake that begins with someone’s story.",
              service: "Vehicle Miniature",
            },
            {
              image: "/media/photos/modern-home.webp",
              title: "A place to keep close",
              text: "Bring the character of a home or a meaningful building into a little model made for your shelf.",
              service: "Miniature House",
            },
            {
              image: "/media/photos/campus-model.webp",
              title: "An idea to present",
              text: "Give an academic or exhibition project a tangible form, with a model that makes the details easier to explore.",
              service: "School / College Project",
            },
          ].map((item) => (
            <article key={item.title}>
              <div className="occasion-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="(max-width:600px) 90vw, 30vw"
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <BookingButton service={item.service} className="text-link">
                Explore this idea
              </BookingButton>
            </article>
          ))}
        </div>
      </section>
      <section className="section studio-quote">
        <span className="eyebrow">A note from our studio</span>
        <blockquote>
          “Small things can hold
          <br />
          the biggest memories.”
        </blockquote>
        <p>We start with the details that mean something to you.</p>
      </section>
      <section className="section how-it-works">
        <div className="section-heading">
          <div>
            <span className="eyebrow">From idea to miniature</span>
            <h2>Your idea starts here.</h2>
          </div>
          <BookingButton className="button button-outline">
            Request a consultation
          </BookingButton>
        </div>
        <div className="booking-steps">
          {[
            [
              "Tell us the idea",
              "Choose a service and tell us what you’d like to make. Add a preferred date for a conversation.",
            ],
            [
              "Talk through the details",
              "Discuss references, scale, materials, personal touches, budget and the timing you have in mind.",
            ],
            [
              "Agree before we begin",
              "We confirm the project scope, pricing and delivery options directly before any work is agreed.",
            ],
          ].map(([title, body], index) => (
            <article key={title}>
              <span className="process-dot" aria-label={`Step ${index + 1}`}>
                {index + 1}
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section maker-story">
        <div className="maker-photo">
          <Image
            src={maker.src}
            alt={maker.alt}
            fill
            sizes="(max-width:800px) 90vw, 40vw"
          />
        </div>
        <div>
          <span className="eyebrow">Meet the hands behind the miniatures</span>
          <h2>
            A love for craft.
            <br />A world of details.
          </h2>
          <p>
            Tiny Dot’s miniatures brings together personalized keepsakes,
            buildings, vehicles, dioramas, gifts and bespoke craft. Every new
            idea begins with a conversation about the details that matter to
            you.
          </p>
          <p>
            Take a look at the work, bring your references, and let’s explore
            what your own miniature could become.
          </p>
          <div className="button-row">
            <Link className="button button-outline" href="/about">
              A little about us
            </Link>
            <a
              className="text-link"
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} />
              Talk about your idea
            </a>
          </div>
        </div>
      </section>
      <section className="section quote-inline">
        <span>The way we make</span>
        <blockquote>“Less hurry. More heart. Every little detail.”</blockquote>
      </section>
      <section className="section booking-faq">
        <div>
          <span className="eyebrow">Before we get started</span>
          <h2>
            A few little
            <br />
            questions.
          </h2>
          <BookingButton className="button button-outline">
            Ask about your idea
          </BookingButton>
        </div>
        <div className="simple-faq">
          {[
            [
              "Can I request a specific bus or home?",
              "Yes—share photographs, drawings or the details you have in mind. Feasibility, size and features are discussed for each project.",
            ],
            [
              "What does a custom miniature cost?",
              "Pricing depends on the size, detail, materials and presentation. Your enquiry starts a conversation; it does not generate an automatic quote.",
            ],
            [
              "Does a booking request confirm an appointment?",
              "A request records your preferred date and time. Tiny Dot’s confirms the appointment directly after reviewing your details.",
            ],
            [
              "Can I discuss delivery before ordering?",
              "Yes. Confirm delivery availability, packaging, costs and the timeline directly before agreeing to a project.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="section social-section">
        <div>
          <span className="eyebrow">More from our little world</span>
          <h2>Follow the making.</h2>
          <p>Find more details and updates on our original social channels.</p>
        </div>
        <div className="social-cards">
          <a href={site.youtube} target="_blank" rel="noopener noreferrer">
            <YoutubeIcon size={27} />
            <strong>YouTube Shorts</strong>
            <span>@tinydotsminiatures3747</span>
            <small>Watch our miniature models</small>
          </a>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            <InstagramIcon size={27} />
            <strong>Instagram</strong>
            <span>@tinydots_miniatures1</span>
            <small>Follow the latest work</small>
          </a>
        </div>
      </section>
      <section className="section brief-banner enhanced-cta">
        <span className="eyebrow">
          A little idea can become something special
        </span>
        <h2>
          What shall we
          <br />
          make for you?
        </h2>
        <p>
          Bring your idea. We’ll talk through the possibilities, the practical
          details and a plan that works for your project.
        </p>
        <div className="button-row">
          <BookingButton>
            <CalendarDays size={17} />
            Book an appointment
          </BookingButton>
          <a className="button button-outline" href={site.phoneHref}>
            <Phone size={17} />
            Call {site.phone}
          </a>
        </div>
        <span className="cta-small-note">
          A simple request. A personal conversation. No payment upfront.
        </span>
      </section>
    </>
  );
}
