<script setup lang="ts">
defineProps<{ label: string, dark?: boolean }>()
</script>

<template>
  <UBadge
    color="secondary"
    variant="soft"
    size="lg"
    class="gap-2 rounded-full px-4 py-2 text-sm font-medium text-sun-500 lg:text-base"
    :class="dark ? 'bg-white/10' : 'bg-sun-100/70'"
  >
    <template #leading>
      <svg viewBox="0 0 24 24" class="size-4 shrink-0 fill-current lg:size-5" aria-hidden="true">
        <path d="M12 0c.9 6.5 5.5 11.1 12 12-6.5.9-11.1 5.5-12 12-.9-6.5-5.5-11.1-12-12C6.5 11.1 11.1 6.5 12 0Z" />
      </svg>
    </template>
    {{ label }}
  </UBadge>
</template>
