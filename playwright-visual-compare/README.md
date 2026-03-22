# השוואה ויזואלית (Playwright)

```bash
cd playwright-visual-compare
npm install
npx playwright install chromium
npm run compare
```

ה־PNG נשמרים ב־`screenshots/` — השוו זוגות `work-5_*` מול `work-6_*` באותו viewport.

## QA — מרווח לפריים קונקט (work-5 מול work-6)

```bash
npm run connect-qa
```

מודד את המרווח בפיקסלים בין תחתית מלבן הווידאו האחרון לבין תחילת פס ה־marquee (לפני זום דפדפן — ב־Chromium ניתן לבדוק גם עם `zoom` על ה־root).
