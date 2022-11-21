import React, { FunctionComponent, memo, useEffect } from "react";

type Props = {
  leading?: any;
  content: any;
  actions?: any;
};

export const SidePanelItems: FunctionComponent<Props> = memo(
  ({ leading, content, actions }) => {
    return (
      <div className="side-panel-items">
        <div className="side-panel-items__leading">{leading}</div>
        <div className="side-panel-items__content">{content}</div>
        <div className="side-panel-items__actions">{actions}</div>
      </div>
    );
  },
  () => false
);
