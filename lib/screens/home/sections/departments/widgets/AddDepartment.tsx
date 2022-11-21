import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { Department } from "../../../../../models/Department";
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
import { InputField } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";

type AddDepartmentProps = {
  show: boolean;
  toggleShow: (v) => void;
};

export const AddDepartment: FunctionComponent<AddDepartmentProps> = ({
  show,
  toggleShow,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error, setError, AddDepartment } = useDepartment();

  const onSubmit = (data) => {
    console.log(data);
    var _department: Department = {
      Name: data.name,
    };
    AddDepartment(
      _department,
      () => {
        alert("Successfully added department");
        toggleShow(false);
      },
      () => {}
    );
  };

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
          <div> Add Department </div>,
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
          </div>
        }
        actions={[
          <Button
            disabled={loading == DepartmentLoading.AddingDepartment}
            color={ButtonColor.MAIN}
            onClick={handleSubmit(onSubmit)}
          >
            {loading == DepartmentLoading.AddingDepartment ? (
              <IdsRing />
            ) : (
              "Add Department"
            )}
          </Button>,
        ]}
      />
    </>
  );
};
