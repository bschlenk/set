import { Card } from '../model/card';
import { Action, ActionType } from './actions';

export enum Page {
  MENU,
  GAME,
}

export interface State {
  page: Page;
  deck: Card[];
  sets: number;
  choosing: boolean;
  chosenCards: Card[];
  timeToChoose: number;
}

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.START_GAME:
      return { ...state, page: Page.GAME };
    case ActionType.DECLARE_SET:
      return { ...state, choosing: true };
    case ActionType.DECLARE_DONE:
      return { ...state, choosing: false };
    case ActionType.TIMEOUT:
      return { ...state, timeToChoose: action.timeout };
    case ActionType.ADD_CARD:
      return { ...state, chosenCards: [...state.chosenCards, action.card] };
    case ActionType.REMOVE_CARD:
      return {
        ...state,
        chosenCards: state.chosenCards.filter(c => c !== action.card),
      };
    case ActionType.RESET_CHOSEN:
      return { ...state, chosenCards: [] };
    case ActionType.TICK_TIMER:
      return { ...state, timeToChoose: state.timeToChoose - 1 };
    case ActionType.SET_DECK:
      return { ...state, deck: action.deck };
    case ActionType.ADD_POINT:
      return { ...state, sets: state.sets + 1 };
    case ActionType.SUB_POINT:
      return { ...state, sets: Math.max(state.sets - 1, 0) };
  }
  return state;
}
