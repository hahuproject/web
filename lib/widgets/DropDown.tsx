import React, { FunctionComponent } from "react";

type Props = {
  options?: { value: string | any; name: string }[];
  label: string;
  placeholder?: string;
  refs?: any;
  error?: { message: string };
  onChange?: (v: any) => void;
  defaultValue?: any;
  styles?: object;
  multiple?: boolean;
  size?: number;
};

export const DropDown: FunctionComponent<Props> = ({
  options = [],
  label,
  placeholder = "",
  refs = {},
  error,
  onChange = (v) => {},
  defaultValue,
  styles = {},
  multiple = false,
  size = 0,
  // name? ""
}) => {
  return (
    <div style={{ ...styles }} className="drop-down">
      <div
        className={`drop-down__label ${!!error && "drop-down__label--error"}`}
      >
        {label}
      </div>
      <select
        style={{
          height: size == 0 ? "4rem" : "auto",
        }}
        defaultValue={defaultValue && defaultValue}
        multiple={multiple}
        size={size}
        onChange={(v) => {
          console.log("olla", v.target.value);
          onChange(v.target.value);
        }}
        {...refs}
        className={`drop-down__select ${!!error && "drop-down__select--error"}`}
      >
        <option value="" selected disabled hidden>
          {placeholder || "Select"}
        </option>
        {options.map((e) => {
          return <option value={e.value}> {e.name} </option>;
        })}
      </select>
      {error && <div className="drop-down__error-label">{error.message}</div>}
    </div>
  );
};
