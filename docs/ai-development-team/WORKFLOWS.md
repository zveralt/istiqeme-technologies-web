# Standard workflows

Defaults for **`main-orchestrator`**. Adapt to task size and risk.

## Workflow A: Original premium website

```
main-orchestrator
  → creative-design-specialist (concept + blueprint)
  → ui-ux-designer (validate usability without flattening concept)
  → [prompt-architect] (optional implementation prompt)
  → frontend-engineer
  → qa-verifier
```

**Design quality gate:** creative specialist answers the ten brand-specific questions in `main-orchestrator` before large UI implementation.

## Workflow B: Existing website redesign

```
main-orchestrator
  → inspect site + code
  → creative-design-specialist + ui-ux-designer (parallel when independent)
  → frontend-engineer
  → debugger-code-reviewer (as needed)
  → qa-verifier
```

Preserve brand and working functionality unless told otherwise.

## Workflow C: New software product

```
main-orchestrator
  → [prompt-architect] (if requirements unclear)
  → software-architect
  → frontend-engineer / backend-engineer
  → debugger-code-reviewer
  → qa-verifier
```

## Workflow D: AI business automation

```
main-orchestrator
  → [prompt-architect]
  → ai-automation-architect
  → software-architect + implementers
  → debugger-code-reviewer
  → qa-verifier
```

## Workflow E: Prompt generation only

```
main-orchestrator → prompt-architect
```

No application code changes unless requested.

## Workflow F: Bug fix

```
main-orchestrator
  → debugger-code-reviewer
  → frontend-engineer / backend-engineer (if fix needed)
  → qa-verifier
```

## Workflow G: Full project delivery

```
main-orchestrator
  → specialist analysis (minimal set)
  → prioritized implementation plan
  → staged implementation (single owner per file set)
  → qa-verifier (+ debugger for high-risk areas)
  → final report (done, evidence, limitations)
```

## Efficiency principles

- Do not run all nine agents on every task.
- Parallelize independent research/audits only.
- Reuse decisions; avoid repeated discovery.
- Require evidence from `qa-verifier` for substantial changes.
