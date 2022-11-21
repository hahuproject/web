import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Department } from "../../../../models/Department";
import { USER_TYPES } from "../../../../models/User";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import {
  DepartmentLoading,
  useDepartment,
} from "../../../../providers/department/DepartmentProvider";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "../../../../widgets/Button";
import {
  DeleteFilledIcon,
  GridFilledIcon,
  PencilSquareIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { IdsSpinner } from "../../../../widgets/Loaders";
import { Table } from "../../../../widgets/Table";
import { AddDepartment } from "./widgets/AddDepartment";
import { UpdateDepartment } from "./widgets/UpdateDepartment";

type Props = {};

export const DepartmentsScreen: FunctionComponent<Props> = () => {
  const { departments, loading, error, DeleteDepartment } = useDepartment();

  const [showAddDepartmentDialog, toggleAddDepartmentDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>();

  const { user } = useAuth();

  const [searchedDepartments, setSearchedDepartments] =
    useState<Department[]>(departments);

  const { register, handleSubmit, setValue } = useForm();

  const searchDepartments = (data) => {
    console.log("searching users");
    console.log(data);

    var _data = data["searchQuery"];

    if (_data == "") {
      setSearchedDepartments(departments);
      return;
    }

    _data = new RegExp(_data, "i");

    const _res =
      departments &&
      departments.filter((e) => {
        if (e.Name.search(_data) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    console.log(_res);
    setSearchedDepartments(_res);
  };

  useEffect(() => {
    setValue("searchQuery", "");
    setSearchedDepartments(departments);
  }, [departments]);

  return (
    <>
      <AddDepartment
        show={showAddDepartmentDialog}
        toggleShow={toggleAddDepartmentDialog}
      />
      <UpdateDepartment
        department={selectedDepartment}
        show={!!selectedDepartment}
        toggleShow={() => setSelectedDepartment(null)}
      />
      <div className="departments">
        <div className="departments__title">
          <GridFilledIcon height={1.6} width={1.6} color="#717f8e" />{" "}
          Departments
        </div>
        <div className="departments__content">
          <div className="departments__content__leading">
            <div className="table-search">
              Search:
              <InputField
                refs={register("searchQuery")}
                onKeyDown={(v) => {
                  console.log(v.key);
                  if (v.key == "Enter") {
                    handleSubmit(searchDepartments)();
                  }
                }}
                size={InputFieldSize.SMALL}
                placeholder="Search here ..."
              />
            </div>
            <div className="add-department">
              {user &&
                (user.Type == USER_TYPES.SUPER_ADMIN ||
                  user.Type == USER_TYPES.ADMIN) && (
                  <Button
                    size={ButtonSize.SMALL}
                    color={ButtonColor.MAIN}
                    onClick={() => {
                      toggleAddDepartmentDialog(true);
                    }}
                  >
                    Add Department
                  </Button>
                )}
            </div>
          </div>
          <div className="departments__content__main">
            {loading == DepartmentLoading.FetchingAllDepartments ? (
              <IdsSpinner />
            ) : departments == null ? (
              <div> null </div>
            ) : departments.length < 1 ? (
              <div> Empty </div>
            ) : (
              <Table
                headings={[
                  { Name: "No" },
                  { Name: "Name" },
                  { Name: "Head" },
                  { Name: "Classes" },
                  user &&
                    (user.Type == USER_TYPES.SUPER_ADMIN ||
                      user.Type == USER_TYPES.ADMIN) && {
                      Name: "Actions",
                    },
                ]}
              >
                {searchedDepartments &&
                  searchedDepartments.length > 0 &&
                  searchedDepartments.map((e, index) => {
                    return (
                      <tr key={e.ID}>
                        <td>{index + 1}</td>
                        <td>{e.Name}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {!!e.Head.ID
                            ? e.Head.FirstName + " " + e.Head.LastName
                            : "Not Set"}
                        </td>
                        <td>{(e.Classes && e.Classes.length) || 0}</td>
                        {user &&
                          (user.Type == USER_TYPES.SUPER_ADMIN ||
                            user.Type == USER_TYPES.ADMIN) && (
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
                              <div style={{ cursor: "pointer" }}>
                                <PencilSquareIcon
                                  onClick={() => setSelectedDepartment(e)}
                                  color="blue"
                                />
                              </div>
                              <div
                                onClick={() => {
                                  if (
                                    confirm(
                                      `Are you sure you want to delete "${e.Name}"`
                                    )
                                  ) {
                                    DeleteDepartment(e.ID, () => {
                                      alert("Successfully deleted department");
                                    });
                                  }
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <DeleteFilledIcon color="red" />
                              </div>
                            </td>
                          )}
                      </tr>
                    );
                  })}
              </Table>
            )}
          </div>
          <div className="departments__content__actions">
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
