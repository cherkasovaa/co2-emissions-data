export const fields = [
  'year',
  'population',
  'co2',
  'co2_per_capita',
  'methane',
  'oil_co2',
  'temperature_change_from_co2',
  'total_ghg',
] as const;

export type ColumnName = (typeof fields)[number];

export interface Column {
  name: ColumnName;
  checked: boolean;
  required: boolean;
}

export type Columns = Column[];
