import { FAQAccordion } from "@/components/faq-accordion";
import Link from "next/link";

export const metadata = {
  title: "TypoFind FAQ | Daily Spelling Quiz Help",
  description: "Answers about the TypoFind daily spelling quiz, scoring, leaderboard, reset time, and commonly misspelled words.",
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
        <p>New here? Read <Link href="/how-to-play">how to play TypoFind</Link>, or explore the <Link href="/commonly-misspelled-words">Top 100 commonly misspelled words</Link> before starting a challenge.</p>
        <FAQAccordion />
      </article>
    </section>
  );
}
