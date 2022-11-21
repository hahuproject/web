import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { Book } from "../../../../../models/Book";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
import { useCourse } from "../../../../../providers/course/CourseProvider";
import {
  LibraryLoading,
  useLibrary,
} from "../../../../../providers/library/LibraryProvider";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "../../../../../widgets/Button";
import { AlertDialog, Dialog } from "../../../../../widgets/Dialogs";
import { DropDown } from "../../../../../widgets/DropDown";
import { InputField, InputFieldType } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";

type Props = {
  show?: boolean;
  toggleShow?: (v) => void;
};

export const AddBook: FunctionComponent<Props> = ({
  show = false,
  toggleShow,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, error, setError, AddBook } = useLibrary();
  const { courses } = useCourse();

  const { user } = useAuth();

  const onSubmit = (data) => {
    console.log(data);

    var _book: Book = {
      Title: data["title"],
      Author: data["author"],
      Description: data["description"],
      Cover: data["cover"][0],
      File: data["file"][0],
      Uploader: user,
      Course: !!data["course"]
        ? courses.filter((e) => e.ID == data["course"])[0]
        : null,
    };

    console.log(_book);

    AddBook(
      _book,
      () => {
        alert("Successfully added book");
        toggleShow(false);
      },
      () => {}
    );
  };

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  return (
    <div>
      <Dialog
        show={show}
        title={[
          <div> Add Book </div>,
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
              placeholder="Enter book title"
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
              label="Author"
              placeholder="Enter book author"
              refs={register("author", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Minimum characters allowed 2",
                },
              })}
              error={errors["author"]}
            />
            <InputField
              label="Description"
              placeholder="Enter book description"
              refs={register("description", {
                required: "Field is required",
                minLength: {
                  value: 2,
                  message: "Minimum characters allowed 2",
                },
              })}
              error={errors["description"]}
            />
            {!!courses && (
              <DropDown
                refs={register("course")}
                label="Book for"
                placeholder="General"
                options={courses.map((e) => {
                  return { name: e.Name, value: e.ID };
                })}
              />
            )}
            <InputField
              label="Cover"
              placeholder="Select book cover"
              type={InputFieldType.FILE}
              refs={register("cover", {
                required: "Field is required",
              })}
              error={errors["cover"]}
            />
            <InputField
              label="File"
              placeholder="Select book file"
              type={InputFieldType.FILE}
              refs={register("file", {
                required: "Field is required",
              })}
              error={errors["file"]}
            />
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == LibraryLoading.AddingBook ? <IdsRing /> : " Add Book "}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </div>
  );
};
