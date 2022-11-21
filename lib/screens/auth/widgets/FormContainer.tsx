import React from "react";

export const FormContainer = ({ children }) => {
  return (
    <div className="auth_form_container">
      <div>
        <img src="/images/logo.png" alt="logo image" />
      </div>
      <div>{children}</div>
    </div>
  );
};
