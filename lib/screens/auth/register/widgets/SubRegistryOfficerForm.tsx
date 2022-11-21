import Router from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, USER_TYPES } from "../../../../models/User";
import { useAuth, AuthLoading } from "../../../../providers/auth/AuthProvider";
import { useDepartment } from "../../../../providers/department/DepartmentProvider";
import {
  Button,
  ButtonType,
  ButtonColor,
  ButtonSize,
} from "../../../../widgets/Button";
import { AlertDialog } from "../../../../widgets/Dialogs";
import { DropDown } from "../../../../widgets/DropDown";
import { InputField, InputFieldType } from "../../../../widgets/InputField";
import { IdsRing } from "../../../../widgets/Loaders";
import { PicPicker } from "./PicPicker";

type Props = {};

export const SubRegistryOfficerForm: FunctionComponent<Props> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const { loading, error, setError, Register: registerUser } = useAuth();

  const [proPic, setProPic] = useState<File>();

  const { departments, loading: departmentLoading } = useDepartment();

  const onSubmit = (data) => {
    console.log(data);
    console.log(proPic);
    const user: User = {
      FirstName: data.firstName,
      LastName: data.lastName,
      Email: data.email ?? "",
      Phone: data.phone ?? "",
      Username: data.username,
      Password: data.password,
      Address: {
        Country: data.country,
        Region: data.region ?? "",
        City: data.city ?? "",
        SubCity: data.subCity ?? "",
        Woreda: data.woreda ?? 0,
        HouseNo: data.houseNo ?? "",
      },
      ProfilePic: proPic,
      Department: { ID: data.department, Name: "" },
      Type: USER_TYPES.SUB_REGISTRY_OFFICER,
    };

    registerUser(
      user,
      () => {
        if (!!Router.query["red"]) {
          Router.replace("/");
        } else {
          Router.replace("/auth/login");
        }
      },
      () => {}
    );
  };

  // console.log(loading);

  useEffect(() => {
    console.log(departments);
    console.log(departmentLoading);
  }, [departmentLoading]);

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  return (
    <>
      <AlertDialog content={error} show={!!error} />
      <div className="register__form--sub-registry">
        <div
          style={{ gridArea: "personal_break" }}
          className="register__form__tag"
        >
          Personal
          <div />
        </div>
        <InputField
          refs={register("firstName", {
            required: { value: true, message: "Field is required" },
            minLength: {
              value: 2,
              message: "Name must be greater than 2 characters",
            },
            maxLength: {
              value: 15,
              message: "Name must be less than 15 characters",
            },
          })}
          error={errors["firstName"]}
          label="First Name"
          name="firstName"
          styles={{ gridArea: "fname" }}
          placeholder="Enter your first name"
        />
        <InputField
          refs={register("lastName", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["lastName"]}
          name="lastName"
          label="Last Name"
          styles={{ gridArea: "lname" }}
          placeholder="Enter your Last Name"
        />
        <InputField
          refs={register("email", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["email"]}
          label="Email"
          styles={{ gridArea: "email" }}
          placeholder="Enter your email"
        />
        <InputField
          refs={register("phone", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["phone"]}
          label="Phone"
          styles={{ gridArea: "phone" }}
          placeholder="Enter your phone"
        />
        <DropDown
          refs={register("department", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["department"]}
          label="Department *"
          styles={{ gridArea: "department" }}
          placeholder="Select department"
          options={
            !!departments
              ? departments.map((e) => {
                  return { name: e.Name, value: e.ID };
                })
              : []
          }
        />
        <div
          style={{ gridArea: "address_break" }}
          className="register__form__tag"
        >
          Address
          <div />
        </div>
        <InputField
          refs={register("country", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["country"]}
          label="Country"
          styles={{ gridArea: "country" }}
          placeholder="Enter your country"
        />
        <InputField
          refs={register("region", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["region"]}
          label="Region"
          styles={{ gridArea: "region" }}
          placeholder="Enter your region"
        />
        <InputField
          refs={register("city", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["city"]}
          label="City"
          styles={{ gridArea: "city" }}
          placeholder="Enter your city"
        />
        <InputField
          refs={register("subCity", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["subCity"]}
          label="Sub City"
          name="subCity"
          styles={{ gridArea: "sub_city" }}
          placeholder="Enter your sub city"
        />
        <InputField
          refs={register("woreda", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["woreda"]}
          label="Woreda"
          styles={{ gridArea: "woreda" }}
          type={InputFieldType.NUMBER}
          placeholder="Enter your woreda"
        />
        <InputField
          refs={register("houseNo", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["houseNo"]}
          label="House No"
          name="houseNo"
          styles={{ gridArea: "house_no" }}
          // type={InputFieldType.NUMBER}
          placeholder="Enter your house no"
        />
        <div
          style={{ gridArea: "account_break" }}
          className="register__form__tag"
        >
          Account
          <div />
        </div>
        <InputField
          refs={register("username", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["username"]}
          label="Username"
          styles={{ gridArea: "username" }}
          placeholder="Enter your username"
        />
        <InputField
          refs={register("password", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["password"]}
          label="Password"
          type={InputFieldType.PASSWORD}
          styles={{ gridArea: "password" }}
          placeholder="Enter your password"
        />
        <InputField
          refs={register("confirmPassword", {
            required: { value: true, message: "Field is required" },
            validate: (v) => {
              if (v == watch("password")) {
                return null;
              }
              return "Passwords did not match";
            },
          })}
          error={errors["confirmPassword"]}
          label="Confirm Passwod"
          name="confirmPassword"
          type={InputFieldType.PASSWORD}
          styles={{ gridArea: "confirm_password" }}
          placeholder="Confirm your password"
        />
        <div style={{ height: "100%", width: "100%", gridArea: "pic" }}>
          <PicPicker onChange={(v) => setProPic(v)} />
        </div>
      </div>
      <div style={{ height: "2.4rem" }} />
      <div className="register__form__action">
        <Button
          disabled={loading == AuthLoading.REGISTER}
          type={ButtonType.NORMAL}
          color={ButtonColor.MAIN}
          size={ButtonSize.LARGE}
          leading={null}
          trailing={null}
          onClick={handleSubmit(onSubmit)}
        >
          {loading == AuthLoading.REGISTER ? <IdsRing /> : "    Sign Up   "}
        </Button>
      </div>
    </>
  );
};
