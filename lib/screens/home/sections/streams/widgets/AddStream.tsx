import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ClassLoading,
  useClass,
} from "../../../../../providers/class/ClassProvider";
import { CourseLoading } from "../../../../../providers/course/CourseProvider";
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
import { InputField, InputFieldType } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";

type Props = {
  show: boolean;
  toggleShow: (v) => void;
};

export const AddStream: FunctionComponent<Props> = ({ show, toggleShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { departments, AddStream, loading, error, setError } = useDepartment();

  useEffect(() => {}, []);

  const onSubmit = (data) => {
    console.log(data);
    AddStream(
      {
        Name: data["name"],
        Department: departments.filter((e) => e.ID == data["department"])[0],
      },
      () => {
        alert("Successfully added stream");
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
          <div> Add Stream </div>,
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
          <div>
            <InputField
              label="Name"
              placeholder="Enter stream name"
              refs={register("name", {
                required: "Field is required",
                minLength: { value: 2, message: "Minimum characters 2" },
              })}
              error={errors["name"]}
            />
            {!!departments && (
              <DropDown
                label="Department"
                options={
                  departments &&
                  departments.map((e) => {
                    return { name: e.Name, value: e.ID };
                  })
                }
                refs={register("department", { required: "Field is required" })}
                error={errors["department"]}
              />
            )}
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == DepartmentLoading.AddingStream ? (
              <IdsRing />
            ) : (
              "Add Stream"
            )}
          </Button>,
        ]}
      />
    </>
  );
};
