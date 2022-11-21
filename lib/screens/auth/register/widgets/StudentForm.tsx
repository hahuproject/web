import Router from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, USER_TYPES } from "../../../../models/User";
import { useAuth, AuthLoading } from "../../../../providers/auth/AuthProvider";
import {
  DepartmentProvider,
  useDepartment,
} from "../../../../providers/department/DepartmentProvider";
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

export const StudentForm: FunctionComponent<Props> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const { loading, error, setError, Register: registerUser } = useAuth();

  const [proPic, setProPic] = useState<File>();

  const { loading: departmentLoading, departments } = useDepartment();

  const onSubmit = (data) => {
    console.log(data);
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
      Type: USER_TYPES.STUDENT,

      //Student Fields
      MiddleName: data["middleName"],
      Gender: data["gender"],
      BirthDate: data["birthDate"],
      BirthPlace: data["birthPlace"],
      Disability: data["disability"],
      PreviousSchool: data["previousSchool"],
      AvarageMarkForHighSchool: data["avarageMarkForHighSchool"],
      MatricResult: data["matricResult"],
      Program: data["program"],
      Stream:
        departments &&
        departments
          .filter((e) => e.ID == data["department"])[0]
          .Streams.filter((e) => e.ID == data["stream"])[0],
      Department:
        departments && departments.filter((e) => e.ID == data["department"])[0],
      EmergencyContactName: data["emergencyContactName"],
      EmergencyContactPhone: data["emergencyContactPhone"],
      EmergencyContactRelation: data["emergencyContactRelation"],
      EmergencyContactAddress: {
        Country: data["emergencyContactCountry"],
        Region: data["emergencyContactRegion"] ?? "",
        City: data["emergencyContactCity"] ?? "",
        SubCity: data["emergencyContactSubcity"] ?? "",
        Woreda: data["emergencyContactWoreda"] ?? 0,
        HouseNo: data["emergencyContactHouseNo"] ?? "",
      },
    };

    console.log(user);

    registerUser(
      user,
      () => {
        // console.log(Router.query);
        if (!!Router.query["red"]) {
          Router.replace("/");
        } else {
          Router.replace("/auth/login");
        }
      },
      () => {}
    );
  };

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
      <div className="register__form--student">
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
          label="First Name *"
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
          label="Last Name *"
          styles={{ gridArea: "lname" }}
          placeholder="Enter your Last Name"
        />
        <InputField
          refs={register("middleName", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["middleName"]}
          name="middleName"
          label="Middle Name *"
          styles={{ gridArea: "mname" }}
          placeholder="Enter your Middle Name"
        />
        <DropDown
          label="Gender  *"
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
          ]}
          styles={{ gridArea: "gender" }}
          refs={register("gender", {
            required: { value: true, message: "Field is required" },
          })}
        />
        <InputField
          refs={register("disability", {})}
          error={errors["disability"]}
          name="disability"
          label="Disability"
          styles={{ gridArea: "disability" }}
          placeholder="Specify a disability if you have one"
        />
        <InputField
          refs={register("birthDate", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["birthDate"]}
          name="birthDate"
          label="Birth Date *"
          type={InputFieldType.DATE}
          styles={{ gridArea: "birthDate" }}
          placeholder="Select Birth Date"
        />
        <InputField
          refs={register("birthPlace", {})}
          error={errors["birthPlace"]}
          name="birthPlace"
          label="Birth Place"
          styles={{ gridArea: "birthPlace" }}
          placeholder="Enter Birth Place"
        />
        <InputField
          refs={register("email", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["email"]}
          label="Email *"
          styles={{ gridArea: "email" }}
          placeholder="Enter your email"
        />
        <InputField
          refs={register("phone", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["phone"]}
          label="Phone *"
          styles={{ gridArea: "phone" }}
          placeholder="Enter your phone"
        />
        <div
          style={{ gridArea: "academic_break" }}
          className="register__form__tag"
        >
          Academics
          <div />
        </div>
        <InputField
          refs={register("previousSchool", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["previousSchool"]}
          label="Previous School *"
          styles={{ gridArea: "previousSchool" }}
          placeholder="Enter your previous school"
        />
        <InputField
          refs={register("avarageMarkForHighSchool", {
            required: { value: true, message: "Field is required" },
          })}
          type={InputFieldType.NUMBER}
          error={errors["avarageMarkForHighSchool"]}
          label="Average Mark For High School *"
          styles={{ gridArea: "averageMarkForHighSchool" }}
          placeholder="Enter your average mark for high school"
        />
        <InputField
          refs={register("matricResult", {
            required: { value: true, message: "Field is required" },
          })}
          type={InputFieldType.NUMBER}
          error={errors["matricResult"]}
          label="Matric Result *"
          styles={{ gridArea: "matricResult" }}
          placeholder="Enter your matric result"
        />
        <DropDown
          refs={register("program", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["program"]}
          label="Program *"
          styles={{ gridArea: "program" }}
          placeholder="Select program"
          options={[
            { name: "Regular", value: "regular" },
            { name: "Extension", value: "extension" },
          ]}
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
            departments &&
            departments.map((e) => {
              return { name: e.Name, value: e.ID };
            })
          }
        />
        <DropDown
          refs={register("stream")}
          error={errors["stream"]}
          label="Stream *"
          styles={{ gridArea: "class" }}
          placeholder="Select stream"
          options={
            !!watch("department") && !!departments
              ? [].concat.apply(
                  [],
                  departments
                    .filter((e) => e.ID == watch("department"))
                    .map((e) =>
                      e.Streams.map((_class) => ({
                        name: _class.Name,
                        value: _class.ID,
                      }))
                    )
                )
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
          label="Country *"
          styles={{ gridArea: "country" }}
          placeholder="Enter your country"
        />
        <InputField
          refs={register("region", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["region"]}
          label="Region *"
          styles={{ gridArea: "region" }}
          placeholder="Enter your region"
        />
        <InputField
          refs={register("city", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["city"]}
          label="City *"
          styles={{ gridArea: "city" }}
          placeholder="Enter your city"
        />
        <InputField
          refs={register("subCity", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["subCity"]}
          label="Sub City *"
          name="subCity"
          styles={{ gridArea: "sub_city" }}
          placeholder="Enter your sub city"
        />
        <InputField
          refs={register("woreda", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["woreda"]}
          label="Woreda *"
          styles={{ gridArea: "woreda" }}
          type={InputFieldType.NUMBER}
          placeholder="Enter your woreda"
        />
        <InputField
          refs={register("houseNo", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["houseNo"]}
          label="House No *"
          name="houseNo"
          styles={{ gridArea: "house_no" }}
          // type={InputFieldType.NUMBER}
          placeholder="Enter your house no"
        />
        <div
          style={{ gridArea: "emergency_contact_break" }}
          className="register__form__tag"
        >
          Emergency Contact
          <div />
        </div>
        <InputField
          refs={register("emergencyContactName", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactName"]}
          label="Emergency contact name *"
          styles={{ gridArea: "emergencyContactName" }}
          placeholder="Enter your emergency contact name"
        />
        <InputField
          refs={register("emergencyContactPhone", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactPhone"]}
          label="Emergency contact phone *"
          styles={{ gridArea: "emergencyContactPhone" }}
          placeholder="Enter your emergency contact phone"
        />
        <InputField
          refs={register("emergencyContactRelation", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactRelation"]}
          label="Emergency contact relation *"
          styles={{ gridArea: "emergencyContactRelation" }}
          placeholder="Enter your emergency contact relation"
        />
        <div
          style={{ gridArea: "emergency_contact_address_break" }}
          className="register__form__tag"
        >
          Emergency Contact Address
          <div />
        </div>
        <InputField
          refs={register("emergencyContactCountry", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactCountry"]}
          label="Country *"
          styles={{ gridArea: "emergencyContactCountry" }}
          placeholder="Enter your emergencyContactCountry"
        />
        <InputField
          refs={register("emergencyContactRegion", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactRegion"]}
          label="Region *"
          styles={{ gridArea: "emergencyContactRegion" }}
          placeholder="Enter your emergencyContactRegion"
        />
        <InputField
          refs={register("emergencyContactCity", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactCity"]}
          label="City *"
          styles={{ gridArea: "emergencyContactCity" }}
          placeholder="Enter your emergencyContactCity"
        />
        <InputField
          refs={register("emergencyContactSubcity", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactSubcity"]}
          label="Sub City *"
          name="emergencyContactSubcity"
          styles={{ gridArea: "emergencyContactSubcity" }}
          placeholder="Enter your emergencyContactSubcity"
        />
        <InputField
          refs={register("emergencyContactWoreda", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactWoreda"]}
          label="Woreda *"
          styles={{ gridArea: "emergencyContactWoreda" }}
          type={InputFieldType.NUMBER}
          placeholder="Enter your emergencyContactWoreda"
        />
        <InputField
          refs={register("emergencyContactHouseNo", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["emergencyContactHouseNo"]}
          label="House No *"
          name="emergencyContactHouseNo"
          styles={{ gridArea: "emergencyContactHouseNo" }}
          // type={InputFieldType.NUMBER}
          placeholder="Enter your emergencyContactHouseNo"
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
          label="Username *"
          styles={{ gridArea: "username" }}
          placeholder="Enter your username"
        />
        <InputField
          refs={register("password", {
            required: { value: true, message: "Field is required" },
          })}
          error={errors["password"]}
          label="Password *"
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
          label="Confirm Passwod *"
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
          // onClick={() => {
          //   console.log(!!Router.query["red"]);
          // }}
        >
          {loading == AuthLoading.REGISTER ? <IdsRing /> : "    Sign Up   "}
        </Button>
      </div>
    </>
  );
};
