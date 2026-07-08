"use client";

import { CheckCircle2, Clock3, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Leaderboard } from "@/components/leaderboard";
import type { WordEntry } from "@/lib/words";

type AnswerRecord = {
  word: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  remainingMs: number;
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function pointsFor(isCorrect: boolean, remainingMs: number) {
  if (!isCorrect) return 0;
  return 0.35 + (Math.max(0, Math.min(10000, remainingMs)) / 10000) * 0.15;
}

export function DailyQuiz({ words, challengeId }: { words: WordEntry[]; challengeId: string }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [questionStartedAt, setQuestionStartedAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(10000);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const current = words[index];
  const choices = useMemo(() => shuffle([current.word, ...current.misspellings.slice(0, 3)]), [current]);
  const score = answers.reduce((sum, answer) => sum + pointsFor(answer.isCorrect, answer.remainingMs), 0);
  const isDone = answers.length === words.length;
  const elapsed = startedAt ? (finishedAt || Date.now()) - startedAt : 0;

  useEffect(() => {
    if (!started || isDone || selected || !questionStartedAt) return;
    const timer = window.setInterval(() => {
      const next = Math.max(0, 10000 - (Date.now() - questionStartedAt));
      setRemainingMs(next);
      if (next <= 0) {
        window.clearInterval(timer);
        choose("");
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [started, isDone, selected, questionStartedAt]);

  function start() {
    const now = Date.now();
    setStarted(true);
    setStartedAt(now);
    setQuestionStartedAt(now);
    setRemainingMs(10000);
  }

  function choose(choice: string) {
    if (selected) return;
    const timeLeft = questionStartedAt ? Math.max(0, 10000 - (Date.now() - questionStartedAt)) : 0;
    const correct = choice === current.word;
    setSelected(choice || "Time expired");
    setAnswers((value) => [
      ...value,
      {
        word: current.word,
        selected: choice || "Time expired",
        correct: current.word,
        isCorrect: correct,
        remainingMs: timeLeft
      }
    ]);
    window.setTimeout(() => {
      if (index === words.length - 1) {
        setFinishedAt(Date.now());
      } else {
        setIndex((value) => value + 1);
        setSelected(null);
        setRemainingMs(10000);
        setQuestionStartedAt(Date.now());
      }
    }, 450);
  }

  async function submitScore() {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score: Number(score.toFixed(2)), timeMs: elapsed, challengeId, answers })
    });

    if (response.ok) {
      setSaved(true);
      setRefreshKey((value) => value + 1);
    }
  }

  return (
    <div className="play-layout">
      <div className="quiz-shell">
        <div className="quiz-top">
          <div>
            <span className="eyebrow">Daily challenge {challengeId}</span>
            <h2>{isDone ? "Score filed?" : "Find the correct spelling."}</h2>
          </div>
          <div className="note">
            <Clock3 size={16} aria-hidden /> {started ? formatTime(elapsed) : "20 questions"}
          </div>
        </div>

        <div className="progress" aria-label="Challenge progress">
          <span style={{ width: `${(answers.length / words.length) * 100}%` }} />
        </div>

        {!started ? (
          <div className="start-panel">
            <p className="quiz-word">Proofread today&apos;s desk.</p>
            <p>
              A daily commonly misspelled words quiz inspired by dictionary and encyclopedia reference lists to help you
              correct words.
            </p>
            <button className="primary-button start-button" type="button" onClick={start}>
              <Play size={18} /> Start today&apos;s quiz
            </button>
          </div>
        ) : !isDone ? (
          <>
            <div className="timer-row">
              <span>Question {index + 1} of 20</span>
              <strong>{Math.ceil(remainingMs / 1000)}s</strong>
            </div>
            <p className="quiz-word">Which spelling is correct?</p>
            <p>{current.sentence}</p>
            <div className="choices">
              {choices.map((choice) => {
                const state = selected && choice === current.word ? "correct" : selected === choice ? "wrong" : "";
                return (
                  <button
                    key={choice}
                    className={`choice ${selected === choice ? "selected" : ""} ${state}`}
                    type="button"
                    onClick={() => choose(choice)}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            <p className="note">{selected ? current.note : "Four choices. Ten seconds. Total score is out of 10."}</p>
          </>
        ) : (
          <>
            <p className="quiz-word">{score.toFixed(1)}/10</p>
            <p>
              Finished in {formatTime(elapsed)}. Add your name once, then Typofind records the result on today&apos;s
              leaderboard.
            </p>
            <div className="form-row">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your byline"
                aria-label="Leaderboard name"
                disabled={saved}
              />
              <button className="primary-button" onClick={submitScore} disabled={saved} type="button">
                {saved ? (
                  <>
                    <CheckCircle2 size={18} /> Recorded
                  </>
                ) : (
                  "Sign score"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <aside className="leaderboard-card">
        <div className="section-header compact">
          <div>
            <span className="eyebrow">Today</span>
            <h3>Leaderboard</h3>
          </div>
        </div>
        <Leaderboard challengeId={challengeId} refreshKey={refreshKey} />
      </aside>
    </div>
  );
}
