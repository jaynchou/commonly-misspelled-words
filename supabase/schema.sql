create table if not exists leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  score numeric(4,2) not null check (score between 0 and 10),
  time_ms integer not null check (time_ms > 0),
  challenge_id text not null,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists leaderboard_entries_challenge_rank_idx
  on leaderboard_entries (challenge_id, score desc, time_ms asc, created_at asc);
