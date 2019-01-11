import React from 'react';

import {
  Color,
  Shape as ShapeAttr,
  Count,
  Shade,
} from '../../model/attributes';
import { range } from '../../utils/range';
import { Shape } from '../Shape';

import './index.scss';

export interface CardProps {
  selected?: boolean;
  count: Count;
  color: Color;
  shape: ShapeAttr;
  shade: Shade;
}

export const Card = ({ count, selected, ...props }: CardProps) => (
  <div className={`Card ${selected ? 'Card--selected' : ''}`}>
    <div className="Card__RatioBox">
      <div className="Card__Shapes">
        {range(getCount(count), i => (
          <Shape key={i} {...props} />
        ))}
      </div>
    </div>
  </div>
);

const getCount = (count: Count) => {
  switch (count) {
    case Count.ONE:
      return 1;
    case Count.TWO:
      return 2;
    case Count.THREE:
      return 3;
  }
};
