import { memo } from 'react';
import type { ColumnName, Columns } from '../types/columns';

interface TableRowProps {
  renderColumns: Columns;
  row: Partial<Record<ColumnName, number>>;
}

export const TableRow = memo(function TableRow({
  renderColumns,
  row,
}: TableRowProps) {
  return (
    <tr>
      {renderColumns.map(({ name }) => (
        <td key={name}>{row[name] ?? 'N/A'}</td>
      ))}
    </tr>
  );
});
