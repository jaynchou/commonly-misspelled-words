import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Double Letter Spelling Words",
  description: "Learn double letter spelling words with memorable examples such as accommodate, committee, occurrence, and successful.",
  alternates: { canonical: "/double-letter-spelling-words" }
};

const examples = [
  ["accommodate", "double c and double m"],
  ["committee", "double m, double t, and double e"],
  ["embarrass", "double r and double s"],
  ["occurred", "double c and double r"],
  ["occurrence", "double c and double r, then -ence"],
  ["successful", "double c and double s"],
  ["tomorrow", "one m and double r"],
  ["beginning", "one n at the start, double n in the middle"]
];

export default function DoubleLetterWordsPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">Spelling pattern</span>
        <h1>Double letter spelling words.</h1>
        <p className="deck">Doubled letters make ordinary words surprisingly hard to proofread. The trick is not to stare at the word longer—it is to notice the specific pattern each word carries.</p>
        <h2>Common double-letter traps</h2>
        <div className="word-articles">
          {examples.map(([word, pattern]) => (
            <article className="word-card" key={word}>
              <div className="word-card-top"><h3>{word}</h3></div>
              <p><strong>Pattern:</strong> {pattern}.</p>
            </article>
          ))}
        </div>
        <h2>How to remember them</h2>
        <p>Break the word into a small phrase rather than trying to memorize one long string of letters. For example, think “accommodate has room for two c&apos;s and two m&apos;s,” or “occurred is occur plus -red, so the r doubles.” A spoken cue is often easier to recall than a rule you only half remember.</p>
        <p>Double letters appear often in professional writing. Pair this guide with <Link href="/commonly-misspelled-words-at-work">commonly misspelled words at work</Link>, then browse the full <Link href="/commonly-misspelled-words">Top 100 list</Link> for more patterns.</p>
        <Link className="primary-button" href="/">Practice with today&apos;s quiz</Link>
      </article>
    </section>
  );
}
