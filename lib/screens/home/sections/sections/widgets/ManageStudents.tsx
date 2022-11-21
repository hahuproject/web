import React, { FunctionComponent, useEffect, useState } from "react";
import { Course } from "../../../../../models/Course";
import { Section } from "../../../../../models/Section";
import { Student, User, USER_TYPES } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
import {
  SectionLoading,
  useSection,
} from "../../../../../providers/section/SectionProvider";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "../../../../../widgets/Button";
import { CheckBox } from "../../../../../widgets/CheckBox";
import { AlertDialog, Dialog } from "../../../../../widgets/Dialogs";
import { CheckIcon, PencilSquareIcon } from "../../../../../widgets/Icons";
import { IdsRing } from "../../../../../widgets/Loaders";
import { Table } from "../../../../../widgets/Table";

type Props = {
  show: boolean;
  toggleShow: (v: boolean) => void;
  section: Section;
};

export const ManageStudents: FunctionComponent<Props> = ({
  show,
  toggleShow,
  section,
}) => {
  const { students, GetStudents } = useAuth();

  const { loading, error, setError, ManageStudents } = useSection();

  const [selectedStudents, setselectedStudents] = useState<Student[]>();

  const [selectedEditStudentCourse, setSelectedEditStudentCourse] =
    useState<String | null>();

  const [userCourses, setUserCourses] = useState<{}>([]);

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }

  useEffect(() => {
    GetStudents();
  }, []);

  useEffect(() => {
    console.log("students");

    if (!!section && !!section.Class) {
      !!students &&
        students
          .filter((v) => v.Department.ID == section.Class.Department.ID)
          .forEach((e) => {
            var _userCourses = e.Courses;
            var _classCourses = section.Class.Courses;

            var _availableCourses: Course[] = [];

            _classCourses.forEach((cc) => {
              if (cc.Prerequisites.length == 0) {
                _availableCourses.push(cc);
              } else if (cc.Prerequisites.length <= _userCourses.length) {
                var add: boolean = false;
                cc.Prerequisites.forEach((cpr) => {
                  if (_userCourses.filter((uc) => uc.ID == cpr.ID).length > 0) {
                    add = true;
                  }
                });

                if (add) {
                  _availableCourses.push(cc);
                }
              }
            });

            console.log("set user courses");
            console.log(_availableCourses.length);

            setUserCourses((prev) => ({
              ...prev,
              [e.ID]: [_availableCourses, _availableCourses],
            }));
          });
    }
  }, [students]);

  useEffect(() => {
    if (!!section) {
      setselectedStudents(section.Students);
    }
  }, [section, show]);

  // console.log(!!students && students);
  // console.log(!!section && section.Class.Courses);
  // console.log("rerendered");

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div>
            {`Manage Students for - ${
              section && section.Name + " - " + section.Class.Name
            }`}
          </div>,
          <Button
            size={ButtonSize.SMALL}
            type={ButtonType.OUTLINED}
            color={ButtonColor.DANGER}
            onClick={() => {
              setSelectedEditStudentCourse(null);
              toggleShow(false);
            }}
          >
            Cancel
          </Button>,
        ]}
        content={
          <div>
            <Table
              headings={[
                { Name: "ID", Value: "id" },
                { Name: "Full Name", Value: "id" },
                { Name: "Email", Value: "id" },
                { Name: "Courses", Value: "id" },
                { Name: "Actions", Value: "id" },
              ]}
            >
              {section &&
                section.Class &&
                !!students &&
                students
                  .filter((v) => v.Department.ID == section.Class.Department.ID)
                  .map((e) => {
                    return (
                      <>
                        <tr id={e.ID}>
                          <td>{e.ID}</td>
                          <td>{e.User.FirstName + " " + e.User.LastName}</td>
                          <td>{e.User.Email}</td>
                          <td>
                            <div
                              style={{
                                // backgroundColor: "blue",
                                // border: "1px solid red",
                                height: "4.4rem",
                                display: "flex",
                                gridAutoFlow: "column",
                                columnGap: "1.6rem",
                                alignItems: "center",
                                justifyContent: "flex-start",
                              }}
                            >
                              {/* Courses a user can take - class courses - user courses 
                              - filter class courses prerequisites with user courses */}
                              {/* { section.Class.Courses.filter( e1 => {
                                e1.Prerequisites.forEach( cp => e.Courses.includes(cp.ID) )
                              } ).length } */}

                              <div>
                                {!!userCourses[e.ID]
                                  ? (userCourses[e.ID][1] as Course[]).length
                                  : 0}
                              </div>

                              <div style={{ cursor: "pointer" }}>
                                <PencilSquareIcon
                                  onClick={() => {
                                    if (selectedEditStudentCourse == e.ID) {
                                      setSelectedEditStudentCourse(null);
                                    } else {
                                      setSelectedEditStudentCourse(e.ID);
                                    }
                                  }}
                                  color="blue"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <CheckBox
                              value={
                                !!selectedStudents &&
                                selectedStudents.filter((c) => c.ID == e.ID)
                                  .length > 0
                              }
                              onChange={(v: boolean) => {
                                if (
                                  (userCourses[e.ID][1] as Course[]).length > 0
                                ) {
                                  if (!!!selectedStudents) {
                                    setselectedStudents([e]);
                                  } else {
                                    if (
                                      selectedStudents.filter(
                                        (c) => c.ID == e.ID
                                      ).length > 0
                                    ) {
                                      setselectedStudents((prev) => [
                                        ...prev.filter((c) => c.ID != e.ID),
                                      ]);
                                    } else {
                                      setselectedStudents((prev) => [
                                        ...prev,
                                        e,
                                      ]);
                                    }
                                  }
                                }
                              }}
                            />
                          </td>
                        </tr>
                        {selectedEditStudentCourse == e.ID && (
                          <>
                            <tr>
                              <td>Course Name</td>
                              <td>Credit Hour</td>
                              <td>Actions</td>
                            </tr>
                            {!!userCourses[e.ID] &&
                              userCourses[e.ID][0].map((course) => {
                                return (
                                  <>
                                    <tr>
                                      <td> {course.Name} </td>
                                      <td> {course.CreditHr} </td>
                                      <td>
                                        <CheckBox
                                          value={
                                            !!userCourses[e.ID][1] &&
                                            (
                                              userCourses[e.ID][1] as Course[]
                                            ).filter((xd) => xd.ID == course.ID)
                                              .length > 0
                                          }
                                          onChange={(v: boolean) => {
                                            if (!!!userCourses[e.ID][1]) {
                                              console.log("flag0");

                                              setUserCourses((prev) => ({
                                                ...prev,
                                                [e.ID]: [
                                                  userCourses[e.ID][0],
                                                  [course],
                                                ],
                                              }));
                                            } else {
                                              if (
                                                (
                                                  userCourses[
                                                    e.ID
                                                  ][1] as Course[]
                                                ).filter(
                                                  (xd) => xd.ID == course.ID
                                                ).length > 0
                                              ) {
                                                console.log("flag1");
                                                setUserCourses((prev) => ({
                                                  ...prev,
                                                  [e.ID]: [
                                                    userCourses[e.ID][0],
                                                    [
                                                      ...userCourses[
                                                        e.ID
                                                      ][1].filter(
                                                        (cf) =>
                                                          cf.ID != course.ID
                                                      ),
                                                    ],
                                                  ],
                                                }));
                                              } else {
                                                console.log("flag2");
                                                setUserCourses((prev) => ({
                                                  ...prev,
                                                  [e.ID]: [
                                                    userCourses[e.ID][0],
                                                    [
                                                      ...userCourses[e.ID][1],
                                                      course,
                                                    ],
                                                  ],
                                                }));
                                              }
                                            }
                                            // console.log(v);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                          </>
                        )}
                      </>
                    );
                  })}
            </Table>
          </div>
        }
        actions={[
          <Button
            onClick={() => {
              const allowed = selectedStudents.map((s) => s.ID);

              const filtered = Object.keys(userCourses)
                .filter((key) => allowed.includes(key))
                .reduce((obj, key) => {
                  obj[key] = userCourses[key];
                  return obj;
                }, {});

              console.log(userCourses);
              console.log(filtered);

              ManageStudents(
                section,
                filtered,
                () => {
                  alert("Successfully updated section students");
                  toggleShow(false);
                },
                () => {}
              );
            }}
          >
            {loading == SectionLoading.ManagingStudents ? (
              <IdsRing />
            ) : (
              "Update Students"
            )}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
