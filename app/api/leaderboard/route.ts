import { NextResponse } from "next/server";
import { addLeaderboardEntry, listLeaderboard } from "@/lib/leaderboard";
import { totalScore } from "@/lib/scoring";
import { decodeQuizSession } from "@/lib/quiz-session";
import { challengeId as currentChallengeId, wordsForChallengeId } from "@/lib/words";

const submittedSessions = new Map<string, number>();

function hasSubmittedSession(id: string) {
  const now = Date.now();
  for (const [sessionId, submittedAt] of submittedSessions) {
    if (now - submittedAt > 2 * 60 * 60 * 1000) submittedSessions.delete(sessionId);
  }
  return submittedSessions.has(id);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const challengeId = searchParams.get("challengeId") || undefined;
  const entries = await listLeaderboard(challengeId);
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const body = await request.json();
  const challengeId = String(body.challengeId || "");
  const session = decodeQuizSession(String(body.sessionToken || ""));

  if (!/^\d{4}-\d{2}-\d{2}$/.test(challengeId)) {
    return NextResponse.json({ error: "Invalid challenge." }, { status: 400 });
  }

  if (challengeId !== currentChallengeId()) {
    return NextResponse.json({ error: "This daily challenge is no longer active." }, { status: 409 });
  }

  if (!session || session.challengeId !== challengeId) {
    return NextResponse.json({ error: "Your verified challenge session is missing or expired." }, { status: 409 });
  }

  if (hasSubmittedSession(session.id)) {
    return NextResponse.json({ error: "This challenge session has already been signed." }, { status: 409 });
  }

  const challengeWords = wordsForChallengeId(challengeId);
  if (session.answers.length !== challengeWords.length || session.index !== challengeWords.length) {
    return NextResponse.json({ error: "Incomplete answer sheet." }, { status: 400 });
  }

  const cleanedAnswers = session.answers.map((answer, index) => {
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
  const timeMs = Math.max(1, Date.now() - session.startedAt);

  const entry = await addLeaderboardEntry({
    name: String(body.name || "Anonymous"),
    score: verifiedScore,
    timeMs,
    challengeId,
    answers: cleanedAnswers
  });
  submittedSessions.set(session.id, Date.now());

  return NextResponse.json({ entry });
}
