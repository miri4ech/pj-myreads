
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import MakeShelves from './MakeShelves'

class ListBooks extends Component {

	static propTypes = {
		books: PropTypes.array.isRequired,
		updateStatus: PropTypes.func.isRequired
	}

	updateStatus = (book, selectedShelf) => {
		if (this.props.updateStatus) this.props.updateStatus(book, selectedShelf)
	}

	render() {

		const { books } = this.props

		return (
			<div>
				<div className="header">My Reads</div>
				<div className="content-body">
					<MakeShelves books={books} title="Currently Reading" updateStatus={this.updateStatus} shelf="currentlyReading" />
					<MakeShelves books={books} title="Want to Read" updateStatus={this.updateStatus} shelf="wantToRead" />
					<MakeShelves books={books} title="Read" updateStatus={this.updateStatus} shelf="read" />
					<Link to="/search"><button className="to-search"></button></Link>
				</div>
			</div>
		)
	}
}

export default ListBooks;

