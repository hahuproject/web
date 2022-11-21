import React, { FunctionComponent, useEffect } from "react";
import { BackDrop, HideBackdrop, ShowBackdrop } from "./BackDrop";

type Props = {
  children: any;
};

export const OpenDrawer = () => {
  console.log("open drawer called");
  console.log(window.innerWidth);
  if (window.innerWidth > 900) {
    return;
  }
  document.getElementById("drawer").className = "drawer drawer--open";
  ShowBackdrop();
};
export const CloseDrawer = () => {
  // console.log("close drawer called");
  document.getElementById("drawer").className = "drawer";
  HideBackdrop();
};

// const handleResponsive = (e) => {
//   console.log(e);
//   console.log(window.innerWidth);

//   if (window.innerWidth > 900) {
//     CloseDrawer();
//   }
// };

export const Drawer: FunctionComponent<Props> = ({ children }) => {
  // useEffect(() => {
  //   window.addEventListener("resize", handleResponsive);
  //   return window.removeEventListener("resize", handleResponsive);
  // }, []);

  return (
    <>
      <BackDrop onClick={() => CloseDrawer()} />
      <div id="drawer" className="drawer">
        {children}
      </div>
    </>
  );
};
