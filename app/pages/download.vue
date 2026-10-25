<script setup lang="ts">
// Target of the QR code and every "Download" button: phones go straight to
// their store, everyone else gets both badges.
const { t } = useI18n()
const localePath = useLocalePath()
const { rabet } = useRabet()

useSeoMeta({ title: () => `${t('download.title')} | Rabet`, robots: 'noindex' })

// Until we know, assume a computer: on a phone the redirect replaces the page anyway.
const redirecting = ref(false)
onMounted(() => {
  const store = phoneStore()
  if (!store) return
  redirecting.value = true
  window.location.replace(store === 'ios' ? rabet.appStoreUrl : rabet.playStoreUrl)
})
</script>

<template>
  <main class="grid min-h-svh place-items-center bg-page px-5 py-16">
    <div class="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-[0_1.25rem_3.75rem_-1.5625rem_rgb(18_26_43/0.25)] sm:p-10">
      <img src="/images/brand/logo.png" :alt="t('common.logoAlt')" width="190" height="42" class="mx-auto h-10 w-auto">
      <h1 class="mt-8 text-2xl font-semibold text-navy-900">{{ t('download.title') }}</h1>
      <p class="mt-3 text-sm leading-relaxed">{{ redirecting ? t('download.text') : t('download.computerText') }}</p>
      <LandingStoreBadges class="mt-8 justify-center" />
      <UButton
        :to="localePath('/')"
        :label="t('download.back')"
        variant="link"
        color="neutral"
        icon="i-lucide-arrow-left"
        class="mt-8 [&_.iconify]:rtl:-scale-x-100"
      />
    </div>
  </main>
</template>
