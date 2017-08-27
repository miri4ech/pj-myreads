
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {

  state = {
      query: '',
      books: [],
  }
  
  // componendDidMount = () => {
  //   BooksAPI.search(this.state.query,20).then((books) => {
  //     this.setState({ books }) 
  //   })
  // }

  selectedStatus = (book, selectedShelf) => {
    BooksAPI.update(book, selectedShelf).then((books) => {
      this.setState({ books })
    })
  }

  makeShelf = (book) => (
    <div className="book" key={book.title}>
      <a href={book.previewLink}>
        <img src={book.imageLinks.smallThumbnail} alt={book.title} />
      </a>
      <p>{book.title}</p>
      <small>{book.authors[0]}</small>
      <select value={book.shelf} onChange={(event) => this.selectedStatus(book, event.target.value)}>
        <option value="currentlyReading">currently Reading</option>
        <option value="wantToRead">want To Read</option>
        <option value="read">Read</option>
      </select>
    </div>
  )

  updateQuery = (query) => {
    this.setState({ query: query.trim() }) //removing white space
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { query, books } = this.state
    let showingBooks
    if (query) {
      //RegExp match
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title))
    } else {
      // BooksAPI.getAll().then((books) => {
      //   this.setState({ books })
      // })
      showingBooks = this.state.books
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
        {showingBooks.length !== this.state.books.length && (
          <div className="showing-contacts">
            <span>Now Showing {showingBooks.length} of {this.state.books.length} total</span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}
        <div className="content-body">
          <div className="wrapper">
            {showingBooks.map(book => (
              this.makeShelf(book)
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
