import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
target = "src/components/Header.tsx"

def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

best = ("", 0)
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        inp = part.get("input") or {}
        if rel(inp.get("path", "")) != target:
            continue
        if part.get("name") == "Write":
            c = inp["contents"]
            if len(c) > best[1]:
                best = (c, len(c))
        if part.get("name") == "StrReplace":
            c = inp.get("new_string", "")
            if len(c) > best[1]:
                best = (c, len(c))
print(best[1])
