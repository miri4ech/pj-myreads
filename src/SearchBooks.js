
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class SearchBooks extends Component {
  render() {
    return (
      <div>
        <div>
          <input
            className="search-books"
            type='text'
            placeholder='Search Books'
          />
          <Link to="/" className="to-home"></Link>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
