<script setup lang="ts">
import { renderSVG } from 'uqr'

const { t } = useI18n()
const { downloadPage } = useRabet()
const { public: { siteUrl } } = useRuntimeConfig()

// The QR code opens /download, which sends the phone to the right store.
// With NUXT_PUBLIC_SITE_URL set it renders on the server; otherwise it waits
// for the browser so it never encodes a build-time localhost address.
const origin = ref(siteUrl.replace(/\/$/, ''))
onMounted(() => {
  if (!origin.value) origin.value = window.location.origin
})
const qrSvg = computed(() =>
  origin.value
    ? renderSVG(`${origin.value}${downloadPage.value}`, { border: 0, ecc: 'M', blackColor: '#121A2B', whiteColor: '#ffffff' })
    : '',
)
</script>

<template>
  <section id="download" class="relative overflow-hidden pt-10 lg:pt-[7.5rem]">
    <div class="pointer-events-none absolute end-[12%] top-0 size-[31.25rem] rounded-full bg-[radial-gradient(circle,rgb(246_148_29/0.18),transparent_65%)]" />
    <div class="pointer-events-none absolute bottom-0 end-[30%] size-[32.5rem] rounded-full bg-[radial-gradient(circle,rgb(36_100_234/0.14),transparent_65%)]" />

    <div class="container-x relative grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,47.5rem)] lg:gap-6">
      <div class="pb-0 text-center lg:pb-[7.5rem] lg:text-start">
        <LandingSectionHead :badge="t('cta.badge')" align="start">
          <template #title>
            {{ t('cta.titleA') }} <span class="text-primary">{{ t('cta.highlight') }}</span>
          </template>
          <p class="max-w-[55rem] max-lg:mx-auto">{{ t('cta.text') }}</p>
          <p class="pt-2 font-medium italic text-navy-900 lg:pt-4">{{ t('cta.tagline') }}</p>
        </LandingSectionHead>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-5 lg:mt-12 lg:justify-start lg:gap-7">
          <LandingStoreBadges stacked />
          <ULink
            :to="downloadPage"
            class="grid size-[7.5rem] place-items-center rounded-2xl border-4 border-neutral-200 bg-white p-3 lg:size-[9.375rem]"
            :aria-label="t('cta.qrAlt')"
          >
            <!-- eslint-disable-next-line vue/no-v-html -- SVG generated locally by uqr -->
            <span v-if="qrSvg" class="block size-full [&>svg]:size-full" role="img" :aria-label="t('cta.qrAlt')" v-html="qrSvg" />
            <span v-else class="block size-full animate-pulse rounded-lg bg-neutral-100" />
          </ULink>
          <div class="flex items-center gap-4 max-lg:basis-full max-lg:justify-center">
            <img src="/images/download/arrow.png" alt="" aria-hidden="true" width="123" height="85" class="hidden w-16 lg:block rtl:-scale-x-100">
            <p class="max-w-[12.5rem] text-sm italic text-(--ui-text) max-lg:max-w-none">{{ t('cta.scan') }}</p>
          </div>
        </div>
      </div>

      <!-- two phones, cut off by the footer -->
      <div class="relative mx-auto h-[18.75rem] w-full max-w-[25rem] sm:h-[26.25rem] sm:max-w-[35rem] lg:h-[37.5rem] lg:max-w-none">
        <div class="bg-grid absolute end-[38%] top-0 size-60 [mask-image:radial-gradient(circle,black,transparent_70%)] lg:size-72" />
        <img
          src="/images/download/phone-back.webp"
          alt=""
          width="780"
          height="878"
          class="absolute bottom-0 start-0 w-[50%] lg:start-[12%] lg:w-[47%]"
        >
        <img
          src="/images/download/phone-front.webp"
          alt=""
          width="780"
          height="1198"
          class="absolute bottom-0 end-0 w-[52%] lg:end-0 lg:w-[52%]"
        >
      </div>
    </div>
  </section>
</template>
