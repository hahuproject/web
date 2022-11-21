import Router from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, USER_TYPES } from "../../../../models/User";
import { AuthLoading, useAuth } from "../../../../providers/auth/AuthProvider";
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonType,
} from "../../../../widgets/Button";
import {
  ChevronLeftIcon,
  EyeFilledIcon,
  PeopleFilledIcon,
  CheckIcon,
  SlashCircleIcon,
  PencilSquareIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { Table } from "../../../../widgets/Table";
import { StudentPaymentDialog } from "./widgets/StudentPaymentDialog";
import { UserAttendanceSummary } from "./widgets/UserAttendanceSummary";
import { UserDetail } from "./widgets/UserDetail";

type Props = {
  type?: USER_TYPES;
};

export const UsersScreen: FunctionComponent<Props> = ({ type }) => {
  const {
    user,
    users,
    loading,
    error,
    setError,
    GetUsers,
    ApproveUser,
    BanUser,
    UnbanUser,
    students,
    GetStudents,
  } = useAuth();

  const [filteredUsers, setFilteredUsers] = useState<User[]>(
    users && users.filter((e) => e.Type == type)
  );

  const [showRegistryRequests, toggleShowRegistryRequests] =
    useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<User>();

  const [showUserDetails, setshowUserDetails] = useState<boolean>(false);

  const [showUpdateStudentPaymentDialog, setShowUpdateStudentPaymentDialog] =
    useState<boolean>(false);

  const [showUserAttendanceSummaryDialog, setShowUserAttendanceSummaryDialog] =
    useState<boolean>(false);

  const [searchedUsers, setSearchedUsers] = useState<User[]>(users);

  const { register, handleSubmit, setValue } = useForm();

  const searchUsers = (data) => {
    // console.log("searching users");
    // console.log(data);

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
    // console.log(_res);
    setSearchedUsers(_res);
  };

  useEffect(() => {
    setValue("searchQuery", "");
    setSearchedUsers(users);
  }, [users]);

  useEffect(() => {
    GetStudents();
  }, []);

  // useEffect(() => {}, [students]);

  // console.log(students);

  return (
    <>
      {!!selectedUser && selectedUser.Type == USER_TYPES.STUDENT ? (
        selectedUser &&
        !!students &&
        students.filter((e) => e.ID == selectedUser.ID).length > 0 && (
          <UserDetail
            user={selectedUser}
            student={
              selectedUser.Type == USER_TYPES.STUDENT &&
              !!students &&
              students.filter((e) => e.ID == selectedUser.ID)[0]
            }
            show={!!selectedUser && showUserDetails}
            toggleShow={() => {
              setSelectedUser(null);
              setshowUserDetails(false);
            }}
          />
        )
      ) : (
        <UserDetail
          user={selectedUser}
          show={!!selectedUser && showUserDetails}
          toggleShow={() => {
            setSelectedUser(null);
            setshowUserDetails(false);
          }}
        />
      )}
      {showUserAttendanceSummaryDialog && !!selectedUser && (
        <UserAttendanceSummary
          show={showUserAttendanceSummaryDialog && !!selectedUser}
          user={selectedUser}
          toggleShow={setShowUserAttendanceSummaryDialog}
        />
      )}
      {showUpdateStudentPaymentDialog &&
        selectedUser &&
        !!students &&
        students.filter((e) => e.ID == selectedUser.ID).length > 0 && (
          <StudentPaymentDialog
            show={
              showUpdateStudentPaymentDialog &&
              selectedUser &&
              !!students &&
              students.filter((e) => e.ID == selectedUser.ID).length > 0
            }
            toggleShow={setShowUpdateStudentPaymentDialog}
            student={students.filter((e) => e.ID == selectedUser.ID)[0]}
          />
        )}
      <div className="users">
        <div className="users__title">
          <div>
            {showRegistryRequests ? (
              <>
                <div style={{ cursor: "pointer" }}>
                  <ChevronLeftIcon
                    onClick={() => toggleShowRegistryRequests(false)}
                    height={1.6}
                    width={1.6}
                    color="#717f8e"
                  />
                </div>
                <div
                  onClick={() => {
                    toggleShowRegistryRequests(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Back
                </div>
              </>
            ) : (
              <>
                <PeopleFilledIcon height={1.6} width={1.6} color="#717f8e" />
                Users
              </>
            )}
          </div>
          <div>
            <Button
              color={ButtonColor.MAIN}
              size={ButtonSize.SMALL}
              onClick={() => {
                if (users && Array.isArray(users) && users.length > 0) {
                  let csvContent =
                    "data:text/csv;charset=utf-8," +
                    users.map((e) => Object.values(e).join(",")).join("\n");

                  var encodedUri = encodeURI(csvContent);
                  var link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute(
                    "download",
                    `Users Data - ${Date.now().toString()}.csv`
                  );
                  document.body.appendChild(link); // Required for FF

                  link.click();
                }
              }}
            >
              {" "}
              Export CSV{" "}
            </Button>
          </div>
          {user &&
            (user.Type == USER_TYPES.ADMIN ||
              user.Type == USER_TYPES.SUPER_ADMIN ||
              user.Type == USER_TYPES.REGISTRY_OFFICER) &&
            !!!type && (
              <div>
                <Button
                  disabled={
                    (user &&
                      users &&
                      (user.Type == USER_TYPES.ADMIN ||
                      user.Type == USER_TYPES.SUPER_ADMIN
                        ? users.filter(
                            (e) => !e.Verified && e.Type != USER_TYPES.STUDENT
                          )
                        : user.Type == USER_TYPES.REGISTRY_OFFICER &&
                          users.filter(
                            (e) => !e.Verified && e.Type == USER_TYPES.STUDENT
                          )
                      ).length < 1) ||
                    showRegistryRequests
                  }
                  size={ButtonSize.SMALL}
                  color={ButtonColor.MAIN}
                  onClick={() => {
                    if (
                      user &&
                      users &&
                      (user.Type == USER_TYPES.ADMIN ||
                      user.Type == USER_TYPES.SUPER_ADMIN
                        ? users.filter(
                            (e) => !e.Verified && e.Type != USER_TYPES.STUDENT
                          )
                        : user.Type == USER_TYPES.REGISTRY_OFFICER &&
                          users.filter(
                            (e) => !e.Verified && e.Type == USER_TYPES.STUDENT
                          )
                      ).length < 1
                    ) {
                      return;
                    }
                    toggleShowRegistryRequests(true);
                  }}
                >
                  Registry Requests
                </Button>
                {user &&
                  users &&
                  (user.Type == USER_TYPES.ADMIN ||
                  user.Type == USER_TYPES.SUPER_ADMIN
                    ? users.filter(
                        (e) => !e.Verified && e.Type != USER_TYPES.STUDENT
                      )
                    : user.Type == USER_TYPES.REGISTRY_OFFICER &&
                      users.filter(
                        (e) => !e.Verified && e.Type == USER_TYPES.STUDENT
                      )
                  ).length > 0 && (
                    <div className="request_count">
                      {users && users.filter((e) => !e.Verified).length}
                    </div>
                  )}
              </div>
            )}
        </div>
        <div className="users__content">
          <div className="users__content__leading">
            {!showRegistryRequests && (
              <div className="table-search">
                Search:
                <InputField
                  refs={register("searchQuery")}
                  onKeyDown={(v) => {
                    // console.log(v.key);
                    if (v.key == "Enter") {
                      handleSubmit(searchUsers)();
                    }
                  }}
                  size={InputFieldSize.SMALL}
                  placeholder="Search here ..."
                />
              </div>
            )}
            {user &&
              user.Type == USER_TYPES.REGISTRY_OFFICER &&
              type == USER_TYPES.REGISTRY_OFFICER && (
                <Button
                  onClick={() => {
                    Router.push(
                      "/auth/register/sub-registry-officer?red=dashboard"
                    );
                  }}
                  size={ButtonSize.SMALL}
                  color={ButtonColor.MAIN}
                >
                  Add Registry Officer
                </Button>
              )}
            {user &&
              user.Type == USER_TYPES.REGISTRY_OFFICER &&
              type == USER_TYPES.STUDENT && (
                <Button
                  onClick={() => {
                    Router.push("/auth/register/student?red=dashboard");
                  }}
                  size={ButtonSize.SMALL}
                  color={ButtonColor.MAIN}
                >
                  Add Student
                </Button>
              )}
          </div>
          <div className="users__content__main">
            {loading == AuthLoading.FETCHING_USERS ? (
              <div> Loading ... </div>
            ) : !!!users ? (
              <div> Null </div>
            ) : showRegistryRequests ? (
              <Table
                headings={[
                  { Name: "No" },
                  { Name: "ID" },
                  { Name: "Full Name" },
                  { Name: "Registered On" },
                  { Name: "Role" },
                  { Name: "Email" },
                  { Name: "Phone" },
                  { Name: "Actions" },
                ]}
              >
                {users
                  .filter((e) => !e.Verified)
                  .map((e, index) => {
                    return (
                      <tr key={e.ID}>
                        <td>{index + 1}</td>
                        <td>{e.ID}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {e.FirstName + " " + e.LastName}
                        </td>
                        <td>
                          {e.CreatedAt.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "2-digit",
                          })}
                        </td>
                        <td>{e.Type}</td>
                        <td>{e.Email}</td>
                        <td>{e.Phone}</td>
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
                            <EyeFilledIcon
                              onClick={() => {
                                // console.log(e);

                                console.log(!!selectedUser);
                                console.log(students);

                                setSelectedUser(e);
                                setshowUserDetails(true);
                              }}
                              color="black"
                            />
                          </div>
                          <div style={{ cursor: "pointer" }}>
                            <CheckIcon
                              onClick={() => {
                                if (
                                  confirm(
                                    `Approve user ${e.FirstName} ${e.LastName}`
                                  )
                                ) {
                                  ApproveUser(e, () => {
                                    alert("Successfully approved user");
                                  });
                                }
                              }}
                              color="green"
                            />
                          </div>
                          <div style={{ cursor: "pointer" }}>
                            <SlashCircleIcon
                              onClick={() => {
                                if (
                                  confirm(
                                    `Are you sure you want to ban "${e.FirstName}"`
                                  )
                                ) {
                                }
                              }}
                              color="red"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </Table>
            ) : users.filter((e) => e.Verified && e.ID != user.ID).length <
              1 ? (
              <div> Empty </div>
            ) : (
              <Table
                headings={[
                  { Name: "No" },
                  { Name: "ID" },
                  { Name: "Full Name" },
                  { Name: "Registered On" },
                  { Name: "Role" },
                  type == USER_TYPES.STUDENT
                    ? { Name: "Payment" }
                    : user.Type == USER_TYPES.DEPARTMENT_HEAD &&
                      (type == USER_TYPES.INSTRUCTOR ||
                        type == USER_TYPES.SUPERVISOR)
                    ? { Name: "Attendance" }
                    : { Name: "Actions" },
                  (type == USER_TYPES.STUDENT ||
                    (user.Type == USER_TYPES.DEPARTMENT_HEAD &&
                      (type == USER_TYPES.INSTRUCTOR ||
                        type == USER_TYPES.SUPERVISOR))) && { Name: "Actions" },
                ]}
              >
                {(!!type
                  ? searchedUsers.filter((e) => e.Type == type)
                  : searchedUsers
                )
                  .filter((e) => e.Verified && e.ID != user.ID)
                  .map((e, index) => {
                    return (
                      <tr key={e.ID}>
                        <td>{index + 1}</td>
                        <td>{e.ID}</td>
                        <td style={{ textTransform: "capitalize" }}>
                          {e.FirstName + " " + e.LastName}
                        </td>
                        <td>
                          {e.CreatedAt.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "2-digit",
                          })}
                        </td>
                        <td>{e.Type}</td>
                        {user.Type == USER_TYPES.DEPARTMENT_HEAD &&
                          (type == USER_TYPES.INSTRUCTOR ||
                            type == USER_TYPES.SUPERVISOR) && (
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
                                <div className="pointer">
                                  <EyeFilledIcon
                                    onClick={() => {
                                      setSelectedUser(e);
                                      setShowUserAttendanceSummaryDialog(true);
                                    }}
                                    color="black"
                                  />
                                </div>
                              </div>
                            </td>
                          )}
                        {type == USER_TYPES.STUDENT && (
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
                              {!!students
                                ? !!students.filter((es) => es.ID == e.ID)[0] &&
                                  students.filter((es) => es.ID == e.ID)[0].Paid
                                  ? "Paid"
                                  : "Not Paid"
                                : "Not Paid"}
                              {user &&
                                user.Type == USER_TYPES.REGISTRY_OFFICER && (
                                  <div style={{ cursor: "pointer" }}>
                                    <PencilSquareIcon
                                      onClick={() => {
                                        setSelectedUser(e);
                                        setShowUpdateStudentPaymentDialog(true);
                                      }}
                                      color="blue"
                                    />
                                  </div>
                                )}
                            </div>
                          </td>
                        )}
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
                            <EyeFilledIcon
                              onClick={() => {
                                // console.log(e);

                                // console.log(!!selectedUser);

                                setSelectedUser(e);
                                setshowUserDetails(true);
                              }}
                              color="black"
                            />
                          </div>
                          {user && user.Type == USER_TYPES.SUPER_ADMIN && (
                            <div style={{ cursor: "pointer" }}>
                              <SlashCircleIcon
                                onClick={() => {
                                  if (
                                    confirm(
                                      `Are you sure you want to ${
                                        e.Banned ? "Unban" : "Ban"
                                      } "${e.FirstName}"`
                                    )
                                  ) {
                                    if (e.Banned) {
                                      UnbanUser(e, () =>
                                        alert("Successfully unbanned user")
                                      );
                                    } else {
                                      BanUser(e, () =>
                                        alert("Successfully banned user")
                                      );
                                    }
                                  }
                                }}
                                color={e.Banned ? "green" : "red"}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </Table>
            )}
          </div>
          <div className="users__content__actions">
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
