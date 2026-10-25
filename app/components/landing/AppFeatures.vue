<script setup lang="ts">
const { t } = useI18n()
const { downloadTo } = useRabet()

const left = [
  { key: 'home', icon: '/images/app-features/home.png' },
  { key: 'setup', icon: '/images/app-features/setup-guide.png' },
  { key: 'requests', icon: '/images/app-features/requests.png' },
]
const right = [
  { key: 'services', icon: '/images/app-features/services.png' },
  { key: 'news', icon: '/images/app-features/news.png' },
]
const all = [left[0], left[1], left[2], right[0], right[1]] as { key: string, icon: string }[]

// Connectors: a dashed curve from a dot at each card's middle to an arrowhead on
// the phone. Where each arrow lands is a fraction of the phone's height, read off
// the design. Measured from the DOM, so card height and RTL both just work.
const landing: Record<string, number> = { home: 0.25, setup: 0.5, requests: 0.746, services: 0.385, news: 0.603 }
const stage = ref<HTMLElement>()
const phone = ref<HTMLImageElement>()
const box = ref({ w: 0, h: 0 })
const lines = ref<{ key: string, d: string, sx: number, sy: number }[]>([])

function measure() {
  if (!stage.value || !phone.value) return
  const s = stage.value.getBoundingClientRect()
  const p = phone.value.getBoundingClientRect()
  if (!p.width) return
  box.value = { w: s.width, h: s.height }
  const phoneMid = p.left + p.width / 2
  lines.value = [...stage.value.querySelectorAll<HTMLElement>('[data-connect]')].map((el) => {
    const c = el.getBoundingClientRect()
    const toRight = c.left + c.width / 2 < phoneMid
    const sx = (toRight ? c.right : c.left) - s.left
    const sy = c.top + c.height / 2 - s.top
    const gap = 6 // the arrow stops just short of the phone's frame
    const ex = (toRight ? p.left - gap : p.right + gap) - s.left
    const ey = p.top + p.height * (landing[el.dataset.connect!] ?? 0.5) - s.top
    const mid = (ex - sx) / 2
    return { key: el.dataset.connect!, sx, sy, d: `M${sx} ${sy} C${sx + mid} ${sy}, ${ex - mid} ${ey}, ${ex} ${ey}` }
  })
}

let ro: ResizeObserver | undefined
onMounted(() => {
  ro = new ResizeObserver(measure)
  if (stage.value) ro.observe(stage.value)
  phone.value?.addEventListener('load', measure)
  measure()
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <section id="features" class="relative overflow-hidden bg-page py-10 lg:py-[7.5rem]">
    <div class="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,43.75rem)_1fr]">
      <div class="text-center lg:text-start">
        <LandingSectionHead :badge="t('features.badge')" align="start">
          <template #title>
            <span class="block lg:max-w-[40rem]">{{ t('features.title') }} <span class="text-primary">{{ t('features.highlight') }}</span></span>
          </template>
          <div class="max-w-[37.5rem] space-y-2 max-lg:mx-auto">
            <p>{{ t('features.p1') }}</p>
            <p>{{ t('features.p2') }}</p>
          </div>
        </LandingSectionHead>
        <LandingCta :label="t('features.cta')" :to="downloadTo" size="md" class="mt-6 lg:mt-10" />
      </div>

      <!-- desktop: cards around the phone -->
      <div ref="stage" class="relative hidden items-center justify-between gap-4 lg:flex">
        <!-- the stand behind the phone -->
        <div class="pointer-events-none absolute inset-y-[-8.75rem] start-1/2 flex w-[3.75rem] -translate-x-1/2 flex-col gap-3 rtl:translate-x-1/2" aria-hidden="true">
          <span class="flex-1 bg-neutral-200/70" />
          <span class="h-3 bg-neutral-200/70" />
          <span class="flex-1 bg-neutral-200/70" />
        </div>

        <svg
          v-if="box.w"
          class="pointer-events-none absolute inset-0 z-20 size-full overflow-visible"
          :viewBox="`0 0 ${box.w} ${box.h}`"
          aria-hidden="true"
        >
          <defs>
            <marker id="feature-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
              <path d="M0 0 L8 4 L0 8 Z" fill="#1d2433" />
            </marker>
          </defs>
          <g v-for="l in lines" :key="l.key">
            <path :d="l.d" fill="none" stroke="#8a8f9c" stroke-width="1.2" stroke-dasharray="4 4" marker-end="url(#feature-arrow)" />
            <circle :cx="l.sx" :cy="l.sy" r="3" fill="#d3d6dd" />
          </g>
        </svg>

        <div class="relative z-10 flex w-[13.4375rem] shrink-0 flex-col gap-9">
          <LandingFeatureCard v-for="f in left" :key="f.key" :item="f" :data-connect="f.key" />
        </div>
        <span class="w-12 shrink-0" aria-hidden="true" />
        <img
          ref="phone"
          src="/images/app-features/phone-splash.webp"
          alt=""
          width="602"
          height="1242"
          class="relative z-10 w-[13.75rem] shrink-0 drop-shadow-xl xl:w-[18.75rem]"
        >
        <span class="w-12 shrink-0" aria-hidden="true" />
        <div class="relative z-10 flex w-[13.4375rem] shrink-0 flex-col gap-9">
          <LandingFeatureCard v-for="f in right" :key="f.key" :item="f" :data-connect="f.key" />
        </div>
      </div>

      <!-- mobile: phone, then the list -->
      <div class="lg:hidden">
        <img src="/images/app-features/phone-splash.webp" alt="" width="602" height="1242" class="mx-auto w-[15rem] drop-shadow-xl">
        <div class="mt-10 flex flex-col gap-4">
          <LandingFeatureCard v-for="f in all" :key="f.key" :item="f" horizontal />
        </div>
      </div>
    </div>
  </section>
</template>
