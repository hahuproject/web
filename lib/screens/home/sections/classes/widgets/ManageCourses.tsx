import React, { FunctionComponent, useEffect, useState } from "react";
import { Class } from "../../../../../models/Class";
import { Course } from "../../../../../models/Course";
import {
  ClassLoading,
  useClass,
} from "../../../../../providers/class/ClassProvider";
import { useCourse } from "../../../../../providers/course/CourseProvider";
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonColor,
} from "../../../../../widgets/Button";
import { CheckBox } from "../../../../../widgets/CheckBox";
import { AlertDialog, Dialog } from "../../../../../widgets/Dialogs";
import { IdsRing } from "../../../../../widgets/Loaders";
import { Table } from "../../../../../widgets/Table";

type Props = {
  show: boolean;
  toggleShow: (v: boolean) => void;
  _class: Class;
};

export const ManageCourses: FunctionComponent<Props> = ({
  show,
  toggleShow,
  _class,
}) => {
  const { loading, error, setError, ManageCourse } = useClass();

  const { courses } = useCourse();

  const [selectedCourses, setSelectedCourses] = useState<Course[]>();

  if (!!error) {
    setTimeout(() => {
      setError(null);
    }, 4000);
  }

  useEffect(() => {
    if (!!_class) {
      setSelectedCourses(_class.Courses);
    }
  }, [_class, show]);

  // console.log(_class);
  // console.log(_class && _class.Courses);
  // console.log(selectedCourses);

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div> {`Manage Courses for ${_class && _class.Name}`} </div>,
          <Button
            size={ButtonSize.SMALL}
            type={ButtonType.OUTLINED}
            color={ButtonColor.DANGER}
            onClick={() => {
              toggleShow(false);
              setSelectedCourses([]);
            }}
          >
            Cancel
          </Button>,
        ]}
        content={
          <div>
            <Table
              headings={[
                { Name: "Name", Value: "name" },
                { Name: "Credit Hour" },
                { Name: "Actions" },
              ]}
            >
              {courses &&
                courses.map((e) => {
                  return (
                    <tr key={e.ID}>
                      <td>{e.Name}</td>
                      <td>{e.CreditHr}</td>
                      <td>
                        <CheckBox
                          value={
                            !!selectedCourses &&
                            selectedCourses.filter((c) => c.ID == e.ID).length >
                              0
                          }
                          onChange={(v: boolean) => {
                            // console.log(v);

                            if (!!!selectedCourses) {
                              setSelectedCourses([e]);
                            } else {
                              if (
                                selectedCourses.filter((c) => c.ID == e.ID)
                                  .length > 0
                              ) {
                                setSelectedCourses((prev) => [
                                  ...prev.filter((c) => c.ID != e.ID),
                                ]);
                              } else {
                                setSelectedCourses((prev) => [...prev, e]);
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
            disabled={loading == ClassLoading.ManagingCourses}
            onClick={() => {
              loading != ClassLoading.ManagingCourses &&
                ManageCourse(
                  _class,
                  selectedCourses,
                  () => {
                    alert("Successfully updated course list");
                    toggleShow(false);
                  },
                  () => {}
                );
            }}
          >
            {loading == ClassLoading.ManagingCourses ? <IdsRing /> : "Update"}
          </Button>,
        ]}
      />
      <AlertDialog show={!!error} content={error} />
    </>
  );
};
