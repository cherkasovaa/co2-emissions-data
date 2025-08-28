import { useState } from 'react';
import { type CountryData } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';
import { AnimatedElement } from './AnimatedElement';
import { CountryTable } from './CountryTable';

export const CountriesList = ({
  data,
  searchQuery,
  columns,
  selectedYear,
}: {
  data: Record<string, CountryData>;
  searchQuery: string;
  columns: Columns;
  selectedYear: number | undefined;
}) => {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const countries = Object.keys(data);

  return (
    <ul>
      {countries
        .filter((country) =>
          country.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((country) => {
          const isoCode = data[country].iso_code;
          const population = data[country].data.find(
            (d) => d.year === selectedYear
          )?.population;
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
                marginBottom: '0.5rem',
              }}
            >
              <div
                className="accordion__header"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr) max-content',
                  alignItems: 'center',
                  justifyItems: 'start',
                  gap: '1rem',
                }}
              >
                <AnimatedElement label="" value={country} />
                <AnimatedElement label="ISO Code" value={isoCode} />
                <AnimatedElement label="Population" value={population} />

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
