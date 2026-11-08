import { neon } from '@neondatabase/serverless';

export const getDb = () => neon(process.env.DATABASE_URL);

// Same rule as the front end: climb from L1; a level is secured with 4+ of 6 (maths + science).
export function classify(m, s) {
  let lv = 0;
  for (let i = 0; i < 6; i++) { if (m[i] + s[i] >= 4) lv = i + 1; else break; }
  lv = Math.max(lv, 1);
  return { lv, sec: lv < 4 ? 'A' : 'B', grp: lv < 4 ? 'A' + lv : 'B' + (lv - 3) };
}

export async function ensureTable(db) {
  await db`CREATE TABLE IF NOT EXISTS results (
    code TEXT PRIMARY KEY,
    m INT[] NOT NULL,
    s INT[] NOT NULL,
    lv INT NOT NULL,
    sec CHAR(1) NOT NULL,
    grp TEXT NOT NULL,
    attempts INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;
}
