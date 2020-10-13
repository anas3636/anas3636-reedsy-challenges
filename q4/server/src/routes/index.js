'use strict';

import BooksController from '../controllers/books/books-controller';
import CommentsController from '../controllers/comments/comments-controller';
import ErrorController from '../controllers/error/error-controller';
import ImagesController from '../controllers/images/images-controller';

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: BooksController.getBooksList,
  },
  {
    method: 'GET',
    path: '/books/{slug}',
    handler: BooksController.getBook,
  },
  {
    method: 'GET',
    path: '/images/{file}',
    handler: ImagesController.getImage,
  },
  {
    method: 'GET',
    path: '/comments/{slug}',
    handler: CommentsController.getCommentsList,
  },
  {
    method: 'POST',
    path: '/comments/{slug}',
    handler: CommentsController.addComment,
  },
  {
    method: 'GET',
    path: '/*',
    handler: ErrorController.notFound,
  },
];

export default routes;
