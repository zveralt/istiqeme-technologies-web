import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "src/lib/ai-agents/catalog.data.json");
const agents = JSON.parse(fs.readFileSync(file, "utf8"));

function hasEstonian(s) {
  return /[äöüõšž]|\b(sinu|nende|koos|mitte|tuleb|jaoks|enne|pärast|kuupäev|igale|vaadates|alltöö)\b/i.test(s);
}

function extractEnglish(text) {
  let s = String(text || "").replace(/\s+/g, " ").trim();
  if (!hasEstonian(s) && !/[a-zäöüõšž][A-Z]/.test(s) && !/[A-Z]{2,}[A-Z][a-z]/.test(s)) {
    return s;
  }
  const dotted = [...s.matchAll(/\.([A-Z])/g)];
  if (dotted.length && hasEstonian(s.slice(0, dotted[dotted.length - 1].index))) {
    s = s.slice(dotted[dotted.length - 1].index + 1).trim();
  }
  if (hasEstonian(s)) {
    const camels = [...s.matchAll(/[a-zäöüõšž]([A-Z])/g)];
    for (let i = camels.length - 1; i >= 0; i--) {
      const left = s.slice(0, camels[i].index + 1);
      if (hasEstonian(left)) {
        s = s.slice(camels[i].index + 1).trim();
        break;
      }
    }
  }
  if (hasEstonian(s)) {
    const acr = [...s.matchAll(/[A-Z]{2,}([A-Z][a-z][\s\S]*)/g)];
    if (acr.length) s = acr[acr.length - 1][1].trim();
  }
  s = s.replace(/^(Reads|Does|Comes to you)\s*/i, "").trim();
  s = s.replace(/^Tube\b/, "YouTube");
  s = s.replace(/^In, the Google/, "LinkedIn, the Google");
  return s;
}

function asSentence(text, fallback) {
  let s = extractEnglish(text);
  if (!s || hasEstonian(s) || s.length < 12) s = fallback;
  if (/^[a-z]/.test(s)) s = s.charAt(0).toUpperCase() + s.slice(1);
  if (s.startsWith("with ")) s = `You get the case ${s}`;
  if (!/[.!?]$/.test(s)) s += ".";
  return s;
}

function firstSentence(text) {
  const parts = text.split(/(?<=[.!?])\s/);
  const cut = parts[0] || text;
  if (cut.length <= 150) return cut;
  return `${cut.slice(0, 146).replace(/\s+\S*$/, "")}.`;
}

const cleaned = agents.map((agent) => {
  const name = extractEnglish(agent.name).replace(/\.$/, "");
  const does = asSentence(agent.does, "Runs this job end to end and logs the outcome.");
  const reads = asSentence(agent.reads, "Your WhatsApp threads and dashboard.");
  const comesToYou = asSentence(
    agent.comesToYou,
    "Exceptions that need your judgment come straight to you.",
  );
  const tagline = firstSentence(does);
  return { ...agent, name, tagline, reads, does, comesToYou };
});

fs.writeFileSync(file, JSON.stringify(cleaned, null, 2) + "\n");
const leftover = cleaned.filter((a) =>
  [a.name, a.tagline, a.reads, a.does, a.comesToYou].some(hasEstonian),
);
console.log(`agents ${cleaned.length}, leftover estonian ${leftover.length}`);
leftover.slice(0, 20).forEach((a) => {
  const field = ["name", "tagline", "reads", "does", "comesToYou"].find((k) => hasEstonian(a[k]));
  console.log(a.slug, field, a[field].slice(0, 140));
});
