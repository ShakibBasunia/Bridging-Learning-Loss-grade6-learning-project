# Setup (Vercel + Neon Postgres)

1. Push this folder to GitHub (replace the old repository contents).
2. vercel.com > Add New > Project > import the repository > Deploy. No build settings needed.
3. Project > Storage > Create/Connect Database > Neon (Postgres). Vercel adds `DATABASE_URL` automatically.
4. Project > Settings > Environment Variables > add `TEACHER_KEY` with a long secret. Teachers type it on the Dashboard page.
5. Deployments > Redeploy (so the new variables apply).
6. Open `/exam.html`, take a test, then open `/dashboard.html` and enter the key.

Notes
- Only the student code and the 12 level scores are stored. Names never leave the browser.
- The table `results` is created automatically on the first save.
- On GitHub Pages or a local file there is no `/api`, so results stay in that browser (localStorage) and the dashboard shows them as device data.
- Run locally with the API: `npm i -g vercel && vercel dev`.
