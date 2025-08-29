import { memo, useMemo } from 'react';
import { fetchCO2Data } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';
import { TableRow } from './TableRow';

interface CountryTableProps {
  columns: Columns;
  countryKey: string;
}

export const CountryTable = memo(function CountryTable({
  columns,
  countryKey,
}: CountryTableProps) {
  const countries = fetchCO2Data();
  const country = countries[countryKey];

  const renderColumns = useMemo(
    () => columns.filter((field) => field.checked),
    [columns]
  );

  return (
    <table>
      <thead>
        <tr>
          {renderColumns.map(({ name }) => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {country.data.map((row) => (
          <TableRow key={row.year} renderColumns={renderColumns} row={row} />
        ))}
      </tbody>
    </table>
  );
});
