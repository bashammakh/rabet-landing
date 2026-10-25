<script setup lang="ts" generic="T">
// One set of cards, two layouts: a grid on desktop and a swipeable carousel
// below `lg`, as in the mobile design. Both render the same `#item` slot.
withDefaults(defineProps<{
  items: T[]
  gridClass?: string
  arrows?: boolean
  dark?: boolean
}>(), { gridClass: 'lg:grid-cols-4', arrows: false, dark: false })

defineSlots<{ item(props: { item: T, index: number }): any }>()
</script>

<template>
  <div>
    <div class="hidden gap-6 lg:grid" :class="gridClass">
      <slot v-for="(item, index) in items" :key="index" name="item" :item="item" :index="index" />
    </div>

    <UCarousel
      v-slot="{ item, index }"
      :items="items"
      :dots="!arrows"
      :arrows="arrows"
      :prev="{ color: 'neutral', variant: 'outline', size: 'lg' }"
      :next="{ color: 'neutral', variant: 'solid', size: 'lg' }"
      prev-icon="i-lucide-chevron-left"
      next-icon="i-lucide-chevron-right"
      class="lg:hidden"
      :class="arrows ? 'pb-0' : 'pb-10'"
      :ui="{
        viewport: 'overflow-visible sm:overflow-hidden',
        item: 'basis-full sm:basis-1/2 ps-4',
        dots: 'bottom-0 gap-2',
        dot: [
          'h-2.5 w-2.5 transition-all data-[state=active]:w-9',
          dark ? 'bg-white/30 data-[state=active]:bg-white' : 'bg-neutral-300 data-[state=active]:bg-navy-900',
        ].join(' '),
        arrows: 'mt-6 flex justify-center gap-4',
        prev: 'static translate-y-0 rounded-full bg-white rtl:[&_svg]:-scale-x-100',
        next: 'static translate-y-0 rounded-full bg-navy-900 rtl:[&_svg]:-scale-x-100',
      }"
    >
      <slot name="item" :item="item as T" :index="index" />
    </UCarousel>
  </div>
</template>
