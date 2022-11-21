/*

SERVICES
    - Add Class
    - Get Classes
    - Update Class
    - Delete Class
    - Manage Course

STATES
    - Classes [Var -> List of all classes]
    - Error (Enum -> Adding class, Fetching class, Updating class)
    - Loading (Enum -> Adding, Getting, Updating)

CONSTATNTS
    - URL (Var -> DEV - "/classes")

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
import { Class, ClassFromJSON, ClassToJSON } from "../../models/Class";
import { Course, CourseFromJSON } from "../../models/Course";
import { axios } from "../../utils/axios";

//URLS
const CLASS_URL = {
  DEV: "/classes",
};

//Error
export enum ClassError {
  ErrAddingClass = "failed to add class",
  ErrFetchingClasses = "failed to fetch classes",
  ErrUpdatingClass = "failed to update class",
  ErrUpdatingClassCourses = "failed to update class courses",
}

//Loading
export enum ClassLoading {
  AddingClass = "adding class",
  FetchingClasses = "fetching classes",
  UpdatingClasses = "updating classes",
  ManagingCourses = "managing courses",
  DeletingCourse = "deleting course",
}

//Context Type
type ClassContextType = {
  classes: Class[];
  loading: ClassLoading;
  error: ClassError;
  setError: (v: ClassError) => void;
  AddClass: (
    v: Class,
    successCallback: Function,
    failCallback: Function
  ) => void;
  GetClasses: () => void;
  UpdateClass: (
    v: Class,
    successCallback: Function,
    failCallback: Function
  ) => void;
  DeleteClass: (
    classId: string,
    successCallback: Function,
    failCallback: Function
  ) => void;
  ManageCourse: (
    _class: Class,
    courses: Course[],
    successCallback: Function,
    failCallback: Function
  ) => void;
};

//CONTEXT
const CLASS_CONTEXT = createContext<ClassContextType>({
  classes: null,
  loading: null,
  error: null,
  setError: (v: ClassError) => {},
  AddClass: (v: Class, successCallback: Function, failCallback: Function) => {},
  GetClasses: () => {},
  UpdateClass: (
    v: Class,
    successCallback: Function,
    failCallback: Function
  ) => {},
  DeleteClass: (
    classId: string,
    successCallback: Function,
    failCallback: Function
  ) => {},
  ManageCourse: (
    _class: Class,
    courses: Course[],
    successCallback: Function,
    failCallback: Function
  ) => {},
});

type ClassProviderProps = {
  children: JSX.Element;
};

export const ClassProvider: FunctionComponent<ClassProviderProps> = ({
  children,
}) => {
  //Classes
  const [classes, setClasses] = useState<Class[]>();
  const [loading, setLoading] = useState<ClassLoading>();
  const [error, setError] = useState<ClassError>();

  useEffect(() => {
    GetClasses();
  }, []);

  const AddClass = useCallback(
    async (v: Class, successCallback: Function, failCallback: Function) => {
      try {
        setError(null);
        setLoading(ClassLoading.AddingClass);

        console.log(v);

        const _res = await axios.post(CLASS_URL.DEV, ClassToJSON(v));

        setClasses((prev) => [...prev, ClassFromJSON(_res.data)]);

        setLoading(null);
        successCallback();
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(ClassError.ErrAddingClass);
        }

        console.log(error);

        failCallback();
        setLoading(null);
      }
    },
    []
  );
  const GetClasses = useCallback(async () => {
    try {
      setError(null);
      setLoading(ClassLoading.FetchingClasses);

      const _res = await axios.get(CLASS_URL.DEV);

      setClasses((_res.data as JSON[]).map((e) => ClassFromJSON(e)));

      setLoading(null);
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(error.response.data);
      } else {
        setError(ClassError.ErrFetchingClasses);
      }

      setLoading(null);
    }
  }, []);
  const UpdateClass = useCallback(
    async (v: Class, successCallback: Function, failCallback: Function) => {
      try {
        setError(null);
        setLoading(ClassLoading.UpdatingClasses);

        const _res = await axios.patch(CLASS_URL.DEV, ClassToJSON(v));

        setClasses((prev) => [
          ClassFromJSON(_res.data),
          ...prev.filter((e) => e.ID != v.ID),
        ]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(ClassError.ErrFetchingClasses);
        }

        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const DeleteClass = useCallback(
    async (
      classId: string,
      successCallback: Function,
      failCallback: Function
    ) => {
      try {
        setError(null);
        setLoading(ClassLoading.DeletingCourse);

        await axios.delete(CLASS_URL.DEV + `?id=${classId}`);

        setClasses((prev) => [...prev.filter((e) => e.ID != classId)]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(ClassError.ErrFetchingClasses);
        }

        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );
  const ManageCourse = useCallback(
    async (
      _class: Class,
      courses: Course[],
      successCallback: Function,
      failCallback: Function
    ) => {
      //[1,2,3,4] -- old
      //[1,3,4,5,7] filter 1 != 1 ? add -- new
      //[1,2] -- new
      //[1,2]
      //[1]

      try {
        setError(null);
        setLoading(ClassLoading.ManagingCourses);

        //Add Course
        courses.forEach(async (course) => {
          if (_class.Courses.filter((e) => e.ID == course.ID).length < 1) {
            console.log("add", course);

            try {
              const _res = await axios.post(CLASS_URL.DEV + "/courses", {
                courseId: course.ID,
                classId: _class.ID,
              });

              console.log(_res.data);

              setClasses((prev) => [
                ...prev.map((e) => {
                  if (e.ID == _class.ID) {
                    return ClassFromJSON(_res.data);
                  }
                  return e;
                }),
              ]);
            } catch (error) {
              console.log(error);
            }
          }
        });

        // //Remove Course

        _class.Courses.forEach(async (course) => {
          if (courses.filter((e) => e.ID == course.ID).length < 1) {
            console.log("remove", course);

            const _res = await axios.patch(CLASS_URL.DEV + "/courses", {
              courseId: course.ID,
              classId: _class.ID,
            });

            setClasses((prev) => [
              ...prev.map((e) => {
                if (e.ID == _class.ID) {
                  return ClassFromJSON(_res.data);
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
          setError(ClassError.ErrUpdatingClassCourses);
        }

        setLoading(null);
        failCallback();
      }
    },
    []
  );

  const _contextValue = useMemo(
    () => ({
      classes,
      loading,
      error,
      setError,
      AddClass,
      GetClasses,
      UpdateClass,
      DeleteClass,
      ManageCourse,
    }),
    [classes, loading, error]
  );

  return (
    <CLASS_CONTEXT.Provider value={_contextValue}>
      {children}
    </CLASS_CONTEXT.Provider>
  );
};

export const useClass = () => useContext(CLASS_CONTEXT);
