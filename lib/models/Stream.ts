import { Course, CourseFromJSON, CourseToJSON } from "./Course";
import { Department, DepartmentFromJSON, DepartmentToJSON } from "./Department";
import { Section, SectionFromJSON, SectionToJSON } from "./Section";
import { Student, StudentFromJSON } from "./User";

export type Stream = {
  ID?: string;
  Name: string;
  Department: Department;
};

export const StreamFromJSON = (_class: JSON): Stream => {
  return {
    ID: _class["streamId"],
    Name: _class["name"],
    Department:
      !!_class["department"] && DepartmentFromJSON(_class["department"]),
  };
};

export const StreamToJSON = (
  _class: Stream
): {
  streamId: string;
  name: string;
  department: Object;
} => {
  return {
    streamId: _class.ID,
    name: _class.Name,
    department: DepartmentToJSON(_class.Department),
  };
};
