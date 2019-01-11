import { Machine, actions } from 'xstate';
import { Card } from '../model/card';
import { isSet } from '../utils/isSet';
const { assign } = actions;

const SECONDS_TO_CHOOSE = 3;

interface Schema {
  states: {
    menu: {};
    game: {
      states: {
        idle: {};
        declaring: {
          states: {
            timer: {};
            choosing: {
              states: {
                idle: {};
                addCard: {};
                removeCard: {};
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

type StartEvent = EventType<'START'>;
type DeclareEvent = EventType<'DECLARE'>;
type AddCardEvent = EventType<'ADD_CARD', { card: Card }>;
type RemoveCardEvent = EventType<'REMOVE_CARD', { card: Card }>;

type Event = StartEvent | DeclareEvent | AddCardEvent | RemoveCardEvent;

interface Context {
  deck: Card[];
  board: Card[];
  chosenCards: Card[];
  sets: Card[][];
  countdown: number;
}

const setMachine = Machine<Context, Schema, Event>(
  {
    id: 'set',
    context: {
      deck: [],
      board: [],
      chosenCards: [],
      sets: [],
      countdown: 0,
    },
    initial: 'menu',
    states: {
      menu: {
        on: {
          START: 'game',
        },
      },
      game: {
        initial: 'idle',
        onEntry: ['newGame'],
        states: {
          idle: {
            on: {
              DECLARE: 'declaring',
            },
          },
          declaring: {
            onEntry: ['resetTimer'],
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
                      ADD_CARD: 'addCard',
                      REMOVE_CARD: 'removeCard',
                    },
                  },
                  addCard: {
                    on: {
                      '': {
                        target: 'checkSet',
                        actions: ['addCard'],
                      },
                    },
                  },
                  removeCard: {
                    on: {
                      '': { target: 'idle', actions: ['removeCard'] },
                    },
                  },
                  checkSet: {
                    on: {
                      '': [
                        {
                          target: '#set.game.idle',
                          cond: 'isSet',
                          actions: ['addSet'],
                        },
                        { target: 'idle', actions: ['removeSet'] },
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
      addCard: assign<Context, AddCardEvent>({
        chosenCards: (ctx, event) => [...ctx.chosenCards, event.card],
      }),

      removeCard: assign<Context, RemoveCardEvent>({
        chosenCards: (ctx, event) =>
          ctx.chosenCards.filter(c => c !== event.card),
      }),

      addSet: assign<Context>({
        sets: ctx => [...ctx.sets, ctx.chosenCards],
      }),

      removeSet: assign<Context>({
        sets: ctx => ctx.sets.slice(0, ctx.sets.length - 2),
      }),

      tickTimer: assign<Context>({
        countdown: ctx => ctx.countdown - 1,
      }),

      resetTimer: assign<Context>({
        countdown: () => SECONDS_TO_CHOOSE,
      }),
    },

    guards: {
      isSet: ctx => isSet(ctx.chosenCards),

      timedOut: ctx => ctx.countdown <= 0,
    },
  },
);
