import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { debounce } from "throttle-debounce";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import "./App.css";

class BooksApp extends Component {
  bookshelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Have Read" },
  ];

  state = {
    myBooks: [],
    searchBooks: [],
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    let updatedBooks = [];
    updatedBooks = this.state.myBooks.filter((b) => b.id !== book.id);

    if (shelf !== "none") {
      book.shelf = shelf;
      updatedBooks = updatedBooks.concat(book);
    }

    this.setState({
      myBooks: updatedBooks,
    });
  };

  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books });
    });
  };

  searchForBooks = debounce(300, false, (q) => {
    if (q.length > 0) {
      BooksAPI.search(q).then((books) => {
        if (books.error) {
          this.setState({ searchBooks: [] });
        } else {
          this.setState({ searchBooks: books });
        }
      });
    } else {
      this.setState({ searchBooks: [] });
    }
  });

  resetSearch = () => {
    this.setState({ searchBooks: [] });
  };

  render() {
    const { myBooks, searchBooks } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookshelves={this.bookshelves}
              books={myBooks}
              onMove={this.moveBook}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              searchBooks={searchBooks}
              onMove={this.moveBook}
              onSearch={this.searchForBooks}
              onResetSearch={this.resetSearch}
              myBooks={myBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
