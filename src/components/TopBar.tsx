import { useState, type ChangeEvent } from 'react';

export const TopBar = ({
  isOpen,
  onChange,
  onSearch,
}: {
  isOpen: boolean;
  onChange: (state: boolean) => void;
  onSearch: (_q: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchValue(query);
    onSearch(query.trim());
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
      <input
        type="text"
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
