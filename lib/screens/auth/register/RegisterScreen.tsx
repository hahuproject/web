import Router from "next/router";
import React, { FunctionComponent } from "react";
import {
  Button,
  ButtonType,
  ButtonColor,
  ButtonSize,
} from "../../../widgets/Button";
import { InputField, InputFieldType } from "../../../widgets/InputField";
import { IdsRing, IdsSpinner } from "../../../widgets/Loaders";
import { FormContainer } from "../widgets/FormContainer";
import { AdminForm } from "./widgets/AdminForm";

type Props = {
  regForm: any;
};

export const RegisterScreen: FunctionComponent<Props> = ({ regForm }) => {
  return (
    <div className="register">
      <FormContainer>
        <div className="register__form">
          <div className="register__form__label--heading">Sign Up</div>
          <div className="register__form__label--paragraph">
            Fill the following information to get registered
          </div>
          {regForm}
        </div>
      </FormContainer>
      <div className="register__login">
        Already have an account?{" "}
        <Button
          type={ButtonType.FLAT}
          color={ButtonColor.WHITE}
          size={ButtonSize.SMALL}
          onClick={() => {
            Router.push(`${"/auth/login"}`);
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
