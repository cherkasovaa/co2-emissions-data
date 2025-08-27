import { fetchCO2Data } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';

export const CountryTable = ({
  columns,
  countryKey,
}: {
  columns: Columns;
  countryKey: string;
}) => {
  const countries = fetchCO2Data();
  const country = countries[countryKey];

  const renderColumns = columns.filter((field) => field.checked);

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
          <tr key={row.year}>
            {renderColumns.map(({ name }) => (
              <td key={name}>{row[name] ?? 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
