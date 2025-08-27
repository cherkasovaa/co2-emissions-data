import { fetchCO2Data } from '../api/fetchCO2Data';
import { fields } from '../config/constants';

export const CountryTable = ({ countryKey }: { countryKey: string }) => {
  const countries = fetchCO2Data();
  const country = countries[countryKey];

  return (
    <table>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {country.data.map((row) => (
          <tr key={row.year}>
            {fields.map((field) => (
              <td key={field}>{row[field] ?? 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
