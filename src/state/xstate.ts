import { actions, MachineConfig, MachineOptions } from 'xstate';
import { Card } from '../model/card';
import { isSet } from '../utils/isSet';
import { createDeck } from '../utils/createDeck';
import { TOTAL_CARDS } from '../variables';
const { assign } = actions;

const SECONDS_TO_CHOOSE = 3;

interface Schema {
  states: {
    start: {};
    game: {
      states: {
        idle: {};
        declaring: {
          states: {
            timer: {};
            choosing: {
              states: {
                idle: {};
                checkSet: {};
              };
            };
          };
        };
      };
    };
  };
}

type EventType<T extends string, U extends {} = {}> = { type: T } & U;

type DeclareEvent = EventType<'DECLARE'>;
type AddCardEvent = EventType<'ADD_CARD', { card: Card }>;
type RemoveCardEvent = EventType<'REMOVE_CARD', { card: Card }>;

type Event = DeclareEvent | AddCardEvent | RemoveCardEvent;

interface Context {
  deck: Card[];
  board: Card[];
  declaredCards: Card[];
  sets: Card[][];
  countdown: number;
}

export const initialContext: Context = {
  deck: [],
  board: [],
  declaredCards: [],
  sets: [],
  countdown: 0,
};

export const machineConfig: MachineConfig<Context, Schema, Event> = {
  id: 'set',
  initial: 'start',
  states: {
    start: {
      onEntry: ['newGame'],
      on: {
        '': 'game',
      },
    },
    game: {
      initial: 'idle',
      states: {
        idle: {
          onEntry: ['setIdle'],
          on: {
            DECLARE: 'declaring',
          },
        },
        declaring: {
          onEntry: ['setDeclaring', 'resetTimer'],
          onExit: ['updateBoard'],
          type: 'parallel',
          states: {
            timer: {
              after: {
                1000: [
                  {
                    target: '#set.game.idle',
                    actions: ['removeSet'],
                    cond: 'timedOut',
                  },
                  { target: 'timer', actions: ['tickTimer'] },
                ],
              },
            },
            choosing: {
              initial: 'idle',
              states: {
                idle: {
                  on: {
                    ADD_CARD: {
                      target: 'checkSet',
                      actions: 'addCard',
                    },
                    REMOVE_CARD: {
                      actions: 'removeCard',
                    },
                  },
                },
                checkSet: {
                  on: {
                    '': [
                      {
                        target: 'idle',
                        cond: 'stillDeclaring',
                      },
                      {
                        target: '#set.game.idle',
                        cond: 'isSet',
                        actions: ['addSet'],
                      },
                      { target: '#set.game.idle', actions: ['removeSet'] },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const machineOptions: MachineOptions<Context, Event> = {
  actions: {
    newGame: assign<Context>(ctx => {
      const freshDeck = createDeck();
      const board = freshDeck.slice(0, 12);
      const deck = freshDeck.slice(12);
      return {
        ...ctx,
        deck,
        board,
      };
    }),

    setDeclaring: assign<Context>(ctx => ({
      ...ctx,
      declaredCards: [],
    })),

    setIdle: assign<Context>(ctx => ({
      ...ctx,
      declaredCards: [],
    })),

    addCard: assign<Context, AddCardEvent>({
      declaredCards: (ctx, event) => [...ctx.declaredCards, event.card],
    }),

    removeCard: assign<Context, RemoveCardEvent>({
      declaredCards: (ctx, event) =>
        ctx.declaredCards.filter(c => c !== event.card),
    }),

    addSet: assign<Context>({
      sets: ctx => [...ctx.sets, ctx.declaredCards],
    }),

    removeSet: assign<Context>({
      sets: ctx => ctx.sets.slice(0, ctx.sets.length - 1),
    }),

    tickTimer: assign<Context>({
      countdown: ctx => ctx.countdown - 1,
    }),

    resetTimer: assign<Context>({
      countdown: () => SECONDS_TO_CHOOSE,
    }),

    updateBoard: assign<Context>(ctx => {
      if (!isSet(ctx.declaredCards)) {
        return ctx;
      }

      const deck = ctx.deck.slice(ctx.declaredCards.length);
      const board = [...ctx.board];

      ctx.declaredCards.forEach((card, i) => {
        const index = board.indexOf(card);
        board[index] = ctx.deck[i];
      });

      return {
        ...ctx,
        deck,
        board,
      };
    }),
  },

  guards: {
    stillDeclaring: ctx => ctx.declaredCards.length !== 3,

    isSet: ctx => isSet(ctx.declaredCards),

    timedOut: ctx => ctx.countdown <= 0,
  },
};
