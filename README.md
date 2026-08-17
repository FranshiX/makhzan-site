# makhzan-site

The public website for Makhzan.

Three fixed constraints, decided by Flemer: **no backend** — the site is a front only; **the app is
never downloaded from here** — not now, not as a later addition; **selling happens on agreement**, by
contacting Flemer directly, so there is no self-serve purchase path and no contact form (a form needs
a server — the CTA is a direct Telegram link instead).

Plain HTML, CSS and vanilla JS. No framework, no build step, no npm — one page, no routing, no state,
nothing React would buy. Deploys as static files.

Design decisions and round notes live in the app repo, `CODEX/11_JAMAL/`, not here. The logo files are
copies of `src/Desktop/Assets/Makhzan*.svg` from that repo — if the master drawing changes, both
copies need updating.
