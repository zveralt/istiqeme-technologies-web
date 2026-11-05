import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
OUT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website\src\components\Header.tsx")
USER_STOP = ("run the fraxBIT UI prompt",)


def should_stop(line: str) -> bool:
    return '"role":"user"' in line and any(s in line for s in USER_STOP)


def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

best = ""
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    if should_stop(line):
        break
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        inp = part.get("input") or {}
        if rel(inp.get("path", "")) != "src/components/Header.tsx":
            continue
        if part.get("name") == "Write":
            c = inp["contents"]
            if len(c) > len(best):
                best = c

OUT.write_text(best, encoding="utf-8")
print(len(best))
