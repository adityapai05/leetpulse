# Progress log

Team: Aditya Pai, Harshad Parab, Soham Parab. One entry per working day, newest at the bottom.
Each entry says what was done, what was learned and what is next.

## Wed 18 Nov 2026 (Aditya Pai)

Branches: `chore/test-ci`, `fix/local-setup`, `feat/google-signin`

Done
- Test and CI baseline (EN-4, FR-4.1, FR-4.2): replaced the removed `next lint` script with ESLint, moved to the flat ESLint config that Next.js 16 expects, fixed the `prefer-const` errors, added Vitest and a GitHub Actions workflow that runs lint and tests on every push and pull request. Merged as PR #1.
- Local setup fixes: replaced a retired Gemini model ID in `aiClient`, fixed a Mongoose `OverwriteModelError` for `GlobalProblems` in development, added `.env.example` and allowed it in `.gitignore`. Merged as PR #2.
- Google sign-in groundwork (EN-1): username generator, OAuth state helper and Google ID token claim checks, each with unit tests, on `feat/google-signin`.

Notes
- PR #1 and PR #2 were merged by me without a reviewer. Harshad and Soham have been asked to review them afterwards and leave comments. From now on a PR is merged only after a teammate approves it.

Blockers: none

Next: Google account model, account resolver, start and callback routes; project board and issues for the team.
