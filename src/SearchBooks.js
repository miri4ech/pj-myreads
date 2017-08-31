
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateStatus: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { query: '', books: [] }
  }

  updateStatus = (book, selectedShelf) => {
    if (this.props.updateStatus) this.props.updateStatus(book, selectedShelf)
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query.length > 1) {
      BooksAPI.search(query).then((books) => {
        this.setState({ books })
      }).catch((error) => {
        this.setState({ books: [] })
      })
    }
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

  render() {

    const { query, books } = this.state
    //add shelf to books
    for (let i = 0; i < this.props.books.length; i++) {
      books.filter((book) => {
        if (book.id === this.props.books[i].id) book.shelf = this.props.books[i].shelf
        return book
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
              this.makeShelf(book)
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
