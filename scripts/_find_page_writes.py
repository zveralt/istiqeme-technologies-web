import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
STOP = "run the fraxBIT UI prompt"

for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    if STOP in line:
        break
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        inp = part.get("input") or {}
        if "page.tsx" not in inp.get("path", ""):
            continue
        if part.get("name") == "Write":
            print("WRITE", len(inp.get("contents", "")))
        if part.get("name") == "StrReplace":
            print("REPLACE", len(inp.get("old_string", "")), "->", len(inp.get("new_string", "")))
