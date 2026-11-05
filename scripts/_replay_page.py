import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
STOP_MARKERS = ("run the fraxBIT UI prompt", "the changes are barely noticable")
TARGET_SUFFIX = "src\\app\\page.tsx"


def main() -> None:
    patches: list[tuple[str, str]] = []
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if any(m in line for m in STOP_MARKERS):
            break
        obj = json.loads(line)
        for part in obj.get("message", {}).get("content", []):
            if part.get("name") != "StrReplace":
                continue
            path = part["input"].get("path", "")
            if not path.endswith(TARGET_SUFFIX):
                continue
            patches.append((part["input"]["old_string"], part["input"]["new_string"]))

    # Bootstrap from first patch old_string's file context - use first patch by applying to git?
    # First patch replaces imports block - use old from patch 0 as seed by reading current and undoing all forward patches in reverse
    content = (ROOT / "src/app/page.tsx").read_text(encoding="utf-8")
    for old, new in reversed(patches):
        if new in content:
            content = content.replace(new, old, 1)
            print("reverted patch")
        else:
            print("skip revert - new not found")

    dest = ROOT / "scripts/_pre_frax_snapshots/src/app/page.tsx"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding="utf-8")
    print("len", len(content))


if __name__ == "__main__":
    main()
