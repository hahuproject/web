import React, { FunctionComponent, useEffect, useState } from "react";
import {
  CourseLoading,
  useCourse,
} from "../../../../providers/course/CourseProvider";
import { AddCourse } from "./widgets/AddCourse";
import {
  Button,
  ButtonSize,
  ButtonColor,
  ButtonType,
} from "../../../../widgets/Button";
import {
  DeleteFilledIcon,
  PencilSquareIcon,
  GridFilledIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { IdsSpinner } from "../../../../widgets/Loaders";
import { Table } from "../../../../widgets/Table";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import { USER_TYPES } from "../../../../models/User";
import { ManageCourseInstructors } from "./widgets/ManageCourseInstructors";
import { Course } from "../../../../models/Course";
import { EditCourseDialog } from "./widgets/EditCourseDialog";
import { ManageCourseSupervisors } from "./widgets/ManageCourseSupervisors";
import { useForm } from "react-hook-form";

type Props = {};

export const CoursesScreen: FunctionComponent<Props> = () => {
  const { courses, loading, error, setError, DeleteCourse } = useCourse();

  const [showAddCourseDialog, toggleShowAddCourseDialog] = useState(false);

  const [showManageInstructors, setshowManageInstructors] =
    useState<boolean>(false);

  const [showManageSupervisors, setshowManageSupervisors] =
    useState<boolean>(false);

  const [showEditCourseDialog, setShowEditCourseDialog] =
    useState<boolean>(false);

  const [selectedCourse, setselectedCourse] = useState<Course>();

  const { user } = useAuth();

  const [searchedCourses, setSearchedCourses] = useState<Course[]>(courses);

  const { register, handleSubmit, setValue } = useForm();

  const searchCourses = (data) => {
    var _data = data["searchQuery"];

    if (_data == "") {
      setSearchedCourses(courses);
      return;
    }

    _data = new RegExp(_data, "i");

    const _res =
      courses &&
      courses.filter((e) => {
        if (e.Name.search(_data) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    console.log(_res);
    setSearchedCourses(_res);
  };

  useEffect(() => {
    setValue("searchQuery", "");
    setSearchedCourses(courses);
  }, [courses]);

  return (
    <>
      {!!showAddCourseDialog && (
        <AddCourse
          show={showAddCourseDialog}
          toggleShow={toggleShowAddCourseDialog}
        />
      )}
      {!!showManageInstructors && (
        <ManageCourseInstructors
          show={showManageInstructors && !!selectedCourse}
          toggleShow={setshowManageInstructors}
          course={selectedCourse}
        />
      )}
      {!!showManageSupervisors && (
        <ManageCourseSupervisors
          show={showManageSupervisors && !!selectedCourse}
          toggleShow={setshowManageSupervisors}
          course={selectedCourse}
        />
      )}
      {!!selectedCourse && showEditCourseDialog && (
        <EditCourseDialog
          show={showEditCourseDialog && !!selectedCourse}
          course={selectedCourse}
          toggleShow={setShowEditCourseDialog}
        />
      )}
      <div className="courses">
        <div className="courses__title">
          <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Courses
        </div>
        <div className="courses__content">
          <div className="courses__content__leading">
            <div className="table-search">
              Search:
              <InputField
                refs={register("searchQuery")}
                onKeyDown={(v) => {
                  console.log(v.key);
                  if (v.key == "Enter") {
                    handleSubmit(searchCourses)();
                  }
                }}
                size={InputFieldSize.SMALL}
                placeholder="Search here ..."
              />
            </div>
            <div className="add-course">
              {user &&
                (user.Type == USER_TYPES.SUPER_ADMIN ||
                  // user.Type == USER_TYPES.ADMIN ||
                  user.Type == USER_TYPES.DEPARTMENT_HEAD) && (
                  <Button
                    size={ButtonSize.SMALL}
                    color={ButtonColor.MAIN}
                    onClick={() => {
                      toggleShowAddCourseDialog(true);
                    }}
                  >
                    Add Course
                  </Button>
                )}
            </div>
          </div>
          <div className="courses__content__main">
            {loading == CourseLoading.FetchingCourses ? (
              <IdsSpinner />
            ) : !!!courses ? (
              <div> null </div>
            ) : courses.length < 1 ? (
              <div> Empty </div>
            ) : (
              <Table
                headings={[
                  { Name: "No" },
                  { Name: "Name" },
                  { Name: "CreditHr" },
                  { Name: "Color" },
                  { Name: "Prerequisites" },
                  { Name: "Instructors" },
                  { Name: "Supervisors" },
                  user &&
                    (user.Type == USER_TYPES.SUPER_ADMIN ||
                      // user.Type == USER_TYPES.ADMIN ||
                      user.Type == USER_TYPES.DEPARTMENT_HEAD) && {
                      Name: "Actions",
                    },
                ]}
              >
                {searchedCourses &&
                  searchedCourses.length > 0 &&
                  searchedCourses.map((e, index) => {
                    return (
                      <tr key={e.ID}>
                        <td>{index + 1}</td>
                        <td>{e.Name}</td>
                        <td>{e.CreditHr}</td>
                        <td>
                          <div
                            style={{
                              height: "2.4rem",
                              width: "2.4rem",
                              borderRadius: "50%",
                              backgroundColor: e.Color,
                              border: "1px solid #ccc",
                            }}
                          />
                        </td>
                        <td>
                          {e.Prerequisites.length > 0
                            ? e.Prerequisites.map(
                                (ep, i) =>
                                  ep.Name +
                                  (i >= 0 && i < e.Prerequisites.length - 1
                                    ? ", "
                                    : "")
                              )
                            : "-"}
                        </td>
                        <td>
                          <div
                            style={{
                              height: "4.8rem",
                              display: "grid",
                              gridAutoFlow: "column",
                              columnGap: "1.6rem",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            {
                              e.Users.filter(
                                (e) => e.Type == USER_TYPES.INSTRUCTOR
                              ).length
                            }
                            {user &&
                              (user.Type == USER_TYPES.SUPER_ADMIN ||
                                // user.Type == USER_TYPES.ADMIN ||
                                user.Type == USER_TYPES.DEPARTMENT_HEAD) && (
                                <div style={{ cursor: "pointer" }}>
                                  <PencilSquareIcon
                                    onClick={() => {
                                      setselectedCourse(e);
                                      setshowManageInstructors(true);
                                    }}
                                    color="blue"
                                  />
                                </div>
                              )}
                          </div>
                        </td>
                        <td>
                          <div
                            style={{
                              height: "4.8rem",
                              display: "grid",
                              gridAutoFlow: "column",
                              columnGap: "1.6rem",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            {
                              e.Users.filter(
                                (e) => e.Type == USER_TYPES.SUPERVISOR
                              ).length
                            }
                            {user &&
                              (user.Type == USER_TYPES.SUPER_ADMIN ||
                                // user.Type == USER_TYPES.ADMIN ||
                                user.Type == USER_TYPES.DEPARTMENT_HEAD) && (
                                <div style={{ cursor: "pointer" }}>
                                  <PencilSquareIcon
                                    color="blue"
                                    onClick={() => {
                                      setselectedCourse(e);
                                      setshowManageSupervisors(true);
                                    }}
                                  />
                                </div>
                              )}
                          </div>
                        </td>
                        {user &&
                          (user.Type == USER_TYPES.SUPER_ADMIN ||
                            // user.Type == USER_TYPES.ADMIN ||
                            user.Type == USER_TYPES.DEPARTMENT_HEAD) && (
                            <td
                              style={{
                                // backgroundColor: "blue",
                                height: "4.8rem",
                                display: "grid",
                                gridAutoFlow: "column",
                                columnGap: "1.6rem",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              <div
                                onClick={() => {
                                  setselectedCourse(e);
                                  setShowEditCourseDialog(true);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <PencilSquareIcon color="blue" />
                              </div>
                              <div style={{ cursor: "pointer" }}>
                                <DeleteFilledIcon
                                  onClick={() => {
                                    if (
                                      confirm(
                                        `Are you sure you want to delete "${e.Name}"`
                                      )
                                    ) {
                                      DeleteCourse(e.ID, () =>
                                        alert("Successfully deleted course")
                                      );
                                    }
                                  }}
                                  color="red"
                                />
                              </div>
                            </td>
                          )}
                      </tr>
                    );
                  })}
              </Table>
            )}
          </div>
          <div className="courses__content__actions">
            {/* <div>Showing 3 of 3</div>
            <div> Show amount </div>
            <div>
              <Button
                type={ButtonType.FLAT}
                size={ButtonSize.SMALL}
                color={ButtonColor.MAIN}
                onClick={() => {}}
              >
                Prev
              </Button>
              <Button
                type={ButtonType.FLAT}
                size={ButtonSize.SMALL}
                color={ButtonColor.MAIN}
                onClick={() => {}}
              >
                Next
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
