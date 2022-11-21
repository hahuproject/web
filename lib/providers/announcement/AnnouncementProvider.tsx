/*

SERVICES
    - Get Announcements
    - Add Announcement
    - Update Announcement
    - Delete Announcement
    - Connect to announcement socket
    - Disconnect to announcement socket

STATES
    - announcements - for holding list of announcements
    - socket conn - for holding socket conn state
    - loading - enum for (fetching, adding, updating, connecting, deleting)
    - error - string

VARS
    - announcement url
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
  Announcement,
  AnnouncementFromJson,
  AnnouncementToJson,
} from "../../models/Announcement";
import { axios } from "../../utils/axios";
import { BASE_WS_URL } from "../../utils/vars";

//Vars
const AnnouncementUrl: string = "/announcements";

let ws: WebSocket;

//Loading
export enum AnnouncementLoading {
  FetchingAnnouncements = "fetching announcements",
  AddingAnnouncement = "adding announcement",
  UpdatingAnnouncement = "updating announcement",
  DeletingAnnouncements = "deleting announcements",
  ConnectingToAnnouncementSocket = "connecting to announcement socket",
}

//Announcement context type
type AnnouncementContextType = {
  announcements: Announcement[];
  connectedToAnnouncementSocket: boolean;
  loading: AnnouncementLoading;
  error: string;
  setError: (v: string) => void;
  GetAnnouncements: Function;
  AddAnnouncement: (
    announcement: Announcement,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  UpdateAnnouncement: (
    announcement: Announcement,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  DeleteAnnouncement: (
    announcementId: String,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  ConnectToAnnouncementSocket: Function;
  DisconnectToAnnouncementSocket: Function;
};

//Announcement Context
const ANNOUNCEMENT_CONTEXT = createContext<AnnouncementContextType>({
  announcements: null,
  connectedToAnnouncementSocket: false,
  loading: null,
  error: null,
  setError: (v: string) => {},
  GetAnnouncements: () => {},
  AddAnnouncement: (
    announcement: Announcement,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  UpdateAnnouncement: (
    announcement: Announcement,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  DeleteAnnouncement: (
    announcementId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  ConnectToAnnouncementSocket: () => {},
  DisconnectToAnnouncementSocket: () => {},
});

type Props = {
  children: JSX.Element;
};

export const AnnouncementProvider: FunctionComponent<Props> = ({
  children,
}) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>();
  const [loading, setLoading] = useState<AnnouncementLoading>();
  const [error, setError] = useState<string>();
  const [connectedToAnnouncementSocket, setConnectedToAnnouncementSocket] =
    useState<boolean>(false);

  useEffect(() => {
    GetAnnouncements();
    // ws = new WebSocket(`ws://localhost`, null, { headers: { Authorization: token }})
    ws = new WebSocket(
      `${BASE_WS_URL}/announcements/socket?token=${localStorage.getItem(
        "authToken"
      )}`
    );
    ConnectToAnnouncementSocket();
  }, []);

  const GetAnnouncements = useCallback(async () => {
    try {
      setError(null);
      setLoading(AnnouncementLoading.FetchingAnnouncements);

      const _res = await axios.get(AnnouncementUrl);

      setAnnouncements(
        (_res.data as JSON[]).map((e) => AnnouncementFromJson(e)).reverse()
      );

      setLoading(null);
    } catch (error) {
      if (!!error.response) {
        setError(error.response.data);
      } else {
        setError("Failed to fetch announcements");
      }
      setLoading(null);
    }
  }, []);
  const AddAnnouncement = useCallback(
    async (
      announcement: Announcement,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(AnnouncementLoading.AddingAnnouncement);

        const _res = await axios.post(
          AnnouncementUrl,
          AnnouncementToJson(announcement)
        );

        setAnnouncements((prev) => [AnnouncementFromJson(_res.data), ...prev]);

        ws.send(JSON.stringify({ event: "ADD", data: _res.data }));
        // console.log(_res.data);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to add announcement");
        }
        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const UpdateAnnouncement = useCallback(
    async (
      announcement: Announcement,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(AnnouncementLoading.UpdatingAnnouncement);

        const _res = await axios.patch(
          AnnouncementUrl,
          AnnouncementToJson(announcement)
        );

        // console.log(_res.data);

        setAnnouncements((prev) => [
          AnnouncementFromJson(_res.data),
          ...prev.filter((e) => e.ID != announcement.ID),
        ]);

        ws.send(
          JSON.stringify({
            event: "UPDATE",
            data: AnnouncementToJson(announcement),
          })
        );

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to add announcement");
        }
        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const DeleteAnnouncement = useCallback(
    async (
      announcementId: string,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      setError(null);
      setLoading(AnnouncementLoading.DeletingAnnouncements);

      await axios.delete(AnnouncementUrl + `?id=${announcementId}`);

      setAnnouncements((prev) => [
        ...prev.filter((e) => e.ID != announcementId),
      ]);

      ws.send(JSON.stringify({ event: "DELETE", data: announcementId }));

      setLoading(null);
      !!successCallback && successCallback();
      try {
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to add announcement");
        }
        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const ConnectToAnnouncementSocket = useCallback(async () => {
    try {
      ws.onopen = (e) => {
        setConnectedToAnnouncementSocket(true);
        console.log("e open");
        console.log(e);
      };

      ws.onerror = (e) => {
        // console.log("e error");
        // console.log(e);
        setConnectedToAnnouncementSocket(false);
      };

      ws.onclose = (e) => {
        console.log("e close");
        console.log(e);
        setConnectedToAnnouncementSocket(false);
      };

      ws.onmessage = (e) => {
        console.log("e message");
        console.log(e);

        var _recievedMsg = JSON.parse(e.data);

        if (_recievedMsg["event"] == "ADD") {
          // console.log(JSON.parse(_recievedMsg["data"]));
          setAnnouncements((prev) => [
            AnnouncementFromJson(_recievedMsg["data"]),
            ...prev,
          ]);
        }

        if (_recievedMsg["event"] == "UPDATE") {
          var _updatedAnnouncement = AnnouncementFromJson(_recievedMsg["data"]);
          setAnnouncements((prev) => [
            _updatedAnnouncement,
            ...prev.filter((e) => e.ID != _updatedAnnouncement.ID),
          ]);
        }

        if (_recievedMsg["event"] == "DELETE") {
          var _deletedAnnouncementId = _recievedMsg["data"];
          setAnnouncements((prev) => [
            ...prev.filter((e) => e.ID != _deletedAnnouncementId),
          ]);
        }
      };
    } catch (error) {
      // console.log("error from closing ws");
      // console.log(error);
    }
  }, []);
  const DisconnectToAnnouncementSocket = useCallback(async () => {
    try {
      ws.close();
      setConnectedToAnnouncementSocket(false);
    } catch (error) {
      // console.log("error from closing ws");
      // console.log(error);
    }
  }, []);

  const _contextValue = useMemo(
    () => ({
      announcements,
      connectedToAnnouncementSocket,
      loading,
      error,
      setError,
      GetAnnouncements,
      AddAnnouncement,
      UpdateAnnouncement,
      DeleteAnnouncement,
      ConnectToAnnouncementSocket,
      DisconnectToAnnouncementSocket,
    }),
    [announcements, connectedToAnnouncementSocket, loading, error]
  );

  return (
    <ANNOUNCEMENT_CONTEXT.Provider value={_contextValue}>
      {children}
    </ANNOUNCEMENT_CONTEXT.Provider>
  );
};

export const useAnnouncement = () => useContext(ANNOUNCEMENT_CONTEXT);
