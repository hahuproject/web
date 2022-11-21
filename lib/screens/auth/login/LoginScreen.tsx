import Router from "next/router";
import React, { RefAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthLoading, useAuth } from "../../../providers/auth/AuthProvider";
import {
  Button,
  ButtonType,
  ButtonColor,
  ButtonSize,
} from "../../../widgets/Button";
import { CheckBox } from "../../../widgets/CheckBox";
import { AlertDialog, Dialog } from "../../../widgets/Dialogs";
import { InputField, InputFieldType } from "../../../widgets/InputField";
import { IdsRing } from "../../../widgets/Loaders";
import { FormContainer } from "../widgets/FormContainer";

export const LoginScreen = () => {
  const { user, loading, error, setError, Login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, save });
    Login(data.username, data.password, save, () => {
      Router.push("/");
    });
  };
  const [save, setSave] = useState(false);

  const [showRegisterDialog, toggleShowRegisterDialog] = useState(false);

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  console.log(loading == AuthLoading.LOGIN);

  return (
    <div className="login">
      <Dialog
        show={showRegisterDialog}
        title={[<div> Register As</div>]}
        content={
          <div
            style={{ display: "grid", gridAutoFlow: "row", rowGap: "1.2rem" }}
          >
            <Button
              size={ButtonSize.MEDIUM}
              onClick={() => {
                toggleShowRegisterDialog(false);
                Router.push("/auth/register/admin");
              }}
            >
              Admin
            </Button>
            <Button
              size={ButtonSize.MEDIUM}
              onClick={() => {
                toggleShowRegisterDialog(false);
                Router.push("/auth/register/registry-officer");
              }}
            >
              Registry Officer
            </Button>
            <Button
              size={ButtonSize.MEDIUM}
              onClick={() => {
                toggleShowRegisterDialog(false);
                Router.push("/auth/register/department-head");
              }}
            >
              Department Head
            </Button>
            <Button
              size={ButtonSize.MEDIUM}
              onClick={() => {
                toggleShowRegisterDialog(false);
                Router.push("/auth/register/instructor");
              }}
            >
              Instructor
            </Button>
            <Button
              size={ButtonSize.MEDIUM}
              onClick={() => {
                toggleShowRegisterDialog(false);
                Router.push("/auth/register/supervisor");
              }}
            >
              Supervisor
            </Button>
            <Button
              size={ButtonSize.MEDIUM}
              onClick={() => {
                toggleShowRegisterDialog(false);
                Router.push("/auth/register/student");
              }}
            >
              Student
            </Button>
          </div>
        }
        toggleShow={() => toggleShowRegisterDialog((prev) => !prev)}
      />
      <AlertDialog content={error} show={!!error} />
      <FormContainer>
        <div className="login__form">
          <div className="login__form__label--heading">Sign In</div>
          <div className="login__form__label--paragraph">
            Enter your username and password to get access to the panel
          </div>
          <InputField
            disabled={loading == AuthLoading.LOGIN}
            label="Username"
            placeholder="Enter your username"
            refs={register("username", {
              required: { value: true, message: "Field is required" },
              minLength: {
                value: 5,
                message: "Username must be greater than 5 characters",
              },
            })}
            error={errors["username"]}
          />
          <div style={{ height: "1.2rem" }} />
          <InputField
            disabled={loading == AuthLoading.LOGIN}
            label="Password"
            type={InputFieldType.PASSWORD}
            placeholder="Enter your password"
            refs={register("password", {
              required: { value: true, message: "Field is required" },
              minLength: {
                value: 6,
                message: "Password must be greater than 6 characters",
              },
            })}
            error={errors["password"]}
          />
          <div style={{ paddingLeft: ".8rem", justifySelf: "flex-start" }}>
            <CheckBox
              disabled={loading == AuthLoading.LOGIN}
              value={save}
              onChange={(v) => {
                setSave(v);
              }}
              label="Remember me"
            />
          </div>
          <div style={{ height: "2.4rem" }} />
          <Button
            type={ButtonType.NORMAL}
            color={ButtonColor.MAIN}
            size={ButtonSize.LARGE}
            leading={null}
            trailing={null}
            onClick={() => {
              if (loading != AuthLoading.LOGIN) {
                handleSubmit(onSubmit)();
              }
            }}
          >
            {loading == AuthLoading.LOGIN ? <IdsRing /> : "Sign In"}
          </Button>
        </div>
      </FormContainer>
      <div className="login__register">
        Don't have an account?{" "}
        <Button
          type={ButtonType.FLAT}
          color={ButtonColor.WHITE}
          size={ButtonSize.SMALL}
          onClick={() => {
            // Router.push("/auth/register/admin");
            toggleShowRegisterDialog(true);
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};
