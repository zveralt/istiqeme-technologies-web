# Example invocation prompts

Use the exact agent `name` from frontmatter. Replace bracketed text.

## Orchestrator (start here for complex work)

```
/main-orchestrator

I need a premium marketing site for [brand]. Audience: [who]. Goal: [conversions / credibility / leads].
Stack: [e.g. Next.js in this repo]. Coordinate design → UX → implementation → QA.
```

```
Use the main-orchestrator subagent to add a authenticated client dashboard without breaking existing routes. Plan architecture, implement, review, and verify.
```

## Creative design only

```
/creative-design-specialist

Brief: Landing page for an AI automation company in Karachi—feels expensive and precise, not generic SaaS.
Deliver a full design blueprint; assume Next.js + Tailwind in the current project.
```

## UX audit

```
/ui-ux-designer

Audit the /start page journey: form clarity, mobile layout, accessibility, and CTA hierarchy. Preserve the current visual identity.
```

## Prompt for another session

```
/prompt-architect

Turn the approved hero redesign into a single implementation prompt for Cursor Agent, including acceptance criteria and verification steps. Stack: [from package.json].
```

## Frontend implementation

```
/frontend-engineer

Implement the attached design blueprint on the home page hero only. Match existing components in src/components. Verify in browser.
```

## Architecture

```
/software-architect

Design API and data model for [feature]. Current stack: [Supabase/Next]. Output plan + acceptance criteria before coding.
```

## AI automation

```
/ai-automation-architect

Design a WhatsApp lead qualification flow: webhook in, CRM update, human handoff on low confidence. Include retries and logging spec.
```

## Backend

```
/backend-engineer

Implement POST /api/leads per the software-architect spec. Validate input, rate limit, no secrets in code.
```

## Debug

```
/debugger-code-reviewer

Production build fails with [error]. Find root cause and minimal fix; explain evidence.
```

## QA

```
/qa-verifier

Verify the work page redesign against: [checklist]. Run build/lint; report pass/fail with evidence.
```
