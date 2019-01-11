import React from 'react';
import { Card as CardModel } from '../../model/card';
import { Card } from '../Card';
import './index.scss';

export interface BoardProps {
  onClick: (card: CardModel) => void;
  cards: CardModel[];
  selected: CardModel[];
}

export function Board({ cards, onClick, selected }: BoardProps) {
  return (
    <div className="Board">
      <div className="Board__Inner">
        {cards.map(card => {
          const cardId = card.getId();
          const isSelected = selected.includes(card);
          return (
            <button
              key={cardId}
              onClick={() => onClick(card)}
              className="Board__CardButton"
            >
              <Card selected={isSelected} {...card} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
