/*

SERVICES
    - Add Course
    - Get Courses
    - Update Course [P]
    - Manage Course Users
    - Delete course

STATE
    - Error ( Vars -> Fetching, Adding )
    - Loading ( Enums -> Fetching, Adding )

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
import { Course, CourseFromJSON, CourseToJSON } from "../../models/Course";
import { User } from "../../models/User";
import { axios } from "../../utils/axios";

//URLS
const COURSE_URL = {
  DEV: "/courses",
};

//Error
const ErrFetchingCourses = "failed to fetch courses";
const ErrAddingCourse = "failed to add a course";
const ErrUpdatingClassCourses = "failed to update course users";

//Loading
export enum CourseLoading {
  FetchingCourses = "fetching courses",
  AddingCourse = "adding course",
  ManagingUsers = "managing users",
  DeletingCourse = "deleting course",
  UpdatingCourse = "updating course",
}

type CourseContextType = {
  courses: Course[];
  loading: CourseLoading;
  error: string;
  setError: (v: string) => void;
  AddCourse: (
    course: Course,
    successCallback: () => void,
    failCallback: () => void
  ) => void;
  GetCourses: () => void;
  ManageCourseUsers: (
    course: Course,
    users: User[],
    successCallback: Function,
    failCallback: Function
  ) => void;
  UpdateCourse: (
    course: Course,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  DeleteCourse: (
    courseId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
};

const COURSE_CONTEXT = createContext<CourseContextType>({
  courses: null,
  loading: null,
  error: null,
  setError: (v: string) => {},
  AddCourse: (
    course: Course,
    successCallback: () => void,
    failCallback: () => void
  ) => {},
  GetCourses: () => {},
  ManageCourseUsers: (
    course: Course,
    users: User[],
    successCallback: Function,
    failCallback: Function
  ) => {},
  UpdateCourse: (
    course: Course,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  DeleteCourse: (
    courseId: string,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
});

type CourseProviderProps = {
  children: JSX.Element;
};

export const CourseProvider: FunctionComponent<CourseProviderProps> = ({
  children,
}) => {
  const [courses, setCourses] = useState<Course[]>();
  const [loading, setLoading] = useState<CourseLoading>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    GetCourses();
  }, []);

  const AddCourse = useCallback(
    async (
      course: Course,
      successCallback: () => void,
      failCallback: () => void
    ) => {
      try {
        console.log(course);

        setError(null);
        setLoading(CourseLoading.AddingCourse);

        const _res = await axios.post(COURSE_URL.DEV, CourseToJSON(course));

        setCourses((prev) => [...prev, CourseFromJSON(_res.data)]);
        setLoading(null);
        successCallback();
      } catch (error) {
        console.log(error);

        if (error.response) {
          setError(error.response.data);
        } else {
          setError(ErrAddingCourse);
        }
        setLoading(null);
        failCallback();
      }
    },
    []
  );
  const GetCourses = useCallback(async () => {
    try {
      setError(null);
      setLoading(CourseLoading.FetchingCourses);

      const _res = await axios.get(COURSE_URL.DEV);

      setCourses((_res.data as JSON[]).map((e) => CourseFromJSON(e)));

      setLoading(null);
    } catch (error) {
      setError(ErrFetchingCourses);
      setLoading(null);
    }
  }, []);

  const ManageCourseUsers = useCallback(
    async (
      course: Course,
      users: User[],
      successCallback: Function,
      failCallback: Function
    ) => {
      try {
        setError(null);
        setLoading(CourseLoading.ManagingUsers);

        //Add User
        users.forEach(async (user) => {
          if (course.Users.filter((e) => e.ID == user.ID).length < 1) {
            console.log("add", user);

            try {
              const _res = await axios.post(COURSE_URL.DEV + "/users", {
                courseId: course.ID,
                userId: user.ID,
              });

              console.log(_res.data);

              setCourses((prev) => [
                ...prev.map((e) => {
                  if (e.ID == course.ID) {
                    return CourseFromJSON(_res.data);
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

        course.Users.forEach(async (user) => {
          if (users.filter((e) => e.ID == user.ID).length < 1) {
            console.log("remove", user);

            const _res = await axios.patch(COURSE_URL.DEV + "/users", {
              courseId: course.ID,
              userId: user.ID,
            });

            setCourses((prev) => [
              ...prev.map((e) => {
                if (e.ID == course.ID) {
                  return CourseFromJSON(_res.data);
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
          setError(ErrUpdatingClassCourses);
        }

        setLoading(null);
        failCallback();
      }
    },
    []
  );

  const UpdateCourse = useCallback(
    async (
      course: Course,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(CourseLoading.UpdatingCourse);

        const _res = await axios.patch(COURSE_URL.DEV, CourseToJSON(course));

        setCourses((prev) => [
          CourseFromJSON(_res.data),
          ...prev.filter((e) => e.ID != course.ID),
        ]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(ErrUpdatingClassCourses);
        }

        setLoading(null);
        failCallback();
      }
    },
    []
  );

  const DeleteCourse = useCallback(
    async (
      courseId: string,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(CourseLoading.DeletingCourse);

        await axios.delete(COURSE_URL.DEV + `?id=${courseId}`);

        setCourses((prev) => [...prev.filter((e) => e.ID != courseId)]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(ErrUpdatingClassCourses);
        }

        setLoading(null);
        failCallback();
      }
    },
    []
  );

  const _contextValue = useMemo(
    () => ({
      courses,
      loading,
      error,
      setError,
      AddCourse,
      GetCourses,
      ManageCourseUsers,
      UpdateCourse,
      DeleteCourse,
    }),
    [courses, loading, error, setError, AddCourse, GetCourses]
  );

  return (
    <COURSE_CONTEXT.Provider value={_contextValue}>
      {children}
    </COURSE_CONTEXT.Provider>
  );
};

export const useCourse = () => useContext(COURSE_CONTEXT);
