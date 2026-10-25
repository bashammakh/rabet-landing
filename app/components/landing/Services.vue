<script setup lang="ts">
const { t } = useI18n()
const { downloadTo } = useRabet()

const icons = ['company', 'registration', 'licensing', 'employees', 'platforms', 'investment']
// The design alternates the glow: even cards lit from the top, odd from the bottom (a checkerboard on 3 columns).
const items = icons.map((icon, i) => ({ icon: `/images/services/${icon}.svg`, i }))
</script>

<template>
  <section
    id="services"
    class="relative overflow-hidden bg-navy-900 bg-[radial-gradient(ellipse_70%_60%_at_25%_20%,#26324f_0%,transparent_70%)] py-10 text-white lg:py-[7.5rem]"
  >
    <div class="container-x relative">
      <LandingSectionHead :badge="t('services.badge')" dark>
        <template #title>
          <span class="mx-auto block max-w-[55rem] font-normal text-white/85">
            <span class="font-semibold text-white">{{ t('services.titleStrong') }}</span> {{ t('services.titleRest') }}
          </span>
        </template>
        <p class="mx-auto max-w-[50rem]">{{ t('services.text') }}</p>
        <p class="font-medium italic text-white">{{ t('services.note') }}</p>
      </LandingSectionHead>

      <div class="mt-6 text-center lg:mt-10">
        <LandingCta :label="t('services.cta')" :to="downloadTo" light size="md" />
      </div>

      <LandingCardRow :items="items" dark grid-class="lg:grid-cols-3 lg:gap-8" class="mt-10 lg:mt-20">
        <template #item="{ item }">
          <article
            class="relative h-full overflow-hidden rounded-3xl border border-white/10 from-white/[0.09] to-white/[0.02] px-5 py-6 text-center backdrop-blur-sm lg:px-14 lg:py-12"
            :class="item.i % 2 ? 'bg-gradient-to-t' : 'bg-gradient-to-b'"
          >
            <img src="/images/decor/shape-2.png" alt="" aria-hidden="true" class="pointer-events-none absolute -end-6 -top-6 w-28 opacity-[0.06]">
            <span class="mx-auto grid size-[4.375rem] place-items-center rounded-full ring-1 ring-sun-500/40 ring-offset-4 ring-offset-transparent">
              <img :src="item.icon" alt="" width="70" height="70" class="size-[4.375rem]">
            </span>
            <h3 class="mt-4 text-lg font-medium lg:mt-10 lg:text-2xl">{{ t(`services.items.${item.i}.title`) }}</h3>
            <p class="mt-3 text-xs leading-normal lg:leading-relaxed text-white/60 lg:text-[0.9375rem]">{{ t(`services.items.${item.i}.text`) }}</p>
          </article>
        </template>
      </LandingCardRow>
    </div>
  </section>
</template>
