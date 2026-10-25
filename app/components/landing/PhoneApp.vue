<script setup lang="ts">
// A clickable copy of the Rabet app, laid over the phone in the hero.
//
// Built at the app's own size (a 393×855 iPhone frame, sizes in px as in
// lib/app/theme/tokens.dart) and scaled to the screen in the photo, so every
// size here is px, not rem. Screens follow the app's production layouts: home,
// search, service details, news and the company-formation intro. Anything that
// needs an account in the app (cart, orders, assistant, notifications, buying)
// scrolls the page to the download section (#download) instead.
import { phoneMinistries, phoneNews, phoneServices } from '~/data/phoneApp'
import type { Bi, PhoneNews, PhoneService } from '~/data/phoneApp'

const { t, locale } = useI18n()
const rtl = computed(() => locale.value === 'ar')
const tx = (b: Bi) => (rtl.value ? b.ar : b.en)
const px = (n: number) => ({ width: `${n}px`, height: `${n}px` })

// ── Scale the 393-wide frame to the box Hero gives us ─────────────────
const FRAME_W = 393
const root = ref<HTMLElement>()
const scale = ref(0)
let observer: ResizeObserver | undefined
onMounted(() => {
  const el = root.value!
  observer = new ResizeObserver(() => { scale.value = el.clientWidth / FRAME_W })
  observer.observe(el)
})
onBeforeUnmount(() => observer?.disconnect())

// ── Navigation: a small stack, like go_router's push/pop ──────────────
type Screen
  = | { name: 'home' } | { name: 'news' } | { name: 'search' } | { name: 'cf' }
    | { name: 'detail', id: number }
const stack = ref<Screen[]>([{ name: 'home' }])
const motion = ref<'push' | 'pop' | 'tab'>('push')
const screen = computed(() => stack.value.at(-1)!)
const tab = computed(() => stack.value[0]!.name)

function push(s: Screen) {
  motion.value = 'push'
  stack.value = [...stack.value, s]
}
function back() {
  if (stack.value.length < 2) return
  motion.value = 'pop'
  stack.value = stack.value.slice(0, -1)
}
function switchTab(name: 'home' | 'news') {
  if (tab.value === name && stack.value.length === 1) return
  motion.value = 'tab'
  stack.value = [{ name }]
}

// ── Login-only actions → the download section ─────────────────────────
const toast = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | undefined
function gated() {
  toast.value = true
  clearTimeout(toastTimer)
  // Let the visitor read why before the page moves.
  toastTimer = setTimeout(() => {
    toast.value = false
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 900)
}
onBeforeUnmount(() => clearTimeout(toastTimer))

// ── Shared formatting ─────────────────────────────────────────────────
const money = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
const price = (n: number) => money.format(n)
const ministry = (id: number) => phoneMinistries.find(m => m.id === id)!

// ── Home ──────────────────────────────────────────────────────────────
const adminId = ref<number | null>(null)
const chips = ref<HTMLElement>()
const homeServices = computed(() =>
  adminId.value === null ? phoneServices : phoneServices.filter(s => s.ministry === adminId.value),
)
function selectAdmin(id: number | null, ev: Event) {
  adminId.value = id
  const chip = ev.currentTarget as HTMLElement
  const row = chips.value!
  row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
}
// A mouse wheel can't reach a horizontal list, so turn vertical wheel into
// sideways scroll — but only while the row can still move, so the page
// scrolls as normal once the row is at its end.
function wheelChips(ev: WheelEvent) {
  const row = chips.value!
  if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) return
  const before = row.scrollLeft
  row.scrollLeft += ev.deltaY
  if (row.scrollLeft !== before) ev.preventDefault()
}

// ── Service details ───────────────────────────────────────────────────
const detailTab = ref<'desc' | 'req'>('desc')
const service = computed<PhoneService | undefined>(() => {
  const s = screen.value
  return s.name === 'detail' ? phoneServices.find(x => x.id === s.id) : undefined
})
function openService(id: number) {
  detailTab.value = 'desc'
  push({ name: 'detail', id })
}

// ── Search (400ms debounce, 2+ characters, as in the app) ─────────────
const query = ref('')
const debounced = ref('')
const searchInput = ref<HTMLInputElement>()
let searchTimer: ReturnType<typeof setTimeout> | undefined
watch(query, (q) => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => { debounced.value = q.trim() }, 400)
})
onBeforeUnmount(() => clearTimeout(searchTimer))
const results = computed(() => {
  const q = debounced.value.toLowerCase()
  if (q.length < 2) return null
  return phoneServices.filter(s => s.name.en.toLowerCase().includes(q) || s.name.ar.includes(q))
})
function openSearch() {
  query.value = ''
  debounced.value = ''
  push({ name: 'search' })
  // No keyboard pop-up on phones; focus straight away with a mouse.
  if (!matchMedia('(pointer: coarse)').matches) {
    setTimeout(() => searchInput.value?.focus({ preventScroll: true }), 320)
  }
}
function browseAll() {
  adminId.value = null
  motion.value = 'pop'
  stack.value = [{ name: 'home' }]
}

// ── News ──────────────────────────────────────────────────────────────
// The sheet has no category column, so the app sorts posts by keyword
// (bashammakh_mobile lib/features/news/data/models/news_item.dart, _classify).
const announcementWords = ['تعلن', 'نعلن', 'أعلن', 'يعلن', 'إعلان', 'الإعلان', 'فتح باب', 'استدعاء', 'تدشين', 'يدشن', 'توقيع', 'وقّع', 'إطلاق', 'قرار', 'أمر ملكي', 'دعوة', 'ندعو', 'يصدر', 'أصدر']
const digitalWords = ['تطبيق', 'منصة', 'رقمي', 'رقمية', 'إلكتروني', 'إلكترونية', 'الموقع', 'حمّل', 'حمل التطبيق', 'خدمة', 'خدمات', 'الرقمية', 'أونلاين', 'app', 'online', 'digital', 'platform', 'website']
type NewsCategory = 'all' | 'announcements' | 'digital'
const newsCategory = ref<NewsCategory>('all')
const newsSearchOpen = ref(false)
const newsQuery = ref('')
const news = computed(() => phoneNews.filter((n) => {
  const text = n.text
  if (newsCategory.value === 'announcements' && !announcementWords.some(w => text.includes(w))) return false
  if (newsCategory.value === 'digital' && !digitalWords.some(w => text.toLowerCase().includes(w))) return false
  const q = newsQuery.value.trim().toLowerCase()
  return !q || text.toLowerCase().includes(q) || tx(n.name).toLowerCase().includes(q)
}))
function toggleNewsSearch() {
  newsSearchOpen.value = !newsSearchOpen.value
  if (!newsSearchOpen.value) newsQuery.value = ''
}

const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const monthsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
// "Oct 23, 2026 · 3:16 PM" / "23 أكتوبر 2026 · 3:16 مساءً" — Riyadh time,
// read straight from the stored +03:00 timestamp, western digits in both.
function newsDate(n: PhoneNews) {
  const [, y, mo, d, h, mi] = n.date.match(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+)/)!.map(Number) as number[]
  const h12 = (h! % 12) || 12
  const time = `${h12}:${String(mi).padStart(2, '0')}`
  return rtl.value
    ? `${d} ${monthsAr[mo! - 1]} ${y} · ${time} ${h! < 12 ? 'صباحاً' : 'مساءً'}`
    : `${monthsEn[mo! - 1]} ${d}, ${y} · ${time} ${h! < 12 ? 'AM' : 'PM'}`
}
</script>

<template>
  <div
    ref="root"
    class="ph-root"
    :class="{ 'ph-rtl': rtl, 'ph-ready': scale > 0 }"
    role="region"
    :aria-label="t('phone.label')"
  >
    <div class="ph-frame" :dir="rtl ? 'rtl' : 'ltr'" :lang="rtl ? 'ar' : 'en'" :style="{ transform: `scale(${scale})` }">
      <Transition :name="`ph-${motion}`">
        <!-- ── Home ───────────────────────────────────────────── -->
        <div v-if="screen.name === 'home'" key="home" class="ph-screen ph-bg-page">
          <div class="ph-home-header">
            <div class="ph-row">
              <button type="button" class="ph-circle" :aria-label="t('phone.notifications')" @click="gated">
                <UIcon name="i-material-symbols-notifications-outline-rounded" :style="px(24)" />
                <span class="ph-dot" />
              </button>
              <div class="ph-welcome">
                <p class="ph-avail">
                  <UIcon name="i-material-symbols-star-rounded" class="ph-orange" :style="px(14)" />
                  {{ t('phone.servicesAvailable') }}
                </p>
                <p class="ph-hello">{{ t('phone.welcome') }}</p>
              </div>
              <button type="button" class="ph-circle" :aria-label="t('phone.cart')" @click="gated">
                <UIcon name="i-material-symbols-shopping-cart-outline-rounded" :style="px(22)" />
                <span class="ph-count">2</span>
              </button>
              <button type="button" class="ph-circle" :aria-label="t('phone.account')" @click="gated">
                <UIcon name="i-material-symbols-person-outline-rounded" :style="px(24)" />
              </button>
            </div>

            <button type="button" class="ph-banner" @click="push({ name: 'cf' })">
              <span class="ph-banner-copy">
                <span class="ph-banner-title">{{ t('phone.banner.title') }}<br><span class="ph-orange">{{ t('phone.banner.highlight') }}</span></span>
                <span class="ph-banner-text">{{ t('phone.banner.text') }}</span>
                <span class="ph-banner-cta">{{ t('phone.banner.cta') }}</span>
              </span>
              <img src="/images/app/banner-art.webp" alt="" class="ph-banner-art">
            </button>

            <div class="ph-filter">
              <button type="button" class="ph-search-btn" :aria-label="t('phone.search')" @click="openSearch">
                <UIcon name="i-material-symbols-search-rounded" :style="px(22)" />
              </button>
              <div ref="chips" class="ph-chips ph-noscroll" @wheel="wheelChips">
                <button type="button" class="ph-chip" :class="{ on: adminId === null }" @click="selectAdmin(null, $event)">
                  {{ t('phone.all') }}
                </button>
                <button
                  v-for="m in phoneMinistries"
                  :key="m.id"
                  type="button"
                  class="ph-chip"
                  :class="{ on: adminId === m.id }"
                  @click="selectAdmin(m.id, $event)"
                >
                  {{ tx(m.name) }}
                </button>
              </div>
            </div>
          </div>

          <div class="ph-scroll ph-noscroll ph-list">
            <button v-for="s in homeServices" :key="s.id" type="button" class="ph-card ph-service" @click="openService(s.id)">
              <img :src="ministry(s.ministry).logo" alt="" class="ph-logo" :style="px(56)">
              <span class="ph-service-body">
                <span class="ph-service-title">{{ tx(s.name) }}</span>
                <span class="ph-sub">
                  <span class="ph-price">{{ price(s.fees) }}<i class="ph-riyal" /></span>
                  <s v-if="s.previous && s.previous > s.fees" class="ph-old">{{ price(s.previous) }}</s>
                  <template v-if="s.days">
                    <span class="ph-bar">|</span>
                    <UIcon name="i-material-symbols-schedule-rounded" class="ph-orange" :style="px(13)" />
                    <span class="ph-days">{{ t('phone.days', { days: s.days }) }}</span>
                  </template>
                </span>
              </span>
              <UIcon name="i-material-symbols-chevron-right-rounded" class="ph-chevron" :style="px(24)" />
            </button>
          </div>
        </div>

        <!-- ── News ───────────────────────────────────────────── -->
        <div v-else-if="screen.name === 'news'" key="news" class="ph-screen ph-bg-page">
          <div class="ph-appbar">
            <span class="ph-appbar-side ph-wide" />
            <p class="ph-appbar-title">{{ t('phone.news.title') }}</p>
            <span class="ph-appbar-side ph-wide ph-appbar-actions">
              <button type="button" class="ph-icon-btn" :aria-label="t('phone.news.all')" @click="newsCategory = 'all'">
                <UIcon name="i-material-symbols-tune-rounded" :style="px(22)" />
              </button>
              <button type="button" class="ph-icon-btn" :aria-label="t('phone.search')" @click="toggleNewsSearch">
                <UIcon v-if="newsSearchOpen" name="i-material-symbols-close-rounded" :style="px(22)" />
                <UIcon v-else name="i-material-symbols-search-rounded" :style="px(22)" />
              </button>
            </span>
          </div>
          <div class="ph-scroll ph-noscroll ph-news">
            <label v-if="newsSearchOpen" class="ph-news-search">
              <UIcon name="i-material-symbols-search-rounded" :style="px(20)" />
              <input v-model="newsQuery" type="search" :placeholder="t('phone.news.searchHint')">
            </label>
            <div class="ph-pills">
              <button
                v-for="c in (['all', 'announcements', 'digital'] as const)"
                :key="c"
                type="button"
                class="ph-pill"
                :class="{ on: newsCategory === c }"
                @click="newsCategory = c"
              >
                {{ t(`phone.news.${c}`) }}
              </button>
            </div>
            <a
              v-for="n in news"
              :key="n.url"
              :href="n.url"
              target="_blank"
              rel="noopener"
              class="ph-news-card"
            >
              <span class="ph-news-head">
                <img :src="n.avatar" alt="" class="ph-avatar">
                <span class="ph-news-who">
                  <span class="ph-news-name">{{ tx(n.name) }}
                    <UIcon name="i-material-symbols-verified-rounded" class="ph-blue" :style="px(15)" />
                  </span>
                  <span class="ph-news-date" dir="auto">{{ newsDate(n) }}</span>
                </span>
              </span>
              <span class="ph-news-text" dir="auto">{{ n.text }}</span>
              <span class="ph-read-more">{{ t('phone.news.readMore') }}</span>
            </a>
            <p v-if="!news.length" class="ph-empty">{{ t('phone.news.empty') }}</p>
          </div>
        </div>

        <!-- ── Search ─────────────────────────────────────────── -->
        <div v-else-if="screen.name === 'search'" key="search" class="ph-screen ph-bg-page">
          <div class="ph-search-header">
            <button type="button" class="ph-circle" :aria-label="t('phone.back')" @click="back">
              <UIcon name="i-material-symbols-arrow-back-ios-new-rounded" class="ph-flip" :style="px(18)" />
            </button>
            <label class="ph-field">
              <UIcon name="i-material-symbols-search-rounded" class="ph-muted" :style="px(22)" />
              <input ref="searchInput" v-model="query" type="search" :placeholder="t('phone.searchScreen.hint')">
              <button v-if="query" type="button" class="ph-clear" :aria-label="t('phone.back')" @click="query = ''">
                <UIcon name="i-material-symbols-close-rounded" :style="px(20)" />
              </button>
            </label>
          </div>
          <div class="ph-scroll ph-noscroll ph-search-body">
            <template v-if="!results">
              <p class="ph-h">{{ t('phone.searchScreen.suggestions') }}</p>
              <button v-for="s in phoneServices.slice(0, 5)" :key="s.id" type="button" class="ph-card ph-suggest" @click="openService(s.id)">
                <span class="ph-suggest-icon"><UIcon name="i-material-symbols-search-rounded" :style="px(20)" /></span>
                <span class="ph-suggest-name">{{ tx(s.name) }}</span>
                <UIcon name="i-material-symbols-chevron-right-rounded" class="ph-chevron" :style="px(24)" />
              </button>
            </template>
            <template v-else-if="results.length">
              <p class="ph-count-line">{{ t('phone.searchScreen.results', { count: results.length, query: debounced }, results.length) }}</p>
              <button v-for="s in results" :key="s.id" type="button" class="ph-card ph-result" @click="openService(s.id)">
                <img :src="ministry(s.ministry).logo" alt="" class="ph-logo" :style="px(44)">
                <span class="ph-service-body">
                  <span class="ph-service-title">{{ tx(s.name) }}</span>
                  <span class="ph-result-sub">
                    {{ price(s.fees) }} {{ t('phone.detail.currency') }}<template v-if="s.days"> | {{ t('phone.days', { days: s.days }) }}</template>
                  </span>
                </span>
                <UIcon name="i-material-symbols-chevron-right-rounded" class="ph-chevron" :style="px(24)" />
              </button>
            </template>
            <div v-else class="ph-no-results">
              <UIcon name="i-material-symbols-search-off-rounded" class="ph-muted" :style="px(56)" />
              <p class="ph-no-title">{{ t('phone.searchScreen.noResults', { query: debounced }) }}</p>
              <p class="ph-no-hint">{{ t('phone.searchScreen.noResultsHint') }}</p>
              <button type="button" class="ph-primary" @click="browseAll">{{ t('phone.searchScreen.browseAll') }}</button>
            </div>
          </div>
        </div>

        <!-- ── Service details ────────────────────────────────── -->
        <div v-else-if="screen.name === 'detail' && service" :key="`detail-${service.id}`" class="ph-screen ph-bg-muted">
          <div class="ph-appbar">
            <span class="ph-appbar-side">
              <button type="button" class="ph-circle" :aria-label="t('phone.back')" @click="back">
                <UIcon name="i-material-symbols-arrow-back-ios-new-rounded" class="ph-flip" :style="px(18)" />
              </button>
            </span>
            <p class="ph-appbar-title">{{ t('phone.detail.title') }}</p>
            <span class="ph-appbar-side" />
          </div>
          <div class="ph-scroll ph-noscroll ph-detail">
            <div class="ph-detail-card">
              <!-- the app lays this row out right-to-left in both languages -->
              <div class="ph-detail-title" dir="rtl">
                <img :src="ministry(service.ministry).logo" alt="" class="ph-logo" :style="px(56)">
                <p dir="auto">{{ tx(service.name) }}</p>
              </div>
              <div class="ph-tags">
                <span class="ph-tag">{{ tx(ministry(service.ministry).name) }}</span>
                <span class="ph-tag">{{ Math.round(service.fees) }} {{ t('phone.detail.currency') }}</span>
                <span v-if="service.days" class="ph-tag">
                  <UIcon name="i-material-symbols-schedule-rounded" :style="px(14)" />
                  {{ service.days }} {{ t('phone.detail.daysShort') }}
                </span>
              </div>
              <div class="ph-segments">
                <button type="button" :class="{ on: detailTab === 'desc' }" @click="detailTab = 'desc'">{{ t('phone.detail.description') }}</button>
                <button type="button" :class="{ on: detailTab === 'req' }" @click="detailTab = 'req'">{{ t('phone.detail.requirements') }}</button>
              </div>
            </div>

            <template v-if="detailTab === 'desc'">
              <div class="ph-desc">
                <p dir="auto">{{ tx(service.desc) }}</p>
                <template v-if="service.conditions.length">
                  <p class="ph-included">{{ t('phone.detail.included') }}</p>
                  <p v-for="(c, i) in service.conditions" :key="i" class="ph-condition">
                    <UIcon name="i-material-symbols-check-circle-outline-rounded" :style="px(18)" />
                    <span dir="auto">{{ tx(c) }}</span>
                  </p>
                </template>
              </div>
            </template>
            <template v-else>
              <div v-for="(d, i) in service.docs" :key="i" class="ph-doc">
                <span class="ph-doc-icon"><UIcon name="i-material-symbols-description-outline-rounded" :style="px(18)" /></span>
                <span dir="auto">{{ tx(d) }}</span>
              </div>
              <p v-if="!service.docs.length" class="ph-empty">{{ t('phone.detail.empty') }}</p>
            </template>
          </div>
          <div class="ph-buybar">
            <button type="button" class="ph-outline" @click="gated">
              <UIcon name="i-material-symbols-add-shopping-cart-rounded" :style="px(20)" />
              {{ t('phone.detail.addToCart') }}
            </button>
            <button type="button" class="ph-primary" @click="gated">
              <UIcon name="i-material-symbols-flash-on-rounded" :style="px(20)" />
              {{ t('phone.detail.quickBuy') }}
            </button>
          </div>
        </div>

        <!-- ── Company formation intro ────────────────────────── -->
        <div v-else-if="screen.name === 'cf'" key="cf" class="ph-screen ph-cf">
          <div class="ph-cf-header">
            <button type="button" class="ph-circle" :aria-label="t('phone.back')" @click="back">
              <img src="/images/app/cf/ui_back.svg" alt="" class="ph-flip" :style="px(20)">
            </button>
            <p class="ph-cf-title">
              <img src="/images/app/cf/ui_buildings.svg" alt="" :style="px(20)">
              {{ t('phone.cf.title') }}
            </p>
            <span :style="px(44)" />
          </div>
          <div class="ph-scroll ph-noscroll ph-cf-body">
            <button type="button" class="ph-video" :aria-label="t('phone.cf.videoHint')" @click="gated">
              <span class="ph-video-area"><UIcon name="i-material-symbols-play-circle-outline-rounded" :style="px(48)" /></span>
            </button>
            <div class="ph-connectors"><i /><i /></div>
            <p class="ph-hint-pill">
              <UIcon name="i-material-symbols-error-outline-rounded" :style="px(18)" />
              {{ t('phone.cf.videoHint') }}
            </p>
            <p class="ph-cf-headline">{{ t('phone.cf.headline') }}</p>
            <p class="ph-cf-sub">{{ t('phone.cf.subtitle') }}</p>
            <div class="ph-bullets">
              <p><img src="/images/app/cf/ui_bullet_paths.svg" alt="">{{ t('phone.cf.bullet1') }}</p>
              <p><img src="/images/app/cf/ui_bullet_requirements.svg" alt="">{{ t('phone.cf.bullet2') }}</p>
              <p><img src="/images/app/cf/ui_bullet_order.svg" alt="">{{ t('phone.cf.bullet3') }}</p>
            </div>
          </div>
          <div class="ph-cf-cta">
            <button type="button" class="ph-primary" @click="gated">{{ t('phone.cf.start') }}</button>
          </div>
        </div>
      </Transition>

      <!-- bottom nav on the two tab roots -->
      <Transition name="ph-fade">
        <nav v-if="stack.length === 1" class="ph-nav">
          <div class="ph-nav-pill">
            <button type="button" class="ph-tab" :class="{ on: tab === 'home' }" @click="switchTab('home')">
              <UIcon v-if="tab === 'home'" name="i-material-symbols-home-rounded" :style="px(22)" />
              <UIcon v-else name="i-material-symbols-home-outline-rounded" :style="px(22)" />
              <span v-if="tab === 'home'">{{ t('phone.nav.home') }}</span>
            </button>
            <button type="button" class="ph-tab" :aria-label="t('phone.nav.orders')" @click="gated">
              <UIcon name="i-material-symbols-receipt-long-outline-rounded" :style="px(22)" />
            </button>
            <button type="button" class="ph-tab" :class="{ on: tab === 'news' }" :aria-label="t('phone.nav.news')" @click="switchTab('news')">
              <UIcon v-if="tab === 'news'" name="i-material-symbols-article-rounded" :style="px(22)" />
              <UIcon v-else name="i-material-symbols-article-outline-rounded" :style="px(22)" />
              <span v-if="tab === 'news'">{{ t('phone.nav.news') }}</span>
            </button>
          </div>
          <button type="button" class="ph-assistant" :aria-label="t('phone.nav.assistant')" @click="gated">
            <img src="/images/app/assistant.webp" alt="">
            <span />
          </button>
        </nav>
      </Transition>

      <Transition name="ph-fade">
        <p v-if="toast" class="ph-toast" role="status">
          <UIcon name="i-material-symbols-lock-outline-rounded" :style="px(18)" />
          {{ t('phone.gated') }}
        </p>
      </Transition>

      <!-- status bar + dynamic island, drawn over the photo's own -->
      <div class="ph-status" dir="ltr" aria-hidden="true">
        <span class="ph-time">{{ t('phone.time') }}</span>
        <span class="ph-island" />
        <span class="ph-sys">
          <UIcon name="i-material-symbols-signal-cellular-alt-rounded" :style="px(18)" />
          <UIcon name="i-material-symbols-wifi-rounded" :style="px(18)" />
          <UIcon name="i-material-symbols-battery-full-alt-rounded" class="ph-battery" :style="px(22)" />
        </span>
      </div>
      <span class="ph-home-indicator" aria-hidden="true" />
    </div>
  </div>
</template>

<style>
/* Everything is px at the app's own size; .ph-frame is scaled to fit. */
.ph-root {
  --blue: #2464ea; --navy: #121a2b; --orange: #f6941d; --success: #34c759; --error: #e53935;
  --page: #f5f5f5; --tint: #eaf0fd; --border: #ecECed; --divider: #efeff1;
  --text: #1f1f1f; --text2: #61646e; --muted: #74767e; --orange-tint: #fdefdd;
  --grad: linear-gradient(to bottom right, #f6e3d0, #e7e6f0, #cfdcf6);
  --card-shadow: 0 4px 16px rgb(0 0 0 / 0.06);
  --float-shadow: 0 8px 24px rgb(0 0 0 / 0.1);
  position: absolute; inset: 0;
  opacity: 0; transition: opacity 0.4s;
}
.ph-root.ph-ready { opacity: 1; }
.ph-frame {
  position: absolute; top: 0; left: 0; width: 393px; height: 855px;
  transform-origin: top left; overflow: hidden; border-radius: 61px;
  background: var(--page); color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif; font-size: 14px; line-height: 1.35;
  text-align: start; -webkit-tap-highlight-color: transparent; user-select: none;
}
.ph-rtl .ph-frame { font-family: Cairo, ui-sans-serif, system-ui, sans-serif; }
.ph-frame p { margin: 0; }
.ph-frame button { cursor: pointer; font: inherit; color: inherit; text-align: inherit; }
.ph-frame input { font: inherit; color: var(--text); background: none; border: 0; outline: 0; min-width: 0; flex: 1; }
.ph-frame input::-webkit-search-cancel-button { display: none; }
.ph-noscroll { scrollbar-width: none; }
.ph-noscroll::-webkit-scrollbar { display: none; }
.ph-rtl .ph-flip, .ph-rtl .ph-chevron { transform: scaleX(-1); }
.ph-orange { color: var(--orange); }
.ph-blue { color: var(--blue); }
.ph-muted { color: var(--muted); }

.ph-screen { position: absolute; inset: 0; display: flex; flex-direction: column; }
.ph-bg-page { background: var(--page); }
.ph-bg-muted { background: var(--page); }
.ph-scroll { flex: 1; min-height: 0; overflow-y: auto; }

/* status bar, island, home indicator */
.ph-status { position: absolute; inset: 0 0 auto; height: 59px; display: flex; align-items: center; justify-content: space-between; padding: 0 30px 0 50px; pointer-events: none; z-index: 30; color: #000; }
.ph-time { font-family: Inter, system-ui, sans-serif; font-weight: 600; font-size: 17px; }
.ph-island { position: absolute; left: 50%; top: 11px; width: 125px; height: 37px; margin-left: -62.5px; border-radius: 999px; background: #000; }
.ph-sys { display: flex; align-items: center; gap: 5px; }
.ph-home-indicator { position: absolute; left: 50%; bottom: 8px; width: 134px; height: 5px; margin-left: -67px; border-radius: 999px; background: #000; z-index: 30; pointer-events: none; }

/* shared controls */
.ph-circle { position: relative; display: grid; place-items: center; width: 44px; height: 44px; flex: none; border-radius: 999px; background: #fff; color: var(--text); }
.ph-dot { position: absolute; top: 9px; inset-inline-end: 11px; width: 11px; height: 11px; border-radius: 999px; background: var(--error); border: 2px solid #fff; }
.ph-count { position: absolute; top: -2px; inset-inline-end: -2px; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 999px; background: var(--orange); color: #fff; font-size: 11px; font-weight: 700; line-height: 18px; text-align: center; }
.ph-card { display: flex; align-items: center; gap: 12px; width: 100%; padding: 16px; border-radius: 16px; background: #fff; box-shadow: var(--card-shadow); }
.ph-logo { flex: none; object-fit: contain; border-radius: 12px; background: #fff; }
.ph-chevron { flex: none; color: var(--muted); }
.ph-primary, .ph-outline { display: flex; align-items: center; justify-content: center; gap: 8px; height: 54px; padding: 0 20px; border-radius: 999px; font-size: 16px !important; font-weight: 700 !important; }
.ph-primary { background: var(--blue); color: #fff !important; }
.ph-outline { background: #fff; color: var(--blue) !important; border: 1.5px solid var(--blue); }
.ph-empty { padding: 32px 0; text-align: center; color: var(--muted); }

/* home header */
.ph-home-header { flex: none; padding: 71px 16px 16px; background: var(--grad); border-radius: 0 0 20px 20px; }
.ph-row { display: flex; align-items: center; gap: 8px; }
.ph-welcome { flex: 1; min-width: 0; text-align: center; }
.ph-avail { display: flex; align-items: center; justify-content: center; gap: 4px; font-size: 12px; color: var(--text2); }
.ph-hello { margin-top: 2px !important; font-size: 18px; font-weight: 700; }
.ph-banner { position: relative; display: flex; align-items: stretch; width: 100%; aspect-ratio: 2.5; margin: 16px 0 24px; overflow: hidden; border-radius: 20px; background: linear-gradient(120deg, #1e55d0, #2464ea 55%, #4f86f7); color: #fff; }
.ph-banner-copy { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 6px; width: 64%; padding: 14px 16px; }
.ph-banner-title { font-size: 16px; font-weight: 800; line-height: 1.25; }
.ph-banner .ph-orange { color: #ffc174; }
.ph-banner-text { font-size: 11px; line-height: 1.35; opacity: 0.9; }
.ph-banner-cta { margin-top: 2px; padding: 6px 14px; border-radius: 999px; background: var(--orange); font-size: 12px; font-weight: 700; }
.ph-banner-art { position: absolute; inset-block: 0; inset-inline-end: 0; width: 42%; height: 100%; object-fit: cover; object-position: center bottom; -webkit-mask-image: linear-gradient(to right, transparent, #000 30%); mask-image: linear-gradient(to right, transparent, #000 30%); }
.ph-rtl .ph-banner-art { -webkit-mask-image: linear-gradient(to left, transparent, #000 30%); mask-image: linear-gradient(to left, transparent, #000 30%); }
.ph-filter { display: flex; align-items: center; gap: 8px; }
.ph-search-btn { display: grid; place-items: center; width: 44px; height: 44px; flex: none; border-radius: 999px; background: var(--blue); color: #fff !important; }
.ph-chips { display: flex; gap: 8px; overflow-x: auto; min-width: 0; }
.ph-chip { flex: none; padding: 12px 16px; border-radius: 999px; background: #fff; font-size: 14px; font-weight: 600; line-height: 1; white-space: nowrap; transition: background 0.2s, color 0.2s; }
.ph-chip.on { background: var(--navy); color: #fff !important; }

/* home list */
.ph-list { display: flex; flex-direction: column; gap: 12px; padding: 16px 16px 120px; }
.ph-service-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.ph-service-title { font-size: 15px; font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.ph-sub { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
.ph-price { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 700; color: var(--blue); }
.ph-riyal { display: inline-block; height: 11.7px; aspect-ratio: 64 / 72; background: currentColor; -webkit-mask: url(/images/app/riyal.png) center / contain no-repeat; mask: url(/images/app/riyal.png) center / contain no-repeat; }
.ph-old { margin-inline-start: 4px; font-size: 11px; font-weight: 500; color: var(--muted); }
.ph-bar { padding: 0 4px; color: var(--border); filter: brightness(0.85); }
.ph-days { font-size: 12px; font-weight: 600; color: var(--orange); }

/* bottom nav */
.ph-nav { position: absolute; inset-inline: 16px; bottom: 46px; display: flex; align-items: center; gap: 12px; z-index: 20; }
.ph-nav-pill { flex: 1; display: flex; align-items: center; justify-content: space-around; height: 64px; padding: 0 8px; border-radius: 999px; background: #fff; box-shadow: var(--float-shadow); }
.ph-tab { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; color: var(--muted) !important; transition: background 0.2s; }
.ph-tab.on { background: var(--tint); color: var(--blue) !important; font-size: 14px; font-weight: 600; }
.ph-assistant { position: relative; flex: none; width: 64px; height: 64px; padding: 5px; border-radius: 999px; background: #fff; box-shadow: var(--float-shadow); }
.ph-assistant img { width: 100%; height: 100%; border-radius: 999px; object-fit: cover; transform: scale(1.12) translateY(-2px); }
.ph-assistant > span { position: absolute; top: 4px; right: 4px; width: 15px; height: 15px; border-radius: 999px; background: var(--success); border: 2.5px solid #fff; }

/* app bar (details, news) */
.ph-appbar { flex: none; display: flex; align-items: center; gap: 8px; height: 155px; padding: 59px 16px 0; background: var(--grad); border-radius: 0 0 20px 20px; }
.ph-appbar-side { flex: none; width: 44px; display: flex; }
.ph-appbar-title { flex: 1; text-align: center; font-size: 18px; font-weight: 700; }
.ph-appbar-side.ph-wide { width: 88px; }
.ph-appbar-actions { justify-content: flex-end; gap: 8px; }
.ph-icon-btn { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 999px; background: #fff; }

/* news */
.ph-news { display: flex; flex-direction: column; gap: 12px; padding: 16px 16px 120px; }
.ph-news-search { display: flex; align-items: center; gap: 8px; height: 48px; padding: 0 16px; border-radius: 999px; background: #fff; color: var(--muted); }
.ph-pills { display: flex; gap: 8px; overflow-x: auto; flex: none; }
.ph-pill { flex: none; padding: 12px 16px; border-radius: 999px; background: #fff; border: 1px solid var(--border); color: var(--text2) !important; font-size: 14px; font-weight: 600; line-height: 1; white-space: nowrap; }
.ph-pill.on { background: var(--navy); border-color: var(--navy); color: #fff !important; }
.ph-news-card { display: flex; flex-direction: column; gap: 12px; padding: 16px; border-radius: 16px; background: #fff; border: 1px solid var(--border); color: inherit; text-decoration: none; }
.ph-news-head { display: flex; align-items: center; gap: 12px; }
.ph-avatar { width: 44px; height: 44px; border-radius: 999px; object-fit: cover; flex: none; }
.ph-news-who { display: flex; flex-direction: column; min-width: 0; }
.ph-news-name { display: flex; align-items: center; gap: 4px; font-size: 15px; font-weight: 700; }
.ph-news-date { font-size: 12px; color: var(--muted); text-align: start; }
.ph-news-text { font-size: 14px; line-height: 1.7; white-space: pre-line; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; font-family: Cairo, Inter, system-ui, sans-serif; }
.ph-read-more { margin-top: -6px; font-size: 13px; font-weight: 700; color: var(--blue); }

/* search */
.ph-search-header { flex: none; display: flex; align-items: center; gap: 8px; padding: 75px 16px 16px; background: var(--grad); border-radius: 0 0 20px 20px; }
.ph-field { flex: 1; display: flex; align-items: center; gap: 8px; height: 52px; padding: 0 16px; border-radius: 999px; background: #fff; border: 1px solid var(--border); font-size: 15px; }
.ph-field:focus-within { border: 1.5px solid var(--blue); }
.ph-field input::placeholder, .ph-news-search input::placeholder { color: var(--muted); }
.ph-clear { display: grid; place-items: center; color: var(--muted) !important; }
.ph-search-body { display: flex; flex-direction: column; gap: 8px; padding: 32px 16px 32px; }
.ph-h { margin-bottom: 4px !important; font-size: 16px; font-weight: 700; }
.ph-suggest-icon { display: grid; place-items: center; width: 40px; height: 40px; flex: none; border-radius: 8px; background: var(--tint); color: var(--blue); }
.ph-suggest-name { flex: 1; min-width: 0; font-size: 15px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ph-count-line { font-size: 13px; color: var(--text2); }
.ph-result-sub { font-size: 12px; color: var(--text2); }
.ph-no-results { display: flex; flex-direction: column; align-items: center; gap: 12px; padding-top: 48px; text-align: center; }
.ph-no-title { font-size: 22px; font-weight: 700; }
.ph-no-hint { font-size: 14px; color: var(--text2); }
.ph-no-results .ph-primary { margin-top: 12px; }

/* service details */
.ph-detail { display: flex; flex-direction: column; padding: 16px 16px 32px; }
.ph-detail-card { margin-bottom: 16px; padding: 16px; border-radius: 20px; background: #fff; }
.ph-detail-title { display: flex; align-items: center; gap: 12px; }
.ph-detail-title p { flex: 1; font-size: 20px; font-weight: 700; line-height: 1.3; text-align: right; }
.ph-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 16px; }
.ph-tag { display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border-radius: 999px; background: var(--orange-tint); color: var(--orange); font-size: 12px; font-weight: 600; }
.ph-segments { display: flex; padding: 4px; border-radius: 999px; background: #edeef0; }
.ph-segments button { flex: 1; padding: 12px 0; border-radius: 999px; text-align: center !important; font-size: 14px; font-weight: 600; color: var(--text2) !important; transition: background 0.18s, color 0.18s; }
.ph-segments button.on { background: var(--blue); color: #fff !important; }
.ph-desc { padding: 16px; border-radius: 16px; background: #fff; font-size: 14px; line-height: 1.6; color: var(--text2); }
.ph-included { margin: 16px 0 8px !important; font-size: 15px; font-weight: 700; color: var(--text); }
.ph-condition { display: flex; gap: 8px; margin-top: 8px !important; }
.ph-condition .iconify, .ph-condition > span:first-child { flex: none; margin-top: 2px; }
.ph-doc { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 12px; border-radius: 16px; background: #fff; border: 1px solid var(--divider); font-size: 14px; font-weight: 600; }
.ph-doc-icon { display: grid; place-items: center; width: 36px; height: 36px; flex: none; border-radius: 8px; background: rgb(36 100 234 / 0.1); color: var(--blue); }
.ph-buybar { flex: none; display: flex; gap: 8px; padding: 16px 16px 42px; background: #fff; border-top: 1px solid var(--divider); }
.ph-buybar > button { flex: 1; padding: 0 8px; }

/* company formation */
.ph-cf { background: linear-gradient(to bottom right, #f7e7d6 0%, #edeff8 45%, #bfcdf3 100%); }
.ph-cf-header { flex: none; display: flex; align-items: center; justify-content: space-between; padding: 63px 16px 12px; }
.ph-cf-title { display: flex; align-items: center; gap: 6px; font-size: 17px; font-weight: 700; color: var(--blue); }
.ph-cf-body { padding: 8px 16px 24px; text-align: center; }
.ph-video { display: block; width: 100%; padding: 12px; border-radius: 16px; background: #fff; }
.ph-video-area { display: grid; place-items: center; aspect-ratio: 16 / 9; border-radius: 12px; background: var(--page); color: var(--muted); }
.ph-connectors { position: relative; height: 34px; }
.ph-connectors i { position: absolute; top: 0; bottom: 0; left: 18%; border-left: 2px dashed var(--blue); }
.ph-connectors i + i { left: 82%; }
.ph-hint-pill { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; border-radius: 16px; background: #fff; color: var(--blue); font-size: 14px; font-weight: 700; }
.ph-cf-headline { margin-top: 20px !important; font-size: 24px; font-weight: 800; line-height: 1.25; }
.ph-cf-sub { margin-top: 8px !important; font-size: 14px; line-height: 1.55; color: var(--text2); }
.ph-bullets { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; padding: 16px; border-radius: 16px; background: #fff; text-align: start; }
.ph-bullets p { display: flex; align-items: center; gap: 10px; font-size: 14px; }
.ph-bullets img { width: 30px; height: 30px; flex: none; }
.ph-cf-cta { flex: none; padding: 12px 16px 42px; }
.ph-cf-cta .ph-primary { width: 100%; }

/* toast */
.ph-toast { position: absolute; inset-inline: 24px; bottom: 124px; z-index: 25; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 16px; border-radius: 16px; background: var(--navy); color: #fff; font-size: 14px; font-weight: 600; box-shadow: var(--float-shadow); }

/* transitions */
.ph-push-enter-active, .ph-push-leave-active, .ph-pop-enter-active, .ph-pop-leave-active { transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s; }
.ph-push-enter-from { transform: translateX(100%); z-index: 2; }
.ph-push-leave-to { transform: translateX(-30%); opacity: 0.6; }
.ph-pop-enter-from { transform: translateX(-30%); opacity: 0.6; }
.ph-pop-leave-active { z-index: 2; }
.ph-pop-leave-to { transform: translateX(100%); }
.ph-rtl .ph-push-enter-from, .ph-rtl .ph-pop-leave-to { transform: translateX(-100%); }
.ph-rtl .ph-push-leave-to, .ph-rtl .ph-pop-enter-from { transform: translateX(30%); }
.ph-push-enter-active { box-shadow: -8px 0 24px rgb(0 0 0 / 0.08); }
.ph-tab-enter-active, .ph-tab-leave-active, .ph-fade-enter-active, .ph-fade-leave-active { transition: opacity 0.2s; }
.ph-tab-enter-from, .ph-tab-leave-to, .ph-fade-enter-from, .ph-fade-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .ph-root *, .ph-root { transition-duration: 0s !important; }
}
</style>
