import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stream } from "../../../../models/Stream";
import { USER_TYPES } from "../../../../models/User";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import {
  DepartmentLoading,
  useDepartment,
} from "../../../../providers/department/DepartmentProvider";
import { Button, ButtonSize, ButtonColor } from "../../../../widgets/Button";
import {
  DeleteFilledIcon,
  GridFilledIcon,
  PencilSquareIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { Table } from "../../../../widgets/Table";
import { AddStream } from "./widgets/AddStream";
import { EditStream } from "./widgets/EditStream";

type Props = {};

export const StreamsScreen: FunctionComponent<Props> = () => {
  const { user } = useAuth();

  const { departments, loading, DeleteStream } = useDepartment();

  const [showAddStreamDialog, toggleShowAddStreamDialog] =
    useState<boolean>(false);
  const [showEditStreamDialog, toggleShowEditStreamDialog] =
    useState<boolean>(false);

  const [streams, setStreams] = useState<Stream[]>();

  const [selectedStream, setSelectedStream] = useState<Stream>();

  const [searchedStreams, setSearchedStreams] = useState<Stream[]>(streams);

  const { register, handleSubmit, setValue } = useForm();

  const searchStreams = (data) => {
    var _data = data["searchQuery"];

    if (_data == "") {
      setSearchedStreams(streams);
      return;
    }

    _data = new RegExp(_data, "i");

    const _res =
      streams &&
      streams.filter((e) => {
        if (e.Name.search(_data) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    console.log(_res);
    setSearchedStreams(_res);
  };

  useEffect(() => {
    setValue("searchQuery", "");
    setSearchedStreams(streams);
  }, [streams]);

  useEffect(() => {
    var _streams: Stream[] = [];

    if (!!departments) {
      departments.map((e) => {
        // [..._streams, ...e.Streams];
        _streams.push(...e.Streams);
      });
    }
    setStreams(_streams);
  }, [departments]);

  return (
    <>
      {showAddStreamDialog && (
        <AddStream
          show={showAddStreamDialog}
          toggleShow={toggleShowAddStreamDialog}
        />
      )}
      {showEditStreamDialog && !!selectedStream && (
        <EditStream
          show={showEditStreamDialog && !!selectedStream}
          toggleShow={toggleShowEditStreamDialog}
          _stream={selectedStream}
        />
      )}
      <div className="classes">
        <div className="classes__title">
          <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Streams
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
                    handleSubmit(searchStreams)();
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
                    toggleShowAddStreamDialog(true);
                  }}
                >
                  Add Stream
                </Button>
              )}
            </div>
          </div>
          <div className="classes_content__main">
            {loading == DepartmentLoading.FetchingAllDepartments ? (
              <div> Loading ... </div>
            ) : !!!streams ? (
              <div> Null </div>
            ) : streams.length < 1 ? (
              <div> Empty </div>
            ) : (
              <Table
                headings={[
                  { Name: "No", Value: "Value" },
                  { Name: "Name", Value: "Name" },
                  { Name: "Department", Value: "Department" },
                  user &&
                    user.Type == USER_TYPES.DEPARTMENT_HEAD && {
                      Name: "Actions",
                      Value: "Actions",
                    },
                ]}
              >
                {!!searchedStreams &&
                  searchedStreams.map((e, index) => {
                    // console.log(e);

                    return (
                      <tr key={e.ID}>
                        <td>{index + 1}</td>
                        <td>{e.Name}</td>
                        <td>{e.Department.Name}</td>
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
                                  setSelectedStream(e);
                                  toggleShowEditStreamDialog(true);
                                }}
                                className="pointer"
                              >
                                <PencilSquareIcon color="blue" />
                              </div>
                              <div
                                onClick={() => {
                                  if (
                                    confirm(
                                      "Are you sure to delete stream " + e.Name
                                    )
                                  ) {
                                    DeleteStream(
                                      e.ID,
                                      () => {
                                        alert("Successfully deleted stream");
                                      },
                                      () => {
                                        alert("Failed to delete stream");
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
