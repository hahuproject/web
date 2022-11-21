import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { Section } from "../../../../../models/Section";
import { USER_TYPES } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
import { useClass } from "../../../../../providers/class/ClassProvider";
import {
  CourseLoading,
  useCourse,
} from "../../../../../providers/course/CourseProvider";
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

export const EditSessions: FunctionComponent<Props> = ({
  show,
  toggleShow,
  section,
}) => {
  const { sections, loading, error, setError, DeleteSession } = useSection();

  const { classes } = useClass();
  const { users } = useAuth();

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
              <Table
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
                        {/* <td>{e.ID}</td> */}
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
                        <td>{e.Course.Name}</td>
                        <td>{e.User.FirstName + " " + e.User.LastName}</td>
                        <td>
                          <div
                            onClick={() => {
                              DeleteSession(
                                section.ID,
                                e.ID,
                                () => {
                                  alert("Successfully deleted session");
                                },
                                () => {
                                  alert("Failed to delete session");
                                }
                              );
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <DeleteFilledIcon color="red" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </Table>
            </div>
          </div>
        }
        actions={[]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
