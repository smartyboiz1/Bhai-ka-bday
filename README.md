# 🎂 Birthday Website for Sasu Maa

A silly, chaotic, interactive 6-screen birthday experience built with
plain HTML, CSS and JavaScript. No frameworks, no build step, no
backend — just open `index.html` in a browser.

## How to view it

- **Easiest:** double-click `index.html` to open it in your browser.
- **Better (recommended before sharing/deploying):** serve the folder
  with a tiny local server so the audio file and photos load properly
  everywhere:
  - VS Code → install the "Live Server" extension → right-click
    `index.html` → "Open with Live Server", **or**
  - Terminal → `cd` into this folder → run `python3 -m http.server`
    → open `http://localhost:8000`

## How to deploy it for free

Any static host works since there's no backend:
- **GitHub Pages** — push this folder to a repo, enable Pages in
  Settings.
- **Netlify / Vercel** — drag-and-drop the whole `birthday-website`
  folder onto their dashboard.

## Adding your own photos and voice note

Everything you need to change lives in **one place**:
`script.js`, right at the top, under the `CUSTOMIZATION` header.

```js
const FRIEND_NAME   = "Prashant";
const NICKNAME       = "Sasu Maa";
const CLASS_8_PHOTO  = "assets/class8.jpg";
const FRIEND_PHOTO   = "assets/friend-photo.jpg";
const BIRTHDAY_AUDIO = "assets/birthday-voice.mp3";
```

1. Drop your real files into the `assets/` folder using **exactly**
   those file names (or edit the paths above to match whatever you
   named them).
2. Save `script.js`. That's it — no other file needs to change.
3. If a photo or the audio file isn't there yet, the site won't
   break: it shows a cute placeholder instead until you add it.

Want more photos on the final screen? Add more lines to the
`EXTRA_PHOTOS` array in the same section — the site only shows the
ones that actually load, so you can leave placeholder paths commented
out.

You can also edit `MEMORY_CAPTION`, `FINAL_MESSAGES`,
`NO_EXCUSES`, `REJECT_MESSAGES` and `STICKER_JOKES` in the same
section to change any of the jokes/messages.

## The 6 screens

1. **Identity Check** — funny "who is this" verification.
2. **The 6000-Year Contract** — the NO button dodges around the
   screen (works on touch too).
3. **Our Memory** — social-post-style card with your Class 8 photo,
   like/laugh reaction counters, and a custom audio player for your
   voice note.
4. **Future Business Deal** — a fake CEO contract, funny on rejection.
5. **Choose Your Birthday Ride** — pick a teddy/cat/car/controller.
6. **Final Message** — the actual birthday message, confetti, and a
   replay button.

There are also 3 tiny hidden stickers (⭐ 🐾 🎮) scattered across the
screens — tapping them reveals a one-line joke. The counter top-right
tracks how many have been found.

## About the one external resource

The only thing loaded from the internet is a single Google Font
("Baloo 2") for the rounded, playful headings/buttons. Everything
else — confetti, animations, the audio player — is hand-written
vanilla JS/CSS with zero dependencies. If you need the site to work
fully offline, delete the two `<link>` tags for Google Fonts near the
top of `index.html`; a similar-looking system font will be used
instead automatically.

## File structure

```
birthday-website/
├── index.html      → structure of all 6 screens
├── style.css        → warm brown/cream/pink palette, all animations
├── script.js         → CUSTOMIZATION section + all interactivity
├── README.md         → this file
└── assets/
    ├── README.txt    → exact file names expected here
    ├── class8.jpg     (add your own)
    ├── friend-photo.jpg (add your own)
    └── birthday-voice.mp3 (add your own)
```
