import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Course } from "../../../../../models/Course";
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
import { InputField, InputFieldType } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";

type Props = {
  show: boolean;
  toggleShow: (v) => void;
  course: Course;
};

export const EditCourseDialog: FunctionComponent<Props> = ({
  show,
  toggleShow,
  course,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { loading, error, setError, UpdateCourse } = useCourse();

  const onSubmit = (data) => {
    console.log(data);
    UpdateCourse(
      {
        ID: course.ID,
        Name: data["name"],
        CreditHr: data["creditHr"],
        Color: data["color"],
        Users: course.Users,
        Prerequisites: course.Prerequisites,
      },
      () => {
        alert("Successfully updated course");
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

  useEffect(() => {
    if (!!course) {
      setValue("name", course.Name);
      setValue("creditHr", course.CreditHr);
      setValue("color", course.Color);
    }
  }, [course]);

  return (
    <>
      <AlertDialog show={!!error} content={error} />
      <Dialog
        show={show}
        title={[
          <div> Edit Course </div>,
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
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == CourseLoading.UpdatingCourse ? (
              <IdsRing />
            ) : (
              "Update Course"
            )}
          </Button>,
        ]}
      />
    </>
  );
};
