interface Time {
    windspeed_10m_max: Array<number>,
    time: Array<string>,
}

interface Daily extends Time {
    temperature_2m_max: Array<number>,
    temperature_2m_min: Array<number>,
    sunset: Array<string>,
    sunrise: Array<string>,
}

interface Hourly extends Time {
    cloudcover: Array<number>,
    precipitation: Array<number>,
    relativehumidity_2m: Array<number>,
    temperature_2m: Array<number>,
    surface_pressure: Array<number>,
    visibility: Array<number>,
    windspeed_10m: Array<number>,
}

export interface Weather {
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number;
    generationtime_ms: number;
    elevation: number;
    daily: Daily;
    hourly: Hourly;


}
