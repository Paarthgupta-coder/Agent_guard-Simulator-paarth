# AgentGuard — Agent Flight Simulator

Working prototype for **Build with भारत 2.0 / Team Rocket**. Runs an AI customer-support
agent against a library of synthetic angry users, adversarial prompts, and edge cases,
then finds the root cause of any failures and auto-patches the agent — live, in the browser.

This is the "1,000 Angry Users vs Your AI Agent" demo from the pitch deck, actually running.

## Run it

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. No API key or database required — it runs on a deterministic
mock agent and an in-memory store out of the box (see "Two modes" and "Database" below).
Click **Run Demo** on `/dashboard/agents` to trigger the full pipeline.

To test against a real model, or persist runs to a real database, copy `.env.example` to
`.env.local` and set `OPENAI_API_KEY` / `MONGODB_URI`.

## What's actually implemented (honest mapping to the 6-module deck)

| Deck module | This repo |
|---|---|
| 01 Simulation Engine | `src/lib/simulate.ts` runs each persona's message against the agent-under-test, sequentially, with live progress |
| 02 Scenario Generator | `src/lib/scenario.ts` — 25 seeded personas across 6 categories (control, hallucination bait, contradiction traps, jailbreak attempts, PII probes, off-topic), 28 total runs per pass including canary repeats |
| 03 Stress Testing Layer | The adversarial personas in `scenario.ts` *are* the stress layer — prompt injection, policy contradiction, and PII probing are all represented |
| 04 Multi-Run Execution | Runs execute in sequence with live state pushed to the UI every ~120ms (see "Real-time" below for why this isn't Redis/Socket.IO in v1) |
| 05 Evaluation Engine | `src/lib/evaluate.ts` — rule-based flag detection read from the *response text itself* (not the persona's label, so it's an honest check), plus 4-axis scoring: reliability, safety, consistency, cost |
| 06 Learning Loop | `src/lib/agent.ts` (`patchForCategory`) + `simulate.ts` — after failures are clustered by category, the system prompt is patched for *every* failing category at once and all failed cases are re-run automatically |

## Two modes: agent

- **Mock agent** (default, no setup): `src/lib/llm.ts` falls back to a scripted agent whose
  answers depend on whether the system prompt has been patched yet — so the before/after
  score improvement (verified: 31%→100% reliability, 0%→100% safety in a real test run) is
  a real effect of the patch, not a hardcoded number.
- **Real agent**: set `OPENAI_API_KEY` and the same code path calls `gpt-4o-mini` instead.
  Real models usually fail a similar subset of personas against the unpatched prompt, so the
  demo still works, just with less predictable timing — test this before presenting.

## Two modes: storage

- **In-memory** (default, no setup): `src/lib/store.ts` keeps run state in a `Map`. Good
  for local dev and single-instance demos; state resets on server restart.
- **MongoDB**: set `MONGODB_URI` and the exact same functions (`createRun`, `getRun`,
  `updateRun`, `appendLog`) transparently switch to real Mongoose-backed persistence via
  `src/lib/db.ts` + `src/lib/models/Run.ts`. No code elsewhere changes — check `GET /api/health`
  to confirm which mode is active.

## Real-time: polling, not Socket.IO

The deck's architecture spec calls for a Redis/Socket.IO stack. This build uses 600ms
polling from the client instead, because:
1. It deploys cleanly to Vercel's serverless functions, which don't hold long-lived
   WebSocket connections well.
2. For a 28-persona demo run it's visually indistinguishable from a socket push.

If you want real Socket.IO for the write-up / architecture slide, `src/lib/store.ts`
is already the single seam to change — the API routes and simulation logic don't know or
care how state gets to the client.

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/api/runs` | `POST` | Starts a new demo run, returns `{ id }` immediately, runs the pipeline in the background |
| `/api/runs` | `GET` | Lists recent runs (used by Overview + Decisions pages) |
| `/api/runs/[id]` | `GET` | Polled every 600ms by the client for live run state |
| `/api/health` | `GET` | Reports active storage mode (`memory`/`mongodb`) and agent mode (`mock-agent`/`live-model`) |

All routes wrap their logic in try/catch and return proper HTTP status codes on failure —
nothing throws an unhandled error into a blank Vercel 500 page.

## Project structure

```
src/
  lib/
    types.ts        shared types for the whole pipeline
    scenario.ts      Module 02/03 — persona + edge-case library (25 personas)
    agent.ts         the agent-under-test's system prompt + patch generator (Module 06)
    llm.ts           real/mock LLM call wrapper
    evaluate.ts      Module 05 — flag detection, scoring, root-cause clustering
    simulate.ts      orchestrates one full demo run across all modules
    store.ts         run state store — memory or MongoDB, same API either way
    db.ts            Mongoose connection singleton
    models/Run.ts    Mongoose schema for a run
  app/
    page.tsx                      landing page + pipeline diagram
    dashboard/page.tsx             AI Decision Analytics overview
    dashboard/agents/page.tsx      the live demo screen — this is what you present
    dashboard/runs/page.tsx        per-persona decision feed
    dashboard/notifications/page.tsx  live warn/error feed
    api/runs/route.ts              POST start a run, GET list runs
    api/runs/[id]/route.ts         GET live run state (polled)
    api/health/route.ts            storage + agent mode check
  components/        UI pieces styled to match the Voltix reference (dark/mint theme,
                      icon sidebar, tab topbar, toast alerts, floating action button)
```

## Deploying

1. Push to GitHub.
2. Import into Vercel — zero config needed for the default (memory + mock) mode.
3. To go further: add a free MongoDB Atlas cluster, set `MONGODB_URI` in Vercel's env
   vars, redeploy. Check `/api/health` to confirm it picked it up.

## Next up (see the team's build-phase plan for the day-by-day)

- Real Redis job queue + Socket.IO for true parallel execution at higher persona counts
- LLM-driven expansion of the persona library beyond the seeded 25 (per Module 02's spec)
- Wire in a second, swappable "agent under test" so judges can point AgentGuard at
  their own agent instead of the built-in Playstream demo bot
- Auth stub for multi-user judging (currently single-tenant by design, matches hackathon scope)
