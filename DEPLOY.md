# פרסום האתר באינטרנט – כתובת גישה

האתר הוא סטטי (HTML, CSS, JS ותיקיית media). אפשר לפרסם אותו בחינם באחת מהדרכים הבאות.

---

## אפשרות 1: Netlify (הכי פשוט – גרירה)

1. היכנס ל־**[netlify.com](https://www.netlify.com)** והרשם (חינם).
2. גרור את **כל תיקיית הפרויקט** (התיקייה שבה נמצאים `index.html`, `styles.css` ותיקיית `media`) לאזור **"Drag and drop your site output folder here"** בדף הבית.
3. Netlify יעלה את האתר וייתן לך כתובת, למשל:  
   `https://שם-אקראי.netlify.app`
4. (אופציונלי) ב־**Site settings > Domain management** אפשר לשנות שם או לחבר דומיין משלך.

---

## אפשרות 2: GitHub Pages

1. צור חשבון ב־**[github.com](https://github.com)** אם עדיין אין.
2. צור **Repository** חדש (למשל `jazz-telaviv`), בלי לאתחל עם README.
3. במחשב, בתיקיית הפרויקט, פתח טרמינל והרץ:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/שם-המשתמש/שם-הריפו.git
   git push -u origin main
   ```
   (החלף `שם-המשתמש` ו־`שם-הריפו` בשם המשתמש ובשם הריפו שיצרת.)

4. ב־GitHub: **Settings** של הריפו → **Pages** → תחת **Source** בחר **Deploy from a branch**.
5. בחר branch **main** ותיקייה **/ (root)** → **Save**.
6. אחרי דקה־שתיים האתר יהיה זמין בכתובת:  
   `https://שם-המשתמש.github.io/שם-הריפו/`

---

## סרטונים מ־YouTube (הפרויקט קל – בלי קבצי וידאו כבדים)

האתר מוכן להציג סרטונים **מ־YouTube** במקום מקבצים מקומיים. כך התיקייה נשארת קלה (מתחת ל־100MB) וקל לפרסם ב־Netlify או ב־GitHub.

**מה לעשות:**
1. העלה את כל הסרטונים ל־YouTube (אפשר "לא ברשימה" אם לא רוצים שהם יופיעו בחיפוש).
2. פתח את `index.html` ומצא בראש הסקריפט את האובייקט `YOUTUBE_IDS`.
3. לכל סרטון – קח את ה־**ID** מכתובת היוטיוב: `youtube.com/watch?v=**XXXXX**` (ה־XXXXX הוא המזהה).
4. הדבק את המזהים ב־`strip` בלבד. כרטיסי האמנים (הובר) משתמשים באותם סרטונים "בלי טקסט" – בהתאמה: יואב=מתופף, מאיה=בס, עידו=סקסופון, דניאל=חצוצרה.
5. (אופציונלי) אחרי שהכל עובד – **מחק מתיקיית `media`** את קבצי ה־MP4 שלא צריכים יותר (כרזה, מתופף, בס, סקסופון, חצוצרה – הגרסאות "בלי טקסט" ו"גמור"). השאר רק פונטים, תמונות רקע ו־אודיו (Chet Baker) אם אתה משאיר מוזיקת רקע.

**שימו לב:** מוזיקת הרקע (Chet Baker) עדיין נטענת מקובץ מקומי. אם תרצו להקליד גם עליה – אפשר להעלות ל־YouTube ולהשמיע כ־audio או להשאיר קובץ MP3 קטן.

---

## Videos from YouTube (English)

The site is set up to show videos **from YouTube** instead of local files. That keeps the project folder small (under 100MB) and easy to deploy on Netlify or GitHub.

**What to do:**

1. **Upload all 9 videos to YouTube** (you can set them to “Unlisted” so they don’t appear in search).
2. Open **`index.html`** and find the **`YOUTUBE_IDS`** object at the top of the script.
3. For each video, get the **video ID** from the YouTube URL:  
   `https://www.youtube.com/watch?v=**XXXXX**`  
   The **XXXXX** part is the ID (e.g. `dQw4w9WgXcQ`).
4. Paste the IDs into **`strip`** only. The artist cards (hover popups) use the same “no text” videos, in order: יואב = drummer_nt, מאיה = bass_nt, עידו = sax_nt, דניאל = trumpet_nt.
5. **(Optional)** After everything works, **delete the MP4 files** from the `media` folder (poster, drummer, bass, sax, trumpet – both “no text” and “final” versions). Keep only fonts, background images, and the Chet Baker audio file if you still want background music.

**Note:** Background music (Chet Baker) is still loaded from a local file. You can keep a small MP3 or host it elsewhere if you want to reduce size further.

---

## הערות

- **תוכן תיקיית media**: וידאו ומוזיקה שוקלים הרבה. אם העלאה ל־Netlify או ל־GitHub נכשלת (גודל/זמן), השתמש ב־**סרטונים מ־YouTube** (ראו למעלה) או העלה קבצים כבדים ל־Cloudinary/דרייב.
- **דומיין משלך**: ב־Netlify וב־GitHub Pages אפשר לחבר דומיין שאתה קונה (למשל דרך Namecheap, Google Domains וכו').

---

## למה Netlify לא מתעדכן? (כרטיסי האמנים / תוכן חסר)

**Netlify לא "מבין" מהמחשב שלך מה לעשות** – הוא מציג רק את מה **כבר העלית** אליו.

- **אם חיברת את האתר ל-GitHub:** Netlify בונה ומפרסם **רק את מה שנמצא ב-repo ב-GitHub**. כל שינוי שעשית רק אצלך במחשב (בלי `git push`) **לא יופיע** באתר.
- **אם העלית בגרירה (Drag and drop):** Netlify שמר את **ההעלאה ההיא**. שינויים שאתה עושה אחרי זה בתיקייה המקומית **לא מתעדכנים** אוטומטית – צריך **לגרור שוב** את כל התיקייה המעודכנת.

**אם חסרים כרטיסי האמנים (או כל תוכן אחר):**

1. **חיבור ל-GitHub:** וודא שהקוד המעודכן (כולל `index.html` עם כל כרטיסי האמנים) נמצא ב-repo. בטרמינל מתוך תיקיית הפרויקט:
   ```bash
   git add .
   git commit -m "Add artist cards and full content"
   git push origin main
   ```
   אחרי ה-push, Netlify יבנה מחדש אוטומטית (בדרך כלל תוך 1–2 דקות).
2. **העלאה בגרירה:** פתח ב-Netlify את **Deploys** וגרור **שוב** את **כל** תיקיית הפרויקט (זו שבתוכה יש `index.html`, `styles.css` ו־`media`) לאזור ה־drag and drop. זה יחליף את האתר בגרסה הנוכחית מהמחשב שלך.

**סיכום:** Netlify "מבין" רק את מה שהעלית (גרירה) או את מה שב-Git (אם האתר מחובר ל-repo). כדי שהאתר יתעדכן – או מעלים שוב את התיקייה, או דוחפים את השינויים ל-GitHub.

---

## למה הסרטונים והפונטים לא מופיעים? (טרובלשוטינג)

אם אחרי הפריסה האתר נטען אבל **חסרים סרטונים** ו-**הפונטים חזרו לדיפולט** – זה כמעט תמיד בגלל אחד מהדברים הבאים:

### 1. לא העלית את **כל** התיקייה
האתר צריך את **כל** המבנה, לא רק `index.html` ו־`styles.css`.

חייבים להעלות תיקייה שבה יש **בתוכה**:
- `index.html`
- `styles.css`
- תיקייה בשם `media` ו**בתוכה**:
  - `fonts` (עם הקבצים: bamberger, omes, rivkabau)
  - כל סרטוני הווידאו והאודיו (כרזה, מתופף, קונטרה בס, סקסופון, חצוצרה, Chet Baker וכו')
  - תיקיית `רקעים` עם תמונות הרקע

**מה לעשות:** גרור **את התיקייה הראשית של הפרויקט** (זו שבתוכה יש את index.html ואת תיקיית media) – לא רק קובץ או שניים. ב־Windows: אם אתה בתוך התיקייה, גרור את התיקייה מהסייר (התיקייה עצמה), לא רק את הקבצים שנפתחו.

### 2. מגבלת גודל (Netlify ~100MB)
ב־Netlify יש מגבלה של כ־100MB להעלאה אחת. אם תיקיית `media` שוקלת יותר (הרבה וידאו), חלק מהקבצים עלול לא לעלות.

**מה לעשות:** בדוק את גודל התיקייה (לחיצה ימנית על התיקייה → Properties). אם היא מעל 100MB, אפשר להקטין וידאו/אודיו או להעלות רק חלק מהסרטונים, או להשתמש ב־GitHub Pages (שגם שם יש מגבלות אבל לפעמים גמיש יותר) או לאחסן וידאו ב־Cloudinary/שירות חיצוני ולעדכן קישורים.

### 3. אימות שהכל עלה
אחרי העלאה:

- **פונטים:** נסה לפתוח ישירות בדפדפן:  
  `https://הכתובת-שלך.netlify.app/media/fonts/bamberger-sharp-ultrabold-fm.otf`  
  אם אתה מקבל 404 – הקובץ לא עלה או הנתיב לא נכון.
- **סרטון:** נסה:  
  `https://הכתובת-שלך.netlify.app/media/כרזה זה בלי קו.mp4`  
  (או שם קובץ אחר מתוך `media`).

אם הקישורים האלה לא עובדים – חסרים קבצים או תיקיות בהעלאה. תעלה שוב את **כל** התיקייה (כולל `media` ו־`media/fonts`) ותרענן את האתר.

---

## התיקייה גדולה מ־100MB – מה לעשות?

אם כל הפרויקט (כולל `media`) שוקל יותר מ־100MB, Netlify לא יקבל את ההעלאה. יש שלוש דרכים טובות:

### אפשרות א: GitHub Pages (עד ~1GB)
ב־GitHub הריפו יכול להיות עד בערך 1GB (ו־קבצים בודדים עד 100MB כל אחד). אם התיקייה שלך מתחת ל־1GB:

1. עקוב אחרי **אפשרות 2** למעלה (GitHub Pages).
2. העלה את **כל** הפרויקט עם `git add .` ו־`git push`.
3. האתר יהיה זמין בכתובת:  
   `https://שם-המשתמש.github.io/שם-הריפו/`

אם הריפו גדול מדי או שהדחיפה נכשלת – עבר לאפשרות ב או ג.

---

### אפשרות ב: להעלות רק את הקבצים הקלים ל־Netlify, והווידאו/אודיו במקום חיצוני

הרעיון: האתר עצמו (HTML, CSS, פונטים, אולי תמונות) נשאר ב־Netlify; רק סרטונים ומוזיקה עוברים לשירות חינמי אחר.

**שלב 1 – איפה to host וידאו/אודיו (חינם):**

- **Cloudinary** (מומלץ לווידאו):  
  [cloudinary.com](https://cloudinary.com) → הרשמה חינם → Media Library → העלאת קבצי וידאו/אודיו.  
  אחרי העלאה תקבל לכל קובץ קישור ישיר (URL). תעתיק את הקישורים.
- **או Google Drive:**  
  העלה קובץ → לחיצה ימנית → "שתף" → "כל אחד עם הקישור" → "העתק קישור".  
  (לעיתים הקישור לדרייב לא מתאים להפעלת וידאו ישיר באתר; Cloudinary נוח יותר.)

**שלב 2 – להעלות ל־Netlify רק:**

- `index.html`
- `styles.css`
- תיקיית `media` **בלי** (או עם חלק מ־) קבצי הווידאו/אודיו הכבדים – אבל **עם** תיקיית `media/fonts` ותיקיית `media/רקעים` (תמונות).

**שלב 3 – לעדכן קישורים באתר:**

בקובץ `index.html` (ובכל מקום שמפנה לקבצי וידאו/אודיו) – להחליף את הנתיבים המקומיים בקישורים שקיבלת מ־Cloudinary (או דרייב).  
למשל: במקום `media/מתופף גמור.mp4` לשים את ה־URL המלא שהעתקת.  
אם תרצה, אפשר לעבור יחד קובץ־קובץ ולכתוב בדיוק איפה להחליף ומה לשים.

אחרי עדכון הקישורים – העלאה מחדש ל־Netlify. האתר יהיה קל (מתחת ל־100MB) והסרטונים/מוזיקה ייטענו מהשירות החיצוני.

---

### אפשרות ג: לדחוס וידאו ואודיו

אם אתה רוצה להשאיר הכל באותה העלאה (למשל ב־GitHub Pages) בלי לעבור ל־Cloudinary:

- **וידאו:** להשתמש בתוכנה כמו **HandBrake** (חינם) או שירות אונליין לדחיסת וידאו – להוריד רזולוציה (למשל 720p) ו/או איכות עד שהגודל יורד.
- **אודיו:** להמיר ל־MP3 ב־128kbps (או 96) כדי לחסוך מקום.

אחרי דחיסה, להחזיר את הקבצים לתיקיית `media` ולהעלות שוב. אם הסכום הכולל מתחת ל־100MB – Netlify יעבוד; אם מתחת ל־~1GB – GitHub Pages יעבוד.
