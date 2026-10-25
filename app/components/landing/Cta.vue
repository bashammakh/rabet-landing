<script setup lang="ts">
// The design's pill button: label + a round badge holding a ↗ arrow.
// Only the blue button gets the white halo; on the dark Services band the
// white (light) one showed it as a grey border.
withDefaults(defineProps<{
  label: string
  to?: string
  light?: boolean
  size?: 'md' | 'lg'
}>(), { to: undefined, light: false, size: 'lg' })
</script>

<template>
  <UButton
    :to="to"
    :color="light ? 'neutral' : 'primary'"
    variant="solid"
    class="group whitespace-nowrap rounded-full font-medium"
    :class="[
      size === 'lg'
        ? 'gap-4 py-1 ps-5 pe-1 text-sm lg:gap-5 lg:py-1.5 lg:ps-6 lg:pe-1.5 lg:text-lg'
        : 'gap-3 py-1 ps-4 pe-1 text-[0.8125rem] lg:ps-5 lg:text-base',
      light ? 'bg-white text-navy-900 hover:bg-white/90' : 'bg-primary text-white hover:bg-rabet-700 shadow-[0_0_0_0.1875rem_rgb(255_255_255/0.6)]',
    ]"
  >
    {{ label }}
    <template #trailing>
      <span
        class="grid shrink-0 place-items-center rounded-full"
        :class="[size === 'lg' ? 'size-9 lg:size-10' : 'size-8 lg:size-9', light ? 'bg-primary text-white' : 'bg-white text-navy-900']"
      >
        <UIcon
          name="i-lucide-arrow-up-right"
          class="size-5 transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100"
        />
      </span>
    </template>
  </UButton>
</template>
