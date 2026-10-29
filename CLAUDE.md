# CLAUDE.md — Rabet landing page

The public marketing page for **Rabet | رابط**, the store name of the Bashammakh
mobile app (`../bashammakh_mobile/`). One long page in English and Arabic, plus a
`/download` page the QR code and every "Download" button point at. It calls no
backend.

Built from the designer's files (desktop 1920 and mobile 393 PNGs, assets per
section, in `C:\Users\conta\Downloads\Rabet_landing`) on 2026-10-25.

Repo: `github.com/bashammakh/rabet-landing`, branch `testing`. **Live at
`rabet-app.com`**: a Render static site (`rabet-landing`) builds `testing` on every
push (`npm run generate`, publishes `dist`), so a push ships.

## Commands

npm is broken on this machine — use yarn 1, and `--ignore-engines` when installing.

```bash
yarn install --ignore-engines
yarn dev          # http://localhost:3020
yarn generate     # static site in .output/public — deploy that folder anywhere
```

## Stack and why

- **Nuxt ~4.5.2**, pinned: newer Nuxt needs a newer Node than this machine's 22.22.1.
- **Nuxt UI 4** (Tailwind 4) for every control: UButton, UBadge, UAccordion,
  UCarousel, USlideover, ULink, USeparator. `<UApp :locale>` follows the page locale.
- **@nuxtjs/i18n 10**: `en` at `/`, `ar` at `/ar` (rtl), `prefix_except_default`.
  Copy lives in `i18n/locales/{en,ar}.json`.
- **uqr** draws the QR code to `/download` as inline SVG.
- Fonts: Albert Sans (closest Google match to the design's English face — chosen
  by eye) and Cairo for Arabic, via @nuxt/fonts.
- **Light only:** `colorMode: false` inside the one `ui:` block of
  `nuxt.config.ts` (a second `ui:` key silently replaced the first and left dark
  mode on). With colour mode on, a visitor in
  system dark mode got Nuxt UI's dark tokens (near-black text on the blue
  buttons, a dark navy hover pill in the nav).
- **Desktop scaling:** every size is in rem, and from `lg` up `html` font-size is
  `clamp(10px, 100vw/120, 16px)`: the 1920 design at 16px, ~10.7px at 1280
  (a 1920 screen at 150% Windows scaling). Write new sizes in rem, not px.
- Colours come from the app's tokens (`lib/app/theme/tokens.dart`); see
  `app/assets/css/main.css`. Nuxt UI's `primary` = `rabet`, `secondary` = `sun`.

## Where things are

- `app/pages/index.vue` — the section order. Each section is a component in
  `app/components/landing/`.
- `app/app.config.ts` — **store links, social links, legal links.** The one file
  a marketer edits. The store links are smart links
  (`go.rabet-app.com/website?to=play|appstore`), not the stores, so taps are
  counted on the Rabet links dashboard. Keep them that way.
- `app/pages/download.vue` — sends iPhone/iPad to the App Store and Android to Play;
  everyone else sees both badges.
- `public/images/` — assets exported from the design, grouped by section.

## Before it goes live

- **Set `NUXT_PUBLIC_SITE_URL`** (e.g. `https://rabet.sa`, no trailing slash) at
  build time. It feeds canonical/hreflang links and the QR code. Without it the QR
  code is drawn in the browser from the page's own address, and i18n logs a
  "`baseUrl` is required" warning.
- The social links are the **Bashammakh Group** accounts from bashammakh.sa —
  confirm whether Rabet has its own.
- The FAQ answers and all Arabic copy were written for the build and need the
  owner's review. The Arabic brand is **باشماخ**, never بشمخ.

## Deliberate departures from the design

- The design's "Rabbet" typo is spelled "Rabet".
- On mobile the header has a menu button (nav + language switch in a slideover);
  the mobile design has only the logo and "Download App".
- The page root is `overflow-x-clip`: UCarousel lets slides overflow on small
  screens, which otherwise widened the mobile page to ~1480px.

## Links and buttons

- **Nuxt UI links prefix internal paths with the current locale** (`ULink`, so
  every `UButton :to`). On `/ar`, `to="/"` renders `/ar`. The language toggle
  passes `:locale="otherLocale"` for that reason. Don't feed it
  `switchLocalePath()`, which got the same `/ar` back.
- **bashammakh.sa pages need a language prefix.** `/privacy-policy`, `/terms`,
  `/contact-us` 404 on their own; `/en/…` and `/ar/…` work. `app.config.ts` keeps
  them with a `{locale}` placeholder and `useRabet().links` fills it in.
- Tailwind 4 `hover:` styles only apply on devices with a mouse
  (`@media (hover: hover)`). An emulated/touch browser shows none of them, so
  check hover in a desktop browser.
- "Download" buttons use `useRabet().downloadTo`: `/download` in the server HTML
  and on phones (redirects to the right store), `#download` (the QR section) on a
  computer after mount (`plugins/device.client.ts`). The QR code always encodes
  `downloadPage`.

## Nav highlight

`Header.vue` lights the link for whichever section sits just under the header.
**Every section in `<main>` carries `data-nav`** (`pages/index.vue`). A section
with no link of its own (Why Rabet, Tracking, How It Works, Latest Updates, the
download/QR section) gets the id of the link it belongs with, or an empty value.
That way the previous link doesn't stay lit while you scroll through it. Give any
new section a `data-nav` too. At the very bottom of the page the last section
counts as the one in view.

## The clickable phone in the hero

`components/landing/PhoneApp.vue` is a working copy of the app's home, search,
service detail, news and company-formation screens. It sits on top of the photo's
screen. Notes:

- **Position:** the overlay box in `Hero.vue` is the screen's measured rectangle
  in the 632×880 `phone-hand.webp`: `left 14.32% / top 1.307% / w 48.73% /
  h 76.19%`. It uses physical `left` because the photo isn't mirrored in RTL. If
  the photo changes, re-measure.
- **Scaling:** the app is drawn at 393×855 px and scaled to fit with
  `transform: scale()`, using a ResizeObserver. **Use px inside the phone**,
  not rem or Tailwind spacing, because the page's fluid root font would resize
  it a second time. Styles are plain `ph-*` classes.
- **Mounting:** it's `<ClientOnly><LazyLandingPhoneApp/>`, so the baked
  screenshot shows until the chunk loads. In dev that can take over 1.5s. When
  checking in a browser, wait for `.ph-root` before deciding it's broken.
- **Login-only actions** (bell, cart, account, Orders, assistant, Add to cart,
  Quick Buy, company-formation Get Started and video) show a toast, then scroll
  to `#download`.
- **Data** is a hand-made snapshot in `app/data/phoneApp.ts`, taken from
  abg-system.com (ministries, services) and the app's news sheet on 2026-10-25.
  It doesn't refresh itself; regenerate it by hand if the catalogue changes.
  News categories copy the app's keyword rules
  (`bashammakh_mobile` `lib/features/news/data/models/news_item.dart`).
- The home banner is HTML, not the app's `/offers/featured` image, because that
  endpoint returned null in production.
- Icons are Material Symbols, bundled through `icon.clientBundle.scan` in
  `nuxt.config.ts`. Inter is loaded for the phone's English text, as in the app.

## RTL notes

Use logical utilities (`start-*`, `ps-*`, `text-start`). Translate is its own CSS
property in Tailwind 4, so a centred absolutely-positioned image needs an
`rtl:translate-x-*` partner. Icons with a direction get `rtl:-scale-x-100`: flip the icon itself, not a
group around it. Flipping a whole flex group in RTL undoes the order the RTL
flow already gave it (the Tracking list's `•—(→)` ended up on the wrong side).
