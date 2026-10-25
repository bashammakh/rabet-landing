<script setup lang="ts">
// Badge + two-tone title + optional lead text, used at the top of most sections.
withDefaults(defineProps<{
  badge: string
  align?: 'center' | 'start'
  dark?: boolean
}>(), { align: 'center', dark: false })
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto text-center' : 'text-center lg:text-start'">
    <LandingSectionBadge :label="badge" :dark="dark" />
    <h2
      class="mt-4 text-[1.625rem] font-semibold leading-tight lg:mt-6 lg:text-[2.75rem] lg:leading-[1.25]"
      :class="dark ? 'text-white' : 'text-navy-900'"
    >
      <slot name="title" />
    </h2>
    <div
      v-if="$slots.default"
      class="mt-4 space-y-2 text-[0.8125rem] leading-normal lg:leading-relaxed lg:mt-6 lg:text-[1.0625rem]"
      :class="[dark ? 'text-white/70' : 'text-(--ui-text)', align === 'center' && 'mx-auto max-w-[61.25rem]']"
    >
      <slot />
    </div>
  </div>
</template>
