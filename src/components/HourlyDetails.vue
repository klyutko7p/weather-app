<template>
    <div class="grid xl:grid-cols-3 gap-5 mt-20 py-10 sm:grid-cols-2 grid-cols-1">
        <div
            class="bg-[#DDF4F9] text-[#27485C] py-10 flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <h1 class="text-xl mb-1 uppercase">cloudcover</h1>
                <span class="font-bold"> {{ hour?.cloudcover }}%</span>
            </div>
            <i class="fi fi-ts-smoke text-7xl"></i>
        </div>
        <div
            class="bg-[#DDF4F9] text-[#27485C] py-10 flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <h1 class="text-xl mb-1 uppercase">Visibility</h1>
                <span class="font-bold">{{ hour?.visibility }} m</span>
            </div>
            <i class="fi fi-rr-eye text-7xl"></i>
        </div>
        <div
            class="bg-[#DDF4F9] text-[#27485C] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <h1 class="text-xl mb-1 uppercase">humidity</h1>
                <span class="font-bold">{{ hour?.relativehumidity_2m }}%</span>
            </div>
            <i class="fi fi-rr-humidity text-7xl"></i>
        </div>
        <div
            class="bg-[#DDF4F9] text-[#27485C] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <h1 class="text-xl mb-1 uppercase">pressure</h1>
                <span class="font-bold">{{ hour?.surface_pressure }} hPa</span>
            </div>
            <i class="fi fi-rs-sort-amount-down-alt text-7xl"></i>
        </div>
        <div
            class="bg-[#DDF4F9] text-[#27485C] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <h1 class="text-xl mb-1 uppercase">temperature</h1>
                <span class="font-bold">{{ hour?.temperature_2m }}℃</span>
            </div>
            <i class="fi fi-rr-temperature-low text-7xl"></i>
        </div>
        <div
            class="bg-[#DDF4F9] text-[#27485C] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <h1 class="text-xl mb-1 uppercase">wind</h1>
                <span class="font-bold">{{ hour?.windspeed_10m }} km/h</span>
            </div>
            <i class="fi fi-rr-wind text-7xl"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Hourly } from '../types/Hourly';
import { PropType } from 'vue';

defineProps({
    hour: Object as PropType<Hourly>
})

</script>

<style scoped>

</style>