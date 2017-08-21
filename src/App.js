import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class App extends Component {

  state = {
    books: [],
    search: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div>
          <Route exact path="/" render={()=>(
            <ListBooks books={this.state.books} />
          )}/>
          <Route path="/search" render={({history}) => (
            <SearchBooks books={this.state.books} />
          )}/>
      </div>
    )
  }
}

export default App
