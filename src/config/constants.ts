import type { Columns } from '../types/columns';

export const columns: Columns = [
  {
    name: 'year',
    checked: true,
    required: true,
  },
  {
    name: 'population',
    checked: true,
    required: true,
  },
  {
    name: 'co2',
    checked: true,
    required: true,
  },
  {
    name: 'co2_per_capita',
    checked: true,
    required: true,
  },
  {
    name: 'methane',
    checked: false,
    required: false,
  },
  {
    name: 'oil_co2',
    checked: false,
    required: false,
  },
  {
    name: 'temperature_change_from_co2',
    checked: false,
    required: false,
  },
  {
    name: 'total_ghg',
    checked: false,
    required: false,
  },
];
