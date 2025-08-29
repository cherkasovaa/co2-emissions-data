import { memo } from 'react';
import { useHighlightOnChange } from '../hooks/useHighlightOnChange';

interface AnimatedElementProps {
  value: string | number | undefined;
  label?: string;
}

export const AnimatedElement = memo(function AnimatedElement({
  value,
  label,
}: AnimatedElementProps) {
  const highlight = useHighlightOnChange(value);

  return (
    <div className={highlight ? 'highlight' : ''}>
      {label ? `${label}:` : ''} {value ?? 'N/A'}
    </div>
  );
});
