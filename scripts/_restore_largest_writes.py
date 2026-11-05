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
NEED = {
    "src/app/globals.css",
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/app/services/page.tsx",
    "src/app/work/page.tsx",
    "src/app/ai/page.tsx",
    "src/app/ai/agents/page.tsx",
    "src/app/ai/products/page.tsx",
    "src/components/ai/AiHomeTeaser.tsx",
    "src/app/page.tsx",
}


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
    best: dict[str, str] = {}
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if should_stop(line):
            break
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        for part in obj.get("message", {}).get("content", []):
            if part.get("name") != "Write":
                continue
            inp = part.get("input") or {}
            r = rel(inp.get("path", ""))
            if r not in NEED:
                continue
            c = inp.get("contents", "")
            if r not in best or len(c) > len(best[r]):
                best[r] = c

    for r, c in best.items():
        (ROOT / r).write_text(c, encoding="utf-8")
        print(r, len(c))


if __name__ == "__main__":
    main()
