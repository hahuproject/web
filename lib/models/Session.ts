import { Course, CourseFromJSON, CourseToJSON } from "./Course";
import { Section, SectionFromJSON, SectionToJSON } from "./Section";
import { User, UserFromJSON, UserToJSON } from "./User";

export type Session = {
  ID?: string;
  StartDate: Date;
  Duration: number;
  Section: Section;
  Course: Course;
  User: User;
};

export const SessionFromJSON = (session: JSON): Session => {
  return {
    ID: session["sessionId"] ?? "",
    StartDate: !!session["startDate"] ? new Date(session["startDate"]) : null,
    Duration: session["duration"] ?? 0,
    Section: session["section"] ? SectionFromJSON(session["section"]) : null,
    Course: !!session["course"] ? CourseFromJSON(session["course"]) : null,
    User: !!session["instructor"] ? UserFromJSON(session["instructor"]) : null,
  };
};

export const SessionToJSON = (
  session: Session
): {
  sessionId: string;
  startDate: Date;
  duration: number;
  section: object;
  course: object;
  instructor: object;
} => {
  return {
    sessionId: session.ID,
    startDate: session.StartDate,
    duration: session.Duration,
    section: SectionToJSON(session.Section),
    course: !!session.Course ? CourseToJSON(session.Course) : {},
    instructor: !!session.User ? UserToJSON(session.User) : {},
  };
};
