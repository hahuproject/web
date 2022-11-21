import { Course, CourseFromJSON, CourseToJSON } from "./Course";
import { User, UserFromJSON, UserToJSON } from "./User";

export type Book = {
  ID?: string;
  Title: string;
  Author: string;
  Description: string;
  Cover: File | string;
  File: File | string;
  Uploader: User;
  Rating?: number;
  Course?: Course;
};

export const BookFromJSON = (book: JSON): Book => {
  return {
    ID: book["id"],
    Title: book["title"],
    Author: book["author"],
    Description: book["description"],
    Cover: book["cover"],
    File: book["file"],
    Uploader: UserFromJSON(book["uploader"]),
    Rating: book["rating"] ?? 0,
    Course: !!book["course"] && CourseFromJSON(book["course"]),
  };
};

export const BookToJSON = (
  book: Book
): {
  bookId: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  file: string;
  uploader: object;
  rating: number;
  course: object;
} => {
  return {
    bookId: book.ID,
    title: book.Title,
    author: book.Author,
    description: book.Description,
    cover: book.Cover.toString(),
    file: book.File.toString(),
    uploader: UserToJSON(book.Uploader),
    rating: book.Rating ?? 0,
    course: book.Course && CourseToJSON(book.Course),
  };
};
