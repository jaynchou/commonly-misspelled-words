export const metadata = {
  title: "How to Play"
};

export default function HowToPlayPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">How to play</span>
        <h1>Twenty words. One clean score.</h1>
        <h2>Rules</h2>
        <p>Choose the correctly spelled word from the options. The challenge ends after 20 questions.</p>
        <p>Your result is ranked by correct answers first and elapsed time second.</p>
        <p>You only enter your name after the quiz is complete. That is when the score is written to the database.</p>
        <h2>Daily challenge</h2>
        <p>Everyone receives the same daily set, selected deterministically from the Typofind word bank.</p>
      </article>
    </section>
  );
}
