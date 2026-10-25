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
  // Store links verified 2026-10-25 (iTunes lookup by bundle id; Play listing returns 200).
  // TODO(links): confirm Rabet's own social accounts —
  // the social URLs below are the Bashammakh Group accounts used on bashammakh.sa.
  rabet: {
    appStoreUrl: 'https://apps.apple.com/sa/app/id6781712126',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=sa.bashammakh.bashammakh_mobile',
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
