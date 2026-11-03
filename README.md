# Trace — Cyber Law & Digital Forensics Learning Studio

Trace is a complete Computer Education course workspace: 60 detailed lessons, seven interactive forensic labs, a full section-by-section legal-text library, old/new law comparisons, five book reading guides, nine animated case files, saved notes, and a 70-mark mock exam.

## Run the full-stack app

```bash
npm install
npx drizzle-kit push
npm run dev
```

The full-stack mode uses PostgreSQL through Drizzle ORM for saved progress, bookmarks, notes, lab results, and exam attempts. Configure `DATABASE_URL` in `.env`.

## Build for GitHub Pages

```bash
node scripts/build-pages.mjs
```

The script produces a static export in `out/`. In static mode, the workspace is saved in the browser’s local storage instead of PostgreSQL. The same UI, lessons, labs, full legal texts, cases, and print/PDF views work without a server.

### Deploy automatically

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`, or run the **Deploy Trace to GitHub Pages** workflow manually.

The workflow builds with the repository name as the Next.js base path and uploads `out/` to GitHub Pages.

## Full legal-text library

The library includes complete sectioned texts for the BNS, BNSS, BSA, IPC, CrPC, Indian Evidence Act, IT Act, DPDP Act, Constitution of India, IT Rules 2021 (consolidated 2026), SPDI Rules 2011, Intermediaries Guidelines Rules 2011, Interception Rules 2009, the 2018 draft intermediary amendment, and the National Cyber Security Policy 2013.

Generated files live in `public/laws/`. Regenerate them with:

```bash
node scripts/build-law-library.mjs
```

The generation script expects the source datasets/PDFs used during the build. Source URLs and version notes are stored in each law JSON and in `public/laws/manifest.json`.

## Print / PDF

Open **Print & export**, choose a lesson, unit, full course, law, case, reading guide, notes, or lab worksheet, then use **Print / Save as PDF**. Full legal texts can be printed section by section or as a complete document.

## Important

This is an educational resource, not legal advice. Always verify the official notified text, amendments, commencement notifications, and the law applicable to the incident date. Simulations use fictional data; no live systems are accessed.
