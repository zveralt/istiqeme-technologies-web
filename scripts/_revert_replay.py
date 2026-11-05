import json
from pathlib import Path

ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
STOP_SUBSTRINGS = (
    "run the fraxBIT UI prompt",
    "Implementing the fraxBIT-style UI layer",
    "the changes are barely noticable",
)


def rel_path(full: str) -> str | None:
    marker = "Istiqeme-Technologies-website\\"
    if marker not in full:
        return None
    return full.split(marker, 1)[1].replace("\\", "/")


def main() -> None:
    files: dict[str, str] = {}
    touched: list[str] = []

    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if any(s in line for s in STOP_SUBSTRINGS):
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
            rel = rel_path(inp.get("path", ""))
            if not rel or not rel.startswith("src/"):
                continue
            if name == "Write" and "contents" in inp:
                files[rel] = inp["contents"]
                if rel not in touched:
                    touched.append(rel)
            elif name == "StrReplace" and rel in files:
                old = inp.get("old_string")
                new = inp.get("new_string")
                if old is None or new is None:
                    continue
                if old not in files[rel]:
                    continue
                files[rel] = files[rel].replace(old, new, 1)

    for rel, content in files.items():
        dest = ROOT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(content, encoding="utf-8")
        print("restored", rel)

    # Remove frax-only artifacts
    frax_dir = ROOT / "src/components/frax"
    if frax_dir.exists():
        for p in frax_dir.glob("*"):
            p.unlink()
        frax_dir.rmdir()
        print("removed frax/")
    for p in [
        ROOT / "src/components/ui/FraxPillButton.tsx",
        ROOT / "src/components/ui/SectionHeading.tsx",
        ROOT / "src/components/ui/BackToTop.tsx",
    ]:
        if p.exists():
            p.unlink()
            print("removed", p.name)

    print("total files restored:", len(files))


if __name__ == "__main__":
    main()
