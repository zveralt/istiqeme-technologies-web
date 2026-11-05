import json
import sys
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
USER_STOP = tuple(sys.argv[3:]) if len(sys.argv) > 3 else ()
TARGET = sys.argv[1]


def should_stop(line: str) -> bool:
    if not USER_STOP:
        return False
    return '"role":"user"' in line and any(s in line for s in USER_STOP)


def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

best = ""
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    if should_stop(line):
        break
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        if part.get("name") != "Write":
            continue
        inp = part["input"]
        if rel(inp["path"]) != TARGET:
            continue
        c = inp["contents"]
        if len(c) > len(best):
            best = c

if not best:
    print("none")
else:
    Path(sys.argv[2]).write_text(best, encoding="utf-8")
    print(len(best))
