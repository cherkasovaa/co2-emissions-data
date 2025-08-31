import { memo } from 'react';

interface SettingsItemProps {
  callback: () => void;
  checked: boolean;
  disabled?: boolean;
  name: string;
  className?: string;
}

export const SettingsCheckbox = memo(function SettingsCheckbox({
  callback,
  checked,
  disabled = false,
  name,
  className,
}: SettingsItemProps) {
  return (
    <div className={className}>
      <input
        type="checkbox"
        id={name}
        onChange={callback}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
});
