<template>
  <div>
    <div class="flex items-center justify-between">
      <form class="w-full max-w-4xl mt-10">
        <div class="flex items-center border-b border-white py-2 relative">
          <input
            class="appearance-none bg-transparent border-none w-full text-white text-2xl  mr-3 py-1 px-2 leading-tight focus:outline-none placeholder:text-white"
            type="text" placeholder="E.g. Moscow" v-model="query" required />
          <i class="ml-3 fi fi-rr-search absolute right-0 top-4 cursor-pointer text-2xl" @click="searchCities"></i>
          <i class="fi fi-br-cross cursor-pointer text-sm absolute top-6 right-10 animate-pulse" @click="clearQuery" v-if="query !== ''"></i>
        </div>
      </form>
      <MainButton class="ml-3 mt-12" @click="$router.push('/')">Back to Home</MainButton>
    </div>

    <div class="grid lg:grid-cols-3 sm:grid-cols-2 mx-auto gap-3 grid-cols-1" v-if="cities.length > 0">
      <CitiesList :cities="cities"></CitiesList>
    </div>

    <div v-else-if="isSearching && cities.length === 0">
      <div class="flex items-center justify-center mt-40">
        <div class="text-center text-2xl font-extrabold">
          <h1>Sorry, city with that query doesn't exist in our database!</h1>
          <Spinner></Spinner>
        </div>
      </div>
    </div>

    <div v-else class="text-center mt-40 text-4xl font-extrabold">
      <h1>Try to search your city!</h1>
      <Spinner></Spinner>
    </div>
  </div>
</template>

<script setup lang="ts">
import Spinner from "@/components/UI/Spinner.vue";
import CitiesList from "@/components/CitiesList.vue";
import MainButton from "@/components/UI/MainButton.vue";

import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
let cities = ref([]);
let query = ref('');
let isSearching = ref(false);


function clearQuery() {
  query.value = '';
  isSearching.value = false;
  cities.value.length = 0;
}

async function searchCities() {
  await store.dispatch("filterCities", query.value);
  isSearching.value = true;
  cities.value = store.getters.getCities;
}



</script>
