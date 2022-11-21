import { Address, AddressFromJSON, AddressToJSON } from "./Address";
import { Class, ClassFromJSON } from "./Class";
import { Course, CourseFromJSON } from "./Course";
import { Department, DepartmentFromJSON } from "./Department";
import { Section, SectionFromJSON } from "./Section";
import { Stream, StreamFromJSON } from "./Stream";

export enum USER_TYPES {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  REGISTRY_OFFICER = "registry-officer",
  SUB_REGISTRY_OFFICER = "sub-registry-officer",
  DEPARTMENT_HEAD = "department-head",
  INSTRUCTOR = "instructor",
  SUPERVISOR = "supervisor",
  STUDENT = "student",
}

export enum EmploymentType {
  FullTime = "FULL-TIME",
  PartTime = "PART-TIME",
}

export type User = {
  ID?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  CreatedAt?: Date;
  ProfilePic: File | string;
  Verified?: boolean;
  Type?: USER_TYPES;
  Banned?: boolean;

  Address?: Address;

  Username: string;
  Password: string;

  //Student
  MiddleName?: string;
  Gender?: string;
  BirthDate?: string;
  BirthPlace?: string;
  Disability?: string;

  PreviousSchool?: string;
  AvarageMarkForHighSchool?: number;
  MatricResult?: number;
  Program?: string;
  Department?: Department;
  Section?: Section;
  Stream?: Stream;

  EmergencyContactName?: string;
  EmergencyContactPhone?: string;
  EmergencyContactRelation?: string;
  EmergencyContactAddress?: Address;

  //Instructor
  SalaryRate?: number;
  EmploymentType?: EmploymentType;

  //Supervisor
  Industry?: string;
};

export const UserFromJSON = (user: JSON): User => {
  var _user: User = {
    ID: user["userId"],
    FirstName: user["firstName"],
    LastName: user["lastName"],
    Email: user["email"] ?? "",
    Phone: user["phone"] ?? "",
    Username: user["username"],
    Password: user["password"],
    Address: {
      Country: user["address"]["country"],
      Region: user["address"]["region"] ?? "",
      City: user["address"]["city"] ?? "",
      SubCity: user["address"]["subCity"] ?? "",
      Woreda: user["address"]["woreda"] ?? 0,
      HouseNo: user["address"]["houseNo"] ?? "",
    },
    ProfilePic: user["profilePic"],
    Type: !!user["type"]
      ? user["type"].split("_").join("-").toString().toLowerCase()
      : "",
    Verified: !!user["verified"],
    Banned: !!user["banned"],
    CreatedAt: new Date(user["createdAt"]),
    SalaryRate: user["salaryRate"] ?? 0,
    EmploymentType: user["employmentType"],
    Industry: user["industry"] ?? "",

    //Student
    MiddleName: user["middleName"],
    Gender: user["gender"],
    BirthDate: user["birthDate"],
    BirthPlace: user["birthPlace"],
    Disability: user["disability"],
    PreviousSchool: user["previousSchool"],
    AvarageMarkForHighSchool: user["avarageMarkForHighSchool"],
    MatricResult: user["matricResult"],
    Program: user["program"],
    EmergencyContactName: user["emergencyContactName"],
    EmergencyContactPhone: user["emergencyContactPhone"],
    EmergencyContactRelation: user["emergencyContactRelation"],
    EmergencyContactAddress: user["emergencyContactAddress"],
    Stream: !!user["stream"] ? StreamFromJSON(user["stream"]) : null,
    Department: !!user["department"]
      ? DepartmentFromJSON(user["department"])
      : null,
    Section: !!user["section"] ? SectionFromJSON(user["section"]) : null,
  };

  return _user;
};

export const UserToJSON = (
  user: User
): {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  profilePic: string;
  type: string;
  password: string;
  address: Object;
  verified: boolean;
  createdAt: Date;

  //Instructor
  salaryRate: number;
  employmentType: string;

  //Supervisor
  industry: string;

  //Student
  middleName: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  disability: string;
  previousSchool: string;
  avarageMarkForHighSchool: number;
  matricResult: number;
  program: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  emergencyContactAddress: object;
  stream: object;
  department: object;
  section: object;
} => {
  return {
    userId: user.ID,
    firstName: user.FirstName,
    lastName: user.LastName,
    email: user.Email,
    phone: user.Phone,
    username: user.Username,
    profilePic: user.ProfilePic.toString(),
    type: user.Type,
    password: user.Password,
    address: AddressToJSON(user.Address),
    verified: !!user.Verified,
    createdAt: user.CreatedAt,

    salaryRate: user.SalaryRate,
    employmentType: user.EmploymentType,

    industry: user.Industry ?? "",

    //Student
    middleName: user.MiddleName,
    gender: user.Gender,
    birthDate: user.BirthDate,
    birthPlace: user.BirthPlace,
    disability: user.Disability,
    previousSchool: user.PreviousSchool,
    avarageMarkForHighSchool: user.AvarageMarkForHighSchool,
    matricResult: user.MatricResult,
    program: user.Program,
    emergencyContactName: user.EmergencyContactName,
    emergencyContactPhone: user.EmergencyContactPhone,
    emergencyContactRelation: user.EmergencyContactRelation,
    emergencyContactAddress: AddressToJSON(user.EmergencyContactAddress),
    stream: user.Stream,
    department: user.Department,
    section: user.Section,
  };
};

export type Student = {
  ID?: string;
  MiddleName?: string;
  Gender?: string;
  BirthDate?: string;
  BirthPlace?: string;
  Disability?: string;
  Paid: boolean;

  PreviousSchool?: string;
  AvarageMarkForHighSchool?: number;
  MatricResult?: number;
  Program?: string;
  Class?: Class;
  Department?: Department;
  Section?: Section;
  Courses?: Course[];

  EmergencyContactName?: string;
  EmergencyContactPhone?: string;
  EmergencyContactRelation?: string;
  EmergencyContactAddress?: Address;
  User: User;
};

export const StudentFromJSON = (student: JSON): Student => {
  return {
    ID: student["userId"],
    MiddleName: student["middleName"],
    Gender: student["gender"],
    BirthDate: student["birthDate"],
    BirthPlace: student["birthPlace"],
    Disability: student["disability"],
    PreviousSchool: student["previousSchool"],
    AvarageMarkForHighSchool: student["averageMarkForHighschool"],
    MatricResult: student["matricResult"],
    Program: student["program"],
    Department:
      !!student["department"] && DepartmentFromJSON(student["department"]),
    Section: student["section"],
    Courses:
      !!student["courses"] &&
      (student["courses"] as JSON[]).map((e) => CourseFromJSON(e)),
    EmergencyContactName: student["emergencyContactName"],
    EmergencyContactPhone: student["emergencyContactPhone"],
    EmergencyContactRelation: student["emergencyContactRelation"],
    EmergencyContactAddress:
      !!student["emergencyContactAddress"] &&
      AddressFromJSON(student["emergencyContactAddress"]),
    User: !!student["user"] && UserFromJSON(student["user"]),
    Paid: !!student["paid"] ? student["paid"] : false,
  };
};
