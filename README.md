# leetpulse

leetpulse is a spaced repetition tracker for LeetCode practice. You add a problem to a review queue, solve it in the built-in editor, and the NextPulse rule schedules the next review: a correct attempt pushes it further away, a wrong one brings it closer, and a problem is retired as mastered after enough consistent success. Gemini evaluates your code and returns a verdict, complexities, hints and an improved solution.

This repository is a fork of [manvith-dev/leetpulse](https://github.com/manvith-dev/leetpulse) by Manvith Poojary, who built the original application. It was adopted and extended for the Software Engineering ISE *GitHub Project Adoption and Enhancement* by Aditya Pai, Harshad Parab and Soham Parab. Live original: https://leetpulse.vercel.app

## What this fork adds

| ID | Enhancement | Owner |
|----|-------------|-------|
| EN-1 | Google sign-in, account linking, safer password reset | Aditya Pai |
| EN-2 | Reliable AI evaluation, stored attempts and history page | Soham Parab |
| EN-3 | Dashboard, 7-day forecast and level progression | Harshad Parab |
| EN-4 | Vitest tests, GitHub Actions CI, working scripts, this README | Aditya Pai, Soham Parab, Harshad Parab |

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, MongoDB with Mongoose, Google Gemini (`@google/genai`), Monaco editor, Recharts, Nodemailer, custom JWT cookie authentication, Vitest, GitHub Actions, Vercel.

## Run it locally

You need Node.js 22 or newer and a free MongoDB Atlas cluster.

```bash
git clone https://github.com/adityapai05/leetpulse.git
cd leetpulse
npm ci
cp .env.example .env.local   # on Windows: copy .env.example .env.local
# fill in .env.local (table below), then:
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | How to get it |
|----------|----------|---------------|
| `MONGODB_URI` | yes | MongoDB Atlas: create a free M0 cluster, add a database user, allow your IP under Network Access, then Connect > Drivers and copy the connection string with your password filled in |
| `JWT_SECRET` | yes | Any long random text. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `GEMINI_API_KEY` | yes | Google AI Studio (https://aistudio.google.com/apikey), Create API key |
| `NEXT_PUBLIC_BASE_URL` | yes | The address the app runs at, with no trailing slash: `http://localhost:3000` locally, your Vercel address when deployed |
| `GOOGLE_CLIENT_ID` | for Google sign-in | Google Cloud Console, see the next section |
| `GOOGLE_CLIENT_SECRET` | for Google sign-in | Same place. Keep it on the server only |
| `SMTP_HOST`, `SMTP_PORT` | for email | `smtp.gmail.com` and `587` for Gmail |
| `SMTP_USER`, `SMTP_PASS` | for email | A Gmail address and an App Password (Google Account > Security > 2-Step Verification > App passwords). Used for sign-up verification and password reset emails |
| `CRON_SECRET` | for cron jobs | Any random text. Vercel cron calls must send it as a bearer token |
| `TESTER_MONGODBID` | optional | The MongoDB user id allowed to use the developer test tools. Leave empty otherwise |
| `NODE_ENV` | optional | Set automatically by Next.js |

### Set up Google sign-in

1. Open https://console.cloud.google.com and create a project.
2. Go to APIs & Services > OAuth consent screen (Google Auth Platform). Choose External, fill in the app name and your email.
3. Keep the scopes to `openid`, `email` and `profile`. These need no Google review.
4. While the app is in Testing, add every person who will sign in under Test users. Use Publish app when you want anyone to sign in.
5. Go to Credentials > Create credentials > OAuth client ID > Web application and add these Authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://YOUR-VERCEL-ADDRESS/api/auth/google/callback`
6. Copy the Client ID and Client Secret into `.env.local`.

The redirect address Google calls is always `NEXT_PUBLIC_BASE_URL` plus `/api/auth/google/callback`, so the two must agree exactly.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Run all unit tests once (Vitest) |
| `npm run update-questions` | Download the LeetCode question list into `public/questions.json` |

Every push and pull request runs lint and the tests in GitHub Actions (`.github/workflows/ci.yml`).

## Licence and credit

The original application is by Manvith Poojary and is used here with the owner's permission under the MIT licence. See `LICENSE`.
