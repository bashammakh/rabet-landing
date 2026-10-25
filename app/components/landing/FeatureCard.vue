<script setup lang="ts">
defineProps<{ item: { key: string, icon: string }, horizontal?: boolean }>()
const { t } = useI18n()
</script>

<template>
  <article
    class="rounded-2xl border-4 border-rabet-50 bg-white p-4 shadow-[0_0.5rem_1.875rem_-0.75rem_rgb(18_26_43/0.12)] lg:p-[1.125rem]"
    :class="horizontal && 'flex items-start gap-4'"
  >
    <img :src="item.icon" alt="" width="100" height="100" class="size-10 shrink-0 lg:size-[3.125rem]">
    <div :class="!horizontal && 'mt-4'">
      <h3 class="text-sm font-medium text-navy-900 lg:text-base">{{ t(`features.items.${item.key}.title`) }}</h3>
      <p class="mt-1.5 text-xs leading-relaxed lg:text-[0.8125rem]">{{ t(`features.items.${item.key}.text`) }}</p>
    </div>
  </article>
</template>
