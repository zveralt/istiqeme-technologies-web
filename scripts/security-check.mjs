import { execSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const ignoreDirs = new Set(["node_modules", ".next", ".git", "out", "build", ".agents"]);

const secretPatterns = [
  /\b(sk_live|rk_live|AKIA[0-9A-Z]{16})\b/,
  /\bRESEND_API_KEY\s*=\s*re_[a-zA-Z0-9]+/,
  /\bSUPABASE_SERVICE_ROLE_KEY\s*=\s*eyJ[a-zA-Z0-9._-]+/,
  /\bCRON_SECRET\s*=\s*\S{8,}/,
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (ignoreDirs.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, files);
    else files.push(path);
  }
  return files;
}

const scanSelf = join(root, "scripts", "security-check.mjs");

let findings = 0;
for (const file of walk(root)) {
  if (file === scanSelf) continue;
  if (!/\.(ts|tsx|js|mjs|json|md|env|example|yaml|yml)$/.test(file)) continue;
  if (file.includes(".env.local")) continue;
  const text = readFileSync(file, "utf8");
  for (const pattern of secretPatterns) {
    if (pattern.test(text)) {
      console.error(`[security-check] Possible secret pattern in ${file}`);
      findings += 1;
    }
  }
}

console.log("Running npm audit (high severity threshold)…");
try {
  execSync("npm audit --audit-level=high", { stdio: "inherit" });
} catch {
  console.error("[security-check] npm audit reported high/critical issues.");
  process.exitCode = 1;
}

if (findings > 0) {
  console.error(`[security-check] ${findings} potential secret pattern(s) — review manually.`);
  process.exitCode = 1;
} else {
  console.log("[security-check] No obvious committed secret patterns detected.");
}
