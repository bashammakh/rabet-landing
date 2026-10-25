<script setup lang="ts">
const { t } = useI18n()

const items = [
  { icon: '/images/features/company.png', tone: 'blue' },
  { icon: '/images/features/licensing.png', tone: 'orange' },
  { icon: '/images/features/tracking.png', tone: 'blue' },
  { icon: '/images/features/news.png', tone: 'orange' },
] as const
</script>

<template>
  <section class="relative overflow-hidden py-10 lg:py-12 lg:pb-32">
    <div class="bg-grid pointer-events-none absolute start-0 top-0 hidden size-72 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)] lg:block rtl:[mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />
    <div class="bg-grid pointer-events-none absolute end-0 top-0 hidden size-72 [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)] lg:block rtl:[mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />

    <div class="container-x relative">
      <LandingSectionHead :badge="t('why.badge')">
        <template #title>
          <span class="mx-auto block max-w-[35rem]">{{ t('why.title') }} <span class="text-primary">{{ t('why.highlight') }}</span></span>
        </template>
        <p>{{ t('why.text') }}</p>
      </LandingSectionHead>

      <LandingDivider class="my-6 lg:my-20" />

      <LandingCardRow :items="items.map((it, i) => ({ ...it, i }))" grid-class="lg:grid-cols-4">
        <template #item="{ item }">
          <article
            class="relative h-full overflow-hidden rounded-3xl border border-neutral-100 bg-white p-5 shadow-[0_0.625rem_2.5rem_-0.75rem_rgb(18_26_43/0.12)] lg:p-9"
          >
            <div
              class="pointer-events-none absolute -end-10 -top-10 size-64 rounded-full blur-2xl"
              :class="item.tone === 'blue' ? 'bg-rabet-200/45' : 'bg-sun-200/45'"
            />
            <img src="/images/decor/shape-1.png" alt="" aria-hidden="true" class="pointer-events-none absolute -end-4 -top-4 w-28 opacity-70">
            <img :src="item.icon" alt="" width="140" height="140" class="relative size-14 lg:size-[4.375rem]">
            <h3 class="relative mt-5 text-base font-medium leading-snug text-navy-900 lg:mt-10 lg:text-[1.375rem]">
              {{ t(`why.items.${item.i}.title`) }}
            </h3>
            <p class="relative mt-3 text-xs leading-normal lg:leading-relaxed lg:text-[0.9375rem]">{{ t(`why.items.${item.i}.text`) }}</p>
          </article>
        </template>
      </LandingCardRow>
    </div>
  </section>
</template>
