import { User, UserFromJSON, UserToJSON } from "./User";

export type Course = {
  ID?: string;
  Name: string;
  CreditHr: number;
  Color?: string;
  Users?: User[];
  Prerequisites: Course[];
};

export const CourseFromJSON = (course: JSON): Course => {
  return {
    ID: course["courseId"],
    Name: course["name"],
    CreditHr: parseInt(course["creditHr"]) ?? 0,
    Color: course["color"] ?? "#fff",
    Users: !!course["users"]
      ? (course["users"] as JSON[]).map((e) => UserFromJSON(e))
      : [],
    Prerequisites: !!course["prerequisites"]
      ? (course["prerequisites"] as JSON[]).map((e) => CourseFromJSON(e))
      : [],
  };
};

export const CourseToJSON = (
  course: Course
): {
  courseId: string;
  name: string;
  creditHr: Number;
  color: string;
} => {
  return <
    {
      courseId: string;
      name: string;
      creditHr: Number;
      color: string;
      users: object[];
      prerequisites: object[];
    }
  >{
    courseId: course.ID ?? "",
    name: course.Name,
    creditHr: parseInt(course.CreditHr.toString()),
    color: course.Color,
    users: !!course.Users ? course.Users.map((e) => UserToJSON(e)) : [],
    prerequisites: !!course.Prerequisites
      ? course.Prerequisites.map((e) => CourseToJSON(e))
      : [],
  };
};
