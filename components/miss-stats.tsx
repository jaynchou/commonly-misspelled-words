"use client";

import { useEffect, useState } from "react";

type Stats = {
  topWords: Array<{ word: string; misses: number; topWrong: string }>;
  topTypos: Array<{ typo: string; word: string; misses: number }>;
  mostMissedWord: { word: string; misses: number; topWrong: string } | null;
  mostChosenTypo: { typo: string; word: string; misses: number } | null;
};

const sampleStats: Stats = {
  mostMissedWord: { word: "necessary", misses: 184, topWrong: "neccessary" },
  mostChosenTypo: { typo: "definately", word: "definitely", misses: 156 },
  topTypos: [
    { typo: "definately", word: "definitely", misses: 156 },
    { typo: "seperate", word: "separate", misses: 141 },
    { typo: "recieve", word: "receive", misses: 128 }
  ],
  topWords: [
    { word: "necessary", misses: 184, topWrong: "neccessary" },
    { word: "definitely", misses: 156, topWrong: "definately" },
    { word: "separate", misses: 141, topWrong: "seperate" },
    { word: "receive", misses: 128, topWrong: "recieve" },
    { word: "accommodate", misses: 117, topWrong: "accomodate" },
    { word: "occurrence", misses: 103, topWrong: "occurence" },
    { word: "maintenance", misses: 97, topWrong: "maintainance" },
    { word: "embarrass", misses: 91, topWrong: "embarass" },
    { word: "privilege", misses: 84, topWrong: "privelege" },
    { word: "conscience", misses: 76, topWrong: "concience" }
  ]
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

  const displayStats = stats && stats.topWords.length ? stats : sampleStats;

  return (
    <div className="stats-grid">
      <article className="panel">
        <span className="eyebrow">Yesterday&apos;s most missed word</span>
        <h3>{displayStats.mostMissedWord?.word}</h3>
        <p>
          Missed {displayStats.mostMissedWord?.misses} times yesterday. The most tempting wrong answer was{" "}
          <strong>{displayStats.mostMissedWord?.topWrong}</strong>.
        </p>
      </article>
      <article className="panel">
        <span className="eyebrow">Yesterday&apos;s most chosen typo</span>
        <h3>{displayStats.mostChosenTypo?.typo}</h3>
        <p>
          Players picked this for <strong>{displayStats.mostChosenTypo?.word}</strong>{" "}
          {displayStats.mostChosenTypo?.misses} times.
        </p>
      </article>
      <article className="panel wide-panel">
        <span className="eyebrow">Top 10 missed words yesterday</span>
        <ol className="miss-list">
          {displayStats.topWords.slice(0, 10).map((item) => (
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
