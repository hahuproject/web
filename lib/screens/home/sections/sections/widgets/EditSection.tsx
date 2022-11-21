import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Section } from "../../../../../models/Section";
import { useClass } from "../../../../../providers/class/ClassProvider";
import {
  SectionLoading,
  useSection,
} from "../../../../../providers/section/SectionProvider";
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
  toggleShow: (v: boolean) => void;
  section: Section;
};

export const EditSection: FunctionComponent<Props> = ({
  show,
  toggleShow,
  section,
}) => {
  const { loading, error, setError, UpdateSection } = useSection();

  const { classes } = useClass();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    UpdateSection(
      {
        ID: !!section && section.ID,
        Year: Number.parseInt(data["year"]),
        Name: data["name"],
        Class: !!section && section.Class,
      },
      () => {
        alert("successfully updated section");
        toggleShow(false);
      },
      () => {}
    );
  };

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }

  useEffect(() => {
    if (!!section) {
      setValue("name", section.Name);
      setValue("year", section.Year);
    }
  }, [section]);

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div> Update Section </div>,
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
              placeholder="Enter section name"
              refs={register("name", {
                required: "Field is required",
                minLength: { value: 2, message: "Minimum characters 2" },
              })}
              error={errors["name"]}
            />
            <InputField
              label="Year (GC)"
              placeholder="Enter section year"
              type={InputFieldType.NUMBER}
              refs={register("year", {
                required: "Field is required",
                min: {
                  value: 2000,
                  message: "Minimum year allowed is 2000GC",
                },
                max: {
                  value: 2022,
                  message: "Maximum year allowed is 2020GC",
                },
              })}
              error={errors["year"]}
            />
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == SectionLoading.UpdatingSection ? (
              <IdsRing />
            ) : (
              "Update Section"
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
