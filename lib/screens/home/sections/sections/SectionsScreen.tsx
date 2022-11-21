import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Section } from "../../../../models/Section";
import { USER_TYPES } from "../../../../models/User";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import {
  SectionLoading,
  useSection,
} from "../../../../providers/section/SectionProvider";
import { Button, ButtonSize, ButtonColor } from "../../../../widgets/Button";
import {
  AddIcon,
  DeleteFilledIcon,
  GridFilledIcon,
  PencilSquareIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { Table } from "../../../../widgets/Table";
import { AddSection } from "./widgets/AddSection";
import { AddSession } from "./widgets/AddSessions";
import { EditSection } from "./widgets/EditSection";
import { EditSessions } from "./widgets/EditSessions";
import { ManageStudents } from "./widgets/ManageStudents";

type Props = {};

export const SectionsScreen: FunctionComponent<Props> = () => {
  const { user } = useAuth();

  const { sections, loading, error, DeleteSection } = useSection();

  const [selectedSection, setselectedSection] = useState<Section>();

  const [showAddSectionDialog, toggleShowAddSectionDialog] =
    useState<boolean>(false);

  const [showEditSectionDialog, toggleShowEditSectionDialog] =
    useState<boolean>(false);

  const [showManageStudentsDialog, setshowManageStudentsDialog] =
    useState<boolean>(false);

  const [showAddSessionDialog, setshowAddSessionDialog] =
    useState<boolean>(false);

  const [showEditSessionDialog, setshowEditSessionDialog] =
    useState<boolean>(false);

  const [searchedSections, setSearchedSections] = useState<Section[]>(sections);

  const { register, handleSubmit, setValue } = useForm();

  const searchSections = (data) => {
    var _data = data["searchQuery"];

    if (_data == "") {
      setSearchedSections(sections);
      return;
    }

    _data = new RegExp(_data, "i");

    const _res =
      sections &&
      sections.filter((e) => {
        if (e.Name.search(_data) >= 0 || e.Class.Name.search(_data) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    console.log(_res);
    setSearchedSections(_res);
  };

  useEffect(() => {
    setValue("searchQuery", "");
    setSearchedSections(sections);
  }, [sections]);

  return (
    <>
      {showAddSectionDialog && (
        <AddSection
          show={showAddSectionDialog}
          toggleShow={toggleShowAddSectionDialog}
        />
      )}
      {showEditSectionDialog && !!selectedSection && (
        <EditSection
          show={showEditSectionDialog && !!selectedSection}
          toggleShow={toggleShowEditSectionDialog}
          section={selectedSection}
        />
      )}
      {showManageStudentsDialog && !!selectedSection && (
        <ManageStudents
          show={showManageStudentsDialog && !!selectedSection}
          toggleShow={setshowManageStudentsDialog}
          section={selectedSection}
        />
      )}
      {showAddSessionDialog && (
        <AddSession
          show={showAddSessionDialog && !!selectedSection}
          toggleShow={setshowAddSessionDialog}
          section={selectedSection}
        />
      )}
      {showEditSessionDialog && !!selectedSection && (
        <EditSessions
          show={showEditSessionDialog && !!selectedSection}
          toggleShow={setshowEditSessionDialog}
          section={selectedSection}
        />
      )}
      <div className="sections">
        <div className="sections__title">
          <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Sections
        </div>
        <div className="sections__content">
          <div className="sections__content__leading">
            <div className="table-search">
              Search:
              <InputField
                refs={register("searchQuery")}
                onKeyDown={(v) => {
                  console.log(v.key);
                  if (v.key == "Enter") {
                    handleSubmit(searchSections)();
                  }
                }}
                size={InputFieldSize.SMALL}
                placeholder="Search here ..."
              />
            </div>
            <div className="add-section">
              {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
                <Button
                  size={ButtonSize.SMALL}
                  color={ButtonColor.MAIN}
                  onClick={() => {
                    toggleShowAddSectionDialog(true);
                  }}
                >
                  Add Section
                </Button>
              )}
            </div>
          </div>
          <div className="sections__content__main">
            {loading == SectionLoading.FetchingSections ? (
              <div>Loading ...</div>
            ) : !!!sections ? (
              <div>Null</div>
            ) : (
              <Table
                headings={[
                  { Name: "No", Value: "ID" },
                  { Name: "Name", Value: "ID" },
                  { Name: "Year", Value: "ID" },
                  { Name: "Class", Value: "ID" },
                  { Name: "Students", Value: "ID" },
                  { Name: "Sessions", Value: "ID" },
                  user &&
                    user.Type == USER_TYPES.DEPARTMENT_HEAD && {
                      Name: "Actions",
                      Value: "ID",
                    },
                ]}
              >
                {searchedSections.map((e, index) => {
                  return (
                    <tr key={e.ID}>
                      <td>{index + 1}</td>
                      <td>{e.Name}</td>
                      <td>{e.Year}</td>
                      <td>{e.Class.Name}</td>
                      <td>
                        <div
                          style={{
                            // backgroundColor: "red",
                            // border: "1px solid red",
                            height: "4.4rem",
                            display: "grid",
                            gridAutoFlow: "column",
                            columnGap: "1.6rem",
                            alignItems: "center",
                            alignSelf: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          {!!e.Students ? e.Students.length : 0}
                          {user &&
                            (user.Type == USER_TYPES.DEPARTMENT_HEAD ||
                              user.Type == USER_TYPES.REGISTRY_OFFICER ||
                              user.Type == USER_TYPES.SUB_REGISTRY_OFFICER) && (
                              <div style={{ cursor: "pointer" }}>
                                <PencilSquareIcon
                                  onClick={() => {
                                    setselectedSection(e);
                                    setshowManageStudentsDialog(true);
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
                          {!!e.Sessions ? e.Sessions.length : 0}{" "}
                          {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
                            <div style={{ cursor: "pointer" }}>
                              <PencilSquareIcon
                                onClick={() => {
                                  setselectedSection(e);
                                  setshowEditSessionDialog(true);
                                }}
                                color="blue"
                              />
                            </div>
                          )}
                          {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
                            <div style={{ cursor: "pointer" }}>
                              <AddIcon
                                // height={3.2}
                                // width={3.2}
                                onClick={() => {
                                  setselectedSection(e);
                                  setshowAddSessionDialog(true);
                                }}
                                color="blue"
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      {user && user.Type == USER_TYPES.DEPARTMENT_HEAD && (
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
                            <div
                              onClick={() => {
                                setselectedSection(e);
                                toggleShowEditSectionDialog(true);
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
                                    DeleteSection(
                                      e.ID,
                                      () => {
                                        alert("Successfully deleted section");
                                      },
                                      () => {
                                        alert(
                                          "Failed to delete section, please try again"
                                        );
                                      }
                                    );
                                  }
                                }}
                                color="red"
                              />
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
          <div className="sections__content__actions"></div>
        </div>
      </div>
    </>
  );
};
