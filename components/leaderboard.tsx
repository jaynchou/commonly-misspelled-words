"use client";

import { useEffect, useState } from "react";

type Entry = {
  name: string;
  score: number;
  timeMs: number;
  challengeId: string;
  createdAt: string;
};

function formatTime(ms: number) {
  const seconds = Math.round(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function Leaderboard({ challengeId, refreshKey = 0 }: { challengeId?: string; refreshKey?: number }) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const url = challengeId ? `/api/leaderboard?challengeId=${challengeId}` : "/api/leaderboard";
      const response = await fetch(url, { cache: "no-store" });
      const data = await response.json();
      if (active) setEntries(data.entries || []);
    };

    load();
    const interval = window.setInterval(load, 10000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [challengeId, refreshKey]);

  if (!entries.length) {
    return <p className="note">No finishers yet. The first signed score will set today&apos;s standard.</p>;
  }

  return (
    <div className="leaderboard-scroll">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {entries.slice(0, 100).map((entry, index) => (
            <tr key={`${entry.createdAt}-${entry.name}`}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.score.toFixed(1)}/10</td>
              <td>{formatTime(entry.timeMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
