import React from 'react';
import { Card as CardModel } from '../../model/card';
import { Card } from '../Card';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.scss';

export interface BoardProps {
  onClick: (card: CardModel) => void;
  cards: CardModel[];
  selected: CardModel[];
}

const getCssTransitionNames = (prefix: string) => ({
  enter: `${prefix}--enter`,
  enterActive: `${prefix}--enter-active`,
  exit: `${prefix}--exit`,
});

export function Board({ cards, onClick, selected }: BoardProps) {
  return (
    <div className="Board">
      <TransitionGroup className="Board__Inner">
        {cards.map(card => {
          const cardId = card.getId();
          const isSelected = selected.includes(card);
          return (
            <CSSTransition
              key={cardId}
              timeout={200}
              classNames={getCssTransitionNames('Board__CardButton')}
            >
              <button
                onClick={() => onClick(card)}
                className="Board__CardButton"
              >
                <Card selected={isSelected} {...card} />
              </button>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}
