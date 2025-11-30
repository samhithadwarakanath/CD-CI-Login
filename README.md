## Project test summary

This repository contains backend and frontend tests for the SvelteKit project. The sections below describe how to run tests, where coverage results live, an overview of test scenarios, and a short notes section describing challenges we encountered and the solutions implemented.

## Part 1: Backend API Testing

- Test framework: Vitest (configured in `vitest.config.js`).
- Key packages used: `vitest`, `supertest` (for HTTP assertions), `drizzle-orm` (DB layer used by the app).
- Where tests live: `src/lib/tests/backend/`.

How to run backend tests (unit + integration):

```bash
# runs vitest which picks up backend tests as configured
npm run test
```

Notes:
- Backend tests use `supertest` to exercise the SvelteKit server endpoints and the project's express-style handlers where applicable.
- Setup files used by Vitest are configured in `vitest.config.js` (`src/lib/tests/backend/setup.js`) — these prepare test DB state and any global mocks.

## Part 2: Frontend Testing

- Test framework: Vitest with JSDOM for unit/component tests; Playwright for end-to-end tests.
- Where tests live:
  - Unit/component tests: `src/lib/tests/frontend/`
  - Playwright e2e: `tests/playwright/`

How to run frontend unit tests:

```bash
# runs vitest which picks up frontend tests (jsdom environment)
npm run test
```

```

Tips:
- Component tests use `@testing-library/svelte` and the Vitest `jsdom` environment (see `vitest.config.js`).


## Code coverage results

Coverage is configured in `vitest.config.js` (provider: `v8`) and produces `text`, `json`, and `html` reports.

To generate coverage:

```bash
npx vitest run --coverage
```

After running the above the HTML coverage report will typically be available in a `coverage/` directory at the project root (open `coverage/index.html` in your browser). The terminal will also show a text summary and the JSON output (useful for CI integration).

Note: thresholds are enforced in `vitest.config.js` (example global thresholds: branches 85%, functions 90%, lines 90%, statements 90%). If coverage falls below these thresholds the coverage task will fail.

Example quick-check (local):

```bash
# run tests with coverage and view summary in terminal
npx vitest run --coverage --reporter=text
```

## Test case scenarios (high level)

Backend (examples):
- auth.test.js: OAuth callback handling, token exchange, session management.
- catfacts-*.test.js: CRUD flows for the `cats` API (get/list, post/create, put/update, delete/remove).
- validation.test.js: Request body validation and proper HTTP status/error payloads.
- errors.test.js: Simulate downstream errors (DB, external API) and assert server returns appropriate status codes and structured error responses.

Frontend (examples):
- login.test.js: Login page renders, form validation, redirects after successful login (mocked auth flows).
- home.test.js: Home page shows correct user-dependent content.
- TestComponent.test.js: Component-level rendering, ARIA attributes, and user interaction via `@testing-library/svelte`.
- Playwright flows: full login+protected-route flow, creating/deleting a resource and checking UI updates.

Each test file typically includes:
- setup and teardown steps to isolate DB or storage state.
- mocked external network calls where appropriate.

## Challenges faced and solutions implemented

- Challenge: Authentication flows (OAuth) are difficult to exercise in automated tests because they require external redirects and token exchanges.
  - Solution: Implemented route-level mocks and a test-only callback flow. Tests stub the token exchange and set a test session cookie. See `routes/auth/*` handlers and the backend setup file in tests for examples.

- Challenge: Tests interfering with each other due to shared DB state.
  - Solution: Tests run with explicit setup/teardown in `src/lib/tests/backend/setup.js`. The test harness migrates the test DB or truncates tables between tests. Use an in-memory or ephemeral DB in CI when possible.

- Challenge: Flaky e2e tests caused by timing and asynchrony.
  - Solution: Use Playwright's built-in wait-for mechanisms, avoid arbitrary sleeps, and add stable test IDs in templates to target elements reliably.

- Challenge: Coverage thresholds failing unexpectedly during local development.
  - Solution: Coverage thresholds are set to realistic values. Use focused tests (`it.only`) only during development, and run the full suite in CI. The README includes the exact command to produce coverage so contributors can check locally.

## How to run (quick)

1. Install dependencies:

```bash
npm install
```

2. Run the test suite (unit + integration):

```bash
npm run test
```

3. Run tests with coverage:

```bash
npx vitest run --coverage
```

4. Run Playwright e2e:

```bash
npx playwright install --with-deps
npx playwright test
```

## Files of interest

- `vitest.config.js` — test runner and coverage settings.
- `src/lib/tests/backend/` — backend test files and `setup.js`.
- `src/lib/tests/frontend/` — frontend component tests and `setup.js`.
- `tests/playwright/` — Playwright E2E tests and `playwright.config.ts`.

## Notes & next steps

- Add a CI job to run `npx vitest run --coverage` and `npx playwright test` and to upload coverage artifacts.
- Consider adding a convenience script in `package.json` (for example, `test:coverage` and `test:e2e`) to simplify running tests locally and in CI.

---


