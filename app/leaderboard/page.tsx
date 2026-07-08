import { Leaderboard } from "@/components/leaderboard";

export const metadata = {
  title: "Global Leaderboard"
};

export default function LeaderboardPage() {
  return (
    <section className="container content-page">
      <article className="article">
        <span className="eyebrow">Global ranking</span>
        <h1>Typofind leaderboard</h1>
        <p className="deck">
          The global board ranks all signed finishes by score, then speed. Local development uses a JSON database;
          production uses Supabase when environment variables are configured.
        </p>
      </article>
      <div className="panel">
        <Leaderboard />
      </div>
    </section>
  );
}
