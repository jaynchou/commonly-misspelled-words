export type SubmittedAnswer = {
  word: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  remainingMs: number;
};

export function pointsFor(isCorrect: boolean, remainingMs: number) {
  if (!isCorrect) return 0;
  return 0.35 + (Math.max(0, Math.min(10000, remainingMs)) / 10000) * 0.15;
}

export function totalScore(answers: Pick<SubmittedAnswer, "isCorrect" | "remainingMs">[]) {
  return Number(answers.reduce((sum, answer) => sum + pointsFor(answer.isCorrect, answer.remainingMs), 0).toFixed(2));
}
