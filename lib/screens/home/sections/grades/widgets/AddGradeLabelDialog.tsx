import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { GradeLabelFromJSON } from "../../../../../models/Grade";
import {
  GradeLoading,
  useGrade,
} from "../../../../../providers/grade/GradeProvider";
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
  toggleShow: (v: boolean) => void;
};

export const AddGradeLabelDialog: FunctionComponent<Props> = ({
  show,
  toggleShow,
}) => {
  const { AddGradeLabel, loading, error, setError } = useGrade();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

  const onSubmit = (data) => {
    console.log(data);
    AddGradeLabel(
      {
        Label: data["label"],
        Min: Number.parseFloat(data["min"]),
        Max: Number.parseFloat(data["max"]),
      },
      () => {
        alert("Successfully added grade label");
        toggleShow(false);
      },
      () => {}
    );
  };

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div> Add Grade Label </div>,
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
              label="Label"
              placeholder="Enter grade label (eg. A+)"
              refs={register("label", {
                required: "Field is required",
              })}
              error={errors["label"]}
            />
            <InputField
              label="Minimum"
              placeholder="Enter minimum value"
              refs={register("min", {
                required: "Field is required",
              })}
              error={errors["min"]}
              type={InputFieldType.NUMBER}
            />
            <InputField
              label="Maximum"
              placeholder="Enter maximum value"
              refs={register("max", {
                required: "Field is required",
              })}
              error={errors["max"]}
              type={InputFieldType.NUMBER}
            />
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == GradeLoading.AddingGradeLabel ? (
              <IdsRing />
            ) : (
              " Add Grade Label "
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
