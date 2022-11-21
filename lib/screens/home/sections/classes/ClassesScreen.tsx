import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Class } from "../../../../models/Class";
import { USER_TYPES } from "../../../../models/User";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import {
  ClassLoading,
  useClass,
} from "../../../../providers/class/ClassProvider";
import { Button, ButtonSize, ButtonColor } from "../../../../widgets/Button";
import {
  DeleteFilledIcon,
  GridFilledIcon,
  PencilSquareIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { Table } from "../../../../widgets/Table";
import { AddClass } from "./widgets/AddClass";
import { EditClass } from "./widgets/EditClass";
import { ManageCourses } from "./widgets/ManageCourses";

type Props = {};

export const ClassesScreen: FunctionComponent<Props> = () => {
  const { user } = useAuth();

  const { classes, loading, error, DeleteClass } = useClass();

  const [showAddClassDialog, toggleShowAddClassDialog] =
    useState<boolean>(false);
  const [showEditClassDialog, toggleShowEditClassDialog] =
    useState<boolean>(false);

  const [showManageCourse, setShowManageCourse] = useState<boolean>(false);

  const [selectedClass, setSelectedClass] = useState<Class>();

  const [searchedClasses, setSearchedClasses] = useState<Class[]>(classes);

  const { register, handleSubmit, setValue } = useForm();

  const searchClasses = (data) => {
    var _data = data["searchQuery"];

    if (_data == "") {
      setSearchedClasses(classes);
      return;
    }

    _data = new RegExp(_data, "i");

    const _res =
      classes &&
      classes.filter((e) => {
        if (e.Name.search(_data) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    console.log(_res);
    setSearchedClasses(_res);
  };

  useEffect(() => {
    setValue("searchQuery", "");
    setSearchedClasses(classes);
  }, [classes]);

  return (
    <>
      {showAddClassDialog && (
        <AddClass
          show={showAddClassDialog}
          toggleShow={toggleShowAddClassDialog}
        />
      )}
      {showEditClassDialog && !!selectedClass && (
        <EditClass
          show={showEditClassDialog && !!selectedClass}
          toggleShow={toggleShowEditClassDialog}
          _class={selectedClass}
        />
      )}
      <ManageCourses
        show={showManageCourse && !!selectedClass}
        toggleShow={setShowManageCourse}
        _class={selectedClass}
      />
      <div className="classes">
        <div className="classes__title">
          <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Classes
        </div>
        <div className="classes__content">
          <div className="classes__content__leading">
            <div className="table-search">
              Search:
              <InputField
                refs={register("searchQuery")}
                onKeyDown={(v) => {
                  console.log(v.key);
                  if (v.key == "Enter") {
                    handleSubmit(searchClasses)();
                  }
                }}
                size={InputFieldSize.SMALL}
                placeholder="Search here ..."
              />
            </div>
            <div className="add-class">
              {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
                <Button
                  size={ButtonSize.SMALL}
                  color={ButtonColor.MAIN}
                  onClick={() => {
                    toggleShowAddClassDialog(true);
                  }}
                >
                  Add Class
                </Button>
              )}
            </div>
          </div>
          <div className="classes_content__main">
            {loading == ClassLoading.FetchingClasses ? (
              <div> Loading ... </div>
            ) : !!!classes ? (
              <div> Null </div>
            ) : classes.length < 1 ? (
              <div> Empty </div>
            ) : (
              <Table
                headings={[
                  { Name: "No", Value: "Value" },
                  { Name: "Level", Value: "Name" },
                  { Name: "Occupation", Value: "Sub Name" },
                  { Name: "Department", Value: "Department" },
                  { Name: "Stream", Value: "Name" },
                  { Name: "Courses", Value: "Department" },
                  { Name: "Sections", Value: "Department" },
                  { Name: "Students", Value: "Students" },
                  { Name: "Master Sheet", Value: "Students" },
                  user &&
                    user.Type == USER_TYPES.DEPARTMENT_HEAD && {
                      Name: "Actions",
                      Value: "Actions",
                    },
                ]}
              >
                {searchedClasses.map((e, index) => {
                  // console.log(e);

                  return (
                    <tr key={e.ID}>
                      <td>{index + 1}</td>
                      <td>{e.Name}</td>
                      <td>{e.SubName}</td>
                      <td>{e.Department.Name}</td>
                      <td>{e.Stream.Name}</td>
                      <td>
                        <div
                          style={{
                            height: "4.4rem",
                            display: "grid",
                            gridAutoFlow: "column",
                            columnGap: "1.6rem",
                            alignItems: "center",
                            alignSelf: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          {!!e.Courses && e.Courses.length}
                          {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
                            <div className="pointer">
                              <PencilSquareIcon
                                onClick={() => {
                                  setSelectedClass(e);
                                  setShowManageCourse(true);
                                }}
                                color="blue"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{(!!e.Sections && e.Sections.length) ?? 0}</td>
                      <td>{!!e.Students ? e.Students.length : 0}</td>
                      <td>
                        <div
                          style={{
                            height: "4.4rem",
                            display: "grid",
                            gridAutoFlow: "column",
                            columnGap: "1.6rem",
                            alignItems: "center",
                            alignSelf: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Button
                            size={ButtonSize.SMALL}
                            color={ButtonColor.MAIN}
                            onClick={() => {}}
                          >
                            {" "}
                            Export{" "}
                          </Button>
                        </div>
                      </td>
                      {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
                        <td>
                          <div
                            style={{
                              height: "4.4rem",
                              display: "grid",
                              gridAutoFlow: "column",
                              columnGap: "1.6rem",
                              alignItems: "center",
                              alignSelf: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <div
                              onClick={() => {
                                setSelectedClass(e);
                                toggleShowEditClassDialog(true);
                              }}
                              className="pointer"
                            >
                              <PencilSquareIcon color="blue" />
                            </div>
                            <div
                              onClick={() => {
                                if (
                                  confirm(
                                    "Are you sure to delete class " + e.Name
                                  )
                                ) {
                                  DeleteClass(
                                    e.ID,
                                    () => {
                                      alert("Successfully deleted class");
                                    },
                                    () => {
                                      alert("Failed to delete class");
                                    }
                                  );
                                }
                              }}
                              className="pointer"
                            >
                              <DeleteFilledIcon color="red" />
                            </div>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
