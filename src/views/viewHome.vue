<template>

 <SectionHomeWelcome></SectionHomeWelcome> 
 <SectionHomeServices></SectionHomeServices>
<SectionHomeAboutUs></SectionHomeAboutUs>
<SectionHomeApproach></SectionHomeApproach>
<SectionHomeContact></SectionHomeContact>
</template>

<script  setup lang="ts">
import SectionHomeAboutUs from '../components/SectionHome/sectionHomeAboutUs.vue';
import SectionHomeApproach from '../components/SectionHome/sectionHomeApproach.vue';
import SectionHomeContact from '../components/SectionHome/sectionHomeContact.vue';
import SectionHomeServices from '../components/SectionHome/sectionHomeServices.vue';
import SectionHomeWelcome from '../components/SectionHome/sectionHomeWelcome.vue';
</script>

<style scoped>
.html-demo {
  display: grid;
  gap: 0.5rem;
}

.form-demo {
  display: grid;
  gap: 0.75rem;
  max-width: 400px;
}
.form-demo label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}
</style>
