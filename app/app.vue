<script setup lang="ts">
import { ar, en } from '@nuxt/ui/locale'

const { locale, t } = useI18n()
const i18nHead = useLocaleHead()

// Nuxt UI reads its direction (carousel, accordion icons…) from this locale.
const uiLocale = computed(() => (locale.value === 'ar' ? ar : en))

useHead({
  htmlAttrs: {
    lang: () => i18nHead.value.htmlAttrs.lang,
    dir: () => i18nHead.value.htmlAttrs.dir,
  },
  link: () => i18nHead.value.link,
  meta: () => i18nHead.value.meta,
})

useSeoMeta({
  title: () => t('meta.title'),
  description: () => t('meta.description'),
  ogTitle: () => t('meta.title'),
  ogDescription: () => t('meta.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtPage />
  </UApp>
</template>
