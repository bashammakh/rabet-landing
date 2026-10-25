<script setup lang="ts">
const { t } = useI18n()
const { downloadTo } = useRabet()
</script>

<template>
  <section class="relative overflow-hidden">
    <img
      src="/images/decor/tracking-bg.webp"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 size-full object-cover object-[70%_center] rtl:-scale-x-100"
    >
    <!-- keep the copy readable: white wash from the start side (top on mobile) -->
    <div class="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-white/40 lg:bg-gradient-to-r lg:from-white/85 lg:via-white/35 lg:to-transparent rtl:lg:bg-gradient-to-l" />
    <div class="pointer-events-none absolute end-[22%] -top-[12%] hidden size-[32.5rem] rounded-full bg-[radial-gradient(circle,rgb(36_100_234/0.35),transparent_65%)] lg:block" />
    <img src="/images/decor/shape-3.png" alt="" aria-hidden="true" class="absolute end-[33%] top-[8%] hidden w-44 opacity-80 lg:block">

    <div class="container-x relative grid items-center gap-10 py-10 lg:grid-cols-[1fr_37.5rem] lg:py-[8.75rem]">
      <div class="text-center lg:text-start">
        <LandingSectionHead :badge="t('tracking.badge')" align="start">
          <template #title>
            <span class="block">{{ t('tracking.title') }}</span>
            <span class="block text-primary">{{ t('tracking.highlight') }}</span>
          </template>
          <div class="max-w-[37.5rem] space-y-2 lg:max-w-[37.5rem]">
            <p>{{ t('tracking.p1') }}</p>
            <p>{{ t('tracking.p2') }}</p>
          </div>
        </LandingSectionHead>
        <LandingCta :label="t('tracking.cta')" :to="downloadTo" size="md" class="mt-6 lg:mt-10" />
      </div>

      <div class="rounded-[1.75rem] border border-white/70 bg-white/45 p-2.5 shadow-[0_1.25rem_3.75rem_-1.5625rem_rgb(18_26_43/0.35)] backdrop-blur-xl">
        <p class="rounded-[1.25rem] bg-white px-6 py-3.5 text-center text-base font-medium text-navy-900 lg:py-5 lg:text-[1.375rem]">
          {{ t('tracking.cardTitle') }}
        </p>
        <ul class="space-y-3.5 px-2 py-5 lg:space-y-6 lg:py-7 lg:px-4">
          <li v-for="(_, i) in 5" :key="i" class="flex items-center gap-3 text-xs font-medium text-navy-900 sm:text-sm lg:text-base">
            <span class="flex shrink-0 items-center" aria-hidden="true">
              <span class="size-1.5 rounded-full bg-navy-900" />
              <span class="h-px w-3 bg-navy-900" />
              <span class="grid size-6 place-items-center rounded-full bg-rabet-100 text-primary">
                <UIcon name="i-lucide-arrow-right" class="size-3.5 rtl:-scale-x-100" />
              </span>
            </span>
            {{ t(`tracking.points.${i}`) }}
          </li>
        </ul>
        <p class="rounded-[1.25rem] bg-sun-500 px-4 py-4 text-center text-sm font-medium italic text-white lg:py-5 lg:text-base xl:text-[1.0625rem]">
          {{ t('tracking.cardFooter') }}
        </p>
      </div>
    </div>
  </section>
</template>
