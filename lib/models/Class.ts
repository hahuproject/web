import { Course, CourseFromJSON, CourseToJSON } from "./Course";
import { Department, DepartmentFromJSON, DepartmentToJSON } from "./Department";
import { Section, SectionFromJSON, SectionToJSON } from "./Section";
import { Stream, StreamFromJSON, StreamToJSON } from "./Stream";
import { Student, StudentFromJSON } from "./User";

export type Class = {
  ID?: string;
  Name: string;
  SubName?: string;
  Department: Department;
  Stream?: Stream;
  Students?: Student[];
  Sections?: Section[];
  Courses?: Course[];
};

export const ClassFromJSON = (_class: JSON): Class => {
  return {
    ID: _class["classId"],
    Name: _class["name"],
    SubName: _class["subName"] ?? "",
    Department:
      !!_class["department"] && DepartmentFromJSON(_class["department"]),
    Stream: !!_class["stream"] && StreamFromJSON(_class["stream"]),
    Students: !!_class["students"]
      ? (_class["students"] as JSON[]).map((e) => StudentFromJSON(e))
      : [],
    Sections: !!_class["sections"]
      ? (_class["sections"] as JSON[]).map((e) => SectionFromJSON(e))
      : [],
    Courses: !!_class["courses"]
      ? (_class["courses"] as JSON[]).map((e) => CourseFromJSON(e))
      : [],
  };
};

export const ClassToJSON = (
  _class: Class
): {
  classId: string;
  name: string;
  subName: string;
  stream: Object;
  department: Object;
  students: Object[];
  sections: object[];
  courses: object[];
} => {
  return {
    classId: _class.ID,
    name: _class.Name,
    subName: _class.SubName ?? "",
    department: DepartmentToJSON(_class.Department),
    stream: !!_class.Stream ? StreamToJSON(_class.Stream) : {},
    students: [],
    sections: !!_class.Sections
      ? _class.Sections.map((e) => SectionToJSON(e))
      : [],
    courses: !!_class.Courses ? _class.Courses.map((e) => CourseToJSON(e)) : [],
  };
};
