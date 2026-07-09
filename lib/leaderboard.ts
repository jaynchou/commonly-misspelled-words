import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

export type LeaderboardEntry = {
  id?: string;
  name: string;
  score: number;
  timeMs: number;
  challengeId: string;
  answers: AnswerRecord[];
  createdAt: string;
};

export type AnswerRecord = {
  word: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  remainingMs: number;
};

const localPath = path.join(process.cwd(), ".data", "leaderboard.json");

function supabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function order(entries: LeaderboardEntry[]) {
  return entries.sort((a, b) => b.score - a.score || a.timeMs - b.timeMs || a.createdAt.localeCompare(b.createdAt));
}

async function readLocal() {
  try {
    return JSON.parse(await fs.readFile(localPath, "utf8")) as LeaderboardEntry[];
  } catch {
    return [];
  }
}

async function writeLocal(entries: LeaderboardEntry[]) {
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, JSON.stringify(entries, null, 2), "utf8");
}

export async function listLeaderboard(challengeId?: string, limit = 100) {
  const supabase = supabaseClient();
  if (supabase) {
    let query = supabase.from("leaderboard_entries").select("*").order("score", { ascending: false }).order("time_ms");
    if (challengeId) query = query.eq("challenge_id", challengeId);
    const { data, error } = await query.limit(limit);
    if (error) throw new Error(error.message);
    return (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      score: Number(row.score),
      timeMs: Number(row.time_ms),
      challengeId: row.challenge_id,
      answers: Array.isArray(row.answers) ? row.answers : [],
      createdAt: row.created_at
    })) satisfies LeaderboardEntry[];
  }

  const entries = await readLocal();
  return order(challengeId ? entries.filter((entry) => entry.challengeId === challengeId) : entries).slice(0, limit);
}

export async function addLeaderboardEntry(entry: Omit<LeaderboardEntry, "createdAt">) {
  const createdAt = new Date().toISOString();
  const cleanEntry = {
    ...entry,
    name: entry.name.replace(/[^\p{L}\p{N} ._-]/gu, "").trim().slice(0, 32) || "Anonymous",
    createdAt
  };

  const supabase = supabaseClient();
  if (supabase) {
    const { error } = await supabase.from("leaderboard_entries").insert({
      name: cleanEntry.name,
      score: cleanEntry.score,
      time_ms: cleanEntry.timeMs,
      challenge_id: cleanEntry.challengeId,
      answers: cleanEntry.answers,
      created_at: cleanEntry.createdAt
    });
    if (error) throw new Error(error.message);
    return cleanEntry;
  }

  const entries = await readLocal();
  entries.push(cleanEntry);
  await writeLocal(order(entries).slice(0, 1000));
  return cleanEntry;
}

export async function listDailyMissStats(challengeId: string) {
  const entries = await listLeaderboard(challengeId, 1000);
  const wordCounts = new Map<string, { word: string; misses: number; selected: Map<string, number> }>();
  const typoCounts = new Map<string, { typo: string; word: string; misses: number }>();

  for (const entry of entries) {
    for (const answer of entry.answers || []) {
      if (answer.isCorrect) continue;
      const wordStat = wordCounts.get(answer.correct) || {
        word: answer.correct,
        misses: 0,
        selected: new Map<string, number>()
      };
      wordStat.misses += 1;
      wordStat.selected.set(answer.selected, (wordStat.selected.get(answer.selected) || 0) + 1);
      wordCounts.set(answer.correct, wordStat);

      if (answer.selected === "Time expired") continue;
      const typoKey = `${answer.correct}:${answer.selected}`;
      const typoStat = typoCounts.get(typoKey) || { typo: answer.selected, word: answer.correct, misses: 0 };
      typoStat.misses += 1;
      typoCounts.set(typoKey, typoStat);
    }
  }

  const topWords = [...wordCounts.values()]
    .map((item) => ({
      word: item.word,
      misses: item.misses,
      topWrong:
        [...item.selected.entries()].filter(([selected]) => selected !== "Time expired").sort((a, b) => b[1] - a[1])[0]?.[0] ||
        "no answer"
    }))
    .sort((a, b) => b.misses - a.misses)
    .slice(0, 10);

  const topTypos = [...typoCounts.values()].sort((a, b) => b.misses - a.misses).slice(0, 10);

  return {
    topWords,
    topTypos,
    mostMissedWord: topWords[0] || null,
    mostChosenTypo: topTypos[0] || null
  };
}
