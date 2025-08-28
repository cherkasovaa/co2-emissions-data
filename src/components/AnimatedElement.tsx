import { useHighlightOnChange } from '../hooks/useHighlightOnChange';

export const AnimatedElement = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  const highlight = useHighlightOnChange(value);

  return (
    <div className={highlight ? 'highlight' : ''}>
      {label && `${label}:`} {value ?? 'N/A'}
    </div>
  );
};
