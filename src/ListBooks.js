
import React, { Component } from 'react'

class ListBooks extends Component {
    
    render (){
        return (
            <div>
                <div className="category-title">Currently Reading</div>
                <ul>
                    {this.props.books.map(book=>
                        <li key={book.title}>
                            <a href={book.previewLink}>
                                <img src={book.imageLinks.smallThumbnail}/>
                            </a>
                            {book.title}
                    </li>
                    )}
                </ul>
                <div className="category-title">Want to Read</div>

                <div className="category-title">Read</div>

            </div>
        )
    }
}

export default ListBooks;
