<script setup lang="ts">
withDefaults(defineProps<{
  light?: boolean
  stacked?: boolean
}>(), { light: false, stacked: false })

const { rabet } = useRabet()
</script>

<template>
  <div class="flex flex-wrap gap-4 lg:gap-7" :class="stacked && 'flex-col !gap-4'">
    <ULink
      :to="rabet.playStoreUrl"
      target="_blank"
      class="block rounded-xl transition hover:-translate-y-0.5 hover:opacity-90"
      :aria-label="$t('common.googlePlay')"
    >
      <img
        :src="light ? '/images/brand/google-play-light.png' : '/images/brand/google-play.png'"
        :alt="$t('common.googlePlay')"
        width="186"
        height="66"
        :class="light ? 'h-11 w-auto' : 'h-12 w-auto lg:h-[4.125rem]'"
      >
    </ULink>
    <ULink
      :to="rabet.appStoreUrl"
      target="_blank"
      class="block rounded-xl transition hover:-translate-y-0.5 hover:opacity-90"
      :aria-label="$t('common.appStore')"
    >
      <img
        :src="light ? '/images/brand/app-store-light.png' : '/images/brand/app-store.png'"
        :alt="$t('common.appStore')"
        width="186"
        height="66"
        :class="light ? 'h-11 w-auto' : 'h-12 w-auto lg:h-[4.125rem]'"
      >
    </ULink>
  </div>
</template>
