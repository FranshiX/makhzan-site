# makhzan-site

The public website for Makhzan.

Three fixed constraints, decided by Flemer: **no backend** — the site is a front only; **the app is
never downloaded from here** — not now, not as a later addition; **selling happens on agreement**, by
contacting Flemer directly, so there is no self-serve purchase path and no contact form (a form needs
a server — the CTA is a direct Telegram link instead).

Plain HTML, CSS and vanilla JS, with GSAP 3.15.0 vendored locally at `assets/gsap.min.js` for the
hero's single coordinated timeline. No framework, no build step, no npm at runtime — one page, no
routing, no state, nothing React would buy. Open `index.html` and it works; that is also exactly what
a static host serves.

IBM Plex Sans Arabic is self-hosted under `assets/fonts/` in four weights. The font files come from
IBM's official Plex repository and the bundled `OFL.txt` is their open font license; the page makes
no font or animation requests to a third-party CDN.

Design decisions and round notes live in the app repo, `CODEX/11_JAMAL/HANDOFF_JAMAL.md` (ninth,
thirteenth and the two 2026-08-20 website passes), not here. The logo files are copies of
`src/Desktop/Assets/Makhzan*.svg` from that repo — if
the master drawing changes, both copies need updating. Every colour, radius and shadow in
`style.css` is canon from that repo's `CODEX/09_UI_MAP/DESIGN_SYSTEM.md` and `App.xaml`.

## Launch status

The phone and Telegram actions are live, and the repository includes the Sites build configuration
used for hosting. A custom domain and one real-device pass on mobile Safari remain optional launch
follow-ups; emulation is not physical hardware.

IBM Plex Sans Arabic is self-hosted, both invoice replicas enter from the physical right, and all
sale examples use the plumbing/PPR sector matched to Flemer's live captures. The public page carries
no roadmap, release notes, version number, Beta label, or explanation of unbuilt capabilities. Bayan's
2026-08-20 positioning rule is explicit: the site behaves like the finished product surface, markets
only the complete workflows that exist, and leaves the project's development ledger outside the door.

## Current presentation state

- The hero is one GSAP timeline: product add → `10,000` total → right-side invoice drawer
  → save toast → receipt feeding from a printer slot.
- Playback pauses off-screen and while the document is hidden. Replay, Pause/Resume and
  `prefers-reduced-motion` states are explicit.
- The notebook remains the desktop «before» argument and collapses to a 96px summary on phones.
- The second sale surface no longer repeats the hero: it shows a deferred sale crossing the
  customer's credit limit, with the real right-side drawer and the refusal explained in place.
- Turbo Entry mirrors the live workflow: OCR source, session defaults, one-card review,
  confirm/postpone/skip, and the reviewed/remaining strip.
- A closing synthesis explains the product's strongest system-level value: one sale moves inventory,
  debt, paper and reports rather than ending at the receipt. A second card frames quick-add as keeping
  the customer queue moving, not as an incomplete product mechanism.
- Native `details` FAQs answer the main operational and buying questions without JavaScript.
- Desktop navigation links to the long page's major sections; phones keep the short header and CTA.
- Dedicated responsive layouts cover the app replicas, navigation rails, invoice drawers, Turbo
  Entry card, stock meters, charts, printed customer statements and payment-correction history.
- The correction-history component mirrors the shipped append-only flow: a required reason, the
  original payment visibly marked as reversed, a linked compensating row, and the restored balance.
- Browser QA passed at 1280x720 and 390x844 with zero horizontal overflow and no console warnings.

## Rules that are not style preferences

- **No screenshots.** Every interface on the page is HTML/CSS rebuilt from the app's own XAML —
  sharp at any size, a few KB and animatable. When the XAML changes, the matching replica must be
  reviewed explicitly; the 2026-08-20 Sales/Turbo drift is the precedent for that rule.
- **Never letter-space Arabic** — it breaks the joins. Tracking is for latin and figures only.
- **The old notebook uses Arabic-Indic figures, the app uses Latin ones.** That contrast is
  deliberate and mirrors what the product actually does.
- **Every claim about the product must dissolve into code that would have to be deleted for it to
  stop being true.** Three claims already failed that test and were rewritten.
- **The public page is not a changelog.** Version numbers, MVP/Beta language, future features,
  implementation gaps and roadmap status belong to the app/support material or CODEX, never the
  merchant-facing landing page.
