import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
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
};

export const AddSection: FunctionComponent<Props> = ({ show, toggleShow }) => {
  const { loading, error, setError, AddSection } = useSection();

  const { classes } = useClass();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    AddSection(
      {
        Name: data["name"],
        Year: Number.parseInt(data["year"]),
        Class: classes.filter((e) => e.ID == data["class"])[0],
      },
      () => {
        alert("successfully added section");
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

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div> Add Section </div>,
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
                minLength: { value: 1, message: "Minimum characters 2" },
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
            {!!classes && (
              <DropDown
                label="Class"
                options={
                  classes &&
                  classes.map((e) => {
                    return { name: e.Name, value: e.ID };
                  })
                }
                refs={register("class", { required: "Field is required" })}
                error={errors["class"]}
              />
            )}
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == SectionLoading.AddingSection ? (
              <IdsRing />
            ) : (
              "Add Section"
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
