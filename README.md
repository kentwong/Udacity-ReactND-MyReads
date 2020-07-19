[![Netlify Status](https://api.netlify.com/api/v1/badges/6f329d5a-cf60-4c00-baed-686d96e5bb02/deploy-status)](https://app.netlify.com/sites/myreads-reactnd/deploys)

# MyReads Project

MyReads App is a virtual bookshelves that allows users to find books from catalogue and save it to the corresponding bookshelves (Currently Reading, Want to Read, and Read). This project is built with React and React Router.

This App is one of the three assessment projects for Udacity's [Udacity's React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019).

The MyReads App is deployed to Netlify at https://myreads-reactnd.netlify.app/.

## 🏃 Getting Started

To get started developing right away:

- Install all project dependencies with `npm install`
- Start the development server with `npm start`
- The react app will automatically open at http://localhost:3000

## 🖥️ Backend Server

To simplify the development process, this project is using the backend server provided by Udacity as this project focuses on development using React. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods necessary to operate the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## ⭐ Important ⭐

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
