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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '2rem',
        marginBottom: '2rem',
      }}
    >
      <select
        name="selectYear"
        onChange={handleYearChange}
        style={{
          padding: '0 1rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="">Last Year</option>

        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
        style={{
          flex: '1',
          borderRadius: '0.5rem',
          border: 'none',
          padding: '0.25rem 1rem',
          fontSize: '1rem',
        }}
      />
      <button onClick={() => onChange(!isOpen)}>Settings</button>
    </div>
  );
};
