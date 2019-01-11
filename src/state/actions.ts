import { Card } from '../model/card';

export enum ActionType {
  START_GAME,
  DECLARE_SET,
  ADD_CARD,
  REMOVE_CARD,
  RESET_CHOSEN,
  START_TIMER,
  TIMEOUT,
  DECLARE_DONE,
  TICK_TIMER,
  SET_DECK,
  ADD_POINT,
  SUB_POINT,
}

function createAction<T extends ActionType>(type: T): { type: T };
function createAction<T extends ActionType, U>(
  type: T,
  values: U,
): { type: T } & U;
function createAction<T extends ActionType, U>(type: T, values?: U) {
  if (values) {
    return {
      type,
      ...values,
    };
  }
  return { type };
}

export const startGame = () => createAction(ActionType.START_GAME);

export const declareSet = () => createAction(ActionType.DECLARE_SET);

export const addCard = (card: Card) =>
  createAction(ActionType.ADD_CARD, { card });

export const removeCard = (card: Card) =>
  createAction(ActionType.REMOVE_CARD, { card });

export const resetChosen = () => createAction(ActionType.RESET_CHOSEN);

export const startTimer = (timeout: number) =>
  createAction(ActionType.TIMEOUT, { timeout });

export const declareDone = () => createAction(ActionType.DECLARE_DONE);

export const tickTimer = () => createAction(ActionType.TICK_TIMER);

export const setDeck = (deck: Card[]) =>
  createAction(ActionType.SET_DECK, { deck });

export const addPoint = () => createAction(ActionType.ADD_POINT);

export const subPoint = () => createAction(ActionType.SUB_POINT);

export type Action =
  | ReturnType<typeof startGame>
  | ReturnType<typeof declareSet>
  | ReturnType<typeof addCard>
  | ReturnType<typeof removeCard>
  | ReturnType<typeof resetChosen>
  | ReturnType<typeof startTimer>
  | ReturnType<typeof declareDone>
  | ReturnType<typeof tickTimer>
  | ReturnType<typeof setDeck>
  | ReturnType<typeof addPoint>
  | ReturnType<typeof subPoint>;
