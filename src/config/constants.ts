import type { Columns } from '../types/columns';

export const columns: Columns = [
  {
    name: 'year',
    checked: true,
  },
  {
    name: 'population',
    checked: true,
  },
  {
    name: 'co2',
    checked: true,
  },
  {
    name: 'co2_per_capita',
    checked: true,
  },
  {
    name: 'methane',
    checked: false,
  },
  {
    name: 'oil_co2',
    checked: false,
  },
  {
    name: 'temperature_change_from_co2',
    checked: false,
  },
  {
    name: 'total_ghg',
    checked: false,
  },
];
