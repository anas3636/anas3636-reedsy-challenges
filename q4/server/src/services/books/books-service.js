'use strict';

import fs from 'fs';
import path from 'path';

const BOOKS_FILE_PATH = path.resolve(__dirname, '../../../data/books.json');

function _readFile() {
  return fs.readFileSync(BOOKS_FILE_PATH, 'utf8');
}

export default class BooksService {
  static getAllBooks(request, pagination) {
    let booksList = JSON.parse(_readFile());
    booksList.books.forEach(b => {
      b.cover = `${ request.server.info.uri }/images/${ b.cover }`;
    });
    if(request.query.key != ''){
      booksList.books = booksList.books.filter(b => (b.title.match(new RegExp(request.query.key,'i'))) || (b.synopsis.match(new RegExp(request.query.key,'i'))));
      booksList.meta.count = booksList.books.length;
    }
    if(pagination) {
      let firstElement = Number(request.query.limit) * Number(request.query.page);
      let lastElement = firstElement + Number(request.query.limit);
      booksList.books = booksList.books.slice(firstElement, lastElement);
    }
    return JSON.stringify(booksList);
  }
}
