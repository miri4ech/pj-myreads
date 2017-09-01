import React from 'react'
import MakeBooks from './MakeBooks'

const MakeShelves = (props) => {
  const filteredBooks = props.shelf? props.books.filter(book=> book.shelf === props.shelf):props.books

  return (
  <div>
    {props.title && (
      <div className="content-title">{props.title}</div>
    )}
    <div className="wrapper">
      {filteredBooks.map(book => 
          <MakeBooks key={book.id} book={book} updateStatus={props.updateStatus} />
        )}
    </div>
  </div>
  )
}

export default MakeShelves