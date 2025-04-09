import { memo } from 'react';
import { PlotAxis } from '../../types/earthquake';
import { AXIS_OPTIONS } from './config';

interface AxisSelectorProps {
  label: string;
  value: string;
  onChange: (selected: PlotAxis) => void;
}

const AxisSelector = memo(({ label, value, onChange }: AxisSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        value={value}
        onChange={(e) => {
          const selected = AXIS_OPTIONS.find(opt => opt.field === e.target.value);
          if (selected) onChange(selected);
        }}
      >
        {AXIS_OPTIONS.map((option) => (
          <option key={option.field} value={option.field}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default AxisSelector; 