import React from "react";
import select_svg from '../../assets/select.svg'

interface SelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: string }[];
  className?: string;// New prop for the custom icon
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  className,
}) => (
  <div className={`relative inline-block ${className}`}>
    <select
      value={value}
      onChange={onChange}
      className="p-4 rounded-[16px] bg-[#F9FAFB] w-full appearance-none pr-10"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {
      <img
        src={select_svg}
        alt="Select Icon"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
    }
  </div>
);

export default Select;
