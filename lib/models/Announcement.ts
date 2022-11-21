import { Section, SectionFromJSON, SectionToJSON } from "./Section";
import { User, UserFromJSON, UserToJSON } from "./User";

export type Announcement = {
  ID?: string;
  Title: string;
  Message: string;
  CreatedAt?: Date;
  PostedBy?: User;
  Section?: Section;
};

export const AnnouncementFromJson = (announcement: JSON): Announcement => {
  return {
    ID: announcement["announcementId"],
    Title: announcement["title"],
    Message: announcement["message"],
    CreatedAt: !!announcement["createdAt"]
      ? new Date(announcement["createdAt"])
      : null,
    PostedBy: !!announcement["postedBy"]
      ? UserFromJSON(announcement["postedBy"])
      : null,
    Section: !!announcement["section"]
      ? SectionFromJSON(announcement["section"])
      : null,
  };
};

export const AnnouncementToJson = (
  announcement: Announcement
): {
  announcementId: string;
  title: string;
  message: string;
  postedBy: object;
  section: object;
  createdAt: Date;
} => {
  return {
    announcementId: announcement.ID ?? "",
    title: announcement.Title,
    message: announcement.Message,
    postedBy: !!announcement.PostedBy ? UserToJSON(announcement.PostedBy) : {},
    section: !!announcement.Section ? SectionToJSON(announcement.Section) : {},
    createdAt: announcement.CreatedAt,
  };
};
