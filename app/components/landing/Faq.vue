<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const { t } = useI18n()

const items = computed<AccordionItem[]>(() =>
  Array.from({ length: 9 }, (_, i) => ({
    label: t(`faq.items.${i}.q`),
    content: t(`faq.items.${i}.a`),
  })),
)
</script>

<template>
  <section id="faqs" class="bg-page py-10 lg:py-[7.5rem]">
    <div class="container-x">
      <LandingSectionHead :badge="t('faq.badge')">
        <template #title>
          {{ t('faq.title') }} <span class="text-primary">{{ t('faq.highlight') }}</span>
        </template>
      </LandingSectionHead>

      <UAccordion
        :items="items"
        default-value="0"
        class="mx-auto mt-8 max-w-[81.25rem] lg:mt-20"
        :ui="{
          root: 'flex flex-col gap-3 lg:gap-5',
          item: 'rounded-2xl border-0 bg-white p-1.5',
          header: 'flex',
          trigger: 'gap-4 rounded-xl bg-gradient-to-r from-neutral-100 to-neutral-50 px-4 py-2.5 text-start text-[0.8125rem] font-medium text-navy-900 lg:px-5 lg:py-3.5 lg:text-lg rtl:bg-gradient-to-l',
          body: 'px-4 pb-4 pt-3 text-xs leading-normal lg:pt-4 lg:leading-relaxed text-(--ui-text) lg:px-5 lg:pb-5 lg:text-base lg:max-w-[71.875rem]',
        }"
      >
        <template #trailing="{ open }">
          <span
            class="ms-auto grid size-9 shrink-0 place-items-center rounded-lg transition-colors lg:size-11"
            :class="open ? 'bg-navy-900 text-white' : 'bg-neutral-100 text-navy-900'"
          >
            <UIcon :name="open ? 'i-lucide-minus' : 'i-lucide-plus'" class="size-4 lg:size-5" />
          </span>
        </template>
      </UAccordion>
    </div>
  </section>
</template>
