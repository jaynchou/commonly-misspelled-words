import { NextResponse } from "next/server";
import { listDailyMissStats } from "@/lib/leaderboard";
import { challengeId } from "@/lib/words";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("challengeId") || challengeId();
  const stats = await listDailyMissStats(id);
  return NextResponse.json(stats);
}
