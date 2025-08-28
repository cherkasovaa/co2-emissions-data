import { useState } from 'react';
import type { Columns } from '../types/columns';

export const Settings = ({
  columns,
  onChange,
}: {
  columns: Columns;
  onChange: (columns: Columns) => void;
}) => {
  const [restriction, setRestriction] = useState<boolean>(false);

  const toggle = (field: string) => {
    const updated = columns.map((col) =>
      col.name === field ? { ...col, checked: !col.checked } : col
    );
    onChange(updated);
  };

  return (
    <div className="settings">
      <div className="restriction">
        <input
          type="checkbox"
          id="restriction"
          onChange={() => setRestriction(!restriction)}
          checked={restriction}
        />
        <label htmlFor="restriction">removes the disabled state</label>
      </div>
      <h2 className="title">Settings</h2>

      {columns.map(({ name, checked, required }) => {
        const isDisabled = !restriction && required;

        return (
          <div key={name}>
            <input
              type="checkbox"
              id={name}
              onChange={() => toggle(name)}
              checked={checked}
              disabled={isDisabled}
            />
            <label htmlFor={name}>{name}</label>
          </div>
        );
      })}
    </div>
  );
};
