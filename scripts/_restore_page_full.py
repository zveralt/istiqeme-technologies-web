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


def main() -> None:
    content: str | None = None
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if should_stop(line):
            break
        obj = json.loads(line)
        for part in obj.get("message", {}).get("content", []):
            inp = part.get("input") or {}
            if rel(inp.get("path", "")) != "src/app/page.tsx":
                continue
            if part.get("name") == "Write":
                content = inp["contents"]
            elif part.get("name") == "StrReplace" and content:
                old, new = inp["old_string"], inp["new_string"]
                if old in content:
                    content = content.replace(old, new, 1)
    if not content:
        raise SystemExit("missing page")
    (ROOT / "src/app/page.tsx").write_text(content, encoding="utf-8")
    print(len(content))


if __name__ == "__main__":
    main()
