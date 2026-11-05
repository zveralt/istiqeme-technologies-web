import json
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
USER_STOP = ("run the fraxBIT UI prompt",)
TARGET = sys.argv[1]


def should_stop(line: str) -> bool:
    return '"role":"user"' in line and any(s in line for s in USER_STOP)


def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

content: str | None = None
applied = 0
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    if should_stop(line):
        break
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        inp = part.get("input") or {}
        if rel(inp.get("path", "")) != TARGET:
            continue
        if part.get("name") == "Write":
            content = inp["contents"]
            applied += 1
        elif part.get("name") == "StrReplace":
            old, new = inp["old_string"], inp["new_string"]
            if content is None:
                content = old
            if old in content:
                content = content.replace(old, new, 1)
                applied += 1

if not content:
    sys.exit("no content")
(ROOT / TARGET).write_text(content, encoding="utf-8")
print(TARGET, len(content), "ops", applied)
