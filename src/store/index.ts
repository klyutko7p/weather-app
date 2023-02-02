import Vuex, { StoreOptions } from 'vuex'
import axios from "axios";
import { RootState } from './types';
import cities from 'cities.json';

const store:StoreOptions<RootState> = {
  state: {
    cities: [cities],
  },
  getters: {
 
  },
  mutations: {

  },
  actions: {
  },
}
export default new Vuex.Store<RootState>(store)
