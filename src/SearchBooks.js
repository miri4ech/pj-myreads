
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      books: [],
      viewStatus: true,
    }
  }
  
	updateStatus = (book, selectedShelf) => {
		if (this.props.updateStatus) this.props.updateStatus(book, selectedShelf)
  }

  makeShelf = (book) => (
    <div className="book" key={book.id}>
      <a href={book.previewLink}>
        <img src={book.imageLinks.smallThumbnail} alt={book.title} />
      </a>
      <p>{book.title}</p>
      <small>{book.authors}</small>
      <select value={book.shelf || ""} onChange={(event) => this.updateStatus(book, event.target.value)}>
        <option value="" disabled></option>
        <option value="currentlyReading">currently Reading</option>
        <option value="wantToRead">want To Read</option>
        <option value="read">Read</option>
      </select>
    </div>
  )

  updateQuery = (query) => {
    this.setState({ query: query.trim(), viewStatus: false })
    if (query.length > 1) {
      BooksAPI.search(query).then((books) => {
        this.setState({ books })
      }).catch((error) => {
        this.setState({ books: [] })
      })
    } else {
      this.setState({ viewStatus: true })
    }
  }

  render() {

    const { query, books } = this.state
    //add shelf to books
    for (let i = 0; i < this.props.books.length; i++) {
      books.filter((book) => {
        if (book.id === this.props.books[i].id) book.shelf = this.props.books[i].shelf
      })
    }

    return (
      <div>
        <div>
          <input
            className="search-books"
            type="text"
            placeholder="Search Books"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link to="/" className="to-home"></Link>
        </div>
        <div className="content-body">
          <div className="wrapper">
            {books && books.map(book => (
              (this.state.viewStatus === false) ? this.makeShelf(book) : null
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
