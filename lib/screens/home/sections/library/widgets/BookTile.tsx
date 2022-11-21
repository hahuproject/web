import React, { FunctionComponent } from "react";
import { User } from "../../../../../models/User";

type Props = {
  title: string;
  author: string;
  description: string;
  cover: string;
  file: string;
  uploader: User;
};

export const BookTile: FunctionComponent<Props> = ({
  title,
  author,
  description,
  cover,
  file,
  uploader,
}) => {
  return (
    <a href={file} target="_blank" className="book-tile">
      <div className="book-tile__cover">
        <img src={cover} alt="book cover" />
      </div>
      <div className="book-tile__title">{title}</div>
      <div className="book-tile__author"> By {author}</div>
    </a>
  );
};
