# 🧠 ML Portfolio — Setup & Editing Guide

Minimalist single-page portfolio. **Edit one file. Everything updates.**

---

## 📁 File Structure

```
portfolio/
├── data.json           ← ✅ THE ONLY FILE YOU EVER NEED TO EDIT
├── index.html          ← Shell with IDs only — don't touch
├── css/
│   ├── reset.css       ← Browser normalisation — don't touch
│   ├── tokens.css      ← Colors & fonts — edit to retheme
│   ├── layout.css      ← Page structure — don't touch
│   ├── components.css  ← Cards, tags, buttons — don't touch
│   └── responsive.css  ← Mobile breakpoints — don't touch
├── js/
│   ├── render.js       ← Reads data.json, builds the page — don't touch
│   └── theme.js        ← Dark/light toggle — don't touch
└── assets/
    └── photo.jpg       ← (optional) drop your photo here
```

---

## ✏️ Editing data.json

Open `data.json` in VS Code. Every section is a JSON key:

### Identity
```json
"identity": {
  "name": "Arjun Mehta",
  "initials": "AM",
  "handle": "@arjunmehta",
  "role": "ML Engineer · Data Scientist",
  "status": "Open to opportunities · MSc Data & Computational Science",
  "photo": ""          ← leave empty for initials, or "assets/photo.jpg"
}
```

### Links
```json
"links": [
  { "label": "⌥ GitHub",   "url": "https://github.com/yourhandle" },
  { "label": "in LinkedIn", "url": "https://linkedin.com/in/yourhandle" },
  { "label": "✉ Email",    "url": "mailto:you@email.com" }
]
```
Add or remove objects freely — the row wraps automatically on mobile.

### About
```json
"about": "Your bio here. You can use <strong>HTML tags</strong> for bold."
```

### Skills
Add a new skill group by adding an object to the array:
```json
{ "category": "cloud", "items": [
  { "name": "AWS",   "accent": true  },
  { "name": "GCP",   "accent": false }
]}
```
Set `"accent": true` for skills you want highlighted in indigo.

### Projects
Each project object:
```json
{
  "name": "My Project",
  "badge": "NLP · RAG",
  "description": "What it does and how.",
  "faang_signal": "Why this impresses FAANG interviewers.",
  "stack": ["Python", "FastAPI", "Docker"],
  "links": [
    { "label": "↗ GitHub", "url": "https://github.com/you/repo" },
    { "label": "⊡ Demo",   "url": "https://your-demo.com" }
  ]
}
```
Add as many projects as you like. Remove `faang_signal` if you don't want the callout bar.

### Education
```json
{ "degree": "M.Sc. Data & Computational Science",
  "institution": "University College Dublin",
  "period": "2024 – 2025",
  "detail": "GPA: 3.8 / 4.0" }
```
Leave `"detail": ""` to hide the GPA line.

---

## 🖼️ Adding Your Photo

1. Create an `assets/` folder next to `index.html`
2. Drop your photo in as `photo.jpg` (square crop works best)
3. In `data.json` set:
```json
"identity": {
  "photo": "assets/photo.jpg"
}
```
The avatar switches from initials to your photo automatically.

---

## 🎨 Retheme in 10 Seconds

Open `css/tokens.css` and change the two accent lines:
```css
--accent:      #6366f1;   /* light mode */
```
```css
--accent:      #818cf8;   /* dark mode  */
```
Every tag, link, dot, border hover, and button updates instantly.

---

## 🚀 Running Locally

> ⚠️ `data.json` is loaded via `fetch()` which requires a server.
> Opening `index.html` directly as a file (`file://`) will not work.

**Option 1 — VS Code Live Server (recommended)**
1. Install the **Live Server** extension
2. Right-click `index.html` → Open with Live Server

**Option 2 — Node (one-liner, no install)**
```bash
npx serve .
```
Then open http://localhost:3000

---

## 🚀 Deploying Free on GitHub Pages

1. Create a repo named `yourhandle.github.io`
2. Push this entire folder to the root of that repo
3. Go to Settings → Pages → Branch: main → Save
4. Live at `https://yourhandle.github.io` in ~60 seconds

---

## 📌 Projects Build Order

1. **Fraud Detection** — tabular ML + Docker, good starting point
2. **Recommender System** — MovieLens-25M dataset is public, well-documented
3. **Code Review Agent** — needs HuggingFace + LangChain knowledge
4. **ML Platform** — build last; ties everything together

Update each project's GitHub link in `data.json` as you push code.



