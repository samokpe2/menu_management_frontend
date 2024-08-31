import React from 'react';

interface InputProps {
  value?: any; // Marked as optional
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Marked as optional
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value = '', // Default value for value
  onChange = () => {}, // Default no-op function for onChange
  disabled = false,
  className = '',
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`p-4 rounded-[16px] bg-[#F9FAFB] appearance-none pr-10 ${className} focus:bg-[#EAECF0] focus:outline-none`}
  />
);

export default Input;