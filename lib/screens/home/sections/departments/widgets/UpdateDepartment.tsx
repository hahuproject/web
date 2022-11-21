import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Department } from "../../../../../models/Department";
import { User, USER_TYPES } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
import {
  DepartmentLoading,
  useDepartment,
} from "../../../../../providers/department/DepartmentProvider";
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonColor,
} from "../../../../../widgets/Button";
import { AlertDialog, Dialog } from "../../../../../widgets/Dialogs";
import { DropDown } from "../../../../../widgets/DropDown";
import { InputField } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";

type UpdateDepartmentProps = {
  show: boolean;
  toggleShow: (v) => void;
  department: Department;
};

export const UpdateDepartment: FunctionComponent<UpdateDepartmentProps> = ({
  show,
  toggleShow,
  department,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { loading, error, setError, UpdateDepartment } = useDepartment();

  const { users, GetUsers } = useAuth();

  const onSubmit = (data) => {
    var _department: Department = {
      ID: department.ID,
      Name: data.name,
      Head: users.filter((e) => e.ID == data.head)[0],
      Classes: department.Classes,
    };
    // console.log(_department);

    UpdateDepartment(
      _department,
      () => {
        alert("Successfully updated department");
        toggleShow(false);
      },
      () => {}
    );
  };

  useEffect(() => GetUsers(), []);

  useEffect(() => {
    if (!!department) {
      setValue("name", department.Name ?? "");
      setValue("head", department.Head.ID ?? "");
    }
  }, [show]);

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  return (
    <>
      <AlertDialog show={!!error} content={error} />
      <Dialog
        show={show}
        title={[
          <div> Update Department </div>,
          <Button
            size={ButtonSize.SMALL}
            type={ButtonType.OUTLINED}
            color={ButtonColor.DANGER}
            onClick={() => {
              toggleShow(false);
            }}
          >
            Cancel
          </Button>,
        ]}
        content={
          <div
            style={{
              display: "grid",
              gridAutoFlow: "row",
              rowGap: "1.2rem",
            }}
          >
            <InputField
              disabled={loading == DepartmentLoading.AddingDepartment}
              label="Name *"
              placeholder="Enter department name"
              refs={register("name", {
                required: { value: true, message: "Field is required" },
                minLength: {
                  value: 2,
                  message: "Name must be greater than 2 characters",
                },
              })}
              error={errors["name"]}
              name="name"
            />

            {/* <InputField label="Head" placeholder="Select department head" /> */}
            <DropDown
              label="Head"
              // placeholder="Select department head"
              refs={register("head", {
                required: "Field is required",
                validate: (v) => (!!v ? null : "Choose user"),
              })}
              error={errors["head"]}
              options={
                users &&
                users
                  .filter(
                    (e) => e.Type == USER_TYPES.DEPARTMENT_HEAD && e.Verified
                  )
                  .map((e) => ({
                    name: e.FirstName + " " + e.LastName,
                    value: e.ID,
                  }))
              }
            />
          </div>
        }
        actions={[
          <Button
            disabled={loading == DepartmentLoading.UpdatingDepartment}
            color={ButtonColor.MAIN}
            onClick={handleSubmit(onSubmit)}
          >
            {loading == DepartmentLoading.UpdatingDepartment ? (
              <IdsRing />
            ) : (
              "Update Department"
            )}
          </Button>,
        ]}
      />
    </>
  );
};
