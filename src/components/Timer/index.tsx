import React from 'react';
import './index.scss';

export interface TimerProps {
  time: number;
}

export const Timer = ({ time }: TimerProps) => (
  <span className="Timer" key={time}>
    {time}
  </span>
);
