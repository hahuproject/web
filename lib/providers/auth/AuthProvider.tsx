/*

SERVICES
  - Register
  - Login
  - LogOut

STATES
  - Error ( Enum -> registration, login, logout )
  - Loading ( Enum -> Registering, logging in, logging out )

*/

import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Student,
  StudentFromJSON,
  User,
  UserFromJSON,
  USER_TYPES,
} from "../../models/User";
import { axios } from "../../utils/axios";

//URLS
enum AUTH_URL {
  DEV = "/auth",
}

//Loading
export enum AuthLoading {
  AUTO_LOGIN = "auto login",
  LOGIN = "login",
  REGISTER = "register",
  FETCHING_USERS = "fetching users",
  FETCHING_STUDENTS = "fetching students",
  APPROVING_USER = "approving user",
  BANNING_USER = "banning / unbanning user",
  UPDATING_STUDENT_PAYMENT = "updating student payment",
}

//Error
export enum AuthError {
  ERR_NETWORK = "network error",
  ERR_INVALID_CREDENTIALS = "Invalid credentials",
  ERR_FAILED_TO_FETCH_USERS = "failed to fetch users",
  ERR_FAILED_TO_FETCH_STUDENTS = "failed to fetch students",
  ERR_FAILED_TO_APPROVE_USER = "failed to approve user",
  ERR_FAILED_TO_BAN_USER = "failed to ban/unban user",
  ERR_UPDATING_STUDENT_PAYMENT = "failed to update student payment",
}

type AuthContextType = {
  user: User;
  users: User[];
  students: Student[];
  loading: AuthLoading;
  error: AuthError;
  setError: (v: AuthError) => void;
  Login: (
    username: string,
    password: string,
    save: boolean,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  Register: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  GetUsers: () => void;
  GetStudents: () => void;
  UpdateStudentPayment: (
    userId: string,
    status: boolean,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  ApproveUser: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  Logout: (successCallback?: Function, failCallback?: Function) => void;
  UnbanUser: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
  BanUser: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => void;
};

const AUTH_CONTEXT = createContext<AuthContextType>({
  user: null,
  users: null,
  students: null,
  loading: null,
  error: null,
  setError: (v: AuthError) => {},
  Login: (
    username: string,
    password: string,
    save: boolean,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  Register: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  GetUsers: () => {},
  GetStudents: () => {},
  UpdateStudentPayment: (
    userId: string,
    status: boolean,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  ApproveUser: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  Logout: (successCallback?: Function, failCallback?: Function) => {},
  BanUser: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
  UnbanUser: (
    user: User,
    successCallback?: Function,
    failCallback?: Function
  ) => {},
});

type Props = {
  children: any;
};

export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>();
  const [students, setStudents] = useState<Student[]>();
  const [loading, setLoading] = useState<AuthLoading>(AuthLoading.AUTO_LOGIN);
  const [error, setError] = useState<AuthError>();

  useEffect(() => {
    _autologin();
  }, []);

  const _getMe = useCallback(async (): Promise<User> => {
    try {
      const _res = await axios.get(`${AUTH_URL.DEV}/me`);

      const _user = UserFromJSON(_res.data);

      if (_user) {
        return _user;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }, []);

  const _autologin = useCallback(async () => {
    try {
      setError(null);
      setLoading(AuthLoading.AUTO_LOGIN);

      const _authToken = localStorage.getItem("authToken");

      if (!!!_authToken) {
        setLoading(null);
        return;
      }

      axios.defaults.headers.common.Authorization = `Bearer ${_authToken}`;

      const _user = await _getMe();

      console.log("auto login", _user);

      setUser(_user);
      setLoading(null);
    } catch (error) {
      console.log(error.toJSON());
      console.log(error);

      setLoading(null);
    }
  }, []);

  const Login = useCallback(
    async (
      username: string,
      password: string,
      save: boolean,
      successCallback: Function = () => {},
      failCallback: Function = () => {}
    ) => {
      type LoginRes = {
        token: string;
      };

      try {
        setError(null);
        setLoading(AuthLoading.LOGIN);

        const _res = await axios.post(AUTH_URL.DEV + "/login", {
          username,
          password,
        });

        console.log(_res);

        const _loginRes: LoginRes = _res.data;

        axios.defaults.headers.common.Authorization = `Bearer ${_loginRes.token}`;

        const _user = await _getMe();

        if (_user == null) {
          throw { message: "Can not get user" };
        }

        if (
          _user.Type != USER_TYPES.SUPER_ADMIN &&
          _user.Type != USER_TYPES.ADMIN &&
          _user.Type != USER_TYPES.REGISTRY_OFFICER &&
          _user.Type != USER_TYPES.DEPARTMENT_HEAD
        ) {
          throw { message: "Can not access admin panel with your credentials" };
        }

        if (save) {
          localStorage.setItem("authToken", _loginRes.token);
        }
        setUser(_user);

        successCallback();
        setLoading(null);
      } catch (error) {
        console.log(error);

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          setError(error.message);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setError(error.message);
        }
        failCallback();
        setLoading(null);
      }
    },
    []
  );

  const Register = useCallback(
    async (user: User, successCallback?: Function, failCallback?: Function) => {
      try {
        setError(null);
        setLoading(AuthLoading.REGISTER);

        const _registerFormData = new FormData();
        _registerFormData.append("firstName", user.FirstName);
        _registerFormData.append("lastName", user.LastName);
        _registerFormData.append("email", user.Email);
        _registerFormData.append("phone", user.Phone);
        _registerFormData.append("username", user.Username);
        _registerFormData.append("password", user.Password);
        _registerFormData.append("country", user.Address.Country);
        _registerFormData.append("region", user.Address.Region);
        _registerFormData.append("city", user.Address.City);
        _registerFormData.append("subCity", user.Address.SubCity);
        _registerFormData.append("woreda", user.Address.Woreda.toString());
        _registerFormData.append("houseNo", user.Address.HouseNo.toString());
        _registerFormData.append("profilePic", user.ProfilePic);

        //Student
        _registerFormData.append("middleName", user.MiddleName);
        _registerFormData.append("gender", user.Gender);
        _registerFormData.append("birthDate", user.BirthDate);
        _registerFormData.append("birthPlace", user.BirthPlace);
        _registerFormData.append("disability", user.Disability);
        _registerFormData.append("previousSchool", user.PreviousSchool);
        _registerFormData.append(
          "avarageMarkForHighSchool",
          user.AvarageMarkForHighSchool &&
            user.AvarageMarkForHighSchool.toString()
        );
        _registerFormData.append(
          "matricResult",
          user.MatricResult && user.MatricResult.toString()
        );
        _registerFormData.append("program", user.Program);
        _registerFormData.append("classId", "");
        _registerFormData.append(
          "streamId",
          !!user.Stream ? user.Stream.ID : ""
        );
        _registerFormData.append(
          "departmentName",
          user.Department && user.Department.Name
        );
        _registerFormData.append(
          "departmentId",
          user.Department && user.Department.ID
        );
        _registerFormData.append(
          "emergencyContactName",
          user.EmergencyContactName
        );
        _registerFormData.append(
          "emergencyContactPhone",
          user.EmergencyContactPhone
        );
        _registerFormData.append(
          "emergencyContactRelation",
          user.EmergencyContactRelation
        );
        _registerFormData.append(
          "emergencyContactCountry",
          user.EmergencyContactAddress && user.EmergencyContactAddress.Country
        );
        _registerFormData.append(
          "emergencyContactRegion",
          user.EmergencyContactAddress && user.EmergencyContactAddress.Region
        );
        _registerFormData.append(
          "emergencyContactCity",
          user.EmergencyContactAddress && user.EmergencyContactAddress.City
        );
        _registerFormData.append(
          "emergencyContactSubcity",
          user.EmergencyContactAddress && user.EmergencyContactAddress.SubCity
        );
        _registerFormData.append(
          "emergencyContactWoreda",
          user.EmergencyContactAddress &&
            user.EmergencyContactAddress.Woreda.toString()
        );
        _registerFormData.append(
          "emergencyContactHouseNo",
          user.EmergencyContactAddress &&
            user.EmergencyContactAddress.HouseNo.toString()
        );

        _registerFormData.append(
          "employmentType",
          user.EmploymentType && user.EmploymentType
        );

        const _res = await axios.post(
          `${AUTH_URL.DEV}/register/${user.Type}`,
          _registerFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log(_res);

        successCallback();
        setLoading(null);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          setError(error.message);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setError(error.message);
        }
        failCallback();
        setLoading(null);
      }
    },
    []
  );

  const UpdateStudentPayment = useCallback(
    async (
      userId: string,
      status: boolean,
      successCallback?: Function,
      failCallback?: Function
    ) => {
      var statusUrl = "";
      if (status.toString() == "true") {
        statusUrl = `&status=true`;
      }

      try {
        setError(null);
        setLoading(AuthLoading.UPDATING_STUDENT_PAYMENT);

        console.log("status");
        console.log(status);
        console.log(statusUrl);

        const _res = await axios.get(
          AUTH_URL.DEV + `/students/update-payment?id=${userId}${statusUrl}`
        );

        setStudents((prev) => [
          StudentFromJSON(_res.data),
          ...prev.filter((e) => e.ID != userId),
        ]);

        // GetStudents();
        setLoading(null);
        successCallback();
      } catch (error) {
        console.log(error);

        setError(AuthError.ERR_UPDATING_STUDENT_PAYMENT);
        setLoading(null);
        failCallback();
      }
    },
    []
  );

  const GetStudents = useCallback(async () => {
    try {
      setError(null);
      setLoading(AuthLoading.FETCHING_STUDENTS);

      const _res = await axios.get(AUTH_URL.DEV + "/students");

      setStudents((_res.data as JSON[]).map((e) => StudentFromJSON(e)));
      setLoading(null);
    } catch (error) {
      console.log(error);

      setError(AuthError.ERR_FAILED_TO_FETCH_STUDENTS);
      setLoading(null);
    }
  }, []);

  const GetUsers = useCallback(async () => {
    try {
      setError(null);
      setLoading(AuthLoading.FETCHING_USERS);

      const _res = await axios.get(AUTH_URL.DEV + "/users");

      setUsers((_res.data as JSON[]).map((e) => UserFromJSON(e)));
      setLoading(null);
    } catch (error) {
      console.log(error);

      setError(AuthError.ERR_FAILED_TO_FETCH_USERS);
      setLoading(null);
    }
  }, []);

  const UnbanUser = useCallback(
    async (user: User, successCallback?: Function, failCallback?: Function) => {
      try {
        setError(null);
        setLoading(AuthLoading.BANNING_USER);

        const _res = await axios.get(AUTH_URL.DEV + `/unban?id=${user.ID}`);

        setUsers((prev) => [
          ...prev.map((e) => {
            if (e.ID == user.ID) {
              e.Banned = false;
              return e;
            }
            return e;
          }),
        ]);
        setLoading(null);
        successCallback && successCallback();
      } catch (error) {
        console.log(error);

        setError(AuthError.ERR_FAILED_TO_BAN_USER);
        setLoading(null);
        failCallback && failCallback();
      }
    },
    []
  );

  const BanUser = useCallback(
    async (user: User, successCallback?: Function, failCallback?: Function) => {
      try {
        setError(null);
        setLoading(AuthLoading.BANNING_USER);

        const _res = await axios.get(AUTH_URL.DEV + `/ban?id=${user.ID}`);

        setUsers((prev) => [
          ...prev.map((e) => {
            if (e.ID == user.ID) {
              e.Banned = true;
              return e;
            }
            return e;
          }),
        ]);
        setLoading(null);
        successCallback && successCallback();
      } catch (error) {
        console.log(error);

        setError(AuthError.ERR_FAILED_TO_BAN_USER);
        setLoading(null);
        failCallback && failCallback();
      }
    },
    []
  );

  const ApproveUser = useCallback(
    async (user: User, successCallback?: Function, failCallback?: Function) => {
      try {
        setError(null);
        setLoading(AuthLoading.APPROVING_USER);

        const _res = await axios.get(AUTH_URL.DEV + `/approve?id=${user.ID}`);

        // setUsers((prev) => [
        //   ...prev.map((e) => {
        //     if (e.ID == user.ID) {
        //       e.Verified = true;
        //       return e;
        //     }
        //     return e;
        //   }),
        // ]);
        GetUsers();
        setLoading(null);
        successCallback && successCallback();
      } catch (error) {
        console.log(error);

        setError(AuthError.ERR_FAILED_TO_APPROVE_USER);
        setLoading(null);
        failCallback && failCallback();
      }
    },
    []
  );

  const Logout = useCallback(
    (successCallback?: Function, failCallback?: Function) => {
      try {
        localStorage.clear();
        successCallback && successCallback();
      } catch (error) {
        failCallback && failCallback();
      }
    },
    []
  );

  const _contextValue = useMemo(
    () => ({
      user,
      users,
      students,
      loading,
      error,
      setError,
      Login,
      Register,
      GetUsers,
      ApproveUser,
      Logout,
      BanUser,
      UnbanUser,
      GetStudents,
      UpdateStudentPayment,
    }),
    [user, users, loading, error, students]
  );

  return (
    <AUTH_CONTEXT.Provider value={_contextValue}>
      {children}
    </AUTH_CONTEXT.Provider>
  );
};

export const useAuth = () => useContext(AUTH_CONTEXT);
