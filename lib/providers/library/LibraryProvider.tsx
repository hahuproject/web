/*

SERVICES
    - Add Book
    - Get Books

STATES
    - Error
        - Vars ( ErrAdding, ErrFetching )
    - Loading ( Fetching, Adding )

*/

import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Book, BookFromJSON, BookToJSON } from "../../models/Book";
import { axios } from "../../utils/axios";
//URLS
const LIBRARY_URL = {
  DEV: "/library/books",
};

//Errors
const ErrFetchingBooks = "Failed to fetch books";
const ErrAddingBook = "Failed to add a book";

//Loading State
export enum LibraryLoading {
  FetchingBooks = "Fetching books",
  AddingBook = "Adding a book",
}

type LibraryContextType = {
  books: Book[];
  loading: LibraryLoading;
  error: string;
  setError: (v) => void;
  AddBook: (
    book: Book,
    successCallback: () => void,
    failCallback: () => void
  ) => void;
  GetBooks: () => void;
};

const LIBRARY_CONTEXT = createContext<LibraryContextType>({
  books: null,
  loading: null,
  error: null,
  setError: (v) => {},
  AddBook: (_, __, ___) => {},
  GetBooks: () => {},
});

type LibraryProviderProps = {
  children: JSX.Element;
};

export const LibraryProvider: FunctionComponent<LibraryProviderProps> = ({
  children,
}) => {
  useEffect(() => {
    GetBooks();
  }, []);

  const [books, setBooks] = useState<Book[]>();
  const [loading, setLoading] = useState<LibraryLoading>();
  const [error, setError] = useState<string>();

  const AddBook = useCallback(
    async (book: Book, successCallback: Function, failCallback: Function) => {
      try {
        setError(null);
        setLoading(LibraryLoading.AddingBook);

        const _bookForm = new FormData();
        _bookForm.append("title", book.Title);
        _bookForm.append("author", book.Author);
        _bookForm.append("description", book.Description);
        _bookForm.append("cover", book.Cover);
        _bookForm.append("file", book.File);
        _bookForm.append("uploader", book.Uploader.ID);
        _bookForm.append("course", !!book.Course ? book.Course.ID : "");

        const _res = await axios.post(LIBRARY_URL.DEV, _bookForm);

        setBooks((prev) => [...prev, BookFromJSON(_res.data)]);

        setLoading(null);
        successCallback();
      } catch (error) {
        console.log(error);

        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError(ErrAddingBook);
        }
        setLoading(null);
        failCallback();
      }
    },
    []
  );
  const GetBooks = useCallback(async () => {
    try {
      setError(null);
      setLoading(LibraryLoading.FetchingBooks);

      const _res = await axios.get(LIBRARY_URL.DEV);

      setBooks((_res.data as JSON[]).map((e) => BookFromJSON(e)));
      setLoading(null);
    } catch (error) {
      setError(ErrFetchingBooks);
      setLoading(null);
    }
  }, []);

  const _contextValue = useMemo(
    () => ({
      books,
      loading,
      error,
      setError,
      AddBook,
      GetBooks,
    }),
    [books, loading, error, setError, AddBook, GetBooks]
  );

  return (
    <LIBRARY_CONTEXT.Provider value={_contextValue}>
      {children}
    </LIBRARY_CONTEXT.Provider>
  );
};

export const useLibrary = () => useContext(LIBRARY_CONTEXT);
