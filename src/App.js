import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './ListBooks'

class App extends Component {
  
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books})
    })
  }

  render() {
    return (
      <div>
        <div className="header">My Reads</div>
        <ListBooks books={this.state.books}/>
      </div>
    )
  }
}

export default App;
