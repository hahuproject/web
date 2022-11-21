import React, { FunctionComponent } from "react";
import { BackDrop, HideBackdrop, ShowBackdrop } from "./BackDrop";
import { ExclamationCircleIcon } from "./Icons";

type DialogProps = {
  title?: JSX.Element[];
  content: JSX.Element;
  actions?: JSX.Element[];
  show?: boolean;
  toggleShow?: Function;
};

export const Dialog: FunctionComponent<DialogProps> = ({
  title,
  content,
  actions,
  show = false,
  toggleShow = () => {},
}) => {
  return (
    <>
      <BackDrop show={show} onClick={toggleShow} />
      <div className={`dialog ${show && "dialog--show"}`}>
        <div className="dialog__title">{title}</div>
        <div className="dialog__content">{content}</div>
        <div className="dialog__actions">{actions}</div>
      </div>
    </>
  );
};

type AlertDialogProps = {
  content?: string;
  show?: boolean;
};

export const AlertDialog: FunctionComponent<AlertDialogProps> = ({
  content,
  show = false,
}) => {
  return (
    <div className={`alert-dialog ${show && "alert-dialog--show"}`}>
      <div className="alert-dialog__leading">
        <ExclamationCircleIcon color="white" />
      </div>
      <div className="alert-dialog__content">{content}</div>
    </div>
  );
};
