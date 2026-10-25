<script setup lang="ts">
const { t, locale } = useI18n()
const { links, downloadTo, nav } = useRabet()

const open = ref(false)
const active = ref<string | null>('top')

// Light up the link for the section sitting just under the header. Every
// section in <main> carries data-nav (see pages/index.vue), so sections without
// a link of their own don't leave the previous link lit.
onMounted(() => {
  const header = document.querySelector('header')
  const sections = [...document.querySelectorAll<HTMLElement>('main [data-nav]')]
  let frame = 0
  const update = () => {
    frame = 0
    const line = (header?.offsetHeight ?? 0) + 24
    let current: HTMLElement | undefined
    for (const section of sections) {
      if (section.getBoundingClientRect().top > line) break
      current = section
    }
    // The last section is too short to reach the header, so at the very
    // bottom of the page count it as the one in view.
    const root = document.documentElement
    if (window.scrollY + window.innerHeight >= root.scrollHeight - 2) current = sections.at(-1)
    active.value = current?.dataset.nav || null
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }
  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })
})

// The header only lives on the home page, so the switch is always / ↔ /ar.
// Nuxt UI links prefix internal paths with the *current* locale, so the toggle
// passes `:locale` — a plain path (or switchLocalePath) became /ar on /ar.
const otherLocale = computed(() => (locale.value === 'ar' ? 'en' : 'ar'))
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-transparent bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
    <div class="container-x flex h-[4.75rem] items-center justify-between gap-4 lg:h-[6.875rem]">
      <a href="#top" class="shrink-0" :aria-label="t('nav.home')">
        <img src="/images/brand/logo.png" :alt="t('common.logoAlt')" width="190" height="42" class="h-8 w-auto lg:h-[2.625rem]">
      </a>

      <nav class="hidden items-center gap-1 xl:flex" :aria-label="t('nav.menu')">
        <UButton
          v-for="item in nav"
          :key="item.key"
          :to="item.hash"
          :label="t(`nav.${item.key}`)"
          variant="ghost"
          color="neutral"
          class="rounded-full px-6 py-3 text-lg font-normal transition-colors"
          :class="active === item.hash.slice(1)
            ? 'bg-navy-900 text-white hover:bg-navy-900 active:bg-navy-900 focus-visible:bg-navy-900 font-medium'
            : 'text-(--ui-text) hover:bg-neutral-100 active:bg-neutral-100 focus-visible:bg-neutral-100'"
        />
        <UButton
          :to="links.support"
          target="_blank"
          :label="t('nav.contact')"
          variant="ghost"
          color="neutral"
          class="rounded-full px-4 py-3 text-lg font-normal text-(--ui-text) hover:bg-neutral-100 active:bg-neutral-100 focus-visible:bg-neutral-100"
        />
      </nav>

      <div class="flex items-center gap-2">
        <UButton
          to="/"
          :locale="otherLocale"
          :label="t('nav.language')"
          icon="i-lucide-languages"
          variant="ghost"
          color="neutral"
          class="hidden rounded-full hover:bg-transparent hover:text-primary active:bg-transparent focus-visible:bg-transparent sm:inline-flex"
          :lang="otherLocale"
        />
        <LandingCta :label="t('nav.download')" :to="downloadTo" size="md" />
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          size="lg"
          class="rounded-full xl:hidden"
          :aria-label="t('nav.menu')"
          @click="open = true"
        />
      </div>
    </div>

    <USlideover
      v-model:open="open"
      :side="locale === 'ar' ? 'left' : 'right'"
      :title="t('nav.menu')"
      :ui="{ content: 'max-w-xs', body: 'flex flex-col gap-1' }"
    >
      <template #title>
        <img src="/images/brand/logo.png" :alt="t('common.logoAlt')" class="h-8 w-auto">
      </template>
      <template #body>
        <UButton
          v-for="item in nav"
          :key="item.key"
          :to="item.hash"
          :label="t(`nav.${item.key}`)"
          variant="ghost"
          color="neutral"
          size="xl"
          class="justify-start rounded-xl"
          :class="active === item.hash.slice(1) && 'bg-navy-900 text-white hover:bg-navy-900'"
          @click="open = false"
        />
        <UButton
          :to="links.support"
          target="_blank"
          :label="t('nav.contact')"
          variant="ghost"
          color="neutral"
          size="xl"
          class="justify-start rounded-xl"
        />
        <USeparator class="my-3" />
        <UButton
          to="/"
          :locale="otherLocale"
          :label="t('nav.language')"
          icon="i-lucide-languages"
          variant="soft"
          color="neutral"
          size="xl"
          class="justify-start rounded-xl"
          :lang="otherLocale"
          @click="open = false"
        />
        <LandingStoreBadges class="mt-6" />
      </template>
    </USlideover>
  </header>
</template>
