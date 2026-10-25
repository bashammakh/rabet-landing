<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="about" class="py-10 lg:py-[7.5rem]">
    <div class="container-x">
      <div
        class="bg-grid-light relative overflow-hidden rounded-[1.75rem] bg-navy-900 px-5 py-12 text-center text-white lg:rounded-[2.5rem] lg:px-16 lg:py-[7.5rem]"
      >
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_10%,rgb(46_60_95/0.7),transparent_70%)]" />
        <div class="pointer-events-none absolute inset-x-[20%] -bottom-28 h-40 rounded-full bg-primary/40 blur-[5.625rem]" />

        <div class="relative">
          <LandingSectionBadge :label="t('about.badge')" dark />
          <h2 class="mt-4 text-[1.625rem] font-semibold leading-tight lg:mt-6 lg:text-[2.75rem]">
            <span class="inline-flex items-center gap-3">
              {{ t('about.title') }}
              <img src="/images/brand/abg-badge.png" :alt="t('about.abgAlt')" width="108" height="108" class="hidden size-[3.375rem] lg:inline-block">
            </span>
            <span class="mt-1 block font-normal text-white/85">{{ t('about.subtitle') }}</span>
          </h2>
          <p class="mx-auto mt-5 max-w-[75rem] text-[0.8125rem] leading-[1.75] text-white/60 lg:mt-8 lg:text-lg lg:leading-relaxed">
            {{ t('about.text') }}
          </p>

          <div class="relative mx-auto mt-8 max-w-[58.125rem] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-5 py-8 lg:mt-10 lg:px-24 lg:py-14">
            <img src="/images/decor/shape-3.png" alt="" aria-hidden="true" class="pointer-events-none absolute bottom-0 end-[5%] w-36 opacity-[0.06]">
            <h3 class="relative text-base font-medium lg:text-lg">{{ t('about.cardTitle') }}</h3>
            <p class="relative mt-3 text-xs leading-normal lg:leading-relaxed text-white/55 lg:text-base">{{ t('about.cardText') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
