
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'
import MakeShelves from './MakeShelves'

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

  render() {

    const { query, books } = this.state

    //add shelf to books
    function checkShelf(data) {
      books.filter((book) => {
        if (book.id === data.id) book.shelf = data.shelf
        return book
      })
    }
    this.props.books.forEach(checkShelf);

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
          <MakeShelves books={books} updateStatus={this.updateStatus}　/>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
