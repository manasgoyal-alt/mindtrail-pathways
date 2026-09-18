# MindTrail

MindTrail is a hackathon MVP for calm, student-led wellbeing check-ins. It offers short check-ins, threaded supportive conversations, explainable nudges, voluntary human-support options, and explicit privacy controls. It does not diagnose, score, or monitor emergencies.

## Run locally

```sh
npm install
npm run dev
```

Connect Lovable Cloud/Supabase to provide `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Database schema and row-level policies are in `drizzle/migrations/0000_create_mindtrail_student_data.sql`.

## Demo journey

1. Choose **Enter as mock student**.
2. Complete the five-step check-in.
3. Open a threaded chat and send a message.
4. Review the fictional academic-context change and nudge explanation.
5. Explore peer or college support and confirm a simulated request.
6. Change and save privacy choices.

All demo names, activity, resources, and academic context are fictional. When cloud auth is unavailable, demo interactions use browser-local storage so the walkthrough remains functional.

## Privacy and safety

- Participation and every support request are voluntary.
- Supabase RLS restricts each student to their own profile, preferences, check-ins, threads, messages, nudges, and support requests.
- No raw sentiment, model prompt, scoring weights, or private academic records are exposed in the UI.
- Chat copy is supportive and non-diagnostic, with a visible route to human and urgent help.
- Secrets belong in server environment variables, never frontend source.

## Architecture

- TanStack Start, React, TypeScript, and Tailwind CSS
- Lovable Cloud/Supabase authentication and persistence
- AI Elements for conversation, message, composer, and typing presentation
- Centralized student-data boundary in `src/services/mindtrail.ts`
- Responsive sidebar on desktop and bottom navigation on mobile