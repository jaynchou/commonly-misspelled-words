import { expandedWordBank, wordBank } from "@/lib/words";
import { StructuredData } from "@/components/structured-data";

export const metadata = {
  title: "Commonly Misspelled Words",
  description: "Top commonly misspelled words, most misspelled words, and a ranked Typofind study list.",
  alternates: { canonical: "/commonly-misspelled-words" }
};

export default function WordsPage() {
  const top100 = wordBank.slice(0, 100);
  const top500 = expandedWordBank.slice(0, 500);

  return (
    <section className="container content-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "TypoFind top 100 commonly misspelled words",
          itemListElement: top100.map((entry) => ({ "@type": "ListItem", position: entry.rank, name: entry.word }))
        }}
      />
      <div className="content-grid seo-grid">
        <aside className="toc">
          <span className="eyebrow">On this page</span>
          <a href="#top-100">Top 100 words</a>
          <a href="#why">Why words get misspelled</a>
          <a href="#practice">How to practice</a>
        </aside>
        <article className="article">
          <span className="eyebrow">Commonly misspelled words</span>
          <h1>Commonly misspelled words: the TypoFind top 100 list.</h1>
          <p className="deck">
            English spelling is full of silent letters, doubled consonants, unstressed vowels, and endings that sound
            alike. This guide explains the most commonly misspelled words in the TypoFind quiz and gives a clear reason
            each word trips people up.
          </p>

          <h2 id="top-100">Top 100 commonly misspelled words</h2>
          <div className="word-articles">
            {top100.map((entry) => (
              <article className="word-card" key={`${entry.rank}-${entry.word}`}>
                <div className="word-card-top">
                  <span>{entry.rank}</span>
                  <h3>{entry.word}</h3>
                </div>
                <p>
                  <strong>Common misspellings:</strong> {entry.misspellings.join(", ")}.
                </p>
                <p>{entry.sentence}</p>
                <p>{entry.why}</p>
              </article>
            ))}
          </div>

          <h2 id="why">Why these words are easy to misspell</h2>
          <p>
            Most spelling mistakes come from a small set of patterns: a consonant should be doubled but is not, a
            consonant is doubled when it should not be, a vowel is reduced in speech, or a familiar rule such as
            &quot;i before e&quot; is applied too broadly. TypoFind turns those patterns into a short daily proofreading
            exercise.
          </p>

          <h2 id="practice">How to practice the full list</h2>
          <p>
            Start with the top 100 words above, then use the daily quiz to test recall under a light time limit. The
            larger TypoFind archive contains {top500.length} study entries for future topic pages and expanded practice
            modes.
          </p>
        </article>
      </div>
    </section>
  );
}
