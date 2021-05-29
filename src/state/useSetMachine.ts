import { useMachine } from '@xstate/react';
import { setMachine } from './setMachine';

export const useSetMachine = () => useMachine(setMachine);
