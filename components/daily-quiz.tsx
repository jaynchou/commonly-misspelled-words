"use client";

import { CheckCircle2, Clipboard, Clock3, ImageDown, Link2, Play, Share2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  return [...items].sort(() => Math.random() - 0.5);
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
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [questionStartedAt, setQuestionStartedAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(10000);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  const current = words[index];
  const choices = useMemo(() => shuffle([current.word, ...current.misspellings.slice(0, 3)]), [current]);
  const score = totalScore(answers);
  const isDone = answers.length === words.length;
  const elapsed = startedAt ? (finishedAt || Date.now()) - startedAt : 0;
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const title = resultTitle(score);
  const shareUrl = "https://typofind.com";
  const shareText = `I scored ${score.toFixed(1)}/10 on TypoFind, the daily commonly misspelled words quiz. ${correctCount}/20 correct in ${formatTime(elapsed)}.`;

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

  useEffect(() => {
    if (!shareOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShareOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shareOpen]);

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
    }, FEEDBACK_DELAY_MS);
  }

  async function submitScore() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score, timeMs: elapsed, challengeId, answers })
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
    canvas.width = 1080;
    canvas.height = 1580;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#f6efe3";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#17130f";
    context.font = "700 68px Georgia, serif";
    context.fillText("TypoFind", 86, 120);
    context.font = "700 52px Georgia, serif";
    context.fillText(title, 86, 230);
    context.font = "32px Georgia, serif";
    context.fillStyle = "#756d63";
    context.fillText("Daily commonly misspelled words quiz", 86, 290);

    context.fillStyle = "#17130f";
    context.font = "700 150px Georgia, serif";
    context.fillText(`${score.toFixed(1)}`, 86, 500);
    context.font = "700 44px Georgia, serif";
    context.fillText("/10", 430, 500);

    context.strokeStyle = "#d7c8b4";
    context.lineWidth = 4;
    context.strokeRect(86, 580, 908, 320);
    context.font = "700 38px Georgia, serif";
    context.fillText(`${correctCount}/20 correct`, 130, 670);
    context.fillText(`Time ${formatTime(elapsed)}`, 130, 750);
    context.fillText(`Challenge ${challengeId}`, 130, 830);

    context.fillStyle = "#17130f";
    context.font = "700 34px Georgia, serif";
    context.fillText("Words", 86, 970);
    context.font = "26px Georgia, serif";
    let x = 86;
    let y = 1025;
    answers.forEach((answer) => {
      const label = answer.correct;
      const width = Math.min(context.measureText(label).width + 34, 430);
      if (x + width > 994) {
        x = 86;
        y += 48;
      }
      context.fillStyle = answer.isCorrect ? "#e8f2de" : "#f7dfd9";
      context.fillRect(x, y - 30, width, 38);
      context.fillStyle = answer.isCorrect ? "#18350d" : "#4a120a";
      context.fillText(label, x + 14, y - 4);
      if (!answer.isCorrect) {
        context.strokeStyle = "#4a120a";
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(x + 14, y - 14);
        context.lineTo(x + width - 14, y - 14);
        context.stroke();
      }
      x += width + 12;
    });

    context.fillStyle = "#9f2f23";
    context.fillRect(86, 1320, 908, 130);
    context.fillStyle = "#fffaf1";
    context.font = "700 48px Georgia, serif";
    context.fillText("Play free at typofind.com", 130, 1402);
    context.fillStyle = "#756d63";
    context.font = "30px Georgia, serif";
    context.fillText(shareText, 86, 1510);

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

        <div className="progress" aria-label="Challenge progress">
          <span style={{ width: `${(answers.length / words.length) * 100}%` }} />
        </div>

        {!started ? (
          <div className="start-panel">
            <p className="quiz-word start-prompt">Ready for today&apos;s spelling challenge?</p>
            <button className="primary-button start-button" type="button" onClick={start}>
              <Play size={18} /> Start today&apos;s quiz
            </button>
          </div>
        ) : !isDone ? (
          <>
            <div className="timer-row">
              <span>Question {index + 1} of 20</span>
              <strong aria-live="polite">{Math.ceil(remainingMs / 1000)}s</strong>
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
            {submitError ? <p className="form-error">{submitError}</p> : null}
            {shareOpen ? (
              <div className="share-overlay" role="dialog" aria-modal="true" aria-labelledby="share-title">
                <button className="share-backdrop" type="button" aria-label="Close share dialog" onClick={() => setShareOpen(false)} />
                <div className="share-modal">
                  <button className="share-close" type="button" aria-label="Close share dialog" onClick={() => setShareOpen(false)}>
                    <X size={22} />
                  </button>
                  <p className="eyebrow">Results</p>
                  <h2 id="share-title">{title}</h2>
                  <p className="share-subtitle">
                    {score.toFixed(1)}/10 with {correctCount}/20 correct. Bet a friend they score lower.
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
