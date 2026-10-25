<script setup lang="ts">
const { t } = useI18n()
const { downloadTo } = useRabet()

// Desktop layout is drawn on a 1680×560 canvas, positioned in percentages so
// the wave, hexagons and text stay aligned at any width ≥ lg.
const steps = [
  { icon: '/images/steps/account.svg', hex: { x: 260, y: 420 }, text: { x: 60, y: 140 } },
  { icon: '/images/steps/request.svg', hex: { x: 840, y: 68 }, text: { x: 676, y: 300 } },
  { icon: '/images/steps/track.svg', hex: { x: 1327, y: 258 }, text: { x: 1252, y: 370 } },
].map((s, i) => ({ ...s, i }))

const W = 1680
const H = 560
const pct = (v: number, of: number) => `${(v / of) * 100}%`
const wave = 'M0 330 C120 390,180 425,260 420 C520 410,600 68,840 68 C1080 68,1150 280,1327 258 C1460 242,1520 110,1680 110'
</script>

<template>
  <section class="relative overflow-hidden py-10 lg:py-[7.5rem]">
    <div class="bg-grid pointer-events-none absolute start-0 top-0 size-80 bg-sun-50/60 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)] rtl:[mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />
    <div class="bg-grid pointer-events-none absolute end-0 top-0 size-80 bg-rabet-50/60 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)] rtl:[mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />

    <div class="container-x relative">
      <LandingSectionHead :badge="t('steps.badge')">
        <template #title>
          {{ t('steps.title') }} <span class="text-primary max-lg:block">{{ t('steps.highlight') }}</span>
        </template>
        <p>{{ t('steps.text') }}</p>
      </LandingSectionHead>
      <div class="mt-6 text-center lg:mt-10">
        <LandingCta :label="t('steps.cta')" :to="downloadTo" size="md" />
      </div>

      <!-- desktop: the wave -->
      <div class="relative mt-16 hidden aspect-[1680/560] lg:block rtl:-scale-x-100">
        <svg class="absolute inset-0 size-full" :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="wave-fade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stop-color="#d4d6dc" stop-opacity="0" />
              <stop offset="0.08" stop-color="#d4d6dc" />
              <stop offset="0.9" stop-color="#d4d6dc" />
              <stop offset="1" stop-color="#d4d6dc" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="wave" fill="none" stroke="url(#wave-fade)" stroke-width="9" stroke-dasharray="2.5 5" />
        </svg>

        <template v-for="s in steps" :key="s.i">
          <img
            :src="s.icon"
            alt=""
            aria-hidden="true"
            width="134"
            height="147"
            class="absolute w-[8%] -translate-x-1/2 -translate-y-1/2 rtl:-scale-x-100"
            :style="{ left: pct(s.hex.x, W), top: pct(s.hex.y, H) }"
          >
          <!-- text is un-mirrored back inside the flipped canvas -->
          <div
            class="absolute w-[25%] rtl:-scale-x-100"
            :style="{ left: pct(s.text.x, W), top: pct(s.text.y, H) }"
          >
            <div class="relative">
              <span class="text-ghost pointer-events-none absolute -top-24 end-4 text-[8.75rem] font-bold leading-none" aria-hidden="true">{{ s.i + 1 }}</span>
              <h3 class="relative max-w-[16.25rem] text-[1.375rem] font-medium leading-snug text-navy-900">{{ t(`steps.items.${s.i}.title`) }}</h3>
              <p class="relative mt-4 text-[0.9375rem] leading-relaxed">{{ t(`steps.items.${s.i}.text`) }}</p>
            </div>
          </div>
        </template>
      </div>

      <!-- mobile: cards -->
      <LandingCardRow :items="steps" class="mt-8 lg:hidden">
        <template #item="{ item }">
          <article class="relative h-full overflow-hidden rounded-3xl border border-neutral-100 bg-white p-5 shadow-[0_0.625rem_2.5rem_-0.75rem_rgb(18_26_43/0.12)]">
            <img :src="item.icon" alt="" aria-hidden="true" class="absolute -end-3 -top-3 w-16 opacity-60">
            <span class="text-ghost pointer-events-none absolute bottom-6 end-6 text-[5.625rem] font-bold leading-none" aria-hidden="true">{{ item.i + 1 }}</span>
            <h3 class="relative max-w-[13.75rem] text-base font-medium leading-snug text-navy-900">{{ t(`steps.items.${item.i}.title`) }}</h3>
            <p class="relative mt-3 max-w-[16.25rem] text-xs leading-normal lg:text-[0.9375rem] lg:leading-relaxed">{{ t(`steps.items.${item.i}.text`) }}</p>
          </article>
        </template>
      </LandingCardRow>
    </div>
  </section>
</template>
