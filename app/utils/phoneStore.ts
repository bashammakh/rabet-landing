// Which app store this browser should go to, or null on a computer.
// iPadOS 13+ reports itself as a Mac; touch support gives it away.
export function phoneStore(): 'ios' | 'android' | null {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return null
}
