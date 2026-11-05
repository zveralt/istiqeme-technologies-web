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
    ops: list[tuple[str, str, dict]] = []

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
            name = part.get("name")
            inp = part.get("input") or {}
            r = rel(inp.get("path", ""))
            if not r or not r.startswith("src/"):
                continue
            if name in ("Write", "StrReplace"):
                ops.append((name, r, inp))

    for name, r, inp in ops:
        if name == "Write":
            files[r] = inp["contents"]
        elif name == "StrReplace":
            old, new = inp["old_string"], inp["new_string"]
            if r not in files:
                files[r] = old
            if old in files[r]:
                files[r] = files[r].replace(old, new, 1)

    for r, content in files.items():
        dest = ROOT / r
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")
        print("restored", r, len(content))

    for p in [
        ROOT / "src/components/frax",
        ROOT / "src/components/ui/FraxPillButton.tsx",
        ROOT / "src/components/ui/SectionHeading.tsx",
        ROOT / "src/components/ui/BackToTop.tsx",
    ]:
        if p.is_dir():
            for child in p.glob("*"):
                child.unlink()
            p.rmdir()
            print("removed dir", p.name)
        elif p.exists():
            p.unlink()
            print("removed", p.name)

    g = ROOT / "src/app/globals.css"
    if g.exists():
        text = g.read_text(encoding="utf-8")
        start = text.find("  .frax-hero {")
        end = text.find("  .itq-footer-link {")
        if start != -1 and end != -1 and start < end:
            g.write_text(text[:start] + text[end:], encoding="utf-8")
            print("stripped frax css")

    print("done", len(files), "files")


if __name__ == "__main__":
    main()
