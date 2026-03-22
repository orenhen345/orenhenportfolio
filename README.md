# Oren Hen — Portfolio (אתר סטטי)

אתר תיק עבודות: HTML + CSS + JS, ללא בנייה (build). מתאים לפרסום ב־**GitHub Pages**, **Netlify**, או כל שרת סטטי.

---

## מבנה תיקייה (חובה לפריסה)

```
cursor/   (או שם הריפו שלך)
├── index.html              ← עמוד בית
├── menu.html               ← תפריט
├── all-projects.html       ← כל הפרויקטים (מוזאיקה)
├── work-1.html … work-7.html
├── media/
│   ├── styles.css
│   ├── all-projects.css
│   ├── menu.css
│   ├── work-page.css
│   ├── work-page.js
│   ├── work-page-url-fix.js   ← תיקון Referrer ל-Vimeo עם ?orenportfolio
│   └── icons/ …
├── my_web/                 ← נכסים מקומיים (חובה עם הקבצים למטה)
│   ├── Oren Showreel.mp4
│   ├── covers/             ← כריכות לכל הפרויקטים
│   ├── icons/              ← אייקונים למארקי (בית)
│   ├── FONTS/welcome/      ← פונטים ל־WELCOME (מוגדרים ב־styles.css)
│   └── pages/…             ← תמונות לפרויקטים ספציפיים (עמודים 1, 3, וכו')
└── docs/
    ├── COLORS.md           ← טבלת צבעים
    └── FIGMA-FRAMES.md     ← איפה נמצאים נתיבי ה־SVG מפיגמה
```

**אל תמחקו** את `my_web/` אם אתם רוצים שוידאו, כריכות ופונטים ייטענו בפרודקשן.

---

## סריקת עמודים — מה נדרש

| עמוד | קבצים | תלויות עיקריות |
|------|--------|-----------------|
| **בית** `index.html` | `media/styles.css`, `media/icons/menu-icon.css` | `my_web/Oren Showreel.mp4`, `my_web/covers/*` (4 כרטיסים), `my_web/icons/*.svg` (מארקי) |
| **תפריט** `menu.html` | `media/menu.css`, `media/icons/menu-icon.css` | — (קישורים ל־`index`, `all-projects`) |
| **כל הפרויקטים** `all-projects.html` | `media/styles.css`, `media/all-projects.css` | `my_web/covers/*` (7 תמונות) |
| **עבודות 1–7** `work-*.html` | `media/work-page.css`, `work-page.js`, `work-page-url-fix.js` | כריכות ב־`my_web/covers/`, Vimeo (URLs בקוד), תמונות נוספות לפי עמוד |

### Vimeo

הסרטונים מוטמעים מ־`player.vimeo.com`. בפריסה אמיתית (HTTPS) יש להגדיר ב־Vimeo **איפה מותר להטמיע** את הדומיין של האתר (למשל `username.github.io`).  
פרמטר `?orenportfolio` בכתובת העמוד מטופל ב־`media/work-page-url-fix.js` כדי לא לשבור הטמעות.

### נכסים שחייבים להיות ב־Git

- כל `my_web/covers/` המופיעים ב־HTML (כולל שמות עם רווחים, למשל `Animix festival .png`).
- `my_web/Oren Showreel.mp4` (כבד — וודאו מגבלת גודל GitHub 100MB לקובץ בודד).
- `my_web/icons/` לפי הרשימה ב־`index.html` (סקריפט המארקי).
- תיקיות `my_web/pages/...` לפי העמודים שמפנים אליהן (למשל animix, בכיף).

---

## צבעים ופריימים מפיגמה

- **צבעים:** ראו **[docs/COLORS.md](docs/COLORS.md)**
- **נתיבי SVG / פריימים:** ראו **[docs/FIGMA-FRAMES.md](docs/FIGMA-FRAMES.md)**

---

## העלאה ל־GitHub

מתוך תיקיית הפרויקט (שבה יש `index.html`):

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/USER/REPO.git
git push -u origin main
```

אחר כך: **Settings → Pages → Branch `main` / root** — האתר: `https://USER.github.io/REPO/`

מדריכים נוספים (ישן/פרויקט אחר): `DEPLOY.md`, `PUSH-TO-GITHUB.md`.

---

## הערות אופציונליות לפני פרודקשן

1. **גודל ריפו:** קבצי וידאו גדולים ב־`my_web/` — בדקו מגבלות GitHub; אם צריך, אחסון חיצוני (Vimeo/Cloudinary) + עדכון נתיבים.
2. **בלוק דיבוג ב־`index.html`:** קריאת `fetch` ל־`127.0.0.1` — נכשלת בשקט בפרודקשן; אפשר להסיר את בלוק `#region agent log` אם לא צריך.
3. **`.cursor/` ולוגים** — לא חובה לפריסה; אפשר להוסיף ל־`.gitignore` (ראו קובץ `.gitignore` בשורש).
