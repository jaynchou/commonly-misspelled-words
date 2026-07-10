import Link from "next/link";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: "How to Play TypoFind | Daily Spelling Quiz Rules",
  description:
    "Learn how to play TypoFind, the free daily commonly misspelled words quiz game with 20 questions, four choices, timed scoring, and a daily leaderboard.",
  alternates: { canonical: "/how-to-play" }
};

const steps = [
  {
    title: "1. Press Start",
    text: "Open the daily challenge and press Start today's quiz. The timer begins only after you start, so you can read the page first."
  },
  {
    title: "2. Read the clue",
    text: "Each question gives you a short meaning clue. The clue hints at the word without spelling it for you."
  },
  {
    title: "3. Pick one answer",
    text: "You will see exactly four spellings. One is correct, and three are common-looking mistakes."
  },
  {
    title: "4. Move through 20 words",
    text: "A full daily game has 20 questions. Each question has a 10-second timer."
  },
  {
    title: "5. Check your score",
    text: "Your score is out of 10. Correct answers matter most; faster correct answers earn a small bonus."
  },
  {
    title: "6. Sign the board",
    text: "After all 20 questions, enter a nickname and sign your score. TypoFind records the result only after the quiz is complete."
  }
];

export default function HowToPlayPage() {
  return (
    <section className="container content-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: "TypoFind spelling practice example",
          about: { "@type": "Thing", name: "English spelling" },
          hasPart: {
            "@type": "Question",
            text: "Choose the word that means to provide room or fit a need.",
            acceptedAnswer: { "@type": "Answer", text: "accommodate" }
          }
        }}
      />
      <article className="article">
        <span className="eyebrow">How to play</span>
        <h1>How to play TypoFind.</h1>
        <p className="deck">
          TypoFind is a daily commonly misspelled words quiz. Your job is simple: read the clue, ignore the tempting
          misspellings, and choose the one correct spelling before time runs out.
        </p>
        <p>Want a little practice first? Start with the <Link href="/commonly-misspelled-words">Top 100 commonly misspelled words</Link>, especially the guides to <Link href="/double-letter-spelling-words">double-letter words</Link> and <Link href="/i-before-e-exceptions">i before e exceptions</Link>.</p>

        <h2>Quick start</h2>
        <div className="grid-3 how-grid">
          {steps.map((step) => (
            <section className="panel how-card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </section>
          ))}
        </div>

        <h2>What a question looks like</h2>
        <div className="panel example-panel">
          <span className="eyebrow">Example</span>
          <h3>Choose the word that means to provide room or fit a need.</h3>
          <div className="example-choices" aria-label="Example spelling choices">
            <span>acommodate</span>
            <span className="correct-example">accommodate</span>
            <span>accomodate</span>
            <span>acomodate</span>
          </div>
          <p>
            The clue tells you the meaning, but it does not give away the spelling. In this example, the correct answer
            is the version with double c and double m.
          </p>
          <p>See more examples in the <Link href="/double-letter-spelling-words">double-letter spelling guide</Link>.</p>
        </div>

        <h2>The rules in plain English</h2>
        <ul className="rule-list">
          <li>There are 20 questions in the daily challenge.</li>
          <li>Every question has exactly four choices.</li>
          <li>Only one choice is spelled correctly.</li>
          <li>You have 10 seconds for each word.</li>
          <li>If the timer reaches zero, that question is counted as missed.</li>
          <li>You cannot submit a leaderboard score until all 20 questions are finished.</li>
        </ul>

        <h2>How scoring works</h2>
        <div className="panel">
          <p>
            Your final score is out of 10. Each question can add up to 0.5 points. A correct answer earns the main
            points, and a quick correct answer can add a small time bonus. Wrong answers and expired timers earn no
            points for that word.
          </p>
          <p>
            The leaderboard ranks players by score first. If two players have the same score, the faster finish ranks
            higher.
          </p>
        </div>

        <h2>How to get on the leaderboard</h2>
        <ol className="rule-list">
          <li>Finish the full 20-question daily challenge.</li>
          <li>Type a short nickname in the name box.</li>
          <li>Press Sign score.</li>
          <li>Your signed result appears on the daily ranking if it is accepted.</li>
        </ol>
        <p>
          Use a nickname, not private information. The leaderboard is public, and TypoFind may remove abusive, fake, or
          automated submissions.
        </p>

        <h2>Tips for better scores</h2>
        <div className="grid-3 how-grid">
          <section className="panel how-card">
            <h3>Watch doubled letters</h3>
            <p>Words like accommodate, occurrence, and committee often trick people because one letter doubles twice. Review the <Link href="/double-letter-spelling-words">full double-letter guide</Link>.</p>
          </section>
          <section className="panel how-card">
            <h3>Slow down on vowels</h3>
            <p>Many misspellings swap i and e, drop a vowel, or add one extra vowel that looks natural at first glance. The <Link href="/i-before-e-exceptions">i before e guide</Link> is a useful refresher.</p>
          </section>
          <section className="panel how-card">
            <h3>Trust the clue</h3>
            <p>If two spellings look close, use the meaning clue to stay focused on the word being tested.</p>
          </section>
        </div>

        <h2>Mobile play</h2>
        <p>
          TypoFind works on phones, tablets, laptops, and desktops. On mobile, the same rules apply: press Start, read
          the clue, tap one of four answers, and finish all 20 words before signing your score.
        </p>
      </article>
    </section>
  );
}
