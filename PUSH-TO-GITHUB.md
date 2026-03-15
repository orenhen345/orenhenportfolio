# העלאת הפרויקט ל-GitHub – jazz-telaviv

הדף [Upload files · orenhen345/jazz-telaviv](https://github.com/orenhen345/jazz-telaviv/upload) דורש הרשאות push. הדרך הבטוחה להעלות **את כל התיקייה** (כולל `media` עם סרטונים, פונטים ורקעים) היא **מהמחשב שלך** עם Git.

---

## מה להעלות

- **בשורש:** `index.html`, `styles.css`, `DEPLOY.md`, `netlify.toml` (ואם יש – קבצים נוספים שבשורש).
- **תיקיית `media`** (הכל בתוכה):
  - `media/fonts/` – פונטים (bamberger, omes, rivkabau)
  - `media/רקעים/` – תמונות רקע (רקע 1.png … רקע 11.png)
  - סרטונים: `כרזה זה בלי קו.mp4`, `מתופף בלי טקסט.mp4`, `קונטרה בס בלי טקסט.mp4`, `סקסופוניסט בלי טקסט.mp4`, `חצוצרן בלי טקסט.mp4`
  - אודיו: `Chet Baker - Tenderly.mp3`
  - אם קיים: `media/styles.css`

---

## פקודות להרצה בטרמינל (PowerShell או CMD)

**נווט לתיקיית הפרויקט** (זו שבה נמצאים `index.html` ו־`media`), למשל:

```bash
cd c:\Oren\cursor
```

### אם עדיין לא חיברת את התיקייה ל-GitHub:

```bash
git init
git add .
git commit -m "Upload full site including media"
git branch -M main
git remote add origin https://github.com/orenhen345/jazz-telaviv.git
git push -u origin main
```

### אם כבר יש חיבור ל־origin (כבר הרצת `git remote add origin` פעם):

```bash
git add .
git commit -m "Upload full site including media"
git push -u origin main
```

אם GitHub יבקש התחברות – התחבר עם המשתמש והסיסמה (או Personal Access Token אם יש לך 2FA).

---

## אם הדחיפה נכשלת

- **קובץ מעל 100MB:** GitHub לא מקבל קובץ בודד מעל 100MB. צריך לדחוס סרטונים או להעלות אותם ל־Cloudinary (ראה **DEPLOY.md**).
- **"Uploads are disabled" / אין הרשאה:** וודא שאתה מחובר ל־GitHub (`git config user.name`, `git config user.email`) ושה repo `orenhen345/jazz-telaviv` שייך לך או שיש לך הרשאת push.

---

## אחרי ש־push הצליח

- ב־GitHub: **Settings** → **Pages** → Source: **Deploy from a branch** → branch **main** → תיקייה **/ (root)** → Save.
- האתר יהיה זמין ב: **https://orenhen345.github.io/jazz-telaviv/**
