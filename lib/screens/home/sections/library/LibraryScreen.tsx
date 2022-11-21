import React, { FunctionComponent, useState } from "react";
import {
  LibraryLoading,
  useLibrary,
} from "../../../../providers/library/LibraryProvider";
import { Button, ButtonSize, ButtonColor } from "../../../../widgets/Button";
import { GridFilledIcon } from "../../../../widgets/Icons";
import { InputField, InputFieldSize } from "../../../../widgets/InputField";
import { AddBook } from "./widgets/AddBook";
import { BookTile } from "./widgets/BookTile";

type Props = {};

export const LibraryScreen: FunctionComponent<Props> = () => {
  const { books, loading, error, setError } = useLibrary();

  const [showAddBookDialog, toggleShowAddBookDialog] = useState<boolean>(false);

  return (
    <>
      {showAddBookDialog && (
        <AddBook
          show={showAddBookDialog}
          toggleShow={toggleShowAddBookDialog}
        />
      )}
      <div className="library">
        <div className="library__title">
          <GridFilledIcon height={1.6} width={1.6} color="#717f8e" /> Library
        </div>
        <div className="library__content">
          <div className="library__content__leading">
            <div className="table-search">
              Search:
              <InputField
                size={InputFieldSize.SMALL}
                placeholder="Search here ..."
              />
            </div>
            <div className="add-book">
              <Button
                size={ButtonSize.SMALL}
                color={ButtonColor.MAIN}
                onClick={() => {
                  toggleShowAddBookDialog(true);
                }}
                // leading={<AddIcon}
              >
                Add Book
              </Button>
            </div>
          </div>
          <div className="library__content__main">
            {loading == LibraryLoading.FetchingBooks ? (
              <div> Loading ... </div>
            ) : !!!books ? (
              <div> Null </div>
            ) : books.length < 1 ? (
              <div> No books </div>
            ) : (
              books.map((e) => {
                return (
                  <BookTile
                    title={e.Title}
                    author={e.Author}
                    description={e.Description}
                    cover={e.Cover.toString()}
                    file={e.File.toString()}
                    uploader={e.Uploader}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
