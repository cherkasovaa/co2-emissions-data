import { memo } from 'react';
import type { Columns } from '../types/columns';
import { AnimatedElement } from './AnimatedElement';
import { CountryTable } from './CountryTable';

interface CountryItemProps {
  info: {
    country: string;
    isoCode: string | undefined;
    population: number | undefined;
    isOpen: boolean;
    columns: Columns;
    onToggle: () => void;
  };
}

export const CountryItem = memo(function CountryItem({
  info,
}: CountryItemProps) {
  const { country, isoCode, population, isOpen, columns, onToggle } = info;
  return (
    <li className="accordion">
      <div className="accordion-header">
        <AnimatedElement value={country} />
        <AnimatedElement label="ISO Code" value={isoCode} />
        <AnimatedElement label="Population" value={population} />

        <button onClick={onToggle}>{isOpen ? 'Hide' : 'Show'}</button>
      </div>

      {isOpen && <CountryTable columns={columns} countryKey={country} />}
    </li>
  );
});
