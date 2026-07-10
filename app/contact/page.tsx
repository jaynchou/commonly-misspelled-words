import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact TypoFind",
  description: "Contact TypoFind about spelling content, privacy, or leaderboard support.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">Contact</span>
        <h1>Get in touch.</h1>
        <p className="deck">I&apos;m Jay, the independent developer behind TypoFind. Email me with spelling content corrections, privacy requests, leaderboard support, or ideas for making the game better.</p>
        <p><a className="secondary-button" href="mailto:contact@typofind.com">contact@typofind.com</a></p>
        <h2>Before you write</h2>
        <p>For a leaderboard removal request, include the display name, approximate challenge date, and score so I can identify the entry without asking you to share unnecessary personal information.</p>
      </article>
    </section>
  );
}
