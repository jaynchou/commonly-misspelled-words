import { FAQAccordion } from "@/components/faq-accordion";

export const metadata = {
  title: "FAQ",
  alternates: { canonical: "/faq" }
};

export default function FAQPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">FAQ</span>
        <h1>Frequently asked questions</h1>
        <p className="deck">
          Quick answers about the daily challenge, typo scoring, spelling clues, and the TypoFind leaderboard.
        </p>
        <FAQAccordion />
      </article>
    </section>
  );
}
