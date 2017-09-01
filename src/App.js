import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
    }
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
      this.getAllBooks()
  }

  onUpdateStatus(book, selectedShelf) {
    BooksAPI.update(book, selectedShelf).then(() => {
      this.getAllBooks()
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={({ history }) => (
          <ListBooks books={this.state.books}
            updateStatus={(book, selectedShelf) => {
              this.onUpdateStatus(book, selectedShelf)
              history.push('/')
            }}
          />
        )} />
        <Route path="/search" render={({ history }) => (
          <SearchBooks books={this.state.books}
            updateStatus={(book, selectedShelf) => {
              this.onUpdateStatus(book, selectedShelf)
              history.push('/search')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App
