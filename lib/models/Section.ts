import { Class, ClassFromJSON, ClassToJSON } from "./Class";
import { Session, SessionFromJSON, SessionToJSON } from "./Session";
import { Student, StudentFromJSON } from "./User";

export type Section = {
  ID?: string;
  Name: string;
  Class: Class;
  Year: number;
  Sessions?: Session[];
  Students?: Student[];
};

export const SectionFromJSON = (section: JSON): Section => {
  return {
    ID: section["sectionId"] ?? "",
    Name: section["name"] ?? "",
    Year: section["year"] ?? 0,
    Class: !!section["class"] ? ClassFromJSON(section["class"]) : null,
    Sessions: !!section["sessions"]
      ? (section["sessions"] as JSON[]).map((e) => SessionFromJSON(e))
      : null,
    Students: !!section["students"]
      ? (section["students"] as JSON[]).map((e) => StudentFromJSON(e))
      : null,
  };
};

export const SectionToJSON = (
  section: Section
): {
  sectionId: string;
  name: string;
  year: number;
  class: object;
  sessions: object[];
} => {
  return {
    sectionId: section.ID,
    name: section.Name,
    year: section.Year,
    class: ClassToJSON(section.Class),
    sessions: section.Sessions
      ? section.Sessions.map((e) => SessionToJSON(e))
      : [],
  };
};
