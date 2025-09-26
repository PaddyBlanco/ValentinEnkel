import sharp from "sharp";
import fs from "fs";
import path from "path";

const sizes = [480, 768, 1024, 1280, 1440, 1680, 1920] as const;
const formats = ["webp"] as const;

const baseDir = path.resolve("public/images");

async function processImage(filePath: string) {
  const ext = path.extname(filePath);               // .jpg / .jpeg / .png
  const name = path.basename(filePath, ext);        // dateiname ohne ext
  const dir = path.dirname(filePath);

  // 1) Varianten in verschiedenen Breiten
  const jobs: Promise<unknown>[] = [];
  for (const size of sizes) {
    for (const format of formats) {
      const outputPath = path.join(dir, `${name}-${size}.${format}`);
      jobs.push(
        sharp(filePath)
          .resize(size)
          .toFormat(format as any, { quality: 80 })
          .toFile(outputPath)
          .then(() => console.log(`✔️ ${outputPath}`))
      );
    }
  }

  // 2) Original-Auflösung als WebP (ohne Resize)
  const originalWebpPath = path.join(dir, `${name}-original.webp`);
  jobs.push(
    sharp(filePath)
      .toFormat("webp", { quality: 85 }) // etwas höher für Original
      .toFile(originalWebpPath)
      .then(() => console.log(`✔️ ${originalWebpPath}`))
  );

  await Promise.all(jobs);

  // 3) Quelle löschen (die .jpg/.jpeg/.png)
  try {
    await fs.promises.unlink(filePath);
    console.log(`🗑️  gelöscht: ${filePath}`);
  } catch (err) {
    console.warn(`⚠️ Konnte Quelle nicht löschen: ${filePath}`, err);
  }
}

function listInputImages(dir: string, acc: string[] = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listInputImages(full, acc);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) acc.push(full);
  }
  return acc;
}

async function main() {
  if (!fs.existsSync(baseDir)) {
    console.error(`❌ Ordner nicht gefunden: ${baseDir}`);
    process.exit(1);
  }
  const inputs = listInputImages(baseDir);
  if (inputs.length === 0) {
    console.warn("ℹ️ Keine .jpg/.jpeg/.png unter public/images gefunden.");
    return;
  }
  for (const file of inputs) {
    await processImage(file);
  }
  console.log("🎉 Fertig!");
}

await main();
