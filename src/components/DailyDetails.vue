
<template>
    <div class="grid sm:grid-cols-3 grid-cols-1 gap-3 mb-3 mt-10 text-center">
        <div class="bg-[#ffffff] text-[#000000] py-10 flex items-center justify-around text-3xl w-3/4 rounded-xl mx-auto">
            <div>
                <i class="fi fi-rs-sunrise-alt text-6xl"></i>
                <h1 class="font-bold"> {{ getTime(dailyObject?.sunrise) }}</h1>
            </div>
        </div>
        <div class="bg-[#ffffff] text-[#000000] py-10 flex items-center justify-around text-3xl w-3/4 rounded-xl mx-auto">
            <div>
                <i class="fi fi-rs-sunset text-6xl"></i>
                <h1 class="font-bold">{{ getTime(dailyObject?.sunset) }}</h1>
            </div>
        </div>
        <div class="bg-[#ffffff] text-[#000000] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <i class="fi fi-rr-wind text-6xl"></i>
                <h1 class="font-bold">{{ dailyObject?.windspeed_10m_max }} km/h</h1>
            </div>
        </div>
        <div class="bg-[#ffffff] text-[#000000] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <i class="fi fi-rs-temperature-up text-6xl"></i>
                <h1 class="font-bold">{{ dailyObject?.temperature_2m_max }}℃</h1>
            </div>
        </div>
        <div class="bg-[#ffffff] text-[#000000] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <i class="fi fi-rs-temperature-down text-6xl"></i>
                <h1 class="font-bold">{{ dailyObject?.temperature_2m_min }}℃</h1>
            </div>
        </div>
        <div class="bg-[#ffffff] text-[#000000] py-10  flex items-center justify-around text-3xl  w-3/4 rounded-xl mx-auto">
            <div>
                <i class="fi fi-rr-trophy text-6xl"></i>
                <h1 class="font-bold">Best Day :)</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Daily } from '../types/Daily'

function getTime(dateTime: string | undefined) {
    if (typeof (dateTime) === 'string') {
        return new Date(dateTime).toLocaleString("en-EN", {
            hour: "numeric",
            minute: "numeric",
        })
    }

}

defineProps({
    dailyObject: Object as PropType<Daily>
})

</script>

