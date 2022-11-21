/*

SERVICES
    - Add Section
    - Get Sections
    - Update Section
    - Delete Section
    - Add Session
    - Delete Session
    - Add Student
    - Remove Student

STATES
    - Sections (Var -> list of all sections)
    - Errors (Enum -> error in (adding, fetching, updating, deleting, adding session, deleting session, adding student, deleting student))
    - Loading (Enum -> (adding, fetching, updating, deleting, adding session, deleting session, adding student, deleting student))
    - Urls (dev - prod)

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
import { Course } from "../../models/Course";
import { Section, SectionFromJSON, SectionToJSON } from "../../models/Section";
import { Session, SessionFromJSON, SessionToJSON } from "../../models/Session";
import { Student, User } from "../../models/User";
import { axios } from "../../utils/axios";

//URLS
const SECTION_URL = {
  DEV: "/sections",
};

//Errors
export enum SectionError {
  ErrAddingSection = "failed to add section",
  ErrFetchingSections = "failed to fetch sections",
  ErrUpdatingSection = "failed to update section",
  ErrDeletingSection = "failed to update section",
  ErrAddingSession = "failed to add a session",
  ErrDeletingSession = "failed to delete session",
  ErrAddingStident = "failed to add a student",
  ErrDeletingStudent = "failed to delete a student",
  ErrManagingStudents = "failed to manage students",
}

//Loading
export enum SectionLoading {
  AddingSection = "adding section",
  FetchingSections = "fetching sections",
  UpdatingSection = "updating section",
  DeletingSection = "deleting section",
  AddingSession = "adding session",
  DeletingSession = "deleting session",
  ManagingStudents = "managing students",
}

//Context Type
type SectionContextType = {
  sections: Section[];
  loading: SectionLoading;
  error: SectionError;
  setError: (v: SectionError) => void;
  AddSection: (
    section: Section,
    successCallback: Function,
    failCallback: Function
  ) => void;
  GetSections: () => void;
  UpdateSection: (
    section: Section,
    successCallback: Function,
    failCallback: Function
  ) => void;
  DeleteSection: (
    sectionId: string,
    successCallback: Function,
    failCallback: Function
  ) => void;
  AddSession: (
    session: Session,
    repeat: number,
    successCallback: Function,
    failCallback: Function
  ) => void;
  DeleteSession: (
    sectionId: string,
    sessionId: string,
    successCallback: Function,
    failCallback: Function
  ) => void;
  ManageStudents: (
    section: Section,
    students: {},
    successCallback: Function,
    failCallback: Function
  ) => void;
};

//Context

const SECTION_CONTEXT = createContext<SectionContextType>({
  sections: null,
  loading: null,
  error: null,
  setError: (v: SectionError) => {},
  GetSections: () => {},
  AddSection: (
    section: Section,
    successCallback: Function,
    failCallback: Function
  ) => {},
  UpdateSection: (
    section: Section,
    successCallback: Function,
    failCallback: Function
  ) => {},
  DeleteSection: (
    sectionId: string,
    successCallback: Function,
    failCallback: Function
  ) => {},
  AddSession: (
    session: Session,
    repeat: number,
    successCallback: Function,
    failCallback: Function
  ) => {},
  DeleteSession: (
    sectionId: string,
    sessionId: string,
    successCallback: Function,
    failCallback: Function
  ) => {},
  ManageStudents: (
    section: Section,
    students: {},
    successCallback: Function,
    failCallback: Function
  ) => {},
});

type SectionProviderProps = {
  children: JSX.Element;
};

export const SectionProvider: FunctionComponent<SectionProviderProps> = ({
  children,
}) => {
  const [sections, setSections] = useState<Section[]>();
  const [loading, setLoading] = useState<SectionLoading>();
  const [error, setError] = useState<SectionError>();

  useEffect(() => {
    GetSections();
  }, []);

  const AddSection = useCallback(
    async (
      section: Section,
      successCallback: Function,
      failCallback: Function
    ) => {
      try {
        setError(null);
        setLoading(SectionLoading.AddingSection);

        const _res = await axios.post(SECTION_URL.DEV, SectionToJSON(section));

        setSections((prev) => [...prev, SectionFromJSON(_res.data)]);

        setLoading(null);
        successCallback();
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(SectionError.ErrAddingSection);
        }

        setLoading(null);
        failCallback();
      }
    },
    []
  );
  const GetSections = useCallback(async () => {
    try {
      setError(null);
      setLoading(SectionLoading.FetchingSections);

      const _res = await axios.get(SECTION_URL.DEV);

      setSections((_res.data as JSON[]).map((e) => SectionFromJSON(e)));
      setLoading(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(SectionError.ErrFetchingSections);
      }

      setLoading(null);
    }
  }, []);
  const UpdateSection = useCallback(
    async (v: Section, successCallback: Function, failCallback: Function) => {
      try {
        setError(null);
        setLoading(SectionLoading.UpdatingSection);

        const _res = await axios.patch(SECTION_URL.DEV, SectionToJSON(v));

        setSections((prev) => [
          SectionFromJSON(_res.data),
          ...prev.filter((e) => e.ID != v.ID),
        ]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(SectionError.ErrUpdatingSection);
        }

        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const DeleteSection = useCallback(
    async (
      sectionId: string,
      successCallback: Function,
      failCallback: Function
    ) => {
      try {
        setError(null);
        setLoading(SectionLoading.DeletingSection);

        await axios.delete(SECTION_URL.DEV + `?id=${sectionId}`);

        setSections((prev) => [...prev.filter((e) => e.ID != sectionId)]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(SectionError.ErrDeletingSection);
        }

        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const AddSession = useCallback(
    async (
      session: Session,
      repeat: number,
      successCallback: Function,
      failCallback: Function
    ) => {
      try {
        setError(null);
        setLoading(SectionLoading.AddingSession);

        for (let index = 0; index < repeat; index++) {
          session.StartDate = new Date(
            new Date(session.StartDate).getTime() +
              index * (7 * 24 * 60 * 60 * 1000)
          );

          const _res = await axios.post("/sessions", SessionToJSON(session));

          setSections((prev) => [
            ...prev.map((e) => {
              if (e.ID == session.Section.ID) {
                e.Sessions = [...e.Sessions, SessionFromJSON(_res.data)];
                return e;
              }
              return e;
            }),
          ]);
        }

        setLoading(null);
        successCallback();
      } catch (error) {
        console.log(error);

        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(SectionError.ErrAddingSession);
        }

        setLoading(null);
        failCallback();
      }
    },
    []
  );
  const DeleteSession = useCallback(
    async (
      sectionId: string,
      sessionId: string,
      successCallback: Function,
      failCallback: Function
    ) => {
      try {
        setError(null);
        setLoading(SectionLoading.DeletingSession);

        await axios.delete(`/sessions?id=${sessionId}`);

        setSections((prev) => [
          ...prev.map((e) => {
            if (e.ID == sectionId) {
              e.Sessions = [...e.Sessions.filter((s) => s.ID != sessionId)];
              return e;
            }
            return e;
          }),
        ]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(SectionError.ErrDeletingSession);
        }

        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const ManageStudents = useCallback(
    async (
      section: Section,
      students: {},
      successCallback: Function,
      failCallback: Function
    ) => {
      try {
        setError(null);
        setLoading(SectionLoading.ManagingStudents);

        //Add User
        Object.keys(students).forEach(async (userId) => {
          if (section.Students.filter((e) => e.ID == userId).length < 1) {
            console.log("add", userId);

            try {
              const _res = await axios.post(SECTION_URL.DEV + "/students", {
                userId: userId,
                sectionId: section.ID,
                courses: (students[userId][1] as Course[]).map((c) => c.ID),
              });

              console.log(_res.data);

              setSections((prev) => [
                ...prev.map((e) => {
                  if (e.ID == section.ID) {
                    return SectionFromJSON(_res.data);
                  }
                  return e;
                }),
              ]);
            } catch (error) {
              console.log(error);
            }
          }
        });

        // //Remove User

        section.Students.forEach(async (user) => {
          if (Object.keys(students).filter((e) => e == user.ID).length < 1) {
            console.log("remove", user);

            const _res = await axios.patch(SECTION_URL.DEV + "/students", {
              userId: user.ID,
              sectionId: section.ID,
              courses: !!students[user.ID]
                ? (students[user.ID][1] as Course[]).map((c) => c.ID)
                : [],
            });

            setSections((prev) => [
              ...prev.map((e) => {
                if (e.ID == section.ID) {
                  return SectionFromJSON(_res.data);
                }
                return e;
              }),
            ]);
          }
        });

        setLoading(null);
        successCallback();
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(SectionError.ErrManagingStudents);
        }

        setLoading(null);
        failCallback();
      }
    },
    []
  );

  const _contextValue = useMemo(
    () => ({
      sections,
      loading,
      error,
      setError,
      AddSection,
      GetSections,
      UpdateSection,
      DeleteSection,
      AddSession,
      DeleteSession,
      ManageStudents,
    }),
    [sections, loading, error]
  );

  return (
    <SECTION_CONTEXT.Provider value={_contextValue}>
      {children}
    </SECTION_CONTEXT.Provider>
  );
};

export const useSection = () => useContext(SECTION_CONTEXT);
