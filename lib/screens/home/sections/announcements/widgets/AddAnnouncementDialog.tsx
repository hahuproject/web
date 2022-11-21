import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import {
  AnnouncementLoading,
  useAnnouncement,
} from "../../../../../providers/announcement/AnnouncementProvider";
import { LibraryLoading } from "../../../../../providers/library/LibraryProvider";
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

export const AddAnnouncementDialog: FunctionComponent<Props> = ({
  show,
  toggleShow,
}) => {
  const { loading, error, setError, AddAnnouncement } = useAnnouncement();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    AddAnnouncement(
      {
        Title: data["title"],
        Message: data["message"],
      },
      () => {
        alert("Successfully added announcement");
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
          <div> Add Announcement </div>,
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
              label="Title"
              placeholder="Enter announcement title"
              refs={register("title", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Minimum characters allowed 2",
                },
              })}
              error={errors["title"]}
            />
            <InputField
              label="Message"
              placeholder="Enter announcement message"
              refs={register("message", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Minimum characters allowed 2",
                },
              })}
              error={errors["message"]}
            />
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == AnnouncementLoading.AddingAnnouncement ? (
              <IdsRing />
            ) : (
              " Add Announcement "
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
