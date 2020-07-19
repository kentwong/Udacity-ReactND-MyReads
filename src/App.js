import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import { debounce } from "throttle-debounce";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import "./App.css";

const bookshelves = [
  { key: "currentlyReading", name: "Currently Reading" },
  { key: "wantToRead", name: "Want to Read" },
  { key: "read", name: "Have Read" },
];

class BooksApp extends Component {
  state = {
    myBooks: [],
    searchBooks: [],
    error: false,
  };

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).catch((error) => {
      console.log(error);
      this.setState({ error: true });
    });

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
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ myBooks: books });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
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
    const { myBooks, searchBooks, error } = this.state;
    if (error) {
      return <div>Error occured. Try again later! </div>;
    }
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              bookshelves={bookshelves}
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
