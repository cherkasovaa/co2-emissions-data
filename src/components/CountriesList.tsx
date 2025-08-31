import { memo, useCallback, useMemo, useState } from 'react';
import { type CountryData } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';
import { CountryItem } from './CountryItem';

interface CountriesListProps {
  data: Record<string, CountryData>;
  searchQuery: string;
  columns: Columns;
  selectedYear: number | undefined;
}

export const CountriesList = memo(function CountriesList({
  data,
  searchQuery,
  columns,
  selectedYear,
}: CountriesListProps) {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const countries = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return Object.keys(data).filter((country) =>
      country.toLowerCase().includes(query)
    );
  }, [searchQuery, data]);

  const handleToggle = useCallback((country: string) => {
    setActiveCountry((prev) => (prev === country ? null : country));
  }, []);

  return (
    <ul>
      {countries.map((country) => {
        const population = data[country].data.find(
          (d) => d.year === selectedYear
        )?.population;

        const info = {
          country,
          isoCode: data[country].iso_code,
          population,
          isOpen: activeCountry === country,
          columns,
          onToggle: () => handleToggle(country),
        };

        return <CountryItem key={country} info={info} />;
      })}
    </ul>
  );
});
