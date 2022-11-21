import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "../../../../../models/Stream";
import {
  ClassLoading,
  useClass,
} from "../../../../../providers/class/ClassProvider";
import { CourseLoading } from "../../../../../providers/course/CourseProvider";
import { useDepartment } from "../../../../../providers/department/DepartmentProvider";
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

export const AddClass: FunctionComponent<Props> = ({ show, toggleShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { loading, error, setError, AddClass } = useClass();

  const { departments } = useDepartment();

  const [streams, setStreams] = useState<Stream[]>();

  const onSubmit = (data) => {
    console.log(data);
    AddClass(
      {
        Name: data["name"],
        SubName: data["subName"],
        Stream:
          !!streams && !!data["stream"]
            ? streams.filter((e) => e.ID == data["stream"])[0]
            : null,
        Department: departments.filter((e) => e.ID == data["department"])[0],
      },
      () => {
        alert("Successfully added class");
        toggleShow(false);
      },
      () => {}
    );
  };

  useEffect(() => {
    if (!!watch("department")) {
      setStreams(
        departments.filter((e) => e.ID == watch("department"))[0].Streams
      );
    }
  }, [watch("department")]);

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
          <div> Add Class </div>,
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
              placeholder="Enter class name"
              refs={register("name", {
                required: "Field is required",
                minLength: { value: 2, message: "Minimum characters 2" },
              })}
              error={errors["name"]}
            />
            <InputField
              label="Occupation"
              placeholder="Enter occupation"
              refs={register("subName")}
              error={errors["subName"]}
              name="subName"
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
            {!!departments && (
              <DropDown
                label="Stream"
                options={
                  streams &&
                  streams.map((e) => {
                    return { name: e.Name, value: e.ID };
                  })
                }
                refs={register("stream")}
                error={errors["stream"]}
              />
            )}
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == ClassLoading.AddingClass ? <IdsRing /> : "Add Class"}
          </Button>,
        ]}
      />
    </>
  );
};
