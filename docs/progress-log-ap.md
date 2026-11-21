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
- Fixed a TypeScript error in the `GlobalProblems` model, introduced by the earlier Mongoose fix, that would have failed the Vercel production build. Merged as PR #40 without a reviewer; Soham has been asked to review it afterwards.

Blockers: none

Next: Google start and callback routes, Continue with Google button, then local manual tests TC-01 to TC-12.


## Fri 20 Nov 2026

Branches: `feat/google-signin`, `chore/fix-scripts`

Done
- EN-1: added the Google sign-in start route and the callback route. The callback checks the OAuth state cookie, exchanges the code with Google, validates the ID token claims, then finds, links or creates the account and sets the session cookie. It answers with a small page that moves on to `/explore`, because the session cookie is `SameSite=Strict`.
- Added plain-language messages for cancelled, failed and unverified Google sign-in, and the Continue with Google button on the login and sign-up pages.
- Set up the Google Cloud project, consent screen and OAuth client for localhost.
- Manual tests TC-01 to TC-12 run locally: All Passed
- EN-4: split the question-list update into its own script and switched `update-questions` to `tsx`, because the old script path did not exist.
- Opened [PR #41 for `chore/fix-scripts`]. Waiting for a teammate's review.

Learned: handling Google OAuth callbacks and redirects.

Blockers: waiting for teammate reviews on the open PR and on the earlier merged PRs #1, #2 and #40.

Next: deploy the fork to Vercel and test Google sign-in there (Checkpoint 1), finalise and open google sign in PR, then the reset-token and login hardening on `feat/auth-hardening` (Should Enhancements).


## Sat 21 Nov 2026 (Checkpoint 1)

Branches: `feat/google-signin`

Done
- Deployed the fork to Vercel (production from `main`, preview of `feat/google-signin`) with its own MongoDB Atlas database, and added the Vercel addresses to the Google OAuth client.
- Online testing found three separate causes behind failed logins and a wrong redirect: `NODE_ENV` was set to `development`, `NEXT_PUBLIC_BASE_URL` still pointed at `localhost` so Google redirected back to my laptop, and MongoDB Atlas Network Access only allowed my own IP, so login and Google sign-in timed out on Vercel. After fixing all three, Google sign-in works on the preview deployment.
- Ran manual tests TC-01 to TC-12 locally and on the preview. All passed.
- Added Vitest tests for the callback route (refused consent, wrong or missing state, bad code, Google unreachable, unverified email, database failure, success).
- Opened PR #42 for Google sign-in (EN-1 Must items) and asked Harshad and Soham to review.

Learned: three unrelated settings (environment name, base URL and the database network list) all produced the same symptom, a slow failure, so I had to check and fix each one.

Blockers: waiting for reviews from Harshad and Soham on the open PRs, and Harshad's and Soham's branches have no commits yet.

Next: `feat/auth-hardening` (reset token, forgot-password, login), test cases TC-13 to TC-23.