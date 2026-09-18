# MindTrail frontend and demo plan

## Experience
- Build a calm, student-first application with a soft neutral canvas, forest/teal accents, warm coral highlights, readable sans-serif typography, restrained cards, and gentle fade/progress animations.
- Keep language supportive and non-diagnostic. Every suggestion will explain what happened, why it appeared, and what the student can do next.
- Use a responsive desktop sidebar and mobile bottom navigation for Today, Chat, Check-ins, Support, and Privacy.

## Screens and flow
- **Welcome / sign in:** email/password and Google sign-in, explicit opt-in context, plus a clearly labeled demo preview using fictional student data.
- **Today:** check-in status, prominent chat entry, recent activity, academic-context change, privacy status, and an actionable nudge.
- **Daily check-in:** five short validated steps for mood, energy, stress, sleep, and an optional note; one primary action and clear progress.
- **Threaded chat:** conversation list, new conversation action, dedicated `/chat/:threadId` pages, timestamps, typing state, retry/error behavior, exit control, and assistant safety boundaries.
- **Nudge explanation:** plain-language reason details without scores, model prompts, or sensitive academic records.
- **Support:** voluntary peer and college-affiliated options, plus a calm simulated human-support handoff with fictional contacts and no automatic escalation.
- **Privacy:** consent controls, data-use summary, visibility explanation, and an easy opt-out path.
- Omit the optional administrator dashboard for this student-facing MVP.

## Data and AI
- Use Lovable Cloud for signed-in accounts, consent, check-ins, conversation threads, messages, nudge decisions, and support selections.
- Add row-level access rules so each student can only read and change their own records.
- Seed only non-sensitive support resources; the demo preview remains fictional.
- Stream chatbot responses through the server using `openai/gpt-6-astra`, with a wellbeing-focused system prompt that avoids diagnosis and directs urgent safety concerns to human help.
- Persist user and completed assistant messages to the same route-derived thread; keep model keys and sensitive logic server-side.
- Centralize all reads and writes behind typed service/server functions and surface safe backend errors in the UI.

## Chat UI foundation
- Install and compose AI Elements for the conversation, messages, prompt input, loading shimmer, and expandable tool/result presentation.
- Give the assistant a custom MindTrail trail-marker identity instead of a generic AI icon.
- Keep assistant messages unboxed on the chat surface; use a high-contrast semantic bubble only for student messages.

## Technical details
- Add protected application routes beneath the managed authentication gate and keep the public welcome route at `/`.
- Create database tables for profiles, privacy preferences, check-ins, chat threads, chat messages, nudges, and support requests, with explicit grants and per-user access policies.
- Add unique route metadata for every content page.
- Define all color, typography, spacing, shadow, and animation values as semantic tokens in the global design system.
- Add focused tests for check-in validation, consent state changes, thread separation, and the simulated support flow.
- Update the README with setup, demo steps, privacy constraints, and API integration notes.

## Verification
- Validate keyboard navigation, visible focus, screen-reader labels, color contrast, mobile/desktop layout, and reduced-motion behavior.
- Verify two separate chat threads retain distinct message histories after reload for a signed-in student.
- Run the full build, typecheck, lint, targeted tests, database security checks, and browser walkthrough of the complete demo scenario.
