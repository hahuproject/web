import React, { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Message, MessagesByUser } from "../../../../models/Message";
import { User, UserFromJSON, UserToJSON } from "../../../../models/User";
import { useAuth } from "../../../../providers/auth/AuthProvider";
import { useMessage } from "../../../../providers/message/MessageProvider";
import {
  AddIcon,
  ChatFilledIcon,
  PersonIcon,
  SendFilledIcon,
} from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { UserDetail, UserDetailInfoTile } from "../users/widgets/UserDetail";
import { MessageUser } from "./widgets/MessageUser";
import { SelectUserDialog } from "./widgets/SelectUserDialog";

type Props = {};

/*

[ 
    {ID: 1, Content: "hey", From: User, Date: now},
    {ID: 1, Content: "hello", From: User1, Date: yesterday}, 
]

*/

export const MessageScreen: FunctionComponent<Props> = () => {
  const { user, users } = useAuth();

  const { register, handleSubmit, watch, setValue } = useForm();

  const { userMessages, SendMessage, setUserMessages, connected } =
    useMessage();

  const [showSelectUserDialog, setShowSelectUserDialog] =
    useState<boolean>(false);

  const [selectedMessage, setSelectedMessage] =
    useState<Map<string, Message[]>>();

  const onSubmit = (data) => {
    console.log(data);
    SendMessage(
      {
        Content: data["message"],
        To:
          users &&
          users.filter((e) => e.ID == Array.from(selectedMessage)[0][0])[0],
      },
      () => {
        setValue("message", "");
        _scrollChat();
      },
      () => {}
    );
  };

  const _scrollChat = () => {
    if (!!selectedMessage) {
      var _c = document.getElementById("message__content__chats");
      _c.scroll(0, _c.scrollHeight);
    }
  };

  useEffect(() => {
    _scrollChat();
  }, [selectedMessage]);

  return (
    <>
      <SelectUserDialog
        show={showSelectUserDialog}
        toggleShow={setShowSelectUserDialog}
        selectedUser={(v: User) => {
          var _k = v.ID;

          var _wm = new Map<string, Message[]>();

          setShowSelectUserDialog(false);
          if (!!userMessages.get(_k)) {
            console.log("userMessages.get(_k)");
            console.log(userMessages.get(_k));

            _wm.set(_k, userMessages.get(_k));
            setSelectedMessage(_wm);
          } else {
            console.log("_wm empty");
            console.log(_wm);
            _wm.set(_k, []);
            setUserMessages((prev) => {
              return prev.set(_k, []);
            });
            setSelectedMessage(_wm);
          }
        }}
      />
      <div className="message">
        <div className="message__title">
          <ChatFilledIcon height={1.6} width={1.6} color="#717f8e" /> Message +{" "}
          <div
            style={{
              height: "1.2rem",
              width: "1.2rem",
              borderRadius: "50%",
              backgroundColor: connected ? "green" : "red",
            }}
          />
        </div>
        <div className="message__content">
          <div className="message__content__users">
            <div className="message__content__users__search">
              <div className="table-search">
                Search:
                <InputField
                  size={InputFieldSize.SMALL}
                  placeholder="Search here ..."
                />
              </div>
            </div>
            <div
              // onClick={() => setSelectedMessage(null)}
              className="message__content__users__list"
            >
              {!!userMessages ? (
                Array.from(userMessages).map(([k, v]) => {
                  var _wm = new Map<string, Message[]>();

                  _wm.set(k, v);

                  return (
                    <MessageUser
                      onClick={() => setSelectedMessage(_wm)}
                      userMessages={_wm}
                      active={
                        !!selectedMessage &&
                        Array.from(selectedMessage)[0][0] == k
                      }
                    />
                  );
                })
              ) : (
                <div
                  style={{
                    alignSelf: "center",
                    justifySelf: "center",
                    color: "grey",
                  }}
                >
                  Empty Chat
                </div>
              )}
            </div>
            <div className="message__content__users__add">
              <AddIcon
                onClick={() => setShowSelectUserDialog(true)}
                height={3.2}
                width={3.2}
                color="white"
              />
            </div>
          </div>
          <div
            className={`message__content__chat ${
              !!userMessages && !!selectedMessage && " show"
            }`}
          >
            {!!userMessages && !!selectedMessage ? (
              <>
                <div
                  id="message__content__chats"
                  className="message__content__chats"
                >
                  {Array.from(
                    userMessages.get(Array.from(selectedMessage)[0][0])
                  ).map((e) => {
                    return (
                      <div
                        className={`chat-bubble ${
                          e.From.ID == user.ID ? "chat-bubble--mine" : ""
                        }`}
                      >
                        {e.Content}
                      </div>
                    );
                  })}
                </div>
                <div className="message__content__send">
                  <textarea
                    onKeyUp={(key) => {
                      if (key.key === "ENTER") {
                        handleSubmit(onSubmit)();
                      }
                    }}
                    {...register("message", { required: "Field is required" })}
                    placeholder="Write a message ..."
                  />
                  <SendFilledIcon
                    onClick={handleSubmit(onSubmit)}
                    color={
                      !!watch("message")
                        ? watch("message").length > 0
                          ? "blue"
                          : "grey"
                        : "grey"
                    }
                  />
                </div>
              </>
            ) : (
              <div
                style={{
                  alignSelf: "center",
                  justifySelf: "center",
                  color: "grey",
                }}
              >
                No message selected
              </div>
            )}
          </div>
          <div className="message__content__user-detail">
            {!!selectedMessage ? (
              (() => {
                var _user: User =
                  !!users &&
                  users.filter(
                    (e) => e.ID == Array.from(selectedMessage)[0][0]
                  )[0];

                return (
                  <>
                    <div className="user-detail__top">
                      <img
                        className="user-detail__pic"
                        src={_user.ProfilePic.toString()}
                        alt="user photo"
                      />
                      <div className="user-detail__name">
                        {_user.FirstName + " " + _user.LastName}
                      </div>
                      <div className="user-detail__date">{_user.Username}</div>
                    </div>
                    <div className="user-detail__middle">
                      <UserDetailInfoTile
                        icon={<PersonIcon color="grey" />}
                        label="Email"
                        content={_user.Email}
                      />
                      <UserDetailInfoTile
                        icon={<PersonIcon color="grey" />}
                        label="Phone"
                        content={_user.Phone}
                      />
                      <UserDetailInfoTile
                        icon={<PersonIcon color="grey" />}
                        label="Address"
                        content={"Addis Ababa, Ethiopia."}
                      />
                    </div>
                    <div className="user-detail__bottom">
                      <img src="/images/logo.png" alt="logo" />
                    </div>
                  </>
                );
              })()
            ) : (
              <div>Not selected</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
