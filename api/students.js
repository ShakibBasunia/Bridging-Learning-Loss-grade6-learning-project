import { getDb, ensureTable } from './_lib.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });
  if (!process.env.DATABASE_URL || !process.env.TEACHER_KEY) {
    return res.status(503).json({ error: 'Database or TEACHER_KEY not set' });
  }
  if (req.headers['x-teacher-key'] !== process.env.TEACHER_KEY) {
    return res.status(401).json({ error: 'Wrong key' });
  }
  try {
    const db = getDb();
    await ensureTable(db);
    const rows = await db`SELECT code, m, s, lv, sec, grp, attempts, updated_at AS at
      FROM results ORDER BY updated_at DESC LIMIT 2000`;
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ rows });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Read failed' });
  }
}
