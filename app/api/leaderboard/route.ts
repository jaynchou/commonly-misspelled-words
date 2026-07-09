import { NextResponse } from "next/server";
import { addLeaderboardEntry, listLeaderboard } from "@/lib/leaderboard";
import { totalScore } from "@/lib/scoring";
import { challengeId as currentChallengeId, wordsForChallengeId } from "@/lib/words";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const challengeId = searchParams.get("challengeId") || undefined;
  const entries = await listLeaderboard(challengeId);
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const body = await request.json();
  const score = Number(body.score);
  const timeMs = Number(body.timeMs);
  const challengeId = String(body.challengeId || "");
  const answers = Array.isArray(body.answers) ? body.answers : [];

  if (!Number.isFinite(score) || score < 0 || score > 10) {
    return NextResponse.json({ error: "Invalid score." }, { status: 400 });
  }

  if (!Number.isFinite(timeMs) || timeMs <= 0 || timeMs > 60 * 60 * 1000) {
    return NextResponse.json({ error: "Invalid time." }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(challengeId)) {
    return NextResponse.json({ error: "Invalid challenge." }, { status: 400 });
  }

  if (challengeId !== currentChallengeId()) {
    return NextResponse.json({ error: "This daily challenge is no longer active." }, { status: 409 });
  }

  const challengeWords = wordsForChallengeId(challengeId);
  if (answers.length !== challengeWords.length) {
    return NextResponse.json({ error: "Incomplete answer sheet." }, { status: 400 });
  }

  const cleanedAnswers = answers.slice(0, 20).map((answer: Record<string, unknown>, index: number) => {
    const expected = challengeWords[index];
    const selected = String(answer.selected || "").slice(0, 60);
    return {
      word: expected.word,
      selected,
      correct: expected.word,
      isCorrect: selected === expected.word,
      remainingMs: Math.max(0, Math.min(10000, Number(answer.remainingMs) || 0))
    };
  });
  const verifiedScore = totalScore(cleanedAnswers);

  const entry = await addLeaderboardEntry({
    name: String(body.name || "Anonymous"),
    score: verifiedScore,
    timeMs,
    challengeId,
    answers: cleanedAnswers
  });

  return NextResponse.json({ entry });
}
