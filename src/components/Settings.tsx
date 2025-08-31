import { useCallback, useState } from 'react';
import type { Columns } from '../types/columns';
import { SettingsCheckbox } from './SettingsCheckbox';

export const Settings = ({
  columns,
  onChange,
}: {
  columns: Columns;
  onChange: (columns: Columns) => void;
}) => {
  const [restriction, setRestriction] = useState<boolean>(false);

  const toggle = useCallback(
    (field: string) => {
      const updated = columns.map((col) =>
        col.name === field ? { ...col, checked: !col.checked } : col
      );
      onChange(updated);
    },
    [columns, onChange]
  );

  return (
    <div className="settings">
      <SettingsCheckbox
        callback={() => setRestriction(!restriction)}
        checked={restriction}
        name={'removes the disabled state'}
      />
      <h2 className="title">Settings</h2>

      {columns.map(({ name, checked, required }) => {
        const isDisabled = !restriction && required;

        return (
          <SettingsCheckbox
            key={name}
            callback={() => toggle(name)}
            checked={checked}
            disabled={isDisabled}
            name={name}
          />
        );
      })}
    </div>
  );
};
