export const metadata = {
  title: "FAQ"
};

export default function FAQPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">FAQ</span>
        <h1>Frequently asked questions</h1>
        <h2>Why design a spelling game?</h2>
        <p>
          Because spelling errors are tiny attention leaks. Typofind turns them into a short daily habit that feels more
          like editing a sentence than grinding a flashcard deck.
        </p>
        <h2>Where do the words come from?</h2>
        <p>
          The initial word bank is based on widely cited commonly misspelled English words and editorial spelling traps.
          The list is designed to expand as real answer data accumulates.
        </p>
        <h2>How does the leaderboard work?</h2>
        <p>Scores are sorted by correct answers first, then time. A 20/20 in 80 seconds beats a 19/20 in 20 seconds.</p>
        <h2>Does Typofind support dark mode?</h2>
        <p>Yes. The theme toggle in the header stores your preference locally.</p>
      </article>
    </section>
  );
}
