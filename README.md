# makhzan-site

The public website for Makhzan.

Three fixed constraints, decided by Flemer: **no backend** — the site is a front only; **the app is
never downloaded from here** — not now, not as a later addition; **selling happens on agreement**, by
contacting Flemer directly, so there is no self-serve purchase path and no contact form (a form needs
a server — the CTA is a direct Telegram link instead).

Plain HTML, CSS and vanilla JS. No framework, no build step, no npm — one page, no routing, no state,
nothing React would buy. Open `index.html` and it works; that is also exactly what a static host
serves.

Design decisions and round notes live in the app repo, `CODEX/11_JAMAL/HANDOFF_JAMAL.md` (ninth
pass), not here. The logo files are copies of `src/Desktop/Assets/Makhzan*.svg` from that repo — if
the master drawing changes, both copies need updating. Every colour, radius and shadow in
`style.css` is canon from that repo's `CODEX/09_UI_MAP/DESIGN_SYSTEM.md` and `App.xaml`.

## Not published

No Pages, no host, no domain. One thing blocks it, and it is Flemer's call:

- **The two cloud entries** in the philosophy section describe upload and off-site backup. Verified
  against the app's source: **no upload path exists** — no `HttpClient`, no sync service, anywhere in
  `src/` outside the OCR call. They are marked `PENDING` in `index.html` and were left standing
  rather than silently overruled, because Flemer stated the behaviour himself. Present tense as a
  deliberate launch promise, future tense, or pull them (a verified replacement — the
  `ledger.set_credit_limit` permission — is drafted and ready).

Open, none of them blocking: the Telegram handle (the button is built and inert) · one subsetted
Arabic webfont to replace the system stack, which is the largest single quality lever on the page ·
which side the invoice drawer enters from · the example sector, currently paint and hardware.

## Rules that are not style preferences

- **No screenshots.** Every interface on the page is HTML/CSS rebuilt from the app's own XAML —
  sharp at any size, a few KB, animatable, and it does not go stale when a screen changes.
- **Never letter-space Arabic** — it breaks the joins. Tracking is for latin and figures only.
- **The old notebook uses Arabic-Indic figures, the app uses Latin ones.** That contrast is
  deliberate and mirrors what the product actually does.
- **Every claim about the product must dissolve into code that would have to be deleted for it to
  stop being true.** Three claims already failed that test and were rewritten.
