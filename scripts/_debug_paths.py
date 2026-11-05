import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines()[:300]:
    try:
        obj = json.loads(line)
    except json.JSONDecodeError:
        continue
    for part in obj.get("message", {}).get("content", []):
        p = (part.get("input") or {}).get("path", "")
        if "page.tsx" in p and "Istiqeme" in p:
            print(repr(p[:120]))
            break
