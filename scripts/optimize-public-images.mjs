/**
 * Losslessly recompress JPEG/PNG assets under public/ for faster first delivery.
 * Next.js Image still optimizes at request time; smaller sources help direct /public hits.
 */
import { readdir, stat, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public");

async function walk(dir, files = []) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    const s = await stat(full);
    if (s.isDirectory()) await walk(full, files);
    else if (/\.(jpe?g|png)$/i.test(name)) files.push(full);
  }
  return files;
}

let saved = 0;
for (const file of await walk(root)) {
  const before = (await stat(file)).size;
  const input = await readFile(file);
  let output;
  if (/\.png$/i.test(file)) {
    output = await sharp(input).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
  } else {
    output = await sharp(input).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  }
  if (output.length < before) {
    await writeFile(file, output);
    saved += before - output.length;
    console.log(`${path.relative(root, file)}: ${Math.round(before / 1024)}KB → ${Math.round(output.length / 1024)}KB`);
  }
}
console.log(`Total saved: ${Math.round(saved / 1024)}KB`);
