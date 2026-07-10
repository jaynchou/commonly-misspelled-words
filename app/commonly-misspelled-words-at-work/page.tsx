import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commonly Misspelled Words at Work",
  description: "A practical list of commonly misspelled words at work, with clear spelling tips for emails, reports, and presentations.",
  alternates: { canonical: "/commonly-misspelled-words-at-work" }
};

const words = [
  ["accommodate", "Double c, double m. Think: the word has room for both pairs."],
  ["colleague", "The ending is -league, not -legue."],
  ["definitely", "It comes from definite, not from final."],
  ["independent", "The adjective usually ends in -ent."],
  ["maintenance", "Maintain changes to maintenance; the middle is -ten-."],
  ["necessary", "One c, then double s."],
  ["privilege", "There is no d in privilege."],
  ["relevant", "Relevant ends in -ant."],
  ["separate", "The second vowel is a: sep-a-rate."],
  ["successful", "Double c, double s, and one l at the end."]
];

export default function WorkWordsPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">Work writing</span>
        <h1>Commonly misspelled words at work.</h1>
        <p className="deck">A polished message does not need fancy language, but it does benefit from getting the familiar hard words right. Keep this short list nearby for emails, reports, proposals, and presentation slides.</p>
        <h2>Ten words worth checking twice</h2>
        <div className="word-articles">
          {words.map(([word, tip]) => (
            <article className="word-card" key={word}>
              <div className="word-card-top"><h3>{word}</h3></div>
              <p>{tip}</p>
            </article>
          ))}
        </div>
        <h2>A quick proofreading routine</h2>
        <p>Before you send an important message, read the subject line, names, numbers, and any words with doubled letters one extra time. Spellcheck catches a lot, but it may not notice a real word used in the wrong context or a close-looking misspelling inside a name.</p>
        <p>For a broader study list, visit the <Link href="/commonly-misspelled-words">TypoFind top 100 commonly misspelled words</Link>. If double letters are your weak spot, start with <Link href="/double-letter-spelling-words">this double-letter spelling guide</Link>.</p>
        <Link className="primary-button" href="/">Try today&apos;s spelling challenge</Link>
      </article>
    </section>
  );
}
