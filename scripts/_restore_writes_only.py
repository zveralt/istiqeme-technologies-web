import json
from pathlib import Path

ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
USER_STOP = (
    "run the fraxBIT UI prompt",
    "the changes are barely noticable",
    "the changes are barely noticeable",
)


def should_stop(line: str) -> bool:
    if '"role":"user"' not in line and '"role": "user"' not in line:
        return False
    return any(s in line for s in USER_STOP)


def rel(path: str) -> str | None:
    p = path.replace("\\", "/")
    if "Istiqeme-Technologies-website/" not in p:
        return None
    return p.split("Istiqeme-Technologies-website/", 1)[1]


def main() -> None:
    files: dict[str, str] = {}
    page_patches: list[tuple[str, str]] = []

    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if should_stop(line):
            break
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        for part in obj.get("message", {}).get("content", []):
            if part.get("type") != "tool_use":
                continue
            inp = part.get("input") or {}
            r = rel(inp.get("path", ""))
            if not r or not r.startswith("src/"):
                continue
            if part.get("name") == "Write" and "contents" in inp:
                files[r] = inp["contents"]
            elif part.get("name") == "StrReplace" and r == "src/app/page.tsx":
                page_patches.append((inp["old_string"], inp["new_string"]))

    if "src/app/page.tsx" in files:
        content = files["src/app/page.tsx"]
        for old, new in page_patches:
            if old in content:
                content = content.replace(old, new, 1)
        files["src/app/page.tsx"] = content

    for r, content in files.items():
        if len(content) < 200 and r.endswith("page.tsx"):
            print("SKIP tiny", r, len(content))
            continue
        dest = ROOT / r
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")
        print("restored", r, len(content))


if __name__ == "__main__":
    main()
