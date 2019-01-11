import React from 'react';

import './index.scss';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  disabled,
  className = '',
}: ButtonProps) => (
  <button
    className={`Button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
