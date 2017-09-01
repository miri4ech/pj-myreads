import React from 'react'

const MakeBooks = (props) =>
  <div className="book">
    <a href={props.book.previewLink}>
      <img src={props.book.imageLinks.smallThumbnail} alt={props.book.title} />
    </a>
    <p>{props.book.title}</p>
    <small>{props.book.authors}</small>
    <select value={props.book.shelf || ""} onChange={(event) => props.updateStatus(props.book, event.target.value)}>
      <option value="" disabled></option>
      <option value="currentlyReading">currently Reading</option>
      <option value="wantToRead">want To Read</option>
      <option value="read">Read</option>
    </select>
  </div>

export default MakeBooks