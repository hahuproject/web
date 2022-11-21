import React, { FunctionComponent } from "react";
import { User, USER_TYPES } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonColor,
} from "../../../../../widgets/Button";
import { Dialog } from "../../../../../widgets/Dialogs";

type Props = {
  show: boolean;
  toggleShow: (v: boolean) => void;
  selectedUser: (v: User) => void;
};

export const SelectUserDialog: FunctionComponent<Props> = ({
  show,
  toggleShow,
  selectedUser,
}) => {
  const { users } = useAuth();

  //   console.log(users);

  return (
    <>
      <Dialog
        show={show}
        title={[
          <div> Select User </div>,
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
            {!!users &&
              users
                .filter((e) => e.Type == USER_TYPES.STUDENT)
                .map((e) => {
                  return (
                    <div
                      onClick={() => selectedUser(e)}
                      className="message-user message-user--small"
                    >
                      <div className="message-user__pic message-user__pic--small">
                        <img src={e.ProfilePic.toString()} alt="user photo" />
                      </div>
                      <div>
                        <div className="message-user__name message-user__name--small">
                          {" "}
                          {e.FirstName + " " + e.LastName}{" "}
                        </div>
                        <div className="message-user__message">
                          {" "}
                          {e.Username}{" "}
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        }
      />
    </>
  );
};
