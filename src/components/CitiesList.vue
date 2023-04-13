<template>
    <div v-for="(city, index) in cities" :key="index">
        <div class="grid grid-cols-2 p-2 mx-auto mt-10 mb-10 bg-[#ffffff] max-w-sm cursor-pointer text-[#000000] text-xl rounded-lg font-extrabold drop-shadow-2xl hover:scale-105 duration-300"
            @click="$router.push(`/weather/city=${city.name}&latitude=${getLat(city.lat)}&longitude=${getLng(city.lng)}`)">
            <img class="w-20 border-4 border-black" :src="linkToImg + city.country + '.svg'" alt="" />
            <div>
                <h1 class="overflow-hidden text-ellipsis whitespace-nowrap" :title="city.name + ', ' + city.country">{{
                    city.name
                }}, {{ city.country }}</h1>
                <h1 class="overflow-hidden text-ellipsis whitespace-nowrap"
                    :title="getLat(city.lat) + ', ' + getLng(city.lng)">{{ getLat(city.lat) }}°E, {{
                        getLng(city.lng)
                    }}°N</h1>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { City } from '@/types/City'
import { useStore } from 'vuex'

const store = useStore()

defineProps({
    cities: Array as PropType<City[]>,
})

const linkToImg = store.state.linkToImg

function getLat(lat: string) {
    let num = +lat
    return num.toFixed(2)
}

function getLng(lng: string) {
    let num = +lng
    return num.toFixed(2)
}

</script>

<style scoped></style>