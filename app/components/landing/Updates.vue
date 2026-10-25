<script setup lang="ts">
const { t } = useI18n()
const { downloadTo } = useRabet()
</script>

<template>
  <section class="relative overflow-hidden py-10 lg:pb-[7.5rem] lg:pt-10">
    <div class="pointer-events-none absolute -start-40 top-0 size-[38.75rem] rounded-full bg-[radial-gradient(circle,rgb(246_148_29/0.16),transparent_65%)]" />
    <div class="pointer-events-none absolute -end-40 bottom-0 size-[38.75rem] rounded-full bg-[radial-gradient(circle,rgb(36_100_234/0.22),transparent_65%)]" />
    <img src="/images/decor/shape-4.png" alt="" aria-hidden="true" class="pointer-events-none absolute -start-10 top-[10%] hidden w-40 lg:block">
    <img src="/images/decor/shape-5.png" alt="" aria-hidden="true" class="pointer-events-none absolute -end-6 bottom-[8%] hidden w-40 lg:block">

    <div class="container-x relative text-center">
      <LandingSectionBadge :label="t('updates.badge')" />
      <h2 class="mt-4 text-[1.625rem] font-semibold leading-tight text-navy-900 lg:mt-6 lg:text-[2.75rem] lg:leading-[1.25]">
        <span class="block text-primary">{{ t('updates.highlight') }}</span>
        <span class="mx-auto block max-w-[18.75rem] sm:max-w-none">{{ t('updates.title') }}</span>
      </h2>

      <LandingDivider class="my-6 lg:my-12" />

      <p class="mx-auto max-w-[67.5rem] text-[0.8125rem] leading-normal lg:leading-relaxed lg:text-[1.0625rem]">{{ t('updates.text') }}</p>
      <p class="mx-auto mt-5 max-w-[20rem] text-sm font-medium italic text-navy-900 sm:max-w-none lg:mt-8 lg:text-lg">{{ t('updates.tagline') }}</p>

      <LandingCta :label="t('updates.cta')" :to="downloadTo" size="md" class="mt-6 lg:mt-10" />
    </div>
  </section>
</template>
