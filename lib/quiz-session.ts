import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export type SessionAnswer = {
  word: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  remainingMs: number;
};

export type QuizSession = {
  id: string;
  challengeId: string;
  index: number;
  startedAt: number;
  questionStartedAt: number;
  answers: SessionAnswer[];
};

const MAX_AGE_MS = 60 * 60 * 1000;

function secret() {
  const configured = process.env.QUIZ_SESSION_SECRET;
  if (configured) return configured;
  if (process.env.NODE_ENV !== "production") return "typofind-development-session-secret";
  throw new Error("QUIZ_SESSION_SECRET must be configured in production.");
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createQuizSession(challengeId: string) {
  const now = Date.now();
  const session: QuizSession = {
    id: randomUUID(),
    challengeId,
    index: 0,
    startedAt: now,
    questionStartedAt: now,
    answers: []
  };
  return encodeQuizSession(session);
}

export function encodeQuizSession(session: QuizSession) {
  const value = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${value}.${sign(value)}`;
}

export function decodeQuizSession(token: string): QuizSession | null {
  const [value, signature, ...rest] = token.split(".");
  if (!value || !signature || rest.length) return null;

  const expected = Buffer.from(sign(value));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;

  try {
    const session = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as QuizSession;
    if (
      !session.id ||
      !/^\d{4}-\d{2}-\d{2}$/.test(session.challengeId) ||
      !Number.isInteger(session.index) ||
      session.index < 0 ||
      !Number.isFinite(session.startedAt) ||
      !Number.isFinite(session.questionStartedAt) ||
      !Array.isArray(session.answers) ||
      Date.now() - session.startedAt > MAX_AGE_MS
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}
