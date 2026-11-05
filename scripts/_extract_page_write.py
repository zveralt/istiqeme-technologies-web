import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
OUT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website\src\app\page.tsx")
STOP = "run the fraxBIT UI prompt"
def norm(path: str) -> str:
    return path.replace("\\", "/").split("Istiqeme-Technologies-website/")[-1]


def main() -> None:
    content: str | None = None
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if STOP in line:
            break
        obj = json.loads(line)
        for part in obj.get("message", {}).get("content", []):
            inp = part.get("input") or {}
            if norm(inp.get("path", "")) != "src/app/page.tsx":
                continue
            if part.get("name") == "Write":
                content = inp["contents"]
            elif part.get("name") == "StrReplace" and content is not None:
                old, new = inp["old_string"], inp["new_string"]
                if old in content:
                    content = content.replace(old, new, 1)
    if not content:
        raise SystemExit("no content")
    OUT.write_text(content, encoding="utf-8")
    print("wrote page.tsx", len(content))


if __name__ == "__main__":
    main()
