# Progress log - Aditya Pai

One entry per working day, newest at the bottom.
Each entry says what was done, what was learned and what is next.

## Wed 18 Nov 2026

Branches: `chore/test-ci`, `fix/local-setup`, `feat/google-signin`

Done
- Test and CI baseline (EN-4, FR-4.1, FR-4.2): replaced the removed `next lint` script with ESLint, moved to the flat ESLint config that Next.js 16 expects, fixed the `prefer-const` errors, added Vitest and a GitHub Actions workflow that runs lint and tests on every push and pull request. Merged as PR #1.
- Local setup fixes: replaced a retired Gemini model ID in `aiClient`, fixed a Mongoose `OverwriteModelError` for `GlobalProblems` in development, added `.env.example` and allowed it in `.gitignore`. Merged as PR #2.
- Google sign-in groundwork (EN-1): username generator, OAuth state helper and Google ID token claim checks, each with unit tests, on `feat/google-signin`.

Notes
- PR #1 and PR #2 were merged by me without a reviewer. Harshad and Soham have been asked to review them afterwards and leave comments. From now on a PR is merged only after a teammate approves it.

Blockers: none

Next: Google account model, account resolver, start and callback routes; project board and issues for the team.


## Thu 19 Nov 2026

Branches: `feat/google-signin`

Done
- Created the project board (Backlog, In progress, In review, Done) and one issue per requirement group for all three owners.
- EN-1: `User` model now allows accounts without a password and stores an optional `googleId`. Added the account resolver (create, link by verified email, refuse a different Google account), the MongoDB repository for it, and the Google config helper, with unit tests.
- Found during code reading: the session cookie is `SameSite=Strict`, so a plain redirect from the Google callback would lose the cookie and send the visitor to the landing page. The callback will answer with a page that moves on by itself.

Blockers: none

Next: Google start and callback routes, Continue with Google button, then local manual tests TC-01 to TC-12.
