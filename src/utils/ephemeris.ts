import {
  CITY_LATITUDE,
  CITY_LONGITUDE
} from "../constants";

import SunCalc from "suncalc";
import { Day } from "../types";

export const getSunData = (): Day[] => {
    const offset: number = 1; // décalage horaire de base pour la France = GMT +1
                              // l'heure d'été est appliquée dans App.tsx
    const currentYear: number = new Date().getFullYear();
    const sunData: Day[] = [];

    const toDateString = (date: Date): string => {
        const string = date.toISOString()
        return string.substring(0, string.indexOf('T'));
    }

    const toTimeString = (date: Date): string => {
        const string = date.toISOString()
        return string.substring(string.indexOf('T') + 1, string.indexOf('.'));
    }

    const addOffset = (date: Date): Date => {
        date.setHours(date.getHours() + 1);
        return date;
    }

    for (let day = new Date(currentYear, 0, 1, 12); day.getFullYear() === currentYear; day.setDate(day.getDate() + 1)) {
        const sun: SunlightTimes = SunCalc.getTimes(day, CITY_LATITUDE, CITY_LONGITUDE);
        const d: Day = {
            date: toDateString(day),
            sunrise: toTimeString(addOffset(sun.sunrise)),
            civrise: toTimeString(addOffset(sun.dawn)),
            sunset: toTimeString(addOffset(sun.sunset)),
            civset: toTimeString(addOffset(sun.dusk)),
        }

        sunData.push(d);
    }

    return sunData;
}


