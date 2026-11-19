"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="error-page">
      <span className="eyebrow">A MOMENTARY PAUSE</span>
      <h1>
        A little
        <br />
        <em>interruption.</em>
      </h1>
      <p>Something interrupted this page. Please try loading it again.</p>
      <button onClick={reset} className="button">
        Try again
      </button>
    </section>
  );
}
