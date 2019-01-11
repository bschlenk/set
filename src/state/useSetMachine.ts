import { useMachine } from 'use-machine';
import { machineConfig, machineOptions, initialContext } from './xstate';

export const useSetMachine = () =>
  useMachine(machineConfig, machineOptions, initialContext);
