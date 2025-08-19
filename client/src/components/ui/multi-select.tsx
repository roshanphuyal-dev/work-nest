import { useState } from "react";

interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  onValueChange: (selectedValues: string[]) => void;
  disabled?: boolean;
  values: string[];
}

export const MultiSelect = ({
  options,
  onValueChange,
  disabled = false,
  values = [],
}: MultiSelectProps) => {
  // Remove internal state - use values prop instead
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (disabled) {
      console.log("Component is disabled, onValueChange will not fire");
      return;
    }

    const option = options.find((opt) => opt.value === value);
    if (option?.disabled) {
      console.log("Option is disabled, cannot select");
      return;
    }

    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    onValueChange(newValues);
  };

  const getSelectedLabels = () => {
    return values
      .map((value) => options.find((option) => option.value === value)?.label)
      .filter(Boolean) // Remove any undefined values
      .join(", ");
  };

  return (
    <div className="relative w-full max-w-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full p-3 border rounded-lg text-left ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-100"
            : "hover:border-blue-500"
        }`}
      >
        {values.length === 0
          ? "Select options..."
          : `Selected: ${getSelectedLabels()}`}
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 mt-1 border rounded-lg bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => toggleOption(option.value)}
              className={`p-3 cursor-pointer hover:bg-blue-50 border-b last:border-b-0 ${
                values.includes(option.value) ? "bg-blue-100" : ""
              } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.includes(option.value)}
                  onChange={() => {}} // Handled by parent div click
                  disabled={option.disabled}
                  className="pointer-events-none"
                />
                <span>{option.label}</span>
                {option.disabled && (
                  <span className="text-red-500 text-sm">(disabled)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
