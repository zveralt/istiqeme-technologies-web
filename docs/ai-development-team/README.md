# AI Development Team (Cursor Subagents)

A reusable **one orchestrator + nine specialists** setup for premium design, full-stack engineering, AI automation, prompting, and verified delivery.

## Installation

Agents are installed at **user level** (available in every Cursor project):

```
C:\Users\Lenovo\.cursor\agents\
```

| File | Agent |
|------|--------|
| `main-orchestrator.md` | Supervisor and project manager |
| `creative-design-specialist.md` | Premium creative direction |
| `prompt-architect.md` | Implementation-ready prompts |
| `ui-ux-designer.md` | UX/a11y/conversion audits |
| `frontend-engineer.md` | Frontend implementation |
| `software-architect.md` | Technical architecture |
| `ai-automation-architect.md` | Automation and agent workflows |
| `backend-engineer.md` | Backend implementation |
| `debugger-code-reviewer.md` | Debug and code review |
| `qa-verifier.md` | Independent QA |

Optional **delegation rule** (off by default): `C:\Users\Lenovo\.cursor\rules\ai-development-team.mdc`  
Set `alwaysApply: true` in frontmatter if you want it in every session.

### Share with a team (project-level copy)

To version-control agents with a repo:

```powershell
New-Item -ItemType Directory -Force -Path .cursor\agents
Copy-Item -Path "$env:USERPROFILE\.cursor\agents\*.md" -Destination .cursor\agents\
```

Project-level `.cursor/agents/` overrides user-level agents with the **same name**.

## How to invoke

Per [Cursor subagents docs](https://cursor.com/docs/subagents):

1. **Slash command** (when supported): `/main-orchestrator Build a luxury architecture studio landing page`
2. **Natural language**: `Use the main-orchestrator subagent to plan and deliver …`
3. **Direct specialist**: `Use the creative-design-specialist subagent for a design blueprint for …`

The parent agent delegates via the **Task** tool using the `name` in each file’s frontmatter.

## Recommended entry point

Start complex work with **`main-orchestrator`**. It selects specialists, sequences work, and requires verification when appropriate.

For a single focused task (e.g. only a UX audit), call that specialist directly.

## Related docs

- [WORKFLOWS.md](./WORKFLOWS.md) — standard pipelines  
- [EXAMPLES.md](./EXAMPLES.md) — example prompts  
- [AGENT-MAP.md](./AGENT-MAP.md) — roles and delegation paths  

## Limitations

- Subagents run in **isolated context**; the orchestrator must pass project context explicitly.
- Availability of slash commands and models depends on your Cursor version and settings.
- Agents use `model: inherit` unless you change frontmatter per agent file.
