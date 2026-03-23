# Vimeo במובייל — מה עשינו ואיך לבדוק

## שינויים בקוד (ללא שינוי ויזואלי)

- **`playsinline=1`** בכל כתובות `player.vimeo.com` (Hero + iframes פנימיים). מומלץ ע״י Vimeo ל־iOS/Safari כדי שהווידאו ירוץ inline ולא ייפתח רק במסך מלא.
- **`allow`** ב־iframe של ה־Hero הורחב ל־`clipboard-write; encrypted-media; web-share` (כמו ב־iframes הפנימיים) — רק הרשאות לדפדפן, לא משנה עיצוב.

## איך להבדיל: אצלנו מול Vimeo / דפדפן

| סימפטום | כיוון לבדיקה |
|--------|----------------|
| מסך שחור / "לא ניתן להטמיע" | ב־Vimeo: **Settings → Privacy → Where can this be embedded?** — הוסף את הדומיין **המדויק** שבו האתר חי (למשל `username.github.io`, או דומיין Netlify). ב־`file://` או IP אקראי ההטמעה לעיתים נחסמת. |
| עובד בדסקטופ אבל לא בטלפון אחרי פריסה | נסה Chrome/Safari; אם יש רק אזהרה אבל לא בטלפון — בדוק **Content Blocker** / מצב חסכון. |
| רק autoplay של רקע (background) לא עובד | ב־iOS autoplay מוגבל; **muted** עוזר. מצב `background=1` עלול להתנהג אחרת במובייל — אם עדיין בעיה, זה יכול להיות מגבלת Vimeo/פלטפורמה, לא רק הקוד. |

## מה לבדוק אחרי פריסה

1. האתר ב־**HTTPS** עם הדומיין שמופיע ב־Vimeo.
2. בטלפון: פתיחת דף פרויקט ולחיצה על play אם הווידאו לא מתחיל אוטומטית.
3. אם נכשל — ב־Safari: **Develop** (אם מחובר למק) או בדיקת **Console** ב־Chrome Android למובייל (remote debugging).
