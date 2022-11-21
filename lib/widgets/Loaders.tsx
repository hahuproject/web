import React, { FunctionComponent } from "react";

export const IdsSpinner: FunctionComponent = () => {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      {/* <div></div>
      <div></div>
      <div></div>
      <div></div> */}
    </div>
  );
};

export const IdsRing: FunctionComponent = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
