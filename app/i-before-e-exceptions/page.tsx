import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "I Before E Exceptions",
  description: "Understand i before e exceptions with practical examples including weird, foreign, receive, and height.",
  alternates: { canonical: "/i-before-e-exceptions" }
};

export default function IBeforeEPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">Spelling pattern</span>
        <h1>I before e exceptions: when the rhyme breaks.</h1>
        <p className="deck">“I before e except after c” is a useful memory prompt, but it is not a complete spelling system. Use it as a clue—not a verdict.</p>
        <h2>The familiar examples</h2>
        <div className="grid-3 how-grid">
          <section className="panel how-card"><h3>receive</h3><p>After c, the letters are usually ei: receive, receipt, and deceive.</p></section>
          <section className="panel how-card"><h3>weird</h3><p>Weird is a classic exception. It uses ei even though there is no c before it.</p></section>
          <section className="panel how-card"><h3>foreign</h3><p>Foreign also uses ei, and its pronunciation does not make the spelling obvious.</p></section>
        </div>
        <h2>Why the rhyme is not enough</h2>
        <p>English spelling reflects word history as well as sound. That is why <em>height</em>, <em>their</em>, <em>science</em>, and <em>seize</em> do not fit neatly into the rhyme. When a word feels uncertain, learn the whole word and a small reminder rather than forcing it into a rule.</p>
        <h2>A better way to practice</h2>
        <p>Make pairs: <em>receive</em> and <em>believe</em>; <em>weird</em> and <em>friend</em>; <em>foreign</em> and <em>height</em>. Comparing words that obey and break the rhyme helps you remember which one you are looking at.</p>
        <p>Continue with the <Link href="/commonly-misspelled-words">Top 100 commonly misspelled words</Link>, or study <Link href="/double-letter-spelling-words">double-letter spelling words</Link> for another high-impact pattern.</p>
        <Link className="primary-button" href="/">Test yourself in today&apos;s challenge</Link>
      </article>
    </section>
  );
}
