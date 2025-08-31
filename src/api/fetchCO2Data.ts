import type { ColumnName } from '../types/columns';

export type YearlyData = Partial<Record<ColumnName, number>>;

export interface CountryData {
  iso_code?: string;
  data: YearlyData[];
}

let dataCache: Record<string, CountryData> | null = null;
let promise: Promise<Record<string, CountryData>> | null = null;

export const fetchCO2Data = (): Record<string, CountryData> => {
  if (dataCache) return dataCache;

  console.log('dataCache', dataCache);

  if (!promise) {
    promise = fetch('/owid-co2-data.json')
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
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
