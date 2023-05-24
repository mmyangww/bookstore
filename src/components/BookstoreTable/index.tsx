import React, { useEffect } from 'react';
import {
    addBook,
    updateBook,
    deleteBook
} from '../../redux/actions/bookstore'
import { Book } from '../../redux/reducers/bookstore'
import { connect } from 'react-redux'
import { Link, LinkProps, useNavigate } from 'react-router-dom';

const BookstoreTable = ({
    books,
    deleteBook,
}: {
    books: Book[];
    deleteBook: (id: string) => void;
}) => {

    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log(books);
    // }, []);

    const handleDelete = (id: string) => {
        deleteBook(id);
    };

    const newBookId = books.length > 0 ? parseInt(books[books.length - 1].id) + 1 : 0;

    const handleAdd = () => {
        navigate('/add-book', { state: { newBookId: newBookId.toString() } })
    }

    const handleEdit = (id: string) => {
        navigate(`/edit-book/${id}`);
    };

    return (
        <div className="row">
            <div className="col-xs-offset-3 col-xs-6">
                <div className="text-right">
                    <button
                        onClick={handleAdd}
                        className="btn btn-primary"
                    >
                        Add Book
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>
                                    <Link to={`/edit-book/${book.id}`} onClick={() => handleEdit(book.id)}>
                                        {book.name}
                                    </Link>
                                </td>
                                <td>{book.price}</td>
                                <td>{book.category}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default connect(
    (state: any) => ({
        books: state.bookstore.books,
    }),
    {
        addBook,
        updateBook,
        deleteBook,
    }
)(BookstoreTable)