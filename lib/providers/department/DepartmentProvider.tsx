/*

A provider for all department services

Services 
    - Add department
    - Get all departments
    - Get a department
    - Update a department
    - Delete a department

States to handle
    - List of departments
    - A selected department
    - Loading states for ( ENUM -- fetching, adding, updating, deleting )
    - Error states with a string ( CONST -- Failed to fetch departments, Failed to add, failed to update, failed to delete )

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
  Department,
  DepartmentFromJSON,
  DepartmentToJSON,
} from "../../models/Department";
import { Stream, StreamToJSON } from "../../models/Stream";
import { axios } from "../../utils/axios";

export enum DepartmentLoading {
  FetchingAllDepartments = "fetching all departments",
  AddingDepartment = "adding department",
  UpdatingDepartment = "updating department",
  DeletingDepartment = "deleting department",
  UPDATING_DEPARTMENT = "updating department",
  AddingStream = "adding stream",
  UpdatingStream = "updating stream",
  DeletingStream = "deleting stream",
}

//URL
const DEPARTMENT_URL = {
  DEV: "/departments",
};

//Errors
const ErrFetchingDepartments = "Failed to fetch departments";
const ErrAddingDepartment = "Failed to add department";
const ErrUpdatingDepartment = "Failed to update department";

type DepartmentContextType = {
  departments: Department[];
  department: Department;
  loading: DepartmentLoading;
  error: string;
  setError: (v) => void;
  AddDepartment: (
    department: Department,
    successCallback: () => void,
    failCallback: () => void
  ) => void;
  GetDepartments: () => void;
  GetDepartment: (v: string) => void;
  UpdateDepartment: (
    department: Department,
    successCallback: () => void,
    failCallback: () => void
  ) => void;
  DeleteDepartment: (
    id: string,
    successCallback?: () => void,
    failCallback?: () => void
  ) => void;
  AddStream: (
    stream: Stream,
    successCallback?: () => void,
    failCallback?: () => void
  ) => void;
  UpdateStream: (
    stream: Stream,
    successCallback?: () => void,
    failCallback?: () => void
  ) => void;
  DeleteStream: (
    id: string,
    successCallback?: () => void,
    failCallback?: () => void
  ) => void;
};

const DEPARTMENT_CONTEXT = createContext<DepartmentContextType>({
  departments: null,
  department: null,
  loading: null,
  error: null,
  setError: (v: string) => {},
  AddDepartment: (
    department: Department,
    successCallback: () => void,
    failCallback: () => void
  ) => {},
  GetDepartments: () => {},
  GetDepartment: (v: string) => {},
  UpdateDepartment: (
    department: Department,
    successCallback: () => void,
    failCallback: () => void
  ) => {},
  DeleteDepartment: (
    id: string,
    successCallback: () => void,
    failCallback: () => void
  ) => {},
  AddStream: (
    stream: Stream,
    successCallback?: () => void,
    failCallback?: () => void
  ) => {},
  UpdateStream: (
    stream: Stream,
    successCallback?: () => void,
    failCallback?: () => void
  ) => {},
  DeleteStream: (
    id: string,
    successCallback?: () => void,
    failCallback?: () => void
  ) => {},
});

type Props = {
  children: JSX.Element;
};

export const DepartmentProvider: FunctionComponent<Props> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>();
  const [department, setDepartment] = useState<Department>();
  const [loading, setLoading] = useState<DepartmentLoading>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    GetDepartments();
  }, []);

  const AddDepartment = useCallback(
    async (department: Department, successCallback, failCallback) => {
      try {
        setError(null);
        setLoading(DepartmentLoading.AddingDepartment);

        const _res = await axios.post(
          DEPARTMENT_URL.DEV,
          DepartmentToJSON(department)
        );

        setDepartments((prev) => {
          return [...prev, DepartmentFromJSON(_res.data)];
        });
        setLoading(null);
        successCallback();
      } catch (error) {
        console.log(error);

        setError(ErrAddingDepartment);
        setLoading(null);
        failCallback();
      }
    },
    []
  );
  const GetDepartments = useCallback(async () => {
    try {
      setError(null);
      setLoading(DepartmentLoading.FetchingAllDepartments);

      const _res = await axios.get(DEPARTMENT_URL.DEV);

      setDepartments((_res.data as JSON[]).map((e) => DepartmentFromJSON(e)));

      setLoading(null);
    } catch (error) {
      console.log(error);

      setError(ErrFetchingDepartments);
      setLoading(null);
    }
  }, []);
  const GetDepartment = useCallback(() => {}, []);
  const UpdateDepartment = useCallback(
    async (
      department: Department,
      successCallback: () => void,
      failCallback: () => void
    ) => {
      try {
        setError(null);
        setLoading(DepartmentLoading.UPDATING_DEPARTMENT);

        department.Head.Address.HouseNo = "";

        console.log(DepartmentToJSON(department));
        const _res = await axios.patch(
          DEPARTMENT_URL.DEV,
          DepartmentToJSON(department)
        );

        console.log(_res);

        console.log(DepartmentFromJSON(_res.data as JSON));

        setDepartments((prev) => [
          ...prev.map((e) => {
            if (e.ID == department.ID) {
              return DepartmentFromJSON(_res.data as JSON);
            }
            return e;
          }),
        ]);

        setLoading(null);
        successCallback();
      } catch (error) {
        console.log(error);

        setError(ErrUpdatingDepartment);
        setLoading(null);
        failCallback();
      }
    },
    []
  );
  const DeleteDepartment = useCallback(
    async (
      departmentId: string,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(DepartmentLoading.DeletingDepartment);

        await axios.delete(DEPARTMENT_URL.DEV + `?id=${departmentId}`);

        setDepartments((prev) => [...prev.filter((e) => e.ID != departmentId)]);

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to delete department");
        }
        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );

  const AddStream = useCallback(
    async (
      stream: Stream,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(DepartmentLoading.AddingStream);

        const _res = await axios.post("/streams", StreamToJSON(stream));

        await GetDepartments();

        !!successCallback && successCallback();
        setLoading(null);
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to add stream");
        }
        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );

  const UpdateStream = useCallback(
    async (
      stream: Stream,
      successCallback: () => void,
      failCallback: () => void
    ) => {
      try {
        setError(null);
        setLoading(DepartmentLoading.UpdatingStream);

        const _res = await axios.patch("streams", StreamToJSON(stream));

        await GetDepartments();

        setLoading(null);
        successCallback();
      } catch (error) {
        console.log(error);

        setError("Error updating stream");
        setLoading(null);
        failCallback();
      }
    },
    []
  );

  const DeleteStream = useCallback(
    async (
      streamId: string,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      try {
        setError(null);
        setLoading(DepartmentLoading.DeletingStream);

        await axios.delete("streams" + `?id=${streamId}`);

        await GetDepartments();

        setLoading(null);
        !!successCallback && successCallback();
      } catch (error) {
        if (!!error.response) {
          setError(error.response.data);
        } else {
          setError("Failed to delete stream");
        }
        setLoading(null);
        !!failCallback && failCallback();
      }
    },
    []
  );

  const _contextValue = useMemo(
    () => ({
      departments,
      department,
      loading,
      error,
      setError,
      AddDepartment,
      GetDepartments,
      GetDepartment,
      UpdateDepartment,
      DeleteDepartment,
      AddStream,
      UpdateStream,
      DeleteStream,
    }),
    [departments, department, loading, error]
  );

  return (
    <DEPARTMENT_CONTEXT.Provider value={_contextValue}>
      {children}
    </DEPARTMENT_CONTEXT.Provider>
  );
};

export const useDepartment = () => useContext(DEPARTMENT_CONTEXT);
