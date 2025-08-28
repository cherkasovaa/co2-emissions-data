import { useState } from 'react';
import { fetchCO2Data } from '../api/fetchCO2Data';
import type { Columns } from '../types/columns';
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

  const data = fetchCO2Data();

  console.log(data);

  const availableYears = () => {
    const years = new Set<number>();

    Object.values(data).forEach((country) => {
      country.data.forEach((yearData) => {
        if (yearData.year) years.add(yearData.year);
      });
    });

    return [...years];
  };

  const currentYear = selectedYear || availableYears().at(-1);

  return (
    <>
      <TopBar
        years={availableYears()}
        isOpen={openSetting}
        onChange={setOpenSettings}
        onSearch={setSearchQuery}
        onSelect={setSelectedYear}
      />
      <CountriesList
        data={data}
        searchQuery={searchQuery}
        columns={columns}
        selectedYear={currentYear}
      />
    </>
  );
};
