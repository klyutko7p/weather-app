<template>
    <div class="">
        <div v-if="!isLoading">
            <div class="sm:flex sm:items-center sm:justify-between">
                <MainButton class="ml-3 mt-5" @click="$router.push('/')">Back to Home</MainButton>
                <MainButton class="ml-3 mt-5" @click="$router.push('/search')">Back to Search</MainButton>
            </div>
            <div class="xl:flex xl:items-center xl:justify-between mt-10 mb-16 lg:block">
                <div class="text-center text-lg">
                    <div class="flex items-center justify-center">
                        <div class="mr-2 text-2xl">
                            <h1 class="font-extrabold">Now</h1>
                            <h1>{{ store.getters.getDateNow }}</h1>
                        </div>
                        <div class="text-5xl mt-3">
                            <i class="fi fi-rr-cloud" v-if="weather.hourly.cloudcover[indexOfNow] > 70"></i>
                            <i class="fi fi-rr-cloud-sun"
                                v-if="weather.hourly.cloudcover[indexOfNow] > 25 && weather.hourly.cloudcover[indexOfNow] < 50"></i>
                            <i class="fi fi-br-sun" v-if="weather.hourly.cloudcover[indexOfNow] < 25"></i>
                        </div>
                    </div>
                    <h1 class="text-8xl my-10 font-bold">{{ weather.hourly.temperature_2m[indexOfNow] }}°</h1>
                    <div class="flex items-center justify-center text-2xl font-extrabold mb-10">
                        <i class="fi fi-rs-marker mr-5 mt-2"></i>
                        <h1 class="mr-2">{{ city }},</h1>
                        <h1>{{ weather.timezone }}</h1>
                    </div>
                </div>
                <div class="xl:w-1/2 lg:w-full">
                    <h1 class="text-2xl font-bold mb-2">Choose the day</h1>
                    <select name="" id="" v-model="selectedDate" @click="parseTime(), parseDaily()"
                        class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option v-for="date in weather.daily.time" :value="date">{{
                            new Date(date).toLocaleString("en-EN", { month: "long", day: "numeric", })
                        }}
                        </option>
                    </select>
                    <DailyDetails :dailyObject="dailyObject"></DailyDetails>
                </div>
            </div>
            <HourlyList :hourlyArray="hourlyArray" @getHour="getHour"></HourlyList>
            <HourlyDetails v-if="Object.keys(hour).length !== 0" :hour="hour"></HourlyDetails>
        </div>
        <div v-else>
            <h1>weather is not ready</h1>
            <Spinner></Spinner>
        </div>
    </div>

</template>

<script setup lang="ts">
import Spinner from '@/components/UI/Spinner.vue';
import MainButton from '@/components/UI/MainButton.vue';
import HourlyList from '@/components/HourlyList.vue';
import HourlyDetails from '@/components/HourlyDetails.vue';
import DailyDetails from '@/components/DailyDetails.vue';

import { Weather } from '../types/Weather';
import { Hourly } from '../types/Hourly';
import { Daily } from '../types/Daily';

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const route = useRoute()

let isLoading = ref(true)
let weather = ref(<Weather>{});
let indexOfNow = ref(0)
let hourlyArray = ref<Array<Hourly>>([])
let dailyObject = ref(<Daily>{})
let hour = ref(<Hourly>{})
let selectedDate = ref(new Date());

const latitude = (route.params.latitude as string).split('=')[1]
const longitude = (route.params.longitude as string).split('=')[1]
const city = (route.params.city as string).split('=')[1]



function getHour(object: any) {
    hour.value = object
}

async function getWeather() {
    await store.dispatch("fetchWeather", [latitude, longitude])
    isLoading.value = false;
    weather.value = store.getters.getWeather
}

function compareDates(times: Array<string>) {
    let date = new Date().toLocaleString('en-EN', {
        day: "2-digit",
        hour: "2-digit"
    });
    for (let i = 0; i < times.length; i++) {
        if (date === new Date(times[i]).toLocaleTimeString('en-EN', {
            day: "2-digit",
            hour: "2-digit"
        })) {
            indexOfNow.value = [i][0]
        }
    }
}

function parseDaily() {
    let daily = weather.value.daily
    let newDate = new Date(selectedDate.value).toLocaleString("en-EN", { day: "2-digit" })

    for (let i = 0; i < daily.time.length; i++) {
        if (newDate === new Date(daily.time[i]).toLocaleString("en-EN", { day: "2-digit" })) {
            let newObject = {
                temperature_2m_max: 0,
                temperature_2m_min: 0,
                windspeed_10m_max: 0,
                time: '',
                sunset: '',
                sunrise: '',
            }
            newObject.sunrise = daily.sunrise[i]
            newObject.sunset = daily.sunset[i]
            newObject.time = daily.time[i]
            newObject.windspeed_10m_max = daily.windspeed_10m_max[i]
            newObject.temperature_2m_max = daily.temperature_2m_max[i]
            newObject.temperature_2m_min = daily.temperature_2m_min[i]
            dailyObject.value = newObject
        }
    }
}

function parseTime() {
    let hourly = weather.value.hourly
    let arrayHours = <any>[];
    let newDate = new Date(selectedDate.value).toLocaleString("en-EN", { day: "2-digit" });
    for (let i = 0; i < hourly.time.length; i++) {
        if (newDate === new Date(hourly.time[i]).toLocaleString("en-EN", { day: "2-digit" })) {
            let newObject = {
                time: '',
                cloudcover: 0,
                relativehumidity_2m: 0,
                surface_pressure: 0,
                temperature_2m: 0,
                precipitation: 0,
                visibility: 0,
                windspeed_10m: 0,
            }
            newObject.time = hourly.time[i]
            newObject.cloudcover = hourly.cloudcover[i]
            newObject.precipitation = hourly.precipitation[i]
            newObject.relativehumidity_2m = hourly.relativehumidity_2m[i]
            newObject.surface_pressure = hourly.surface_pressure[i]
            newObject.temperature_2m = hourly.temperature_2m[i]
            newObject.visibility = hourly.visibility[i]
            newObject.windspeed_10m = hourly.windspeed_10m[i]
            arrayHours.push(newObject)
        }
    }
    hourlyArray.value = arrayHours;
}

onMounted(async () => {
    await getWeather();
    compareDates(weather.value.hourly.time)
    parseTime()
    parseDaily()
})

</script>

<style scoped>

</style>