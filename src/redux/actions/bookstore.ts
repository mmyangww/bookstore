import { Book } from '../reducers/bookstore';
import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from '../constant'

export const addBook = (book: Book) => ({
  type: ADD_BOOK,
  book
});

export const updateBook = (book: Book) => ({
  type: UPDATE_BOOK,
  book
});

export const deleteBook = (id: string) => ({
  type: DELETE_BOOK,
  id
});
