import React, { FunctionComponent, useEffect, useState } from "react";

type Props = {
  icon?: any;
  title: string;
  subTitle?: string;
  trailing?: any;
  active?: boolean;
  responsive?: boolean;
  onClick: Function;
};

export const SidePanelItem: FunctionComponent<Props> = ({
  icon,
  title,
  subTitle,
  trailing,
  active = false,
  responsive = true,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick()}
      className={
        responsive
          ? active
            ? "side-panel-item side-panel-item--responsive side-panel-item--active"
            : "side-panel-item side-panel-item--responsive"
          : "side-panel-item"
      }
    >
      <div className="side-panel-item__icon">{icon}</div>
      <div className="side-panel-item__title">
        <div className="side-panel-item__title--main">{title}</div>
        <div className="side-panel-item__title--sub">{subTitle}</div>
      </div>
      <div className="side-panel-item__trailing">{trailing}</div>
    </div>
  );
};

type ExpandingSidePanelItemProps = {
  // icon?: any;
  // title: string;
  // subTitle?: string;
  // active?: boolean;
  // responsive?: boolean;
  onClick: Function;
  parent: JSX.Element;
  children: JSX.Element[];
};

export const ExpandingSidePanelItem: FunctionComponent<ExpandingSidePanelItemProps> =
  ({ onClick, parent, children }) => {
    const [isExpanded, setExpanded] = useState(false);
    return (
      <div
        onClick={() => {
          onClick();
        }}
        className={`expanding-side-panel-item ${
          isExpanded && "expanding-side-panel-item--expand"
        }`}
      >
        <div
          onClick={() => {
            setExpanded((prev) => !prev);
          }}
          className="expanding-side-panel-item__parent"
        >
          {parent}
        </div>
        <div className="expanding-side-panel-item__children">{children}</div>
      </div>
    );
  };
