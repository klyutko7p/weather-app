<template>
  <div class="container mx-auto">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

</script>

<style>

</style>
