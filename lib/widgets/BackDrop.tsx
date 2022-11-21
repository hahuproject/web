import React, { FunctionComponent } from "react";

type Props = {
  onClick: Function;
  show?: boolean;
};

export const ShowBackdrop = () => {
  document.getElementById("back-drop").className = "back-drop back-drop--show";
};

export const HideBackdrop = () => {
  document.getElementById("back-drop").className = "back-drop";
};

export const BackDrop: FunctionComponent<Props> = ({
  onClick,
  show = false,
}) => {
  return (
    <div
      id="back-drop"
      onClick={() => {
        console.log("backdrop clicked");
        onClick();
      }}
      className={`back-drop ${show && "back-drop--show"}`}
    ></div>
  );
};
