import json
from pathlib import Path

ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
USER_STOP = ("run the fraxBIT UI prompt",)


def should_stop(line: str) -> bool:
    return '"role":"user"' in line and any(s in line for s in USER_STOP)


def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

files: dict[str, str] = {}
for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
    if should_stop(line):
        break
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        if part.get("name") != "Write":
            continue
        inp = part["input"]
        r = rel(inp.get("path", ""))
        if r.startswith("src/"):
            files[r] = inp["contents"]

for r, c in files.items():
    if len(c) < 80:
        continue
    (ROOT / r).write_text(c, encoding="utf-8")
    print(r, len(c))
