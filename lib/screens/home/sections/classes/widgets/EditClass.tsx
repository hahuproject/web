import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Class } from "../../../../../models/Class";
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
  _class: Class;
};

export const EditClass: FunctionComponent<Props> = ({
  show,
  toggleShow,
  _class,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { loading, error, setError, UpdateClass } = useClass();

  const { departments } = useDepartment();

  useEffect(() => {}, []);

  const onSubmit = (data) => {
    console.log(data);
    UpdateClass(
      {
        ID: _class && _class.ID,
        Name: data["name"],
        SubName: data["subName"],
        Stream: _class && _class.Stream,
        Department: _class && _class.Department,
      },
      () => {
        alert("Successfully updated class");
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
    if (!!_class) {
      setValue("name", _class.Name);
      setValue("subName", _class.SubName);
    }
  }, [_class]);

  return (
    <>
      <AlertDialog show={!!error} content={error} />
      <Dialog
        show={show}
        title={[
          <div> Update Class </div>,
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
              refs={register("subName", {
                required: "Field is required",
                minLength: { value: 2, message: "Minimum characters 2" },
              })}
              error={errors["subName"]}
              name="subName"
            />
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == ClassLoading.UpdatingClasses ? (
              <IdsRing />
            ) : (
              "Update Class"
            )}
          </Button>,
        ]}
      />
    </>
  );
};
