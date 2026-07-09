"use client";

import { useEffect, useState } from "react";

type Entry = {
  name: string;
  score: number;
  timeMs: number;
  challengeId: string;
  createdAt: string;
};

const SAMPLE_ENTRIES: Entry[] = [
  { name: "Mae", score: 9.7, timeMs: 143000, challengeId: "sample", createdAt: "sample-1" },
  { name: "ProofNina", score: 9.4, timeMs: 158000, challengeId: "sample", createdAt: "sample-2" },
  { name: "Linotype", score: 8.9, timeMs: 171000, challengeId: "sample", createdAt: "sample-3" },
  { name: "CommaKid", score: 8.4, timeMs: 189000, challengeId: "sample", createdAt: "sample-4" },
  { name: "OxfordJoe", score: 7.8, timeMs: 206000, challengeId: "sample", createdAt: "sample-5" },
  { name: "Copy Desk", score: 7.4, timeMs: 221000, challengeId: "sample", createdAt: "sample-6" },
  { name: "Proof Mark", score: 7.1, timeMs: 238000, challengeId: "sample", createdAt: "sample-7" },
  { name: "Red Pencil", score: 6.8, timeMs: 246000, challengeId: "sample", createdAt: "sample-8" },
  { name: "Spellcheck", score: 6.2, timeMs: 263000, challengeId: "sample", createdAt: "sample-9" },
  { name: "Desk Note", score: 5.9, timeMs: 277000, challengeId: "sample", createdAt: "sample-10" },
  { name: "Margin", score: 5.6, timeMs: 291000, challengeId: "sample", createdAt: "sample-11" },
  { name: "Typesetter", score: 5.4, timeMs: 304000, challengeId: "sample", createdAt: "sample-12" },
  { name: "Blue Pencil", score: 5.1, timeMs: 318000, challengeId: "sample", createdAt: "sample-13" },
  { name: "Line Edit", score: 4.8, timeMs: 331000, challengeId: "sample", createdAt: "sample-14" },
  { name: "Galleys", score: 4.4, timeMs: 349000, challengeId: "sample", createdAt: "sample-15" },
  { name: "Columnist", score: 4.1, timeMs: 366000, challengeId: "sample", createdAt: "sample-16" },
  { name: "Errata", score: 3.7, timeMs: 382000, challengeId: "sample", createdAt: "sample-17" },
  { name: "Press Run", score: 3.3, timeMs: 397000, challengeId: "sample", createdAt: "sample-18" },
  { name: "Copy Chief", score: 3.0, timeMs: 414000, challengeId: "sample", createdAt: "sample-19" },
  { name: "Final Proof", score: 2.6, timeMs: 429000, challengeId: "sample", createdAt: "sample-20" }
];

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

  const displayEntries = entries.length ? entries : SAMPLE_ENTRIES;

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
          {displayEntries.slice(0, 50).map((entry, index) => (
            <tr key={`${entry.createdAt}-${entry.name}`}>
              <td>{index + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.score.toFixed(1)}/10</td>
              <td>{formatTime(entry.timeMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="leaderboard-more">Top 50 today. Scroll for more.</p>
    </div>
  );
}
