import type { Columns } from '../types/columns';

export const Settings = ({
  columns,
  onChange,
}: {
  columns: Columns;
  onChange: (columns: Columns) => void;
}) => {
  const toggle = (field: string) => {
    const updated = columns.map((col) =>
      col.name === field ? { ...col, checked: !col.checked } : col
    );
    onChange(updated);
  };

  return (
    <div className="settings">
      {columns.map(({ name, checked }) => (
        <div key={name}>
          <input
            type="checkbox"
            id={name}
            onChange={() => toggle(name)}
            checked={checked}
          />
          <label htmlFor={name}>{name}</label>
        </div>
      ))}
    </div>
  );
};
