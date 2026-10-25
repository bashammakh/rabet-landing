<script setup lang="ts">
const { t } = useI18n()
const { downloadTo } = useRabet()

const steps = [
  { art: '/images/setup/investor.svg', tone: 'blue' },
  { art: '/images/setup/activity.svg', tone: 'orange' },
  { art: '/images/setup/requirements.svg', tone: 'blue' },
  { art: '/images/setup/formation.svg', tone: 'orange' },
].map((s, i) => ({ ...s, i }))

// Card centres on the 1680-wide desktop row (4 cards, 24px gaps).
const centres = [202, 627, 1053, 1478]
</script>

<template>
  <section id="setup" class="bg-page py-10 lg:py-[7.5rem]">
    <div class="container-x">
      <LandingSectionHead :badge="t('setup.badge')">
        <template #title>
          {{ t('setup.titleA') }} <span class="text-primary">{{ t('setup.highlight') }}</span>
          <br class="hidden lg:block"> {{ t('setup.titleB') }}
        </template>
        <p>{{ t('setup.p1') }}</p>
        <p>{{ t('setup.p2Before') }} <strong class="font-semibold text-navy-900">{{ t('setup.p2Strong') }}</strong> {{ t('setup.p2After') }}</p>
      </LandingSectionHead>

      <div class="mt-6 text-center lg:mt-10">
        <LandingCta :label="t('setup.cta')" :to="downloadTo" size="md" />
      </div>

      <!-- "How does it help" band -->
      <div class="relative -mx-5 mt-12 sm:mx-0 lg:mt-20">
        <h3 class="bg-gradient-to-r from-transparent via-rabet-50 to-transparent px-5 py-4 text-center text-base font-medium text-navy-900 lg:bg-rabet-50/80 lg:py-5 lg:text-[1.625rem]">
          {{ t('setup.helpTitle') }}
        </h3>

        <!-- desktop connectors from the band down to each card's ring -->
        <svg class="pointer-events-none absolute inset-x-0 top-full hidden h-[8.125rem] w-full overflow-visible lg:block" viewBox="0 0 1680 130" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="setup-edge" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stop-color="#7ea3f3" stop-opacity="0" />
              <stop offset="0.35" stop-color="#7ea3f3" />
              <stop offset="0.65" stop-color="#7ea3f3" />
              <stop offset="1" stop-color="#7ea3f3" stop-opacity="0" />
            </linearGradient>
          </defs>
          <g v-for="x in centres" :key="x">
            <!-- the band's edge lifts into a small bump over each dot -->
            <path
              :d="`M${x - 42} 0 H${x - 12} C${x - 7} 0, ${x - 7} -7.5, ${x} -7.5 C${x + 7} -7.5, ${x + 7} 0, ${x + 12} 0 H${x + 42}`"
              fill="none"
              stroke="url(#setup-edge)"
              stroke-width="1.5"
              vector-effect="non-scaling-stroke"
            />
            <circle :cx="x" cy="0.5" r="4" class="fill-navy-900" />
            <line :x1="x" y1="6" :x2="x" y2="120" stroke="#9aa0ad" stroke-dasharray="3 4" vector-effect="non-scaling-stroke" />
          </g>
        </svg>
        <!-- mobile: one connector -->
        <div class="flex flex-col items-center lg:hidden" aria-hidden="true">
          <span class="size-2 rounded-full bg-navy-900" />
          <span class="h-14 border-s border-dashed border-neutral-400" />
        </div>
      </div>

      <LandingCardRow :items="steps" arrows grid-class="lg:grid-cols-4 lg:mt-[7.375rem]">
        <template #item="{ item }">
          <article class="relative mx-auto h-full max-w-[26.25rem] pt-4">
            <!-- the card's top edge dips into a notch; the ring sits centred on the edge -->
            <svg class="absolute start-1/2 top-4 z-10 h-[1.375rem] w-[4.75rem] -translate-x-1/2 overflow-visible rtl:translate-x-1/2" viewBox="-38 0 76 22" aria-hidden="true">
              <defs>
                <linearGradient id="setup-notch-shade" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stop-color="#e2e3e8" stop-opacity="0" />
                  <stop offset="1" stop-color="#e2e3e8" />
                </linearGradient>
              </defs>
              <path d="M-38 -1 H38 V0 C30 0, 27 2, 22 8 C16 16, 10 20, 0 20 C-10 20, -16 16, -22 8 C-27 2, -30 0, -38 0 Z" class="fill-page" />
              <path d="M22 8 C16 16, 10 20, 0 20 C-10 20, -16 16, -22 8" fill="none" stroke="url(#setup-notch-shade)" stroke-width="2" />
            </svg>
            <span class="absolute start-1/2 top-0 z-10 size-8 -translate-x-1/2 rounded-full border-[0.4375rem] border-primary bg-white rtl:translate-x-1/2" aria-hidden="true" />
            <div class="relative h-full overflow-hidden rounded-3xl border-[0.3125rem] border-white bg-white p-6 pt-10 lg:p-7 lg:pt-12">
              <div
                class="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                :class="item.tone === 'blue' ? 'bg-gradient-to-b from-transparent to-rabet-50' : 'bg-gradient-to-b from-transparent to-sun-50'"
              />
              <img :src="item.art" alt="" aria-hidden="true" class="absolute end-0 top-0 size-24 lg:size-[6.875rem]">
              <p class="text-ghost relative text-[2.75rem] font-semibold leading-none lg:text-[3rem]">{{ String(item.i + 1).padStart(2, '0') }}</p>
              <h4 class="relative mt-6 max-w-[13.75rem] text-lg font-medium leading-snug text-navy-900 lg:mt-8 lg:text-[1.375rem]">
                {{ t(`setup.steps.${item.i}.title`) }}
              </h4>
              <p class="relative mt-3 text-xs leading-normal lg:leading-relaxed lg:text-[0.9375rem]">{{ t(`setup.steps.${item.i}.text`) }}</p>
            </div>
          </article>
        </template>
      </LandingCardRow>

      <!-- desktop: the four lines converge on the tagline -->
      <svg class="hidden h-[12.5rem] w-full lg:block" viewBox="0 0 1680 200" preserveAspectRatio="none" aria-hidden="true">
        <path
          v-for="x in centres"
          :key="x"
          :d="`M${x} 0 C${x} 140, 840 110, 840 200`"
          fill="none"
          stroke="#c5c8cf"
          stroke-width="1.2"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <p class="mx-auto mt-8 max-w-[18.75rem] text-center text-base font-medium italic text-sun-500 lg:mt-6 lg:max-w-none lg:text-lg">
        {{ t('setup.tagline') }}
      </p>
    </div>
  </section>
</template>
