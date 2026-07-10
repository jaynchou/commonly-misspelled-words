"use client";

import { CheckCircle2, Clipboard, Clock3, ImageDown, Link2, Play, Share2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { totalScore } from "@/lib/scoring";
import type { WordEntry } from "@/lib/words";

type AnswerRecord = {
  word: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  remainingMs: number;
};

const FEEDBACK_DELAY_MS = 1200;

function shuffle<T>(items: T[]) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function formatTime(ms: number) {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function resultTitle(score: number) {
  if (score >= 9) return "Copy Desk Legend";
  if (score >= 7) return "Sharp Proofreader";
  if (score >= 5) return "Typo Hunter";
  return "Saturday Regular";
}

function resultMessage(score: number) {
  if (score >= 9) return "Excellent eye. You spotted nearly every spelling trap.";
  if (score >= 7) return "Strong work. A few tricky spellings got through.";
  if (score >= 5) return "Nice recovery. Review the missed words, then try again tomorrow.";
  return "Every round sharpens your proofreading instincts. Come back for tomorrow’s set.";
}

function SocialIcon({ type }: { type: "whatsapp" | "facebook" | "instagram" | "tiktok" | "x" | "reddit" | "more" }) {
  if (type === "whatsapp") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12.1 3.2a8.6 8.6 0 0 0-7.3 13.2L4 21l4.7-1.2A8.6 8.6 0 1 0 12.1 3.2Zm0 1.8a6.8 6.8 0 0 1 5.8 10.4 6.8 6.8 0 0 1-8.6 2.6l-.4-.2-2.4.6.6-2.3-.2-.4A6.8 6.8 0 0 1 12.1 5Zm-2.4 3.4c-.2 0-.5.1-.7.4-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.6 4 3.5 2 .8 2.4.6 2.8.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.2-.2-.5-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.1Z" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14 8.1V6.5c0-.8.2-1.3 1.3-1.3h1.5V2.5c-.7-.1-1.5-.2-2.2-.2-2.3 0-3.9 1.4-3.9 4v1.8H8.1V11h2.6v10h3.3V11h2.5l.4-2.9H14Z" />
      </svg>
    );
  }
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M7.4 2.8h9.2a4.6 4.6 0 0 1 4.6 4.6v9.2a4.6 4.6 0 0 1-4.6 4.6H7.4a4.6 4.6 0 0 1-4.6-4.6V7.4a4.6 4.6 0 0 1 4.6-4.6Zm0 1.8a2.8 2.8 0 0 0-2.8 2.8v9.2a2.8 2.8 0 0 0 2.8 2.8h9.2a2.8 2.8 0 0 0 2.8-2.8V7.4a2.8 2.8 0 0 0-2.8-2.8H7.4Zm4.6 3.3a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2Zm0 1.8a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Zm4.4-2.9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }
  if (type === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M15.8 3c.4 2.6 1.9 4.2 4.4 4.4v3a7.5 7.5 0 0 1-4.3-1.3v6.2c0 3.1-2.1 5.6-5.7 5.6a5.3 5.3 0 0 1-5.5-5.3c0-3.3 2.6-5.7 6.5-5.3v3.2c-1.8-.3-3.2.6-3.2 2.1 0 1.2 1 2.1 2.2 2.1 1.4 0 2.3-.8 2.3-2.8V3h3.3Z" />
      </svg>
    );
  }
  if (type === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M14.4 10.6 21.3 3h-2.1l-5.8 6.4L8.7 3H3.2l7.2 9.9L3 21h2.1l6.2-6.8 5 6.8h5.5l-7.4-10.4Zm-2.2 2.4-.7-1L5 4.6h2.7l4.6 6.5.7 1 6.8 7.5h-2.7L12.2 13Z" />
      </svg>
    );
  }
  if (type === "reddit") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M20.5 11.2c.1-.3.2-.6.2-.9a2.1 2.1 0 0 0-3.6-1.5 10 10 0 0 0-4.2-1.1l.8-3.6 2.5.5a1.7 1.7 0 1 0 .2-1.1l-3.1-.6c-.3-.1-.6.1-.7.5l-.9 4.3a10.3 10.3 0 0 0-4.5 1.1 2.1 2.1 0 1 0-2.3 3.4c0 .2-.1.5-.1.8 0 3 3.2 5.4 7.2 5.4s7.2-2.4 7.2-5.4c0-.3 0-.5-.1-.8.6-.2 1.1-.6 1.4-1Zm-12.2.8a1.3 1.3 0 1 1 2.6 0 1.3 1.3 0 0 1-2.6 0Zm6.5 3.5c-.8.8-3.6.8-4.4 0-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 .5.5 2.6.5 3.1 0 .2-.2.5-.2.7 0 .2.2.2.5-.1.7Zm.9-2.2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M5 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm5 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm5 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z" />
    </svg>
  );
}

export function DailyQuiz({
  words,
  challengeId,
  onScoreSaved
}: {
  words: WordEntry[];
  challengeId: string;
  onScoreSaved?: () => void;
}) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "timeout" | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [questionStartedAt, setQuestionStartedAt] = useState<number | null>(null);
  const [sessionToken, setSessionToken] = useState("");
  const [starting, setStarting] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [remainingMs, setRemainingMs] = useState(10000);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const shareCloseRef = useRef<HTMLButtonElement>(null);
  const answeringRef = useRef(false);

  const current = words[index];
  const choices = useMemo(() => shuffle([current.word, ...current.misspellings.slice(0, 3)]), [current]);
  const score = totalScore(answers);
  const isDone = answers.length === words.length;
  const elapsed = startedAt ? (finishedAt || Date.now()) - startedAt : 0;
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const title = resultTitle(score);
  const shareUrl = "https://typofind.com";
  const shareText = `I scored ${score.toFixed(1)}/10 on TypoFind, the daily commonly misspelled words quiz. ${correctCount}/${words.length} correct in ${formatTime(elapsed)}.`;

  useEffect(() => {
    if (!started || isDone || selected || answering || !questionStartedAt) return;
    const timer = window.setInterval(() => {
      const next = Math.max(0, 10000 - (Date.now() - questionStartedAt));
      setRemainingMs(next);
      if (next <= 0) {
        window.clearInterval(timer);
        choose("");
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [started, isDone, selected, answering, questionStartedAt]);

  useEffect(() => {
    if (!shareOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShareOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shareOpen]);

  useEffect(() => {
    if (!shareOpen) return;
    shareCloseRef.current?.focus();
    return () => shareButtonRef.current?.focus();
  }, [shareOpen]);

  async function start() {
    setStarting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/quiz-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.sessionToken) throw new Error(data.error || "Could not start the challenge.");

      const now = Date.now();
      setSessionToken(data.sessionToken);
      setStarted(true);
      setStartedAt(now);
      setQuestionStartedAt(now);
      setRemainingMs(10000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not start the challenge.");
    } finally {
      setStarting(false);
    }
  }

  async function choose(choice: string) {
    if (selected || answeringRef.current || !sessionToken) return;
    answeringRef.current = true;
    setAnswering(true);
    setSelected(choice || null);
    setFeedback(choice ? (choice === current.word ? "correct" : "wrong") : "timeout");
    try {
      const response = await fetch("/api/quiz-session", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected: choice, sessionToken })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.answer || !data.sessionToken) {
        throw new Error(data.error || "Could not record that answer.");
      }

      setSessionToken(data.sessionToken);
      setAnswers((value) => [...value, data.answer]);
      window.setTimeout(() => {
        if (data.complete) {
          setFinishedAt(Date.now());
        } else {
          setIndex((value) => value + 1);
          setSelected(null);
          setFeedback(null);
          setRemainingMs(10000);
          setQuestionStartedAt(Date.now());
        }
        answeringRef.current = false;
        setAnswering(false);
      }, FEEDBACK_DELAY_MS);
    } catch (error) {
      setSelected(null);
      setFeedback(null);
      setSubmitError(error instanceof Error ? error.message : "Could not record that answer.");
      answeringRef.current = false;
      setAnswering(false);
    }
  }

  async function submitScore() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, challengeId, sessionToken })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Could not record your score.");
      }

      setSaved(true);
      onScoreSaved?.();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not record your score.");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setShareStatus("Copied link");
  }

  async function nativeShare() {
    if (navigator.share) {
      await navigator.share({ title: "My TypoFind score", text: shareText, url: shareUrl });
      setShareStatus("Shared");
      return;
    }
    await copyLink();
  }

  async function copyResultImage() {
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 980;
    const context = canvas.getContext("2d");
    if (!context) return;

    const round = (x: number, y: number, width: number, height: number, radius: number) => {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
    };

    const fillRound = (x: number, y: number, width: number, height: number, radius: number, fill: string | CanvasGradient) => {
      round(x, y, width, height, radius);
      context.fillStyle = fill;
      context.fill();
    };

    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(" ");
      let line = "";
      let nextY = y;
      words.forEach((word) => {
        const testLine = line ? `${line} ${word}` : word;
        if (context.measureText(testLine).width > maxWidth && line) {
          context.fillText(line, x, nextY);
          line = word;
          nextY += lineHeight;
        } else {
          line = testLine;
        }
      });
      if (line) context.fillText(line, x, nextY);
      return nextY + lineHeight;
    };

    context.fillStyle = "#f6efe3";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const cardX = 0;
    const cardY = 28;
    const cardW = 1000;
    const cardH = 920;
    const gradient = context.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
    gradient.addColorStop(0, "#281827");
    gradient.addColorStop(0.55, "#111522");
    gradient.addColorStop(1, "#261628");
    fillRound(cardX, cardY, cardW, cardH, 18, gradient);

    context.fillStyle = "rgba(255, 250, 241, 0.74)";
    context.font = "700 22px Georgia, serif";
    context.fillText("TYPOFIND", 48, 104);

    context.fillStyle = "#fffaf1";
    context.font = "700 50px Georgia, serif";
    context.fillText(title, 48, 168);

    context.fillStyle = "rgba(255, 250, 241, 0.72)";
    context.font = "28px Georgia, serif";
    wrapText(shareText, 48, 244, 760, 44);

    const statsX = 48;
    const statsY = 370;
    const statsW = 904;
    const statsH = 170;
    fillRound(statsX, statsY, statsW, statsH, 16, "#fffaf1");
    context.strokeStyle = "#756d63";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(statsX + statsW / 3, statsY);
    context.lineTo(statsX + statsW / 3, statsY + statsH);
    context.moveTo(statsX + (statsW / 3) * 2, statsY);
    context.lineTo(statsX + (statsW / 3) * 2, statsY + statsH);
    context.stroke();

    const stats = [
      ["TOTAL SCORE", score.toFixed(1), "/10"],
      ["CORRECT", String(correctCount), "/20"],
      ["TIME", formatTime(elapsed), challengeId]
    ];
    stats.forEach((item, itemIndex) => {
      const left = statsX + itemIndex * (statsW / 3) + 26;
      context.fillStyle = "#756d63";
      context.font = "700 22px Georgia, serif";
      context.fillText(item[0], left, statsY + 44);
      context.fillStyle = "#17130f";
      context.font = "700 54px Georgia, serif";
      context.fillText(item[1], left, statsY + 108);
      context.fillStyle = "#756d63";
      context.font = "700 20px Georgia, serif";
      context.fillText(item[2], left, statsY + 140);
    });

    context.font = "700 25px Georgia, serif";
    let x = 48;
    let y = 610;
    answers.forEach((answer) => {
      const label = answer.correct;
      const width = context.measureText(label).width + 36;
      if (x + width > 952) {
        x = 48;
        y += 54;
      }
      fillRound(x, y - 34, width, 42, 21, answer.isCorrect ? "#303943" : "#433844");
      context.fillStyle = answer.isCorrect ? "#d8f2c8" : "#ffd5cc";
      context.fillText(label, x + 18, y - 6);
      if (!answer.isCorrect) {
        context.strokeStyle = "#ffd5cc";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(x + 18, y - 18);
        context.lineTo(x + width - 18, y - 18);
        context.stroke();
      }
      x += width + 14;
    });

    fillRound(48, 812, 904, 100, 14, "#a93024");
    context.fillStyle = "#fffaf1";
    context.font = "700 42px Georgia, serif";
    context.textAlign = "center";
    context.fillText("Play free at typofind.com", 500, 875);
    context.textAlign = "left";

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    if ("ClipboardItem" in window && navigator.clipboard.write) {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setShareStatus("Copied image");
      return;
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "typofind-score.png";
    link.click();
    URL.revokeObjectURL(link.href);
    setShareStatus("Downloaded image");
  }

  function shareTo(service: "x" | "reddit" | "whatsapp" | "facebook") {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    const targets = {
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      reddit: `https://www.reddit.com/submit?url=${url}&title=${text}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`
    };
    window.open(targets[service], "_blank", "noopener,noreferrer");
  }

  return (
    <div className="quiz-shell">
        <div className="quiz-top">
          <div>
            <span className="eyebrow">Daily challenge {challengeId}</span>
            <h2 className="quiz-title">{isDone ? "Score filed?" : "Find the correct spelling."}</h2>
          </div>
          {started ? (
            <div className="note">
              <Clock3 size={16} aria-hidden /> {formatTime(elapsed)}
            </div>
          ) : null}
        </div>

        {started ? (
          <div
            className="progress"
            role="progressbar"
            aria-label="Challenge progress"
            aria-valuemin={0}
            aria-valuemax={words.length}
            aria-valuenow={answers.length}
          >
            <span style={{ width: `${(answers.length / words.length) * 100}%` }} />
          </div>
        ) : (
          <div className="rule-divider" aria-hidden="true" />
        )}

        {!started ? (
          <div className="start-panel">
            <p className="quiz-word start-prompt">Ready for today&apos;s spelling challenge?</p>
            <button className="primary-button start-button" type="button" onClick={start} disabled={starting}>
              <Play size={18} /> {starting ? "Starting..." : "Start today’s quiz"}
            </button>
            {submitError ? <p className="form-error" role="alert">{submitError}</p> : null}
          </div>
        ) : !isDone ? (
          <>
            <div className="timer-row">
              <span>Question {index + 1} of {words.length}</span>
              <strong aria-live="polite">{Math.ceil(remainingMs / 1000)}s</strong>
            </div>
            <p className="quiz-word">Which spelling is correct?</p>
            <p>{current.sentence}</p>
            <div className="choices">
              {choices.map((choice) => {
                const state = feedback === "timeout" ? "" : selected && choice === current.word ? "correct" : selected === choice ? "wrong" : "";
                return (
                  <button
                    key={choice}
                    className={`choice ${selected === choice ? "selected" : ""} ${state}`}
                    type="button"
                    onClick={() => choose(choice)}
                    disabled={Boolean(selected) || answering}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            <p className={`note answer-feedback ${feedback ? "has-feedback" : ""}`} role="status">
              {feedback === "correct" ? `Correct — ${current.note}` : feedback === "wrong" ? `Not quite. The correct spelling is ${current.word}. ${current.note}` : feedback === "timeout" ? `Time’s up. The correct spelling was ${current.word}. ${current.note}` : "Four choices. Ten seconds. Total score is out of 10."}
            </p>
          </>
        ) : (
          <>
            <div className="result-intro">
              <span className="eyebrow">Today&apos;s result</span>
              <h3>{title}</h3>
              <p>{resultMessage(score)}</p>
            </div>
            <p className="quiz-word">{score.toFixed(1)}/10</p>
            <p className="finish-note">Finished in {formatTime(elapsed)}. Add a name to rank on today&apos;s leaderboard.</p>
            <div className="finish-actions">
              <div className="form-row">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Rank my name"
                  aria-label="Leaderboard name"
                  disabled={saved}
                />
                <button className="primary-button" onClick={submitScore} disabled={saved || submitting} type="button">
                  {saved ? (
                    <>
                      <CheckCircle2 size={18} /> Recorded
                    </>
                  ) : submitting ? (
                    "Recording..."
                  ) : (
                    "Sign score"
                  )}
                </button>
                <button
                  ref={shareButtonRef}
                  className="secondary-button share-icon-button"
                  type="button"
                  onClick={() => setShareOpen(true)}
                  aria-label="Share result"
                  title="Share result"
                >
                  <Share2 size={18} />
                </button>
              </div>
              <div className="answer-review" aria-label="Your correct and missed words">
                <h3>Your words</h3>
                <div>
                  {answers.map((answer, answerIndex) => (
                    <span className={answer.isCorrect ? "answer-pill correct-pill" : "answer-pill wrong-pill"} key={`${answer.word}-${answerIndex}`}>
                      {answer.correct}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {submitError ? <p className="form-error" role="alert">{submitError}</p> : null}
            {shareOpen ? (
              <div className="share-overlay" role="dialog" aria-modal="true" aria-labelledby="share-title">
                <button className="share-backdrop" type="button" aria-label="Close share dialog" onClick={() => setShareOpen(false)} />
                <div className="share-modal">
                  <button ref={shareCloseRef} className="share-close" type="button" aria-label="Close share dialog" onClick={() => setShareOpen(false)}>
                    <X size={22} />
                  </button>
                  <p className="eyebrow">Results</p>
                  <h2 id="share-title">{title}</h2>
                  <p className="share-subtitle">
                    {score.toFixed(1)}/10 with {correctCount}/{words.length} correct. Bet a friend they score lower.
                  </p>
                  <div className="share-card">
                    <div>
                      <span className="eyebrow">TypoFind</span>
                      <h3>{title}</h3>
                      <p>{shareText}</p>
                    </div>
                    <div className="share-score-row">
                      <div>
                        <span>Total score</span>
                        <strong>{score.toFixed(1)}</strong>
                        <small>/10</small>
                      </div>
                      <div>
                        <span>Correct</span>
                        <strong>{correctCount}</strong>
                        <small>/20</small>
                      </div>
                      <div>
                        <span>Time</span>
                        <strong>{formatTime(elapsed)}</strong>
                        <small>{challengeId}</small>
                      </div>
                    </div>
                    <div className="share-words">
                      {answers.map((answer, answerIndex) => (
                        <span className={answer.isCorrect ? "share-word-correct" : "share-word-wrong"} key={`${answer.word}-${answerIndex}`}>
                          {answer.correct}
                        </span>
                      ))}
                    </div>
                    <div className="share-cta">Play free at typofind.com</div>
                  </div>
                  <p className="share-label">Post to</p>
                  <div className="share-socials">
                    <button className="whatsapp" type="button" onClick={() => shareTo("whatsapp")} aria-label="Share to WhatsApp">
                      <SocialIcon type="whatsapp" />
                      <span>WhatsApp</span>
                    </button>
                    <button className="facebook" type="button" onClick={() => shareTo("facebook")} aria-label="Share to Facebook">
                      <SocialIcon type="facebook" />
                      <span>Facebook</span>
                    </button>
                    <button className="instagram" type="button" onClick={nativeShare} aria-label="Share to Instagram">
                      <SocialIcon type="instagram" />
                      <span>Instagram</span>
                    </button>
                    <button className="tiktok" type="button" onClick={nativeShare} aria-label="Share to TikTok">
                      <SocialIcon type="tiktok" />
                      <span>TikTok</span>
                    </button>
                    <button className="x-social" type="button" onClick={() => shareTo("x")} aria-label="Share to X">
                      <SocialIcon type="x" />
                      <span>X</span>
                    </button>
                    <button className="reddit" type="button" onClick={() => shareTo("reddit")} aria-label="Share to Reddit">
                      <SocialIcon type="reddit" />
                      <span>Reddit</span>
                    </button>
                    <button className="more-social" type="button" onClick={nativeShare} aria-label="Open more share options">
                      <SocialIcon type="more" />
                      <span>More</span>
                    </button>
                  </div>
                  <div className="share-tools">
                    <button className="secondary-button" type="button" onClick={copyResultImage}>
                      <ImageDown size={16} /> Copy image
                    </button>
                    <button className="secondary-button" type="button" onClick={copyLink}>
                      <Link2 size={16} /> Copy link
                    </button>
                    <button className="secondary-button" type="button" onClick={() => navigator.clipboard.writeText(shareText).then(() => setShareStatus("Copied text"))}>
                      <Clipboard size={16} /> Copy text
                    </button>
                  </div>
                  {shareStatus ? <p className="share-status">{shareStatus}</p> : null}
                </div>
              </div>
            ) : null}
        </>
      )}
    </div>
  );
}
