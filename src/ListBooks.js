
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'


class ListBooks extends Component {

	constructor(props) {
		super(props)
		this.state = {
			books: this.props.books,
			status: ''
		}
	}

	selectStatus = (book, selectedShelf) => {
		BooksAPI.update(book, selectedShelf).then((books) => {
			this.setState({ books })
		})
	}

	makeShelf = (book) => (
		<div className="book" key={book.id}>
			<a href={book.previewLink}>
				<img src={book.imageLinks.smallThumbnail} alt={book.title} />
			</a>
			<p>{book.title}</p>
			<small>{book.authors[0]}</small>
			<select value={book.shelf} onChange={(event) => this.selectStatus(book, event.target.value)}>
				<option value="currentlyReading">currently Reading</option>
				<option value="wantToRead">want To Read</option>
				<option value="read">Read</option>
			</select>
		</div>
	)

	render() {
		return (
			<div>
				<div className="header">My Reads</div>
				<div className="content-body">
					<div className="content-title">Currently Reading</div>
					<div className="wrapper">
						{this.props.books.map(book => book.shelf === 'currentlyReading' && (
							this.makeShelf(book)
						))}
					</div>
					<div className="content-title">Want to Read</div>
					<div className="wrapper">
						{this.props.books.map(book => book.shelf === 'wantToRead' && (
							this.makeShelf(book)
						))}
					</div>
					<div className="content-title">Read</div>
					<div className="wrapper">
						{this.props.books.map(book => book.shelf === 'read' && (
							this.makeShelf(book)
						))}
					</div>
					<Link to="/search"><button className="to-search"></button></Link>
				</div>
			</div>
		)
	}
}

export default ListBooks;
