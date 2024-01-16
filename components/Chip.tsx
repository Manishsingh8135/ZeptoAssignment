import React from 'react';

interface ChipProps {
  label: string;
  onRemove: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove }) => {
  return (
    <div className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full py-1 px-4">
      <span className="text-sm font-medium">{label}</span>
      <button
        onClick={onRemove}
        className="rounded-full   text-red-600  text-xl  focus:outline-none"
        aria-label={`Remove ${label}`}
      >
        &times;
      </button>
    </div>
  );
};

export default Chip;
