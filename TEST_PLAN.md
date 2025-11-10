## Test Plan for innotest Playwright Suite

Date: 2025-11-10

This document describes the testing strategy and execution plan for the `innotest` Playwright test suite. It is written to align with the repository structure and existing tests under `tests/` and the reporting artifacts already present (e.g., `playwright-report/` and `test-results/`).

## Goals and Objectives

- Validate core end-to-end flows implemented in the suite (login, dropdown selection, data table interactions).
- Provide a repeatable automation baseline for cross-browser functional tests (Chromium, Firefox, WebKit).
- Capture artifacts (report, traces, screenshots) for debugging and CI visibility.
- Define entry/exit criteria and metrics for release gating.

## Scope

In-scope:
- All tests under `tests/` (seed.spec.ts, test-1.spec.ts, test-2.spec.ts, test-3.spec.ts).
- Cross-browser execution: Chromium, Firefox, WebKit.
- Local developer runs and CI automation.

Out-of-scope (for now):
- Full accessibility testing beyond basic checks (can be added later).
- Performance/load testing.

## Existing Test Mapping

Map of files in `tests/` to feature areas and primary assertions.

- `tests/seed.spec.ts` — seed/setup checks used to prepare environment or state for downstream tests. (Verify baseline state and fixtures.)
- `tests/test-1.spec.ts` — Dropdown Functionality: value selection and confirm selection flow.
- `tests/test-2.spec.ts` — Secure Login Flow: sign in and sign out flows and session handling.
- `tests/test-3.spec.ts` — Data Table Interaction: sorting and data validation (ascending/descending column order).

Include links/notes in each test to the page objects under `pages/` (e.g., `DropdownPage.ts`, `LoginPage.ts`).

## Test Types and Coverage

- Functional / End-to-End: Full flow tests verifying UI and backend interaction where applicable.
- Smoke: Minimal critical-path subset (see “Smoke suite” below).
- Regression: Runs on pull requests and nightly builds.
- Exploratory/Manual: Guided by test cases in this plan when automated tests are insufficient.

### Smoke suite (recommended)

Select one test from each major area to run quickly on PRs:
- Login (test-2)
- Dropdown (test-1)
- Data Table (test-3)

## Test Matrix

- Browsers: Chromium, Firefox, WebKit.
- OS: Windows (local dev), CI runners (Linux/macOS as available in CI).
- Resolution: Desktop default. Add mobile/emulation later if needed.

## Test Data and Fixtures

- Keep deterministic test data in fixtures or seeded state. If `seed.spec.ts` performs seeding, ensure it runs prior to dependent tests on CI or use an isolated test database.
- Avoid hard-coded credentials in the repo. Use environment variables or CI secrets for sensitive data.

## Environments & Setup

- Local: Developer machine with Node.js and Playwright installed. Use Playwright's browsers install command once.
- CI: Recommend GitHub Actions (or your CI) with matrix jobs for browsers.

Requirements:
- Node.js (match repository's package.json engine if present).
- Install dependencies:

```powershell
npm install
npx playwright install
```

## How to run tests (Local)

- Run full suite (all projects/browsers):

```powershell
npx playwright test
```

- Run a single test file:

```powershell
npx playwright test tests/test-1.spec.ts
```

- Run with headed browser to debug:

```powershell
npx playwright test --headed
```

- View the HTML report after a run:

```powershell
npx playwright show-report
```

## CI Recommendations

- Use a matrix job to run tests across browsers (chromium, firefox, webkit). Example flow:
  - Setup Node.js
  - Install dependencies
  - Install Playwright browsers
  - Run `npx playwright test --reporter=list` (or `github` reporter)
  - Upload artifacts: `playwright-report/`, `test-results/`, traces, and videos/screenshots for failed tests.

Notes:
- Use `--workers=1` if shared test state causes flakiness; otherwise use default parallelism.
- Collect traces for failures: `npx playwright test --trace on-first-retry`.

## Reporting & Artifacts

- HTML report: `playwright-report/` (already present in repo). Use `npx playwright show-report` to open.
- Test results artifacts are in `test-results/` — preserve these in CI for triage.
- Collect traces, screenshots, and videos for failed tests. Configure Playwright to capture as needed.

## Entry & Exit Criteria

Entry criteria (before automated run):
- Build successful, environment variables/secrets configured, Playwright browsers installed.

Exit criteria (for a test run or release gate):
- All smoke tests pass.
- No critical or high-severity failures open.
- Test failure rate below the agreed threshold (recommend: 0 critical, <= 2% non-critical flaky failures across runs).

## Flakiness and Retry Strategy

- Configure retries in CI only (example: `--retries=1` or Playwright config). Use trace on-first-retry to capture failure context.
- Track flaky tests in a short-lived list and create follow-up bugs to stabilize them.

## Roles & Responsibilities

- Test author / Maintainer: write and update Playwright tests, page objects, and fixtures.
- CI owner: ensure pipeline integrations and artifact retention.
- Developers: run tests locally before pushing; investigate failures and address flakiness.

## Risks & Mitigations

- Risk: Tests assume mutable global state. Mitigation: Seed/teardown per test or run tests in isolated environments.
- Risk: Sensitive data exposure. Mitigation: Use secrets in CI, do not check credentials into repo.

## Metrics & KPIs

- Test pass rate (%) per run.
- Time to run full suite.
- Time to triage failing tests.
- Flaky test count over time.

## Schedule & Execution

- Pull Request: run smoke subset (parallel across browsers if practical).
- Nightly: run full suite with artifacts archived.

## Next Steps (short-term)

1. Add a `smoke` tag to the three smoke tests and configure PR workflow to run only tests with that tag.
2. Add GitHub Actions workflow using a browser matrix and artifact uploads.
3. Centralize and document test data setup (consider a small local helper to seed test data).

## Appendix — Quick checklist for a PR

- [ ] Run `npx playwright test` locally and fix failures.
- [ ] Include any new test data or fixture changes with documentation.
- [ ] Ensure tests are idempotent and do not depend on external state.

---

If you'd like, I can also:

- Create a GitHub Actions workflow file for the CI matrix.
- Tag smoke tests and update `playwright.config.ts` with recommended settings for retries and trace collection.

Please tell me which of those you'd like next.
