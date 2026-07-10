"use client";

import { useEffect, useState } from "react";

type Entry = { name: string; score: number; timeMs: number; challengeId: string; createdAt: string };

function formatTime(ms: number) {
  const seconds = Math.round(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function Leaderboard({ challengeId, refreshKey = 0 }: { challengeId?: string; refreshKey?: number }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const url = challengeId ? `/api/leaderboard?challengeId=${challengeId}` : "/api/leaderboard";
        const response = await fetch(url, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error("Leaderboard unavailable");
        if (active) {
          setEntries(data.entries || []);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    };

    load();
    const interval = window.setInterval(load, 10_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [challengeId, refreshKey]);

  if (status === "loading") return <p className="leaderboard-message">Loading leaderboard…</p>;
  if (status === "error") return <p className="leaderboard-message">The leaderboard is unavailable right now. Please try again soon.</p>;
  if (!entries.length) {
    return (
      <div className="leaderboard-empty">
        <strong>Set today&apos;s pace</strong>
        <p>No signed scores yet. Finish all 20 words to claim the first spot.</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-scroll">
      <table className="leaderboard-table">
        <thead><tr><th>#</th><th>Name</th><th>Score</th><th>Time</th></tr></thead>
        <tbody>
          {entries.slice(0, 50).map((entry, index) => (
            <tr key={`${entry.createdAt}-${entry.name}`}>
              <td>{index + 1}</td><td>{entry.name}</td><td>{entry.score.toFixed(1)}/10</td><td>{formatTime(entry.timeMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="leaderboard-more">{challengeId ? "Today’s top 50." : "Top 50 across all completed challenges."}</p>
    </div>
  );
}
