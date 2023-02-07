import { City } from '../types/City';
export interface RootState {
    cities: Array<City>,
    query: string,
    weather: Object,
    linkToImg: string,
}

