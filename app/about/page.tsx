import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "About TypoFind",
  description: "Learn about TypoFind, a free daily spelling and proofreading challenge.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <section className="container content-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TypoFind",
          url: "https://typofind.com",
          description: "A free daily spelling and proofreading challenge."
        }}
      />
      <article className="article">
        <span className="eyebrow">About</span>
        <h1>A small daily habit for catching more typos.</h1>
        <p className="deck">I built TypoFind because spelling mistakes are easy to miss when you read your own work quickly. A tiny daily challenge felt like a more enjoyable way to keep that proofreading muscle active.</p>
        <p>I&apos;m Jay, an independent developer and the person behind TypoFind. This is a small project I&apos;m building in public—one daily round, one difficult word, and hopefully one fewer typo at a time.</p>
        <h2>Why I made it</h2>
        <p>Spellcheck is helpful, but it does not always teach you why a word looks wrong. I wanted to make the familiar traps feel memorable: the missing letter in <em>definitely</em>, the double letters in <em>accommodate</em>, or the vowels that get swapped in <em>receive</em>.</p>
        <h2>How I choose words</h2>
        <p>I curate the word list around mistakes people genuinely make: doubled consonants, silent letters, vowel swaps, and endings that sound alike. Every question includes a correct spelling and close-looking alternatives, because that small moment of comparison is where the learning happens.</p>
        <h2>A quick note on language</h2>
        <p>TypoFind primarily uses standard American English spellings. When a word has regional variations, I aim to make the convention clear in the study note rather than pretending there is only one way English is used everywhere.</p>
        <h2>Keep me honest</h2>
        <p>If you find a weak clue, a spelling issue, or have an idea that would make the game more useful, I&apos;d genuinely like to hear it. You can reach me at <a href="mailto:contact@typofind.com">contact@typofind.com</a>.</p>
        <p>TypoFind is for quick practice and curiosity. For important writing, always trust a dictionary, editor, or the style guide that fits your work.</p>
      </article>
    </section>
  );
}
