export default defineAppConfig({
  ui: {
    colors: {
      primary: 'rabet',
      secondary: 'sun',
      neutral: 'slate',
    },
    button: {
      slots: { base: 'font-medium cursor-pointer' },
    },
  },

  // Everything a marketer may need to change, in one place.
  // TODO(links): confirm Rabet's own social accounts —
  // the social URLs below are the Bashammakh Group accounts used on bashammakh.sa.
  rabet: {
    // Store links go through the Rabet smart link "website" (go.rabet-app.com, repo
    // bashammakh/rabet-smart-links) instead of straight to the store, so every tap on a
    // badge — and every phone sent on by /download — is counted on the links dashboard,
    // and an Android install from it is credited to the website. `to=` picks the store
    // whatever the device. The stores themselves:
    //   https://apps.apple.com/sa/app/id6781712126
    //   https://play.google.com/store/apps/details?id=sa.bashammakh.bashammakh_mobile
    appStoreUrl: 'https://go.rabet-app.com/website?to=appstore',
    playStoreUrl: 'https://go.rabet-app.com/website?to=play',
    // A store-aware link the QR code points at (/download picks the store by device).
    downloadPath: '/download',
    socials: [
      { label: 'TikTok', icon: 'i-simple-icons-tiktok', to: 'https://www.tiktok.com/@bashgroupsa' },
      { label: 'Instagram', icon: 'i-simple-icons-instagram', to: 'https://instagram.com/bashgroupsa' },
      { label: 'X', icon: 'i-simple-icons-x', to: 'https://x.com/bashgroupsa' },
      { label: 'LinkedIn', icon: 'i-simple-icons-linkedin', to: 'https://www.linkedin.com/company/bashgroupsa' },
    ],
    // bashammakh.sa only serves these under a language prefix (/en/…, /ar/…);
    // without it they 404. {locale} becomes the page's language.
    privacyUrl: 'https://bashammakh.sa/{locale}/privacy-policy',
    termsUrl: 'https://bashammakh.sa/{locale}/terms',
    supportUrl: 'https://bashammakh.sa/{locale}/contact-us',
  },
})
