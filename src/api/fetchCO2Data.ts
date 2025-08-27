import type { fields } from '../config/constants';

export type YearlyData = Partial<Record<(typeof fields)[number], number>>;

export interface CountryData {
  iso_code?: string;
  data: YearlyData[];
}

let dataCache: Record<string, CountryData> | null = null;
let promise: Promise<Record<string, CountryData>> | null = null;

export const fetchCO2Data = (): Record<string, CountryData> => {
  if (dataCache) return dataCache;

  if (!promise) {
    promise = fetch(
      'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
    )
      .then((res) => res.json())
      .then((data) => {
        dataCache = data;
        return data;
      })
      .catch((error) => {
        promise = null;
        throw error;
      });
  }

  throw promise;
};
