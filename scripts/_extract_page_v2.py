import json
from pathlib import Path

TRANSCRIPT = Path(
    r"C:\Users\Lenovo\.cursor\projects\c-Users-Lenovo-projects-Istiqeme-Technologies-website\agent-transcripts"
    r"\a39fd08a-774d-48bb-a20f-bec3cec51264\a39fd08a-774d-48bb-a20f-bec3cec51264.jsonl"
)
OUT = Path(r"C:\Users\Lenovo\projects\Istiqeme-Technologies-website\scripts\_page_build.tsx")
STOP = "run the fraxBIT UI prompt"
SUFFIX = "src\\app\\page.tsx"


def main() -> None:
    content: str | None = None
    for line in TRANSCRIPT.read_text(encoding="utf-8").splitlines():
        if STOP in line:
            break
        obj = json.loads(line)
        for part in obj.get("message", {}).get("content", []):
            if part.get("name") != "StrReplace":
                continue
            inp = part["input"]
            if not inp.get("path", "").endswith(SUFFIX):
                continue
            old, new = inp["old_string"], inp["new_string"]
            if content is None:
                content = old
            if content is not None and old in content:
                content = content.replace(old, new, 1)
            else:
                print("WARN patch did not apply")
    if content:
        OUT.write_text(content, encoding="utf-8")
        print("wrote", OUT, len(content))


if __name__ == "__main__":
    main()
