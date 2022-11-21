import React, {
  ForwardRefExoticComponent,
  forwardRef,
  useState,
  FunctionComponent,
} from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./Icons";

export enum InputFieldType {
  TEXT = "text",
  PASSWORD = "password",
  NUMBER = "number",
  FILE = "file",
  COLOR = "color",
  DATE = "date",
  DATE_TIME_LOCAL = "datetime-local",
  DATE_TIME = "datetime",
  TIME = "time",
}

export enum InputFieldSize {
  SMALL = "s",
  MEDIUM = "m",
}

type Props = {
  type?: InputFieldType | null;
  error?: { message: string };
  label?: any | null;
  placeholder?: any | null;
  prefix?: any | null;
  prefixWidget?: any | null;
  suffix?: any | null;
  suffixWidget?: any | null;
  setQuery?: any | null;
  name?: any | null;
  capitalize?: any | null;
  autoComplete?: any | null;
  value?: any | null;
  theme?: any | null;
  bg?: any | null;
  disabled?: any | null;
  styles?: any;
  post?: string;
  size?: InputFieldSize;
  onChange?: (v: string) => void;
  refs?: any;
  other?: any;
  onKeyDown?: (v) => void;
};

export const InputField: FunctionComponent<Props> = ({
  type = InputFieldType.TEXT,
  error = null,
  label = "",
  placeholder = "",
  prefix = "",
  prefixWidget = "",
  suffix = "",
  suffixWidget = "",
  setQuery,
  name: preName,
  capitalize = "off",
  autoComplete,
  value,
  theme,
  bg,
  disabled,
  styles,
  size = InputFieldSize.MEDIUM,
  onChange = (v) => {},
  refs = {},
  other,
  onKeyDown = (v) => {},
}) => {
  const name =
    preName || (label ? label.toString().toLowerCase().replace(" ", "") : "");

  // console.log(error);

  const [isHidden, toggleHidden] = useState(true);

  return (
    <div style={{ ...styles }} className="input-field">
      <div className="input-field__label">
        <div
          className={
            !!error
              ? "input-field__label input-field__label--error"
              : "input-field__label"
          }
        >
          {label}
        </div>
      </div>
      <div
        style={{
          backgroundColor: bg || "transparent",
        }}
        className={
          !!error
            ? `input-field__input input-field__input--error input-field__input--${size}`
            : `input-field__input input-field__input--${size}`
        }
      >
        {prefix && <div className="input-field__prefix">{prefix}</div>}
        {prefixWidget && <div>PrefixWidget</div>}
        <input
          onKeyDown={onKeyDown}
          onChange={(v) => onChange(v.target.value)}
          readOnly={disabled}
          className={theme == "light" ? theme : ""}
          {...refs}
          {...other}
          // name={name}
          // defaultValue={value && value}
          value={value && value}
          autoCapitalize={capitalize}
          placeholder={placeholder || ""}
          type={isHidden ? type : "text" || "text"}
          // onKeyDown={(e: any) => {
          //   if (e.key == "Enter") {
          //     setQuery(e.target.value);
          //   }
          // }}
        />
        {type == InputFieldType.PASSWORD &&
          (isHidden ? (
            <EyeFilledIcon
              height={1.6}
              width={1.6}
              color="black"
              onClick={() => toggleHidden((prev) => !prev)}
            />
          ) : (
            <EyeSlashFilledIcon
              height={1.6}
              width={1.6}
              color="black"
              onClick={() => toggleHidden((prev) => !prev)}
            />
          ))}
        {suffix && <div className="input-field__suffix">{suffix}</div>}
        {suffixWidget && (
          <div className="input-field__suffix-widget">{suffixWidget}</div>
        )}
      </div>
      {error && <div className="input-field__error-label">{error.message}</div>}
    </div>
  );
};
