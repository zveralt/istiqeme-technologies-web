import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
USER_STOP = ("run the fraxBIT UI prompt",)

def should_stop(line: str) -> bool:
    return '"role":"user"' in line and any(s in line for s in USER_STOP)

def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        if part.get("name") != "Write":
            continue
        r = rel(part["input"]["path"])
        if r == "src/app/page.tsx":
            print(len(part["input"]["contents"]))
