import Link from "next/link";
import { ChallengeSection } from "@/components/challenge-section";
import { FAQAccordion } from "@/components/faq-accordion";
import { MissStats } from "@/components/miss-stats";
import { challengeId, dailyWords } from "@/lib/words";

export const metadata = {
  title: "TypoFind: Official Free Daily Misspelled Words Quiz Game",
  description:
    "Play TypoFind, a free daily typo quiz game where you find misspelled words, fix spelling mistakes, and test your proofreading skills."
};

export default function HomePage() {
  const words = dailyWords();
  const today = challengeId();

  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <span className="kicker">Typofind.com</span>
          <h1 className="hero-line">TypoFind: A Commonly Misspelled Words Quiz Game</h1>
        </div>
      </section>

      <section className="challenge-band">
        <ChallengeSection words={words} challengeId={today} />
      </section>

      <section className="container section">
        <div className="section-header">
          <div>
            <span className="eyebrow">How to play</span>
            <h2>Four choices, one correct spelling.</h2>
          </div>
        </div>
        <div className="grid-3">
          <article className="panel">
            <h3>1. Start the daily challenge</h3>
            <p>Tap Start. You get 20 words, and every word has a 10-second timer.</p>
          </article>
          <article className="panel">
            <h3>2. Read the sentence</h3>
            <p>Example: Choose the word meaning to provide room or fit a need.</p>
          </article>
          <article className="panel">
            <h3>3. Score up to 10</h3>
            <p>Correct answers earn points. Faster correct answers earn a small time bonus.</p>
          </article>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <div>
            <span className="eyebrow">Today&apos;s mistakes</span>
            <h2>What players are missing now.</h2>
          </div>
        </div>
        <MissStats challengeId={today} />
      </section>

      <section className="container section">
        <div className="section-header">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Questions before you play.</h2>
          </div>
          <Link className="secondary-button" href="/commonly-misspelled-words">
            Study the top words
          </Link>
        </div>
        <FAQAccordion limit={6} />
      </section>
    </>
  );
}
