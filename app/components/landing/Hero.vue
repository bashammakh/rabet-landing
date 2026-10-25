<script setup lang="ts">
const { t } = useI18n()
const { downloadTo } = useRabet()

const statuses = [
  { key: 'completed', icon: 'i-lucide-check', state: 'done' },
  { key: 'progress', icon: 'i-lucide-loader', state: 'current' },
  { key: 'review', icon: 'i-lucide-eye', state: 'next' },
  { key: 'submitted', icon: 'i-lucide-file-text', state: 'next' },
] as const
</script>

<template>
  <section id="top" class="relative overflow-hidden">
    <!-- faint grid along the bottom edge -->
    <div class="bg-grid pointer-events-none absolute inset-x-0 bottom-0 h-40 [mask-image:linear-gradient(to_top,black,transparent)]" />

    <div class="container-x relative grid items-center gap-10 pt-8 lg:min-h-[calc(100svh-6.875rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6 lg:pt-0">
      <!-- copy -->
      <div class="relative z-10 text-center lg:py-24 lg:text-start">
        <p class="text-lg text-(--ui-text) lg:text-[1.875rem] lg:leading-tight">{{ t('hero.eyebrow') }}</p>
        <h1 class="mt-1 text-[1.625rem] leading-tight text-navy-900 sm:text-4xl lg:mt-3 lg:text-[3.125rem] lg:leading-[1.3]">
          <span class="block font-normal">{{ t('hero.line1') }}</span>
          <span class="block font-semibold">
            {{ t('hero.line2') }} <span class="text-primary">{{ t('hero.highlight') }}</span>
          </span>
        </h1>
        <div class="mx-auto mt-5 max-w-[37.5rem] space-y-3 text-[0.8125rem] leading-normal lg:leading-relaxed lg:mx-0 lg:mt-8 lg:text-[1.0625rem]">
          <p>{{ t('hero.p1') }}</p>
          <p>{{ t('hero.p2') }}</p>
        </div>

        <LandingCta :label="t('hero.cta')" :to="downloadTo" class="mt-6 lg:mt-10" />

        <p class="mt-8 text-sm font-medium uppercase text-sun-500 lg:mt-12 lg:text-base">{{ t('hero.downloadNow') }}</p>
        <LandingStoreBadges class="mt-4 justify-center lg:justify-start" />
      </div>

      <!-- visual -->
      <div class="relative -mx-5 h-[28.75rem] sm:mx-0 sm:h-[35rem] lg:h-[53.75rem] lg:self-end">
        <!-- glows -->
        <div class="absolute start-[8%] top-[6%] size-[70%] rounded-full bg-[radial-gradient(circle,rgb(246_148_29/0.4),transparent_65%)] blur-2xl" />
        <div class="absolute -end-[10%] bottom-0 size-[80%] rounded-full bg-[radial-gradient(circle,rgb(36_100_234/0.28),transparent_65%)] blur-2xl" />
        <img src="/images/decor/shape-2.png" alt="" class="absolute start-[22%] top-[22%] w-24 opacity-90 lg:w-44" aria-hidden="true">
        <img src="/images/decor/shape-1.png" alt="" class="absolute bottom-[8%] end-[2%] w-24 opacity-80 lg:w-48" aria-hidden="true">
        <img
          src="/images/hero/skyline.webp"
          alt=""
          aria-hidden="true"
          class="absolute end-0 top-[22%] w-[70%] opacity-90 [mask-image:linear-gradient(to_bottom,black_70%,transparent)] lg:-end-[14%] lg:top-[4%] lg:w-[60%]"
        >

        <!-- The photo's screen is replaced by a clickable copy of the app once
             the page is running (LandingPhoneApp). The overlay box is the
             screen's measured position in the 632×880 image. -->
        <div class="absolute bottom-0 start-1/2 aspect-[632/880] h-full -translate-x-[35%] rtl:translate-x-[65%] lg:start-[49%] lg:-translate-x-1/2 lg:rtl:translate-x-1/2">
          <img
            src="/images/hero/phone-hand.webp"
            alt=""
            width="632"
            height="880"
            fetchpriority="high"
            class="absolute inset-0 size-full object-contain"
          >
          <div class="absolute left-[14.32%] top-[1.307%] h-[76.19%] w-[48.73%]">
            <ClientOnly>
              <LazyLandingPhoneApp />
            </ClientOnly>
          </div>
          <p class="pointer-events-none absolute left-[38.7%] top-[80%] flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-navy-900/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg lg:text-sm">
            <UIcon name="i-lucide-pointer" class="size-3.5 lg:size-4" />
            {{ t('phone.hint') }}
          </p>
        </div>
        <img
          src="/images/hero/verified.png"
          alt=""
          aria-hidden="true"
          class="pointer-events-none absolute start-[6%] top-[18%] w-16 animate-[float_6s_ease-in-out_infinite] sm:start-[12%] lg:start-[6%] lg:top-[20%] lg:w-[6.875rem]"
        >

        <!-- floating tracker card -->
        <div
          class="absolute bottom-[13%] start-[-18%] z-10 hidden w-[22.5rem] rounded-3xl border-4 border-rabet-50 bg-white p-6 shadow-[0_1.5rem_3.75rem_-1.25rem_rgb(18_26_43/0.25)] lg:block"
        >
          <p class="text-lg font-medium leading-snug text-navy-900">{{ t('hero.trackTitle') }}</p>
          <ol class="relative mt-5 grid grid-cols-4">
            <span class="absolute inset-x-[12%] top-[1.0625rem] h-1 rounded-full bg-gradient-to-r from-rabet-200 via-primary to-primary rtl:bg-gradient-to-l" aria-hidden="true" />
            <li v-for="s in statuses" :key="s.key" class="relative flex flex-col items-center gap-2 text-center">
              <span
                class="grid size-9 place-items-center rounded-full ring-4 ring-white"
                :class="{
                  'bg-rabet-200 text-white': s.state === 'done',
                  'bg-primary text-white': s.state === 'current',
                  'border-2 border-primary bg-white text-primary': s.state === 'next',
                }"
              >
                <UIcon :name="s.icon" class="size-4" :class="s.state === 'current' && 'animate-spin [animation-duration:3s]'" />
              </span>
              <span class="text-xs leading-tight text-navy-900">{{ t(`hero.status.${s.key}`) }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
</style>
