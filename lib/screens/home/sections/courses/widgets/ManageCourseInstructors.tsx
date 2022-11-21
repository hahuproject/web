import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Course } from "../../../../../models/Course";
import { User, USER_TYPES } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
import {
  CourseLoading,
  useCourse,
} from "../../../../../providers/course/CourseProvider";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "../../../../../widgets/Button";
import { CheckBox } from "../../../../../widgets/CheckBox";
import { AlertDialog, Dialog } from "../../../../../widgets/Dialogs";
import { InputField, InputFieldSize } from "../../../../../widgets/InputField";
import { IdsRing } from "../../../../../widgets/Loaders";
import { Table } from "../../../../../widgets/Table";

type Props = {
  show: boolean;
  toggleShow: (v: boolean) => void;
  course: Course;
};

export const ManageCourseInstructors: FunctionComponent<Props> = ({
  show,
  toggleShow,
  course,
}) => {
  const { users } = useAuth();

  const { loading, error, setError, ManageCourseUsers } = useCourse();

  const [selectedUsers, setSelectedUsers] = useState<User[]>();

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }

  useEffect(() => {
    if (!!course) {
      setSelectedUsers(course.Users);
    }
  }, [course, show]);

  const [searchedUsers, setSearchedUsers] = useState<User[]>(users);

  const { register, handleSubmit, setValue } = useForm();

  const searchUsers = (data) => {
    console.log("searching users");
    console.log(data);

    var _data = data["searchQuery"];

    if (_data == "") {
      setSearchedUsers(users);
      return;
    }

    _data = new RegExp(_data, "i");

    const _res =
      users &&
      users.filter((e) => {
        if (
          e.FirstName.search(_data) >= 0 ||
          e.LastName.search(_data) >= 0 ||
          e.Email.search(_data) >= 0
        ) {
          return true;
        } else {
          return false;
        }
      });
    console.log(_res);
    setSearchedUsers(_res);
  };

  useEffect(() => {
    setValue("searchQuery", "");
    setSearchedUsers(users);
  }, [users]);

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div> {`Manage Courses for ${course && course.Name}`} </div>,
          <Button
            size={ButtonSize.SMALL}
            type={ButtonType.OUTLINED}
            color={ButtonColor.DANGER}
            onClick={() => {
              toggleShow(false);
              // setSelectedCourses([]);
            }}
          >
            Cancel
          </Button>,
        ]}
        content={
          <div>
            <div className="table-search">
              Search:
              <InputField
                refs={register("searchQuery")}
                onKeyDown={(v) => {
                  console.log(v.key);
                  if (v.key == "Enter") {
                    handleSubmit(searchUsers)();
                  }
                }}
                size={InputFieldSize.SMALL}
                placeholder="Search here ..."
              />
            </div>
            <Table
              headings={[
                { Name: "Name", Value: "name" },
                { Name: "Email" },
                { Name: "Actions" },
              ]}
            >
              {searchedUsers &&
                searchedUsers
                  .filter((e) => e.Type == USER_TYPES.INSTRUCTOR)
                  .map((e) => {
                    return (
                      <tr key={e.ID}>
                        <td>{e.FirstName + " " + e.LastName}</td>
                        <td>{e.Email}</td>
                        <td>
                          <CheckBox
                            value={
                              !!selectedUsers &&
                              selectedUsers.filter((c) => c.ID == e.ID).length >
                                0
                            }
                            onChange={(v: boolean) => {
                              // console.log(v);

                              if (!!!selectedUsers) {
                                setSelectedUsers([e]);
                              } else {
                                if (
                                  selectedUsers.filter((c) => c.ID == e.ID)
                                    .length > 0
                                ) {
                                  setSelectedUsers((prev) => [
                                    ...prev.filter((c) => c.ID != e.ID),
                                  ]);
                                } else {
                                  setSelectedUsers((prev) => [...prev, e]);
                                }
                              }
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
            </Table>
          </div>
        }
        actions={[
          <Button
            disabled={loading == CourseLoading.ManagingUsers}
            onClick={() => {
              loading != CourseLoading.ManagingUsers &&
                ManageCourseUsers(
                  course,
                  selectedUsers,
                  () => {
                    alert("Successfully updated course instructors");
                    toggleShow(false);
                  },
                  () => {}
                );
            }}
          >
            {loading == CourseLoading.ManagingUsers ? <IdsRing /> : "Update"}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
