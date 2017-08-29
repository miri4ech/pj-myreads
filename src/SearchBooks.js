
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      books: [],
      // booksShelf: [],
      viewStatus: true,
    }
  }

  // componentDidMount() {
  //   let bookAry = []
  //   this.props.books.map((book) => {
  //     let obj = {}
  //     obj.id = book.id
  //     obj.shelf = book.shelf
  //     bookAry.push(obj)
  //   })
  //   this.state.booksShelf = bookAry
  // }

  selectedStatus = (book, selectedShelf) => {
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
      <small>{book.authors}</small>
      <select value={book.shelf || ""} onChange={(event) => this.selectedStatus(book, event.target.value)}>
        <option value="">---</option>
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
    console.log(books)

    //add shelf to books
    for (let i = 0; i < this.props.books; i++) {
      console.log(this.props.books[i])
      this.state.books.filter((book) => {
        if (book.id === this.props[i].id) book.shelf = this.props[i].shelf
      })
    }
    console.log(this.state.books)
    // {this.state.booksShelf.filter((data) => {
    //     if (data.id === books.id) 
    //   })
    // }

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
