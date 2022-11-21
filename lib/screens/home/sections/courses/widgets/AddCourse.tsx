import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import {
  CourseLoading,
  useCourse,
} from "../../../../../providers/course/CourseProvider";
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

export const AddCourse: FunctionComponent<Props> = ({ show, toggleShow }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error, setError, AddCourse, courses } = useCourse();

  const onSubmit = (data) => {
    console.log(data);

    AddCourse(
      {
        Name: data["name"],
        CreditHr: data["creditHr"],
        Color: data["color"],
        Prerequisites:
          data["prerequisites"] != ""
            ? (data["prerequisites"] as string[]).map(
                (e) => courses.filter((ec) => e == ec.ID)[0]
              )
            : [],
      },
      () => {
        alert("Successfully added course");
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
          <div> Add Course </div>,
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
              placeholder="Enter course name"
              refs={register("name", {
                required: "Field is required",
                minLength: { value: 2, message: "Minimum characters 2" },
              })}
              error={errors["name"]}
            />
            <InputField
              label="Credit Hour"
              placeholder="Enter course credit hour"
              type={InputFieldType.NUMBER}
              refs={register("creditHr", {
                required: "Field is required",
              })}
              error={errors["creditHr"]}
              name="creditHr"
            />
            <InputField
              type={InputFieldType.COLOR}
              label="Color"
              placeholder="Enter course color (in hex format)"
              refs={register("color", {
                required: "Field is required",
              })}
              error={errors["color"]}
            />
            <DropDown
              label="Prerequisite"
              // placeholder="Select department head"
              refs={register("prerequisites")}
              error={errors["prerequisites"]}
              multiple
              size={!!courses ? courses.length : 0}
              options={
                courses &&
                courses.map((e) => ({
                  name: e.Name,
                  value: e.ID,
                }))
              }
            />
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == CourseLoading.AddingCourse ? <IdsRing /> : "Add Course"}
          </Button>,
        ]}
      />
    </>
  );
};
