import React from 'react';
import { ButtonProps, Button } from './Button';
import { TimerProps, Timer } from './Timer';

export type TimerButtonProps = TimerProps & ButtonProps;

export const TimerButton = ({
  time,
  children,
  ...buttonProps
}: TimerButtonProps) => (
  <Button {...buttonProps}>
    {children} <Timer time={time} />
  </Button>
);
