import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
OUT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website\scripts\_pre_frax_snapshots")
CUT_MARKERS = ("run the fraxBIT UI prompt", "the changes are barely noticable")

def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    snapshots: dict[str, str] = {}
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if any(m in line for m in CUT_MARKERS):
            break
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        for part in obj.get("message", {}).get("content", []):
            if part.get("type") != "tool_use":
                continue
            if part.get("name") != "Write":
                continue
            inp = part.get("input") or {}
            p = inp.get("path", "")
            if "Istiqeme-Technologies-website" not in p:
                continue
            rel = p.split("Istiqeme-Technologies-website\\")[-1].replace("\\", "/")
            if "contents" in inp:
                snapshots[rel] = inp["contents"]

    keys = [
        "src/components/HomeHero.tsx",
        "src/app/page.tsx",
        "src/components/Header.tsx",
        "src/components/ui/PageHero.tsx",
        "src/app/services/page.tsx",
        "src/app/work/page.tsx",
        "src/app/ai/page.tsx",
        "src/app/ai/agents/page.tsx",
        "src/components/ai/AiHomeTeaser.tsx",
        "src/app/globals.css",
        "src/app/layout.tsx",
    ]
    for k in keys:
        if k in snapshots:
            dest = OUT / k
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(snapshots[k], encoding="utf-8")
            print("saved", k, len(snapshots[k]))
        else:
            print("missing write:", k)

if __name__ == "__main__":
    main()
