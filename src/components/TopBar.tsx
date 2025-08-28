import { useState, type ChangeEvent } from 'react';
import type { Order, OrderByProperty } from '../types/sort';

export const TopBar = ({
  years,
  isOpen,
  onChange,
  onSearch,
  onSelect,
  order,
  orderBy,
  onSort,
}: {
  years: number[];
  isOpen: boolean;
  onChange: (state: boolean) => void;
  onSearch: (_q: string) => void;
  onSelect: (_y: number) => void;
  order: Order;
  orderBy: OrderByProperty | null;
  onSort: (property: OrderByProperty) => void;
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchValue(query);
    onSearch(query.trim());
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSelect(Number(event?.target.value));
  };

  const handleSortBy = (property: OrderByProperty) => {
    onSort(property);
  };

  const getSortIcon = (property: OrderByProperty) => {
    if (orderBy !== property) return '';

    return order === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="top-bar">
      <select name="selectYear" onChange={handleYearChange}>
        <option value="">Last Year</option>

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div className="sort-filter-bar">
        Sorting by
        <button onClick={() => handleSortBy('population')}>
          Population {getSortIcon('population')}
        </button>
        <button onClick={() => handleSortBy('name')}>
          Name {getSortIcon('name')}
        </button>
      </div>

      <input
        type="text"
        name="searchCountry"
        value={searchValue}
        onChange={handleInput}
        placeholder="Search country..."
      />
      <button onClick={() => onChange(!isOpen)}>Settings</button>
    </div>
  );
};
