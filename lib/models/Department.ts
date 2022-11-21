import { Class, ClassFromJSON, ClassToJSON } from "./Class";
import { Stream, StreamFromJSON, StreamToJSON } from "./Stream";
import { User, UserFromJSON, UserToJSON } from "./User";

export type Department = {
  ID?: string;
  Name: string;
  Head?: User;
  Classes?: Class[];
  Streams?: Stream[];
};

export const DepartmentFromJSON = (department: JSON): Department => {
  const _department: Department = {
    ID: department["departmentId"],
    Name: department["name"],
    Head:
      !!department["head"] &&
      !!department["head"]["user"] &&
      UserFromJSON(department["head"]["user"]),
    Classes: !!department["classes"]
      ? (department["classes"] as JSON[]).map((e) => ClassFromJSON(e))
      : [],
    Streams: !!department["streams"]
      ? (department["streams"] as JSON[]).map((e) => StreamFromJSON(e))
      : [],
  };

  return _department;
};

export const DepartmentToJSON = (
  department: Department
): {
  departmentId: string;
  name: string;
  head: Object;
  classes: Object[];
  streams: Object[];
} => {
  // console.log(!!department.Head);

  return {
    departmentId: department.ID,
    name: department.Name,
    head: !!department.Head
      ? {
          userId: department.Head.ID,
          user: UserToJSON(department.Head),
        }
      : {},
    classes: !!department.Classes
      ? department.Classes.map((e) => ClassToJSON(e))
      : [],
    streams: !!department.Streams
      ? department.Streams.map((e) => StreamToJSON(e))
      : [],
  };
};
