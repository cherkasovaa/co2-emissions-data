import { useState, type ChangeEvent } from 'react';

export const TopBar = ({
  years,
  isOpen,
  onChange,
  onSearch,
  onSelect,
}: {
  years: number[];
  isOpen: boolean;
  onChange: (state: boolean) => void;
  onSearch: (_q: string) => void;
  onSelect: (_y: number) => void;
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.5rem',
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
