import json
from pathlib import Path

ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
TARGET = "src/app/globals.css"
USER_STOP = ("run the fraxBIT UI prompt",)


def should_stop(line: str) -> bool:
    return '"role":"user"' in line and any(s in line for s in USER_STOP)


def rel(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/", 1)[-1]

content = (ROOT / "src/app/globals.css.fromgit").read_text(encoding="utf-8")
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
        elif part.get("name") == "StrReplace":
            old, new = inp["old_string"], inp["new_string"]
            if old in content:
                content = content.replace(old, new, 1)

# strip frax block if present
start = content.find("  .frax-hero {")
end = content.find("  .itq-footer-link {")
if start != -1 and end != -1 and start < end:
    content = content[:start] + content[end:]

(ROOT / TARGET).write_text(content, encoding="utf-8")
print(len(content))
