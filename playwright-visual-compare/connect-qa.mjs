/**
 * QA: מרווח בין תוכן מעל לפריים קונקט — work-5 (מקור) מול work-6 (מטרה ~50px יציב).
 * הרצה: npm install && npx playwright install chromium && node connect-qa.mjs
 */
import { chromium } from "playwright";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..").replace(/\\/g, "/");

const work5 = `file:///${root}/work-5.html`;
const work6 = `file:///${root}/work-6.html`;

const zoomLevels = [0.75, 1, 1.25];
const viewport = { width: 1280, height: 900 };

async function measure(page, selectors) {
  return page.evaluate((sel) => {
    const a = document.querySelector(sel.a);
    const b = document.querySelector(sel.b);
    if (!a || !b) return { error: "missing element", a: !!a, b: !!b };
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const gapPx = Math.round(rb.top - ra.bottom);
    return { gapPx, aBottom: ra.bottom, bTop: rb.top };
  }, selectors);
}

async function main() {
  const browser = await chromium.launch();
  const results = [];

  for (const zoom of zoomLevels) {
    const page = await browser.newPage();
    await page.setViewportSize(viewport);

    await page.goto(work5, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate((z) => {
      document.documentElement.style.zoom = String(z);
    }, zoom);
    await page.waitForTimeout(1200);
    await page.evaluate(() =>
      document.querySelector(".work-5-connect-wrap")?.scrollIntoView({ block: "end" })
    );
    await page.waitForTimeout(400);

    const w5 = await measure(page, {
      a: ".work-5-row--stack .work-5-video-slot",
      b: ".work-5-connect-wrap .hero-footer-bar",
    });

    await page.goto(work6, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate((z) => {
      document.documentElement.style.zoom = String(z);
    }, zoom);
    await page.waitForTimeout(1200);
    await page.evaluate(() =>
      document.querySelector(".work-6-connect-wrap")?.scrollIntoView({ block: "end" })
    );
    await page.waitForTimeout(400);

    const w6 = await measure(page, {
      a: ".work-6-mint-frame__slot--secondary .work-6-video-slot",
      b: ".work-6-connect-wrap .hero-footer-bar",
    });

    results.push({ zoom, work5: w5, work6: w6 });
    await page.close();
  }

  await browser.close();

  console.log("Connect gap QA (px): bottom(video block) → top(marquee/footer bar)\n");
  for (const r of results) {
    console.log(`zoom=${r.zoom}`);
    console.log("  work-5:", r.work5);
    console.log("  work-6:", r.work6);
    if (r.work6.gapPx !== undefined && r.work6.gapPx >= 45 && r.work6.gapPx <= 58) {
      console.log("  work-6: ~50px band OK (45–58)\n");
    } else {
      console.log("  work-6: check gap (target ~50px)\n");
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
