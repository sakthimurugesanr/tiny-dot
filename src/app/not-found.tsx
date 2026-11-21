import { ButtonLink } from "@/components/ui/button";
export default function NotFound() {
  return (
    <section className="error-page">
      <span className="eyebrow">A little detour</span>
      <h1>
        This world is
        <br />
        <em>yet to be found.</em>
      </h1>
      <p>Let’s find your way back to somewhere wonderful.</p>
      <ButtonLink href="/portfolio">Explore the portfolio</ButtonLink>
    </section>
  );
}
