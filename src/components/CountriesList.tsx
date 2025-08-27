import { useState } from 'react';
import { fetchCO2Data } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';
import { CountryTable } from './CountryTable';

export const CountriesList = ({
  searchQuery,
  columns,
}: {
  searchQuery: string;
  columns: Columns;
}) => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const data = fetchCO2Data();

  console.log(data);

  const countries = Object.keys(data);

  return (
    <ul>
      {countries
        .filter((country) =>
          country.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((country) => {
          const isoCode = data[country].iso_code;
          const population = data[country].data.at(-1)?.population;
          const isOpen = activeCountry === country;

          return (
            <li
              key={country}
              className="accordion"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                overflow: 'hidden',
              }}
            >
              <div
                className="accordion__header"
                style={{ display: 'flex', gap: '2rem' }}
              >
                <div>{country}</div>
                {isoCode && <div>ISO Code: {isoCode}</div>}
                {population && <div>Population: {population}</div>}
                <button
                  onClick={() => setActiveCountry(isOpen ? null : country)}
                >
                  {isOpen ? 'Hide' : 'Show'}
                </button>
              </div>

              {isOpen && (
                <CountryTable columns={columns} countryKey={country} />
              )}
            </li>
          );
        })}
    </ul>
  );
};
