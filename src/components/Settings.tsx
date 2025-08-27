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
    <div
      style={{
        background: '#F6F6F6',
        padding: '2rem',
        borderRadius: '0.5rem',
        color: '#515151',
      }}
    >
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
