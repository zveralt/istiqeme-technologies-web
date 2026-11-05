import json
from pathlib import Path

ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
TARGETS = ("src/components/ai/AgentCard.tsx", "src/components/ai/AgentFilters.tsx")


def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

best: dict[str, str] = {}
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        if part.get("name") != "Write":
            continue
        r = rel(part["input"]["path"])
        if r in TARGETS:
            best[r] = part["input"]["contents"]

for r, c in best.items():
    (ROOT / r).write_text(c, encoding="utf-8")
    print(r, len(c))
