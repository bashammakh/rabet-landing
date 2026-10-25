<script setup lang="ts">
const { t } = useI18n()
const { rabet, links, nav } = useRabet()
const year = new Date().getFullYear()

const important = computed(() => [
  { label: t('footer.privacy'), to: links.value.privacy },
  { label: t('footer.terms'), to: links.value.terms },
  { label: t('footer.help'), to: links.value.support },
])
</script>

<template>
  <footer class="relative overflow-hidden bg-navy-900 text-white">
    <div class="container-x pt-12 lg:pt-[4.5rem]">
      <div class="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:gap-8">
        <div>
          <img src="/images/brand/logo-white.png" :alt="t('common.logoAlt')" width="190" height="42" class="h-9 w-auto lg:h-[2.625rem]">
          <p class="mt-6 max-w-[21.25rem] text-[0.9375rem] leading-relaxed text-white/85 lg:mt-12">{{ t('footer.about') }}</p>
          <LandingStoreBadges light class="mt-6 lg:mt-8" />
        </div>

        <div class="grid grid-cols-2 gap-6 border-t border-white/10 pt-8 lg:contents lg:border-0 lg:pt-0">
          <div>
            <h2 class="text-base font-semibold uppercase lg:text-lg">{{ t('footer.quickLinks') }}</h2>
            <ul class="mt-4 space-y-2.5 text-[0.9375rem] text-white/85">
              <li v-for="item in nav" :key="item.key">
                <ULink :to="item.hash" class="transition hover:text-white" inactive-class="text-white/85">{{ t(`nav.${item.key}`) }}</ULink>
              </li>
              <li>
                <ULink :to="links.support" target="_blank" class="transition hover:text-white" inactive-class="text-white/85">{{ t('nav.contact') }}</ULink>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="text-base font-semibold uppercase lg:text-lg">{{ t('footer.importantLinks') }}</h2>
            <ul class="mt-4 space-y-2.5 text-[0.9375rem] text-white/85">
              <li v-for="l in important" :key="l.label">
                <ULink :to="l.to" target="_blank" class="transition hover:text-white" inactive-class="text-white/85">{{ l.label }}</ULink>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 class="text-base font-semibold uppercase lg:text-lg">{{ t('footer.follow') }}</h2>
          <div class="mt-4 flex gap-3 lg:gap-5">
            <UButton
              v-for="s in rabet.socials"
              :key="s.label"
              :to="s.to"
              target="_blank"
              :icon="s.icon"
              :aria-label="s.label"
              color="neutral"
              variant="ghost"
              class="size-10 justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 lg:size-[3.125rem] [&_.iconify]:size-5 lg:[&_.iconify]:size-6"
            />
          </div>
        </div>
      </div>

      <USeparator class="mt-10 lg:mt-14" :ui="{ border: 'border-white/10' }" />
      <p class="py-6 text-center text-sm text-white/85 lg:py-8 lg:text-base">{{ t('footer.rights', { year }) }}</p>
    </div>

    <img
      src="/images/brand/footer-wordmark.png"
      :alt="t('footer.wordmark')"
      width="3561"
      height="246"
      class="mx-auto -mb-[1.5%] block w-[calc(100%-2.5rem)] max-w-[111.25rem] opacity-90 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
    >
  </footer>
</template>
