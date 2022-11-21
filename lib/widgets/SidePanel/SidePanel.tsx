import React, { FunctionComponent } from "react";

type Props = {
  children: any;
};

export const SidePanel: FunctionComponent<Props> = ({ children }) => {
  return <div className="side-panel">{children}</div>;
};
