import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { Section } from "../../../../../models/Section";
import { USER_TYPES } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
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
import { CheckIcon, DeleteFilledIcon } from "../../../../../widgets/Icons";
import { InputField, InputFieldType } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";
import { Table } from "../../../../../widgets/Table";

type Props = {
  show: boolean;
  toggleShow: (v: boolean) => void;
  section: Section;
};

export const AddSession: FunctionComponent<Props> = ({
  show,
  toggleShow,
  section,
}) => {
  const { sections, loading, error, setError, AddSession, DeleteSession } =
    useSection();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    resetField,
  } = useForm();

  const { classes } = useClass();
  const { users } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    // console.log(
    //   section.Class.Courses.filter(
    //     (e) => e.ID == data["courseUser"].split("-")[0]
    //   )[0]
    // );
    // console.log(
    //   users.filter((e) => e.ID == data["courseUser"].split("-")[1])[0]
    // );

    AddSession(
      {
        StartDate: new Date(data["date"] + "T" + data["time"]),
        Duration: Number.parseInt(data["duration"]),
        Section: section,
        Course: section.Class.Courses.filter(
          (e) => e.ID == data["courseUser"].split("-")[0]
        )[0],
        User: users.filter((e) => e.ID == data["courseUser"].split("-")[1])[0],
      },
      data["repeat"],
      () => {
        alert("Successfully Added Session");
        // toggleShow(false);
        setValue("date", null);
        setValue("time", null);
        setValue("duration", null);
        setValue("courseUser", null);
        setValue("repeat", null);
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
          <div> {`Manage Sessions for ${section && section.Name}`} </div>,
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
            <div>
              {/* <Table
                headings={[
                  { Name: "Date", Value: "id" },
                  { Name: "Duration", Value: "id" },
                  { Name: "Course", Value: "id" },
                  { Name: "Instructor/Supervisor", Value: "id" },
                  { Name: "Actions", Value: "id" },
                ]}
              >
                {section &&
                  section.Sessions.map((e) => {
                    return (
                      <tr key={e.ID}>
                        <td>
                          {e.StartDate.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "2-digit",
                          })}
                          {e.StartDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td>{e.Duration}</td>
                        <td>
                          <div style={{ cursor: "pointer" }}>
                            <DeleteFilledIcon color="red" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </Table> */}
            </div>

            {section &&
            section.Class &&
            section.Class.Courses.filter((e) => e.Users.length > 0).length <
              1 ? (
              <div>
                Add course with assigned instructor/supervisor to class first
              </div>
            ) : (
              <div
                style={{ borderTop: "1px solid #eee", paddingTop: "2.4rem" }}
              >
                {section &&
                  section.Class.Courses &&
                  section.Class.Courses.filter((e) => e.Users.length > 0)
                    .length > 0 && (
                    <DropDown
                      label="Select course with instructor/suprervisor"
                      options={[].concat.apply(
                        [],
                        section.Class.Courses.filter(
                          (e) => e.Users.length > 0
                        ).map((course) =>
                          course.Users.map((user) => ({
                            name:
                              course.Name +
                              " - " +
                              user.FirstName +
                              " " +
                              user.LastName,
                            value: course.ID + "-" + user.ID,
                          }))
                        )
                      )}
                      refs={register("courseUser", {
                        required: "Field is required",
                      })}
                      error={errors["courseUser"]}
                    />
                  )}
                <InputField
                  label="Date"
                  type={InputFieldType.DATE}
                  other={{
                    min: "2022-01-22T18:55:55",
                  }}
                  refs={register("date", { required: "Field is required" })}
                  error={errors["date"]}
                />
                <InputField
                  label="Time"
                  type={InputFieldType.TIME}
                  other={{
                    min: "2022-01-22T18:55:55",
                  }}
                  refs={register("time", { required: "Field is required" })}
                  error={errors["time"]}
                />
                <InputField
                  label="Duration (minutes) *"
                  type={InputFieldType.NUMBER}
                  refs={register("duration", { required: "Field is required" })}
                  error={errors["duration"]}
                  name="duration"
                />
                <InputField
                  label="Repeat (weeks) *"
                  type={InputFieldType.NUMBER}
                  refs={register("repeat", { required: "Field is required" })}
                  error={errors["repeat"]}
                  name="repeat"
                />
              </div>
            )}
          </div>
        }
        actions={[
          <Button onClick={handleSubmit(onSubmit)}>
            {loading == SectionLoading.AddingSession ? (
              <IdsRing />
            ) : (
              "Add Session"
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
