import React, { FunctionComponent } from "react";
import { Message } from "../../../../../models/Message";
import { User, UserFromJSON } from "../../../../../models/User";
import { useAuth } from "../../../../../providers/auth/AuthProvider";

type Props = {
  active?: boolean;
  userMessages: Map<string, Message[]>;
  onClick?: Function;
};

export const MessageUser: FunctionComponent<Props> = ({
  active = false,
  userMessages,
  onClick,
}) => {
  // console.log(
  //   messages &&
  //     messages[0].Date &&
  //     messages[0].Date.toLocaleDateString("en-Us", { dateStyle: "full" })
  // );
  const { users } = useAuth();

  // console.log(UserFromJSON(JSON.parse(Array.from(userMessages)[0][0])));

  const _user =
    !!users && users.filter((e) => e.ID == Array.from(userMessages)[0][0])[0];
  const _messages = Array.from(userMessages)[0][1];

  return (
    <div
      onClick={() => onClick()}
      className={`message-user ${active && "message-user--active"}`}
    >
      <div className="message-user__pic">
        <img src={!!_user && _user.ProfilePic.toString()} alt="user photo" />
      </div>
      <div className="message-user__name">
        {!!_user && _user.FirstName + " " + _user.LastName}
      </div>
      <div className="message-user__message">
        {!!_messages &&
          _messages.length > 0 &&
          _messages[_messages.length - 1].Content}
      </div>
      <div className="message-user__date">
        {!!_messages &&
          _messages.length > 0 &&
          new Date(_messages[0].Date).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
      </div>
    </div>
  );
};
