"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
const quotes = [
  [
    "“A tiny doorway to a memory I never wanted to lose.”",
    "A personalized memory scene",
  ],
  [
    "“It’s the little details that make it feel like home.”",
    "A miniature house concept",
  ],
  [
    "“An entire story, held in the palm of your hand.”",
    "A fantasy diorama concept",
  ],
];
export function Testimonials() {
  const [ref, api] = useEmblaCarousel({ loop: true });
  return (
    <section className="testimonials section">
      <div className="eyebrow">THE FEELING WE HOPE TO CREATE</div>
      <div className="embla" ref={ref}>
        <div className="embla-container">
          {quotes.map(([quote, type]) => (
            <div className="testimonial-slide" key={quote}>
              <span className="quote-mark">“</span>
              <blockquote>{quote}</blockquote>
              <span className="eyebrow">{type}</span>
              <p className="small-note">
                Illustrative demo copy · Not a verified client review
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-controls">
        <button onClick={() => api?.scrollPrev()} aria-label="Previous quote">
          <ArrowLeft size={18} />
        </button>
        <span>THOUGHTS IN MINIATURE</span>
        <button onClick={() => api?.scrollNext()} aria-label="Next quote">
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
