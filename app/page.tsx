import Link from "next/link";
import { DailyQuiz } from "@/components/daily-quiz";
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
          <h1>TypoFind: Official Free Daily Misspelled Words Quiz Game</h1>
          <p className="deck">
            A daily commonly misspelled words quiz inspired by dictionary and encyclopedia reference lists to help you
            correct words.
          </p>
        </div>
      </section>

      <section className="container challenge-band">
        <DailyQuiz words={words} challengeId={today} />
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
            <h3>1. Start the daily desk</h3>
            <p>Tap Start. You get 20 words, and every word has a 10-second timer.</p>
          </article>
          <article className="panel">
            <h3>2. Read the sentence</h3>
            <p>Example: Use &quot;accommodate&quot; when you mean to provide room or fit a need.</p>
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
        <div className="grid-3">
          <article className="panel">
            <h3>Is TypoFind free?</h3>
            <p>Yes. The daily misspelled words quiz is free to play.</p>
          </article>
          <article className="panel">
            <h3>Why only one daily quiz?</h3>
            <p>A shared daily set keeps the leaderboard fair and makes comparison meaningful.</p>
          </article>
          <article className="panel">
            <h3>How is the score calculated?</h3>
            <p>Each of 20 questions is worth up to 0.5 points. The total score is out of 10.</p>
          </article>
        </div>
      </section>
    </>
  );
}
