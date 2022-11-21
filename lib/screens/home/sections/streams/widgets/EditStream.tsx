import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "../../../../../models/Stream";
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
import { InputField, InputFieldType } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";

type Props = {
  show: boolean;
  toggleShow: (v) => void;
  _stream: Stream;
};

export const EditStream: FunctionComponent<Props> = ({
  show,
  toggleShow,
  _stream,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { departments, UpdateStream, loading, error, setError } =
    useDepartment();

  useEffect(() => {}, []);

  const onSubmit = (data) => {
    console.log(data);
    UpdateStream(
      {
        ID: _stream && _stream.ID,
        Name: data["name"],
        Department: _stream && _stream.Department,
      },
      () => {
        alert("Successfully updated stream");
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
    if (!!_stream) {
      setValue("name", _stream.Name);
    }
  }, [_stream]);

  return (
    <>
      <AlertDialog show={!!error} content={error} />
      <Dialog
        show={show}
        title={[
          <div> Update Stream </div>,
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
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == DepartmentLoading.UpdatingStream ? (
              <IdsRing />
            ) : (
              "Update Stream"
            )}
          </Button>,
        ]}
      />
    </>
  );
};
