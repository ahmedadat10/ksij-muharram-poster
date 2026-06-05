# KSIJ Weekly Programme Poster Editor — Muharram Edition

A web-based editor for creating the KSIJ Kampala weekly programme poster.
Dark Muharram mourning theme (black / grey / white with crimson & silver accents),
the Karbala shrine background, the "Ya Hussain" salaam medallion, and the
black-and-white KSIJ logo.

## Files in this package
- `index.html` — the editor page (open this in a browser)
- `app.js` — all editor logic (edit, add/delete days, auto-save, PNG download, **auto-fill week dates**)
- `poster-template.js` — the poster design + content (the Muharram template)
- `styles.css` — editor interface styling
- `ksij-logo-bw.png` — black-and-white KSIJ logo (used in the poster header)
- `body-bg.png` — Karbala shrine background image
- `qr-code.png` — QR code shown in the footer

## How to use the editor
1. Open the live site (or `index.html`).
2. **Auto-Fill Week Dates:** pick the Monday of the week in the date box and click
   **Fill Dates** — all day names and Gregorian dates fill in automatically.
   (Hijri/Islamic dates are typed manually as they depend on local moon sighting.)
3. Click any text to edit it. Add/delete days, prayers, notices, programmes as needed.
4. Click **Download PNG** to save the finished poster.

---

# How to publish on GitHub Pages (new repository)

These steps put the editor online for free at a URL like
`https://YOUR-USERNAME.github.io/REPO-NAME/`.

## Option A — Using the GitHub website (easiest, no commands)
1. Go to https://github.com and sign in.
2. Click the **+** (top-right) → **New repository**.
3. Give it a name, e.g. `ksij-muharram-poster`. Choose **Public**. Click **Create repository**.
4. On the new repo page, click **uploading an existing file**.
5. Unzip this package on your computer, then drag **all the files**
   (`index.html`, `app.js`, `poster-template.js`, `styles.css`,
   `ksij-logo-bw.png`, `body-bg.png`, `qr-code.png`, `README.md`) into the upload area.
   IMPORTANT: upload the files themselves, not the folder.
6. Click **Commit changes**.
7. Go to the repo's **Settings** → **Pages** (left menu).
8. Under "Build and deployment" → **Source**, choose **Deploy from a branch**.
   Set branch to **main** and folder to **/ (root)**. Click **Save**.
9. Wait 1–2 minutes. Refresh the Pages settings page; it will show your live URL.
10. Open the URL. Done.

## Option B — Using Git on the command line
```bash
# 1. Unzip the package and enter the folder
cd ksij-clean-upload

# 2. Initialise a git repo
git init
git add .
git commit -m "KSIJ Muharram poster editor"

# 3. Create an empty repo on github.com first (no README), then connect it:
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main

# 4. Turn on GitHub Pages:
#    Repo → Settings → Pages → Source: "Deploy from a branch"
#    Branch: main, Folder: / (root) → Save
#    Your site appears at https://YOUR-USERNAME.github.io/REPO-NAME/
```

## Updating later
- Website method: open the file in the repo, click the pencil ✏️ to edit, or
  "Add file → Upload files" to replace images. Commit.
- Command line:
  ```bash
  git add .
  git commit -m "describe your change"
  git push
  ```

## Important notes
- All files must sit in the **same folder** (root of the repo).
- After updating, do a **hard refresh** (Ctrl+Shift+R on desktop) — GitHub Pages and
  browsers cache aggressively, so changes can take a minute and a refresh to appear.
- The Arabic calligraphy in the medallion uses the **Amiri** web font, which is already
  linked in `index.html`. Keep that `<link>` line or the Arabic will fall back to a plain font.
