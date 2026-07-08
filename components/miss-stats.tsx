"use client";

import { useEffect, useState } from "react";

type Stats = {
  topWords: Array<{ word: string; misses: number; topWrong: string }>;
  topTypos: Array<{ typo: string; word: string; misses: number }>;
  mostMissedWord: { word: string; misses: number; topWrong: string } | null;
  mostChosenTypo: { typo: string; word: string; misses: number } | null;
};

export function MissStats({ challengeId }: { challengeId: string }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`/api/stats?challengeId=${challengeId}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (active) setStats(data);
      });

    return () => {
      active = false;
    };
  }, [challengeId]);

  if (!stats || !stats.topWords.length) {
    return (
      <div className="panel">
        <h3>Today&apos;s hardest words</h3>
        <p>No wrong-answer data yet. Once players finish, this section will show the words missed most often today.</p>
      </div>
    );
  }

  return (
    <div className="stats-grid">
      <article className="panel">
        <span className="eyebrow">Most missed word</span>
        <h3>{stats.mostMissedWord?.word}</h3>
        <p>
          Missed {stats.mostMissedWord?.misses} times today. The most tempting wrong answer is{" "}
          <strong>{stats.mostMissedWord?.topWrong}</strong>.
        </p>
      </article>
      <article className="panel">
        <span className="eyebrow">Most chosen typo</span>
        <h3>{stats.mostChosenTypo?.typo}</h3>
        <p>
          Players picked this for <strong>{stats.mostChosenTypo?.word}</strong>{" "}
          {stats.mostChosenTypo?.misses} times.
        </p>
      </article>
      <article className="panel wide-panel">
        <span className="eyebrow">Top 10 missed words today</span>
        <ol className="miss-list">
          {stats.topWords.slice(0, 10).map((item) => (
            <li key={item.word}>
              <span>{item.word}</span>
              <small>
                {item.misses} misses, often as {item.topWrong}
              </small>
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}
