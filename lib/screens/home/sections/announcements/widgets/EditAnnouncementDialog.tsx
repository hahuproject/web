import React, { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Announcement } from "../../../../../models/Announcement";
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
  announcement: Announcement;
};

export const EditAnnouncementDialog: FunctionComponent<Props> = ({
  show,
  toggleShow,
  announcement,
}) => {
  const { loading, error, setError, UpdateAnnouncement } = useAnnouncement();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    UpdateAnnouncement(
      {
        ID: announcement.ID,
        Title: data["title"],
        Message: data["message"],
        PostedBy: announcement.PostedBy,
        Section: announcement.Section,
        CreatedAt: announcement.CreatedAt,
      },
      () => {
        alert("Successfully updated announcement");
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
    if (!!announcement) {
      setValue("title", announcement.Title);
      setValue("message", announcement.Message);
    }
  }, [announcement]);

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div> Edit Announcement </div>,
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
            {loading == AnnouncementLoading.UpdatingAnnouncement ? (
              <IdsRing />
            ) : (
              " Update Announcement "
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
