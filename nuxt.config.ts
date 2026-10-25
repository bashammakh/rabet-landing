// Rabet (رابط) marketing landing page — the Bashammakh mobile app's public site.
export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },

  modules: ['@nuxt/ui', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],

  // Public URL of the deployed site (no trailing slash). Used for canonical/hreflang
  // links and the QR code. Left empty, the QR code uses the page's own origin.
  runtimeConfig: {
    public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '' },
  },

  // Static pages; `nuxt generate` gives a plain folder any host can serve.
  ssr: true,
  nitro: { prerender: { routes: ['/', '/ar', '/download', '/ar/download'] } },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [{ name: 'theme-color', content: '#2464EA' }],
    },
  },

  // Albert Sans is the closest Google font to the design's English face
  // (same flourished "&", same widths). Cairo matches the mobile app's Arabic.
  fonts: {
    families: [
      { name: 'Albert Sans', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Cairo', provider: 'google', weights: [400, 500, 600, 700] },
      // The app's English face, used only inside the hero phone (LandingPhoneApp).
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700, 800] },
    ],
  },

  // The hero phone renders in the browser only, so its icons can't be inlined by
  // the server. Bundle every icon named in the source into the client instead of
  // fetching them from the Iconify API at runtime.
  icon: {
    clientBundle: { scan: true, sizeLimitKb: 256 },
  },

  ui: {
    theme: { colors: ['primary', 'secondary', 'neutral'] },
    // The design is light-only. With colour mode on, a visitor whose system is in
    // dark mode got Nuxt UI's dark tokens: near-black text on the blue buttons and
    // a dark pill on pressed/focused nav links.
    colorMode: false,
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
      { code: 'ar', language: 'ar-SA', name: 'العربية', dir: 'rtl', file: 'ar.json' },
    ],
    detectBrowserLanguage: false,
  },
})
