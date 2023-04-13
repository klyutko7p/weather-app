<template>
    <h1 class="text-4xl mb-2 font-bold">Hourly weather</h1>
    <hr class="mb-12">
    <swiper :slides-per-view="6" :breakpoints="breakpoints">
        <swiper-slide v-for="hour in hourlyArray">
            <h1 class="mb-5 text-2xl text-center font-semibold">{{
                new Date(hour.time).toLocaleString("en-EN", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric"
                })
            }}</h1>
            <div class="bg-[#ffffff] text-black rounded-full w-28 text-center mx-auto py-3 cursor-pointer hover:text-white hover:bg-black duration-200"
                @click="emitFunction(hour)">
                <i class="fi fi-rr-cloud text-5xl" v-if="hour.cloudcover > 70"></i>
                <i class="fi fi-rr-cloud-sun text-5xl" v-if="hour.cloudcover >= 25 && hour.cloudcover <= 70"></i>
                <i class="fi fi-sr-brightness text-5xl" v-if="hour.cloudcover < 25"></i>
                <h1 class="text-xl">{{ hour.temperature_2m }}°</h1>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Hourly } from '../types/Hourly'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

defineProps({
    hourlyArray: Array as PropType<Hourly[]>
})

let breakpoints = {
    240: {
        slidesPerView: 2,
    },
    580: {
        slidesPerView: 3,
    },
    770: {
        slidesPerView: 4,
    },
    1040: {
        slidesPerView: 5,
    },
    1200: {
        slidesPerView: 6,
    }
}

const emit = defineEmits(['getHour'])
const emitFunction = function (hour: Object) {
    emit('getHour', hour)
}

</script>

<style scoped></style>