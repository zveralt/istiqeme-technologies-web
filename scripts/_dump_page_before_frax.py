import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
ROOT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website")
STOP = "run the fraxBIT UI prompt"
TARGET = "src/app/page.tsx"


def main() -> None:
    content = (ROOT / TARGET).read_text(encoding="utf-8")
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if STOP in line:
            break
        obj = json.loads(line)
        for part in obj.get("message", {}).get("content", []):
            if part.get("name") != "StrReplace":
                continue
            inp = part["input"]
            if not inp.get("path", "").endswith(TARGET.replace("/", "\\")):
                continue
            old, new = inp["old_string"], inp["new_string"]
            if new in content and old not in content:
                # already at pre-replace state for this op when walking backward - forward apply:
                pass
            if old in content:
                content = content.replace(old, new, 1)
                print("applied forward patch")
            else:
                print("SKIP missing old_string chunk")

    out = ROOT / "scripts/_pre_frax_snapshots" / TARGET
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(content, encoding="utf-8")
    print("wrote", out, "len", len(content))


if __name__ == "__main__":
    main()
