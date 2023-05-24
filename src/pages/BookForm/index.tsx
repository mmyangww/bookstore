import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addBook, updateBook } from '../../redux/actions/bookstore';
import { Book } from '../../redux/reducers/bookstore';
import Title from '../../components/Title';

const categories = [
    'Fiction',
    'Science Fiction',
    'Classic Literature',
    'Fantasy',
    'Coming-of-Age Fiction',
    'Young Adult',
    'Self-Help/Spiritual',
    'Mystery/Thriller',
];

type Props = {
    books: Book[]
    addBook: (book: Book) => void;
    updateBook: (book: Book) => void;
};

const BookForm = ({ books, addBook, updateBook }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const newBookId: string = location.state?.newBookId || '';

    const { id: paramsId } = useParams();
    const book = books.find((book) => book.id === paramsId);

    const [bookData, setBookData] = useState<Book>({
        id: paramsId || newBookId,
        name: book?.name || '',
        price: book?.price || 0,
        category: book?.category || categories[0],
        description: book?.description || '',
    });
    const { id, name, price, category, description } = bookData;
    const isEditMode = Boolean(paramsId);

    const [errors, setErrors] = useState<{ name: string; price: string }>({
        name: '',
        price: '',
    });

    const handleBack = () => {
        navigate('/');
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            price: '',
        };

        if (name.trim() === '') {
            newErrors.name = 'Name is required.';
            isValid = false;
        }

        if (Number(price) === 0) {
            newErrors.price = 'Price must be greater than 0.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
        if (validateForm()) {
            const editedBook: Book = {
                id: id || newBookId,
                name,
                price: Number(price),
                category,
                description,
            };

            if (isEditMode) {
                updateBook(editedBook);
            } else {
                addBook(editedBook);
            }
            navigate('/');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'price' && !/^\d+(\.\d{0,2})?$/.test(value)) {
            return;
        }
        setBookData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBookData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const pageTitle = isEditMode ? 'Edit A Book' : 'Add A Book';

    return (
        <div>
            <Title title={pageTitle} />
            <div className="row justify-content-center">
                <div className="col-xs-offset-4 col-xs-4">
                    <form className="form">
                        <div className="form-group">
                            <label>ID:</label>
                            <input className="form-control" type="text" name="id" value={id} disabled />
                        </div>
                        <div className="form-group">
                            <label>Name:</label>
                            <input className="form-control" type="text" name="name" value={name} onChange={handleChange} />
                            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input className="form-control" type="text" name="price" value={price} onChange={handleChange} />
                            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
                        </div>
                        <div className="form-group">
                            <label>Category:</label>
                            <select className="form-control" name="category" value={category} onChange={handleChange} >
                                {categories.map((categoryOption) => (
                                    <option key={categoryOption} value={categoryOption}>
                                        {categoryOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea className="form-control" rows={4} name="description" value={description} onChange={handleTextareaChange} />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="button" onClick={handleBack} style={{ marginRight: '20px' }}>
                                Back
                            </button>
                            <button className="btn btn-success" type="button" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default connect(
    (state: any) => ({
        books: state.bookstore.books,
    }),
    { addBook, updateBook }
)(BookForm);
