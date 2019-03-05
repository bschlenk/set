import React from 'react';

import './index.scss';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  title,
  disabled,
  className = '',
}: ButtonProps) => (
  <button
    title={title}
    className={`Button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
