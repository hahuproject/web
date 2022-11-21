/*

SERVICES
    - Send Message
    - Get Messages
    - Connect to message socket

STATES
    - Error (Enum)
        -> Failed to connect to message server
        -> Failed to fetch messages
        -> Failed to send message
    - Loading (Enum)
        -> Fetching Messages
        -> Connecting to message server
        -> Sending message
    - Connection to message server (Var)
        -> Connected, not connected
    - List of messages
        -> List of all user messages

*/

import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Message,
  MessageFromJSON,
  MessagesByUser,
  MessageToJSON,
} from "../../models/Message";
import { User, UserFromJSON, UserToJSON } from "../../models/User";
import { axios } from "../../utils/axios";
import { BASE_WS_URL } from "../../utils/vars";
import { AuthError, useAuth } from "../auth/AuthProvider";

//Socket Message Type
enum ScocketMessageEvents {
  CONNECT = "CONNECT",
  SEND = "SEND",
  DISCONNECT = "DISCONNECTING",
  RECIEVE = "RECIEVE",
}
type SocketMessageType = {
  event: ScocketMessageEvents;
  data: Message | string;
};

//URLS
const MESSAGE_URL = {
  DEV: "/messages",
};

//ws
let ws: WebSocket;

//Errors
export enum MessageError {
  ErrFailedToFetchMessages = "failed to fetch messages",
  ErrFailedToConnectToMessageServer = "failed to connect to message server",
  ErrFailedToSendMessage = "failed to send message",
}

//Loading
export enum MessageLoading {
  FetchingMessages = "fetching messages",
  ConnectingToMessageServer = "connecting to message server",
  SendingMessage = "sending message",
}

//Message Context Type
type MessageContextType = {
  messages: Message[];
  userMessages: Map<string, Message[]>;
  setUserMessages: Function;
  connected: boolean;
  loading: MessageLoading;
  error: MessageError;
  setError: (v: MessageError) => void;
  ConnectToMessageServer: () => void;
  DisconnectFromMessageServer: () => void;
  GetMessages: () => void;
  SendMessage: (
    message: Message,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
};

const MESSAGE_CONTEXT = createContext<MessageContextType>({
  messages: null,
  userMessages: null,
  setUserMessages: Function,
  connected: false,
  loading: null,
  error: null,
  setError: (v: MessageError) => {},
  ConnectToMessageServer: () => {},
  DisconnectFromMessageServer: () => {},
  GetMessages: () => {},
  SendMessage: (
    message: Message,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
});

type MessageProviderProps = {
  children: JSX.Element;
};

export const MessageProvider: FunctionComponent<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>();
  const [userMessages, setUserMessages] = useState<Map<string, Message[]>>();
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<MessageLoading>();
  const [error, setError] = useState<MessageError>();

  const { user } = useAuth();

  useEffect(() => {
    GetMessages();
    ConnectToMessageServer();
  }, []);

  useEffect(() => {
    if (!connected) {
      setTimeout(() => ConnectToMessageServer(), 4000);
    }
  }, [connected]);

  const GetMessages = useCallback(async () => {
    try {
      setError(null);
      setLoading(MessageLoading.FetchingMessages);

      const _res = await axios.get(MESSAGE_URL.DEV);

      setMessages((_res.data as JSON[]).map((e) => MessageFromJSON(e)));

      //List of messages

      // console.log((_res.data as JSON[]).map((e) => MessageFromJSON(e)));

      var _twm = new Map<string, Message[]>();

      (_res.data as JSON[])
        .map((e) => MessageFromJSON(e))
        .map((e) => {
          var _twmUser: any = e.From.ID != user.ID ? e.From.ID : e.To.ID;
          _twm.set(
            _twmUser,
            !!_twm.get(_twmUser) ? [..._twm.get(_twmUser), e] : [e]
          );
        });

      setUserMessages(_twm);

      console.log("_twm");
      console.log(_twm);

      setLoading(null);
    } catch (error) {
      if (!!error.response) {
        setError(error.response.data);
      } else {
        setError(MessageError.ErrFailedToFetchMessages);
      }

      setLoading(null);
      console.log(error);
    }
  }, []);
  const ConnectToMessageServer = useCallback(async () => {
    try {
      ws = new WebSocket(
        `${BASE_WS_URL}/messages/socket?token=${localStorage.getItem(
          "authToken"
        )}`
      );
      //
      ws.onopen = (e) => {
        console.log("e open");
        console.log(e);
        setConnected(true);
      };

      ws.onerror = (e) => {
        console.log("e error");
        console.log(e);
        setConnected(false);
      };

      ws.onclose = (e) => {
        console.log("e close");
        console.log(e);
        setConnected(false);
      };

      ws.onmessage = (e) => {
        console.log("e message");
        console.log(e);

        var _recievedMsg = JSON.parse(e.data);

        if (_recievedMsg["event"] == ScocketMessageEvents.RECIEVE) {
          console.log("recieve");
          // setUserMessages((prev) => {
          //   var _msg = MessageFromJSON(_recievedMsg["data"]);
          //   console.log(_msg);
          //   var _twmUser = _msg.From.ID;
          //   var e = _msg;

          //   return prev.set(
          //     _twmUser,
          //     !!prev.get(_twmUser) ? [...prev.get(_twmUser), e] : [e]
          //   );
          // });
          GetMessages();
        }
      };
    } catch (error) {
      //
      console.log("error from closing ws");
      console.log(error);
    }
  }, []);
  const DisconnectFromMessageServer = useCallback(async () => {}, []);
  const SendMessage = useCallback(
    async (
      message: Message,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        // if (!connected) {
        // ConnectToMessageServer();
        // }
        setError(null);
        setLoading(MessageLoading.SendingMessage);

        const _res = await axios.post(MESSAGE_URL.DEV, MessageToJSON(message));

        setMessages((prev) => [MessageFromJSON(_res.data), ...prev]);
        setUserMessages((prev) => {
          var _twmUser = message.To.ID;
          var e = MessageFromJSON(_res.data);

          return prev.set(
            _twmUser,
            !!prev.get(_twmUser) ? [...prev.get(_twmUser), e] : [e]
          );
        });

        ws.send(
          JSON.stringify({
            event: ScocketMessageEvents.RECIEVE,
            data: MessageToJSON(MessageFromJSON(_res.data)),
          })
        );

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError(MessageError.ErrFailedToFetchMessages);
        }

        setLoading(null);
        !!failCallback && failCallback();
        console.log(error);
      }
    },
    []
  );

  const _contextValue = useMemo(
    () => ({
      messages,
      userMessages,
      setUserMessages,
      connected,
      loading,
      error,
      setError,
      ConnectToMessageServer,
      DisconnectFromMessageServer,
      GetMessages,
      SendMessage,
    }),
    [
      messages,
      connected,
      loading,
      error,
      setError,
      ConnectToMessageServer,
      DisconnectFromMessageServer,
      GetMessages,
      SendMessage,
    ]
  );

  return (
    <MESSAGE_CONTEXT.Provider value={_contextValue}>
      {children}
    </MESSAGE_CONTEXT.Provider>
  );
};

export const useMessage = () => useContext(MESSAGE_CONTEXT);
