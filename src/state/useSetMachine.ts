import { useMachine } from '@xstate/react';
import { setMachine } from './xstate';

export const useSetMachine = () => useMachine(setMachine);
