import { actions, createMachine } from 'xstate';
import { Card } from '../model/card';
import { isSet } from '../utils/isSet';
import { createDeck } from '../utils/createDeck';
import { drawCards } from '../utils/drawCards';

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
type NoSetsEvent = EventType<'NO_SETS'>;

type Event = DeclareEvent | AddCardEvent | RemoveCardEvent | NoSetsEvent;

interface Context {
  deck: Card[];
  board: Card[];
  declaredCards: Card[];
  sets: Card[][];
  countdown: number;
}

export const setMachine = createMachine<Context>(
  {
    id: 'set',

    context: {
      deck: [],
      board: [],
      declaredCards: [],
      sets: [],
      countdown: 0,
    },

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
              NO_SETS: {
                actions: ['noSets'],
              },
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
  },
  {
    actions: {
      newGame: assign((ctx) => {
        const freshDeck = createDeck();
        const [board, deck] = drawCards(freshDeck, 12);

        return {
          ...ctx,
          board,
          deck,
        };
      }),

      setDeclaring: assign((ctx) => ({
        ...ctx,
        declaredCards: [],
      })),

      setIdle: assign((ctx) => ({
        ...ctx,
        declaredCards: [],
      })),

      addCard: assign({
        declaredCards: (ctx, event) => [
          ...ctx.declaredCards,
          (event as AddCardEvent).card,
        ],
      }),

      removeCard: assign({
        declaredCards: (ctx, event) =>
          ctx.declaredCards.filter(
            (c) => c !== (event as RemoveCardEvent).card,
          ),
      }),

      addSet: assign({
        sets: (ctx) => [...ctx.sets, ctx.declaredCards],
      }),

      removeSet: assign({
        sets: (ctx) => ctx.sets.slice(0, ctx.sets.length - 1),
      }),

      tickTimer: assign({
        countdown: (ctx) => ctx.countdown - 1,
      }),

      resetTimer: assign({
        countdown: (ctx) => SECONDS_TO_CHOOSE,
      }),

      noSets: assign((ctx) => {
        const [drawn, deck] = drawCards(ctx.deck, 3);
        const board = [...ctx.board, ...drawn];
        return {
          ...ctx,
          board,
          deck,
        };
      }),

      updateBoard: assign((ctx) => {
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
      stillDeclaring: (ctx) => ctx.declaredCards.length !== 3,

      isSet: (ctx) => isSet(ctx.declaredCards),

      timedOut: (ctx) => ctx.countdown <= 0,
    },
  },
);
