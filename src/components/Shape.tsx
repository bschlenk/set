import React from 'react';
import { Color, Shade, Shape as ShapeAttr } from '../model/attributes';
import { COLOR_RED, COLOR_GREEN, COLOR_PURPLE } from '../variables';

export interface ShapeProps {
  color: Color;
  shade: Shade;
  shape: ShapeAttr;
}

const diamond = <path d="M9.231 40L80 8.547 150.769 40 80 71.453z" />;
const oval = (
  <path d="M39.496 8.494C22.102 8.494 8.001 22.6 8 40c0 17.4 14.101 31.507 31.496 31.507h81.008C137.899 71.506 152 57.4 152 39.999c0-17.4-14.102-31.505-31.496-31.505z" />
);
const squiggle = (
  <path d="M46.283 17.427c11.677 0 22.697 8.924 36.997 8.924 29.542 0 43.903-18.11 56.413-18.11 7.871 0 11.807 4.412 11.807 11.023 0 40.116-38.016 48.296-44.606 48.296-21.864 0-37.783-6.562-47.754-6.562-9.97 0-24.664 10.761-34.11 10.761-9.446 0-16.53-6.824-16.53-14.698 0-16.799 14.038-39.634 37.783-39.634z" />
);

const getShape = (shape: ShapeAttr) => {
  switch (shape) {
    case ShapeAttr.DIAMOND:
      return diamond;
    case ShapeAttr.OVAL:
      return oval;
    case ShapeAttr.SQUIGGLE:
      return squiggle;
  }
};

const getColor = (color: Color) => {
  switch (color) {
    case Color.RED:
      return COLOR_RED;
    case Color.GREEN:
      return COLOR_GREEN;
    case Color.PURPLE:
      return COLOR_PURPLE;
  }
};

const getShade = (shade: Shade, color: Color) => {
  const hexColor = getColor(color);
  switch (shade) {
    case Shade.NONE:
      return 'none';
    case Shade.FILLED:
      return hexColor;
    case Shade.STRIPED:
      return `url(#hatch-${color})`;
  }
};

export function Shape({ color, shade, shape }: ShapeProps) {
  const shapeEl = getShape(shape);
  const hexColor = getColor(color);
  const style: React.CSSProperties = {
    stroke: hexColor,
    strokeWidth: 4,
    fill: getShade(shade, color),
  };

  return (
    <svg viewBox="0 0 160 80" style={style}>
      <defs>
        <pattern
          id={`hatch-${color}`}
          width="8"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="10" style={{ strokeWidth: 2 }} />
        </pattern>
      </defs>
      {shapeEl}
    </svg>
  );
}
