import { getDb, classify, ensureTable } from './_lib.js';

const ok6 = (a) => Array.isArray(a) && a.length === 6 && a.every((n) => Number.isInteger(n) && n >= 0 && n <= 3);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  if (!process.env.DATABASE_URL) return res.status(503).json({ error: 'Database not connected' });
  let b = req.body;
  try { if (typeof b === 'string') b = JSON.parse(b || '{}'); } catch { b = {}; }
  b = b || {};
  if (!/^[\w-]{1,24}$/.test(b.code || '') || !ok6(b.m) || !ok6(b.s)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  const c = classify(b.m, b.s); // the server recomputes the group; the client value is never trusted
  try {
    const db = getDb();
    await ensureTable(db);
    await db`INSERT INTO results (code, m, s, lv, sec, grp)
      VALUES (${b.code}, ${b.m}, ${b.s}, ${c.lv}, ${c.sec}, ${c.grp})
      ON CONFLICT (code) DO UPDATE SET m = EXCLUDED.m, s = EXCLUDED.s, lv = EXCLUDED.lv,
        sec = EXCLUDED.sec, grp = EXCLUDED.grp, attempts = results.attempts + 1, updated_at = now()`;
    return res.status(200).json({ ok: true, ...c });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Save failed' });
  }
}
