<template>
    <HeaderComponent />
    <main>
           <router-view /> 
    </main>
    <FooterComponent />
</template>

<script setup lang="ts">
import FooterComponent from './components/comp_footer.vue';
import HeaderComponent from './components/comp_header.vue';
</script>

<style scoped>

</style>
