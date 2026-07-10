import { NextResponse } from "next/server";
import { createQuizSession, decodeQuizSession, encodeQuizSession } from "@/lib/quiz-session";
import { pointsFor } from "@/lib/scoring";
import { challengeId as currentChallengeId, wordsForChallengeId } from "@/lib/words";

const requestTimes = new Map<string, number[]>();

function isRateLimited(request: Request, limit: number, windowMs: number) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (requestTimes.get(key) || []).filter((time) => now - time < windowMs);
  recent.push(now);
  requestTimes.set(key, recent);
  return recent.length > limit;
}

export async function POST(request: Request) {
  if (isRateLimited(request, 12, 60_000)) {
    return NextResponse.json({ error: "Please wait before starting another challenge." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const challengeId = String(body.challengeId || "");
  if (challengeId !== currentChallengeId()) {
    return NextResponse.json({ error: "This daily challenge is no longer active." }, { status: 409 });
  }

  try {
    return NextResponse.json({ sessionToken: createQuizSession(challengeId) });
  } catch {
    return NextResponse.json({ error: "The challenge is not configured yet." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (isRateLimited(request, 80, 60_000)) {
    return NextResponse.json({ error: "Too many answer attempts. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const session = decodeQuizSession(String(body.sessionToken || ""));
  if (!session || session.challengeId !== currentChallengeId()) {
    return NextResponse.json({ error: "Your challenge session has expired. Please start again." }, { status: 409 });
  }

  const words = wordsForChallengeId(session.challengeId);
  const current = words[session.index];
  if (!current) {
    return NextResponse.json({ error: "This challenge is already complete." }, { status: 400 });
  }

  const selected = String(body.selected || "").slice(0, 60);
  const elapsedMs = Math.max(0, Date.now() - session.questionStartedAt);
  const remainingMs = Math.max(0, 10_000 - elapsedMs);
  const answer = {
    word: current.word,
    selected: selected || "Time expired",
    correct: current.word,
    isCorrect: selected === current.word,
    remainingMs
  };
  const nextSession = {
    ...session,
    index: session.index + 1,
    questionStartedAt: Date.now(),
    answers: [...session.answers, answer]
  };

  return NextResponse.json({
    answer,
    score: pointsFor(answer.isCorrect, answer.remainingMs),
    sessionToken: encodeQuizSession(nextSession),
    complete: nextSession.index === words.length
  });
}
