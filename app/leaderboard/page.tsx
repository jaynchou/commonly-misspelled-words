import { Leaderboard } from "@/components/leaderboard";

export const metadata = {
  title: "Global Leaderboard",
  alternates: { canonical: "/leaderboard" }
};

export default function LeaderboardPage() {
  return (
    <section className="container content-page leaderboard-page">
      <article className="leaderboard-hero">
        <span className="eyebrow">Global ranking</span>
        <h1>Typofind leaderboard</h1>
        <p>
          The all-time board ranks every signed daily finish by score, then speed. Local development uses a JSON database;
          production uses Supabase when environment variables are configured.
        </p>
      </article>
      <div className="panel">
        <Leaderboard />
      </div>
    </section>
  );
}
