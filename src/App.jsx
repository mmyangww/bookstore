import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
const Bookstore = lazy(() => import('./pages/Bookstore'));
const BookForm = lazy(() => import('./pages/BookForm'));

export default class App extends Component {
	render() {
		return (
			<div>
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route path="/" element={<Bookstore />} />
						<Route path="/add-book" element={<BookForm />} />
						<Route path="/edit-book/:id" element={<BookForm />} />
					</Routes>
				</Suspense>
			</div>
		);
	}
}
