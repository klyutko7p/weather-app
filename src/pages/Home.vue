<template>
    <div>
        <Credits :title="title"></Credits>
        <MainButton class="text-center mt-10" @click="$router.push('/search')">Explore the weather</MainButton>
    </div>
</template>

<script setup lang="ts">
import Credits from '@/components/Credits.vue';
import MainButton from '@/components/UI/MainButton.vue';
let title = "Weather App"

</script>

<style scoped>

</style>