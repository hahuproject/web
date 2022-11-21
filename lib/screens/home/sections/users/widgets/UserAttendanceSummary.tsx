import React, { FunctionComponent, useEffect, useState } from "react";
import { User } from "../../../../../models/User";
import { axios } from "../../../../../utils/axios";
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonColor,
} from "../../../../../widgets/Button";
import { Dialog } from "../../../../../widgets/Dialogs";
import { Table } from "../../../../../widgets/Table";

type Props = {
  show: boolean;
  toggleShow: Function;
  user: User;
};

export const UserAttendanceSummary: FunctionComponent<Props> = ({
  user,
  show,
  toggleShow,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userAttendances, setUserAttendances] = useState<any[]>();

  const _getAttendances = async () => {
    try {
      setLoading(true);
      const _res = await axios.get(`/attendances?user-id=${user.ID}`);

      setUserAttendances(_res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!user) {
      _getAttendances();
    }
  }, [user]);

  return (
    <Dialog
      show={show}
      title={[
        <div> {user.FirstName + " " + user.LastName + "'s Attendance"} </div>,
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
          {loading ? (
            <div>Loading ... </div>
          ) : !!!userAttendances ? (
            <div>No attendances found</div>
          ) : (
            <div>
              <Table
                headings={[
                  { Name: "No" },
                  { Name: "Date" },
                  { Name: "Course Name" },
                  { Name: "Status" },
                ]}
              >
                {userAttendances.map((e, index) => {
                  return (
                    <tr key={e["id"]}>
                      <td> {index + 1} </td>
                      <td> {e["session"]["startDate"]} </td>
                      <td> {e["session"]["course"]["name"]} </td>
                      <td> {e["status"]} </td>
                    </tr>
                  );
                })}
              </Table>
            </div>
          )}
        </div>
      }
    />
  );
};
