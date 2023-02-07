import Vuex, { StoreOptions } from 'vuex'
import axios from "axios";
import { RootState } from './types';
import cities from 'cities.json';

const store:StoreOptions<RootState> = {
  state: {
    cities: cities,
    query: '',
    weather: {},
    linkToImg: "http://purecatamphetamine.github.io/country-flag-icons/3x2/",
  },
  getters: {
    getCities(state) {
      let cities = state.cities;
      if (state.query !== '') {
      cities = cities.filter(city => city.name.toLowerCase().includes(state.query.toLowerCase()));
      } else {
        return;
      }
      return cities;
    },
    getWeather(state) {
      return state.weather;
    },

    getDateNow() {
      return new Date().toLocaleString("en-EN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    }
  },
  mutations: {
    setQuery(state, payload: string) {
      state.query = payload;
    },
    setWeather(state, payload: Object) {
      state.weather = payload;
    }
  },
  actions: {
    filterCities({ commit }, query) {
      commit("setQuery", query)
    },
    async fetchWeather({ commit }, [latitude, longitude]) {
       return await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,surface_pressure,cloudcover,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max&timezone=auto`)
         .then((result) => {
           let weather = result.data
           console.log(weather);
          commit("setWeather", weather);
      })
    }
  },
}
export default new Vuex.Store<RootState>(store)
