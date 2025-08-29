import { useCallback, useMemo, useState } from 'react';
import { fetchCO2Data } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';
import type { Order, OrderByProperty } from '../types/sort';
import { CountriesList } from './CountriesList';
import { TopBar } from './TopBar';

interface DataProviderProps {
  openSetting: boolean;
  setOpenSettings: (state: boolean) => void;
  columns: Columns;
}

export const DataProvider = ({
  openSetting,
  setOpenSettings,
  columns,
}: DataProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderByProperty | null>(null);

  const handleSort = useCallback(
    (property: OrderByProperty) => {
      const isAsc = order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order]
  );

  const data = useMemo(() => fetchCO2Data(), []);

  const availableYears = useMemo(() => {
    const years = new Set<number>();

    Object.values(data).forEach((country) => {
      country.data.forEach((yearData) => {
        if (yearData.year) years.add(yearData.year);
      });
    });

    return [...years];
  }, [data]);

  const currentYear = selectedYear || availableYears.at(-1);

  const countries = useMemo(() => {
    if (!orderBy) return data;

    const sorted = Object.entries(data).sort((a, b) => {
      const countryA = a[0];
      const countryB = b[0];

      if (orderBy === 'name') {
        return order === 'asc'
          ? countryA.localeCompare(countryB)
          : countryB.localeCompare(countryA);
      }

      if (orderBy === 'population') {
        const populationA =
          data[countryA].data.find((d) => d.year === currentYear)?.population ??
          0;
        const populationB =
          data[countryB].data.find((d) => d.year === currentYear)?.population ??
          0;

        return order === 'asc'
          ? populationA - populationB
          : populationB - populationA;
      }

      return 0;
    });

    return Object.fromEntries(sorted);
  }, [data, orderBy, order, currentYear]);

  return (
    <>
      <TopBar
        years={availableYears}
        isOpen={openSetting}
        onChange={setOpenSettings}
        onSearch={setSearchQuery}
        onSelect={setSelectedYear}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
      />
      <CountriesList
        data={countries}
        searchQuery={searchQuery}
        columns={columns}
        selectedYear={currentYear}
      />
    </>
  );
};
