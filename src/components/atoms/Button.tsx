import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  backgroundColor: string;
  disabled?: boolean; // Marked as optional
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '', // Default to an empty string if not provided
  backgroundColor,
  disabled = false, // Default to false if not provided
}) => (
  <button
    onClick={onClick}
    className={`rounded-[48px] ${className}`}
    style={{ backgroundColor }}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
