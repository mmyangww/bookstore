import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from '../constant';

export interface Book {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
}

export interface AppState {
    books: Book[];
}

const initialState: AppState = {
    "books": [
        {
            id: '1',
            name: 'To Kill a Mockingbird',
            price: 9.99,
            category: 'Fiction',
            description: 'A classic novel that explores racial injustice in the American South.',
        },
        {
            id: '2',
            name: '1984',
            price: 12.99,
            category: 'Science Fiction',
            description: 'A dystopian novel depicting a totalitarian society ruled by Big Brother.',
        },
        {
            id: '3',
            name: 'Pride and Prejudice',
            price: 8.99,
            category: 'Classic Literature',
            description: 'A beloved romantic novel set in 19th-century England, highlighting societal norms and love.',
        },
        {
            id: '4',
            name: 'The Great Gatsby',
            price: 10.99,
            category: 'Classic Literature',
            description: 'A Jazz Age tale of wealth, love, and the American Dream by F. Scott Fitzgerald.',
        },
        {
            id: '5',
            name: "Harry Potter and the Sorcerer's Stone",
            price: 14.99,
            category: 'Fantasy',
            description: 'The first book in the popular Harry Potter series, introducing the magical world of Hogwarts.',
        },
        {
            id: '6',
            name: 'The Catcher in the Rye',
            price: 11.99,
            category: 'Coming-of-Age Fiction',
            description: 'A coming-of-age novel narrated by Holden Caulfield, a disillusioned teenager.',
        },
        {
            id: '7',
            name: 'The Hobbit',
            price: 13.99,
            category: 'Fantasy',
            description: 'A fantasy adventure novel following Bilbo Baggins on a quest to reclaim a dwarf kingdom.',
        },
        {
            id: '8',
            name: "To All the Boys I've Loved Before",
            price: 9.99,
            category: 'Young Adult',
            description: 'A contemporary young adult romance about love letters and unexpected relationships.',
        },
        {
            id: '9',
            name: 'The Alchemist',
            price: 10.99,
            category: 'Self-Help/Spiritual',
            description: "A philosophical novel about a young shepherd's journey to find his personal legend.",
        },
        {
            id: '10',
            name: 'The Girl on the Train',
            price: 12.99,
            category: 'Mystery/Thriller',
            description: 'A gripping psychological thriller centered around a woman who becomes entangled in a missing person investigation.',
        },
    ],
};

const bookReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.book]
            };
        case UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.id === action.book.id) {
                        return action.book;
                    }
                    return book;
                })
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.id)
            };
        default:
            return state;
    }
};

export default bookReducer;
