import { useState } from 'react';
import { fetchCO2Data } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';
import type { Order, OrderByProperty } from '../types/sort';
import { CountriesList } from './CountriesList';
import { TopBar } from './TopBar';

export const DataProvider = ({
  openSetting,
  setOpenSettings,
  columns,
}: {
  openSetting: boolean;
  setOpenSettings: (state: boolean) => void;
  columns: Columns;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderByProperty | null>(null);

  const handleSort = (property: OrderByProperty) => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const availableYears = () => {
    const years = new Set<number>();

    Object.values(data).forEach((country) => {
      country.data.forEach((yearData) => {
        if (yearData.year) years.add(yearData.year);
      });
    });

    return [...years];
  };

  const data = fetchCO2Data();
  const currentYear = selectedYear || availableYears().at(-1);

  const sortedData = Object.entries(data).sort((a, b) => {
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

  const countries = Object.fromEntries(sortedData);

  return (
    <>
      <TopBar
        years={availableYears()}
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
