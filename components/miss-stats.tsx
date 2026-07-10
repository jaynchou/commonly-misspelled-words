"use client";

import { useEffect, useState } from "react";

type Stats = {
  topWords: Array<{ word: string; misses: number; topWrong: string }>;
  mostMissedWord: { word: string; misses: number; topWrong: string } | null;
  mostChosenTypo: { typo: string; word: string; misses: number } | null;
};

export function MissStats({ challengeId }: { challengeId: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/stats?challengeId=${challengeId}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Stats unavailable");
        return response.json();
      })
      .then((data) => active && setStats(data))
      .catch(() => active && setFailed(true));
    return () => { active = false; };
  }, [challengeId]);

  if (failed) return <p className="leaderboard-message">Yesterday&apos;s spelling trends are unavailable right now.</p>;
  if (!stats) return <p className="leaderboard-message">Loading yesterday&apos;s spelling trends…</p>;
  if (!stats.topWords.length) return <p className="leaderboard-message">There were no signed misses yesterday. Check back as players complete the challenge.</p>;

  return (
    <div className="stats-grid">
      <article className="panel">
        <span className="eyebrow">Yesterday&apos;s most missed word</span>
        <h3>{stats.mostMissedWord?.word}</h3>
        <p>Missed {stats.mostMissedWord?.misses} times yesterday. The most tempting wrong answer was <strong>{stats.mostMissedWord?.topWrong}</strong>.</p>
      </article>
      <article className="panel">
        <span className="eyebrow">Yesterday&apos;s most chosen typo</span>
        <h3>{stats.mostChosenTypo?.typo}</h3>
        <p>Players picked this for <strong>{stats.mostChosenTypo?.word}</strong> {stats.mostChosenTypo?.misses} times.</p>
      </article>
      <article className="panel wide-panel">
        <span className="eyebrow">Top 10 missed words yesterday</span>
        <ol className="miss-list">
          {stats.topWords.slice(0, 10).map((item) => (
            <li key={item.word}><span>{item.word}</span><small>{item.misses} misses, often as {item.topWrong}</small></li>
          ))}
        </ol>
      </article>
    </div>
  );
}
