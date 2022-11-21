import React, { FunctionComponent } from "react";

/*

TYPES 
[
  NORMAL(),OUTLINED(outlined),FLAT(flat)
]

COLORS
[
  PRIMARY(primary), MAIN(main)
]

SIZES
[
  SMALL(s), MEDIUM(m), LARGE(l), EXTRA LARGE(xl)
]

REPRESENTATIONS
[
  SIZE - button--s, button--m, ...
  TYPES,COLOR - button--primary(Normal button with primary color),
              - button--flat--primary(Flat button with primary color)
]

*/

export enum ButtonSize {
  SMALL = "s",
  MEDIUM = "m",
  LARGE = "l",
  XTRALARGE = "xl",
}

export enum ButtonColor {
  PRIMARY = "primary",
  MAIN = "main",
  WHITE = "white",
  DANGER = "danger",
}

export enum ButtonType {
  NORMAL = "normal",
  OUTLINED = "outlined",
  FLAT = "flat",
}

type Props = {
  children: string | any;
  leading?: FunctionComponent | any;
  trailing?: FunctionComponent | null;
  type?: ButtonType;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  onClick: Function;
};

export const Button: FunctionComponent<Props> = ({
  leading = null,
  trailing = null,
  size = ButtonSize.MEDIUM,
  color = ButtonColor.PRIMARY,
  type = ButtonType.NORMAL,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <div
      onClick={() => onClick()}
      className={`button button--${size} button--${type}--${color} ${
        disabled && "button--disabled"
      }`}
    >
      <div className="button__leading">{leading}</div>
      <div className="button__content">{children}</div>
      <div className="button__trailing">{trailing}</div>
    </div>
  );
};
