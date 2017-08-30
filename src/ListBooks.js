
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {

	updateStatus = (book, selectedShelf) => {
		if (this.props.updateStatus) this.props.updateStatus(book, selectedShelf)
	}

	makeShelf = (book) => (
		<div className="book" key={book.id}>
			<a href={book.previewLink}>
				<img src={book.imageLinks.smallThumbnail} alt={book.title} />
			</a>
			<p>{book.title}</p>
			<small>{book.authors[0]}</small>
			<select value={book.shelf} onChange={(event) => this.updateStatus(book, event.target.value)}>
				<option value="currentlyReading">currently Reading</option>
				<option value="wantToRead">want To Read</option>
				<option value="read">Read</option>
			</select>
		</div>
	)

	render() {

		const { books } = this.props

		return (
			<div>
				<div className="header">My Reads</div>
				<div className="content-body">
					<div className="content-title">Currently Reading</div>
					<div className="wrapper">
						{books.map(book => book.shelf === 'currentlyReading' && (
							this.makeShelf(book)
						))}
					</div>
					<div className="content-title">Want to Read</div>
					<div className="wrapper">
						{books.map(book => book.shelf === 'wantToRead' && (
							this.makeShelf(book)
						))}
					</div>
					<div className="content-title">Read</div>
					<div className="wrapper">
						{books.map(book => book.shelf === 'read' && (
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
