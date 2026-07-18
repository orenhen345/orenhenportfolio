# פריימים מפיגמה — איפה הקוד בפרויקט

הקוד של הפריימים (נתיבי SVG) **נמצא בקוד המקור** — אין תלות ב־API של Figma בזמן ריצה.  
לעדכון מפיגמה: ייצאו Path / Copy as SVG מפיגמה והדביקו בקובץ ה־HTML או ב־CSS לפי ההערות למטה.

## עמוד הבית — `index.html`

| אלמנט | תיאור | מיקום בקובץ |
|--------|--------|-------------|
| **מסגרת גלילה (hero)** | SVG עם זיגזג ו־`fill` כהה | `<svg class="hero-frame-svg" viewBox="0 0 1920 3842">` — path עם `fill="#1e1c21"` |
| הערה בקוד | "פריים מדויק מהפיגמה" | מעל ה־`<svg class="hero-frame-svg">` |

## עמוד עבודה 7 / Jazz nigth — קובץ `work-9.html` (מחלקת עיצוב `work-7` ב-CSS, לא תלויה במספר הקובץ)

| אלמנט | תיאור | מיקום בקובץ |
|--------|--------|-------------|
| **מילוי תוכן עליון** | path גלילה / גל | `<svg class="work-content-svg" viewBox="0 0 1920 716">` — `fill="#12161B"` |
| **פריים אדום (blob)** | צורה אדומה סביב התצוגה החיה | `<svg class="work-7-blob-frame" viewBox="0 0 1920 3171">` — `fill="#662222"` |
| **iframe אתר חי** | תצוגה מוטמעת | `<iframe src="https://jazz-n-tlv.netlify.app/">` בתוך `.work-7-iframe-wrapper` |
| הערה בקוד | "פריים אדום מפיגמה" | מעל `.work-7-package` |

## עמודי עבודה אחרים (מחלקות עיצוב 1–6)

רוב הפריסות מוגדרות ב־`media/work-page.css` (מחלקות `.work-page.work-N`).  
אין קובץ Figma נפרד — עדכוני צורה/מיקום יש לבצע ב־CSS + HTML של אותו עמוד.

**חשוב:** מספר קובץ ה־URL (`work-N.html`) קובע רק את סדר ההצגה באתר; זהות העיצוב (מחלקת ה־CSS על ה-`<body>`) נשארת קבועה גם אם הקובץ מתחלף. ראו טבלת מיפוי בהמשך.

| קובץ (URL / סדר הצגה) | עבודה | מחלקת עיצוב CSS |
|---|---|---|
| `work-1.html` | Short film (placeholder) | `work-8` |
| `work-2.html` | Animix festival | `work-1` |
| `work-3.html` | Game project (placeholder) | `work-9` |
| `work-4.html` | Dan David project | `work-2` |
| `work-5.html` | Your way to Save time | `work-3` |
| `work-6.html` | 3D Animation | `work-4` |
| `work-7.html` | 2D Style | `work-5` |
| `work-8.html` | 3D Rigging | `work-6` |
| `work-9.html` | Jazz nigth | `work-7` |

## פרוטוטיפ Figma נפרד

| קישור | קבצים |
|--------|--------|
| `prototype/README.md` | קישור לקובץ Figma "test–1st" |
| `prototype/media/variables.css` | טוקנים מהפיגמה |
| `prototype/index.html` | דף פרוטוטיפ |
