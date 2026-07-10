import { Leaderboard } from "@/components/leaderboard";
import Link from "next/link";

export const metadata = {
  title: "TypoFind Leaderboard | Daily Spelling Challenge Scores",
  description: "See signed TypoFind spelling challenge scores, ranked by verified score and completion time.",
  alternates: { canonical: "/leaderboard" }
};

export default function LeaderboardPage() {
  return (
    <section className="container content-page leaderboard-page">
      <article className="leaderboard-hero">
        <span className="eyebrow">Global ranking</span>
        <h1>Typofind leaderboard</h1>
        <p>
          The all-time board ranks every signed daily finish by score, then speed. Finish today&apos;s <Link href="/">daily spelling challenge</Link> to add your result, or prepare with the <Link href="/commonly-misspelled-words-at-work">commonly misspelled words at work</Link> guide.
        </p>
      </article>
      <div className="panel">
        <Leaderboard />
      </div>
    </section>
  );
}
