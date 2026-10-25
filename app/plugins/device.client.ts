// After hydration, tell useRabet() whether this is a computer, so its download
// buttons can scroll to the QR code instead of leaving the page. Done on
// app:mounted so the server HTML (which links to /download) hydrates cleanly.
export default defineNuxtPlugin((nuxtApp) => {
  const onComputer = useState('rabet-on-computer', () => false)
  nuxtApp.hook('app:mounted', () => {
    onComputer.value = phoneStore() === null
  })
})
