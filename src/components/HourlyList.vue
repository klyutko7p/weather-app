<template>
    <h1 class="text-4xl mb-2 font-bold">Hourly weather</h1>
    <hr class="mb-12">
    <Carousel :breakpoints="breakpoints" :items-to-show="6" :items-to-scroll="6" class="w-full">
        <Slide v-for="(hour, index) in hourlyArray" :key="index" class="inline-block">
            <h1 class="mb-5 text-2xl font-semibold">{{
                new Date(hour.time).toLocaleString("en-EN", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric"
                })
            }}</h1>
            <div class="bg-[#374151] rounded-full w-20 text-center mx-auto py-3 border-4 border-white cursor-pointer hover:text-[#374151] hover:bg-white duration-200"
                @click="emitFunction(hour)">
                <i class="fi fi-rr-cloud text-5xl" v-if="hour.cloudcover > 70"></i>
                <i class="fi fi-rr-cloud-sun text-5xl" v-if="hour.cloudcover > 25 && hour.cloudcover <= 70"></i>
                <i class="fi fi-br-sun text-5xl" v-if="hour.cloudcover < 25"></i>
                <h1 class="text-xl">{{ hour.temperature_2m }}°</h1>
            </div>
        </Slide>
        <template #addons>
            <Navigation />
        </template>
    </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { PropType } from 'vue';
import { Hourly } from '../types/Hourly';

defineProps({
    hourlyArray: Array as PropType<Hourly[]>
})

let breakpoints = {
    240: {
        itemsToShow: 2,
        itemsToScroll: 2,
        transition: 500,
        snapAlign: "start",
    },
    580: {
        itemsToShow: 3,
        itemsToScroll: 3,
        transition: 500,
        snapAlign: "start",
    },
    770: {
        itemsToShow: 4,
        itemsToScroll: 4,
        transition: 500,
        snapAlign: "start",
    },
    1040: {
        mouseDrag: false,
        itemsToShow: 5,
        itemsToScroll: 5,
        transition: 500,
        snapAlign: "start",
    },
    1200: {
        itemsToShow: 6,
        itemsToScroll: 6,
        transition: 500,
        snapAlign: "start",
    }
}

const emit = defineEmits(['getHour'])
const emitFunction = function (hour: Object) {
    emit('getHour', hour)
}

</script>

<style scoped>

</style>