"use client";

import { useState } from "react";
import Link from "next/link";
import { DailyQuiz } from "@/components/daily-quiz";
import { Leaderboard } from "@/components/leaderboard";
import { ResetCountdown } from "@/components/reset-countdown";
import type { WordEntry } from "@/lib/words";

export function ChallengeSection({ words, challengeId }: { words: WordEntry[]; challengeId: string }) {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="play-layout">
      <DailyQuiz words={words} challengeId={challengeId} onScoreSaved={() => setRefreshKey((value) => value + 1)} />
      <aside className="leaderboard-card">
        <div className="section-header compact">
          <div>
            <span className="live-label">Live</span>
            <h3>Top Typo Finders</h3>
            <ResetCountdown />
          </div>
        </div>
        <Leaderboard challengeId={challengeId} refreshKey={refreshKey} />
        <Link className="leaderboard-mobile-link" href="/leaderboard">View all rankings</Link>
      </aside>
    </div>
  );
}
