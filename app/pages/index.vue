<template>
  <div class="overflow-x-clip">
    <LandingHeader />
    <!-- data-nav: which header link lights up while that section is under the
         header. Sections with no link of their own join the closest topic;
         an empty value lights none. -->
    <main>
      <LandingHero data-nav="top" />
      <LandingWhyRabet data-nav="top" />
      <LandingBusinessSetup data-nav="setup" />
      <LandingServices data-nav="services" />
      <LandingTracking data-nav="services" />
      <LandingSteps data-nav="features" />
      <LandingAppFeatures data-nav="features" />
      <LandingAbout data-nav="about" />
      <LandingUpdates data-nav="" />
      <LandingFaq data-nav="faqs" />
      <LandingGetStarted data-nav="" />
    </main>
    <LandingFooter />
  </div>
</template>
