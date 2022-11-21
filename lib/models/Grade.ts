import { Course, CourseFromJSON } from "./Course";
import { User, UserFromJSON } from "./User";

export type Grade = {
  ID?: string;
  Assessment: number;
  Mid: number;
  Final: number;
  Course: Course;
  User: User;
  ReviewRequested?: boolean;
};

export const GradeFromJSON = (grade: JSON): Grade => {
  return {
    ID: grade["gradeId"],
    Assessment: grade["assessment"],
    Mid: grade["mid"],
    Final: grade["final"],
    Course: CourseFromJSON(grade["course"]),
    User: UserFromJSON(grade["user"]),
    ReviewRequested: grade["reviewRequested"],
  };
};

export type GradeLabel = {
  ID?: string;
  Label: string;
  Min: number;
  Max: number;
};

export const GradeLabelFromJSON = (gradeLabel: JSON): GradeLabel => {
  return {
    ID: gradeLabel["gradeLabelId"] || "",
    Label: gradeLabel["label"],
    Min: gradeLabel["min"],
    Max: gradeLabel["max"],
  };
};

export const GradeLabelToJSON = (
  gradeLabel: GradeLabel
): {
  gradeLabelId?: string;
  label: string;
  min: number;
  max: number;
} => {
  return {
    gradeLabelId: gradeLabel.ID,
    label: gradeLabel.Label,
    min: gradeLabel.Min,
    max: gradeLabel.Max,
  };
};
