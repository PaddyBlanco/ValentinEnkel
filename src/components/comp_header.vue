<template>
   <header>
      <nav>
         
      </nav>
    </header> 
</template>



<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const isContactPage = computed(() => route.path === '/kontakt');

</script>



<style scoped>

</style>


            