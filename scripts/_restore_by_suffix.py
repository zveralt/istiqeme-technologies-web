import json
import sys
from pathlib import Path

ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
suffix = sys.argv[1]
out = sys.argv[2]

best = ""
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        if part.get("name") != "Write":
            continue
        path = part["input"]["path"].replace("\\", "/")
        if not path.endswith(suffix):
            continue
        c = part["input"]["contents"]
        if len(c) > len(best):
            best = c

if not best:
    raise SystemExit("not found")
(ROOT / out).write_text(best, encoding="utf-8")
print(len(best))
