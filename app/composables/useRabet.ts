// Shared bits every section needs: store links, where "Download" buttons go,
// and the in-page navigation used by both the header and the footer.
export function useRabet() {
  const { rabet } = useAppConfig()
  const localePath = useLocalePath()
  const { locale } = useI18n()

  // Links to bashammakh.sa pages, in the visitor's language.
  const links = computed(() => {
    const at = (url: string) => url.replace('{locale}', locale.value)
    return { privacy: at(rabet.privacyUrl), terms: at(rabet.termsUrl), support: at(rabet.supportUrl) }
  })

  const onComputer = useState('rabet-on-computer', () => false)

  // The /download page sends a phone straight to its store. A computer can't
  // install the app, so its buttons scroll to the QR code (#download) instead.
  const downloadPage = computed(() => localePath(rabet.downloadPath))
  const downloadTo = computed(() => (onComputer.value ? '#download' : downloadPage.value))

  const nav = [
    { key: 'home', hash: '#top' },
    { key: 'setup', hash: '#setup' },
    { key: 'services', hash: '#services' },
    { key: 'features', hash: '#features' },
    { key: 'about', hash: '#about' },
    { key: 'faqs', hash: '#faqs' },
  ] as const

  return { rabet, links, downloadPage, downloadTo, nav }
}
