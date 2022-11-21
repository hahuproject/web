import React, { FunctionComponent, useState } from "react";

type Props = {
  label?: string;
  onChange: Function;
  value?: boolean;
  disabled?: boolean;
};

export const CheckBox: FunctionComponent<Props> = ({
  label,
  onChange,
  value,
  disabled = false,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      onClick={() => {
        if (!!!disabled) {
          setChecked((prev) => {
            onChange(!prev);
            return !prev;
          });
        }
      }}
      className={
        value != null
          ? value
            ? `check-box ${
                disabled && "check-box--disabled"
              } check-box--checked`
            : `check-box ${disabled && "check-box--disabled"}`
          : checked
          ? `check-box ${disabled && "check-box--disabled"} check-box--checked`
          : `check-box ${disabled && "check-box--disabled"}`
      }
    >
      <div className="check-box__box"></div>
      {label && <div className="check-box__label">{label}</div>}
    </div>
  );
};
