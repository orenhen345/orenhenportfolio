/**
 * צילום מסך מלא של work-5 vs work-6 (אותו viewport) — להרצה:
 *   cd playwright-visual-compare
 *   npm install
 *   npx playwright install chromium
 *   npm run compare
 *
 * קבצי PNG נשמרים ב־./screenshots/
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const pages = [
  { name: "work-5", url: `file:///${root.replace(/\\/g, "/")}/work-5.html` },
  { name: "work-6", url: `file:///${root.replace(/\\/g, "/")}/work-6.html` },
];

const viewports = [
  { width: 1280, height: 720, label: "1280x720" },
  { width: 390, height: 844, label: "390x844-mobile" },
];

async function main() {
  const outDir = join(__dirname, "screenshots");
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch();
  const results = [];

  for (const vp of viewports) {
    for (const p of pages) {
      const page = await browser.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(p.url, { waitUntil: "networkidle", timeout: 60000 });
      // וידאו/iframe — המתנה קצרה לייצוב רינדור
      await page.waitForTimeout(1500);
      const path = join(outDir, `${p.name}_${vp.label}_full.png`);
      await page.screenshot({ path, fullPage: true });
      await page.close();
      results.push({ path, ...p, viewport: vp.label });
    }
  }

  await browser.close();

  console.log("Saved screenshots:");
  for (const r of results) console.log(" ", r.path);
  console.log("\nCompare visually in an image viewer, or use a diff tool on the PNG pairs.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
