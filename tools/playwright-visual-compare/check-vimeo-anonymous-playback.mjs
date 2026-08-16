/**
 * בדיקה עם Playwright: האם נגן Vimeo נטען לצופה **ללא** התחברות ל-Vimeo
 * (הקשר דפדפן נקי — בלי עוגיות חשבון).
 *
 * זה לא משנה הגדרות ב-Vimeo; זה רק מאמת שהסרטונים שמוטמעים באתר
 * מוגדרים כך שאפשר לנגן אותם אנונימית.
 *
 * הרצה (אחרי npm install ו-npx playwright install chromium):
 *   npm run check-vimeo-anonymous
 *
 * אם בדיקה נכשלת — ב-Vimeo לכל סרטון: Privacy ≠ Private, ו־Embed:
 * "Where can this be embedded" = Anywhere או הדומיין של האתר (ראה docs/VIMEO-MOBILE.md).
 * דף https://vimeo.com/settings/account/general — לא מקום להגדרות האלה.
 */
import { chromium } from "playwright";

/** מזהי וידאו מכל קבצי work-*.html בפרויקט (עודכן ידנית כשמוסיפים סרטונים) */
const VIMEO_VIDEO_IDS = [
  1174671158, 1174697361, 1174702804, 1174738827, 1174740361, 1174740778,
  1174741577, 1174743366, 1174746506, 1174759804, 1175134761, 1175136158,
  1175147987, 1175148084, 1175148341, 1175148686, 1175217292, 1175788465,
  1175798049, 1175798446, 1175800944, 1175910767,
];

const PLAYER_PARAMS = "muted=1&playsinline=1&title=0&byline=0&portrait=0";

async function main() {
  const browser = await chromium.launch();
  /** הקשר ללא אחסון — מדמה מבקר שלא מחובר ל-Vimeo */
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();

  const failures = [];

  for (const id of VIMEO_VIDEO_IDS) {
    const url = `https://player.vimeo.com/video/${id}?${PLAYER_PARAMS}`;
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });

      const blocked = await page
        .getByText(
          /private|password protected|this video cannot be played|sorry.*can.?t find/i
        )
        .first()
        .isVisible()
        .catch(() => false);

      if (blocked) {
        failures.push({ id, reason: "message-suggests-blocked" });
        continue;
      }

      await page.waitForSelector("video", { state: "attached", timeout: 20000 });
    } catch (e) {
      failures.push({ id, reason: e instanceof Error ? e.message : String(e) });
    }
  }

  await context.close();
  await browser.close();

  if (failures.length) {
    console.error("Vimeo anonymous playback check failed for:");
    for (const f of failures) console.error(`  ${f.id}: ${f.reason}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `OK: ${VIMEO_VIDEO_IDS.length} videos — player loaded <video> in anonymous context.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
