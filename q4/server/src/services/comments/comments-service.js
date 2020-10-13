'use strict';

import fs from 'fs';
import path from 'path';

const BOOKS_FILE_PATH = path.resolve(__dirname, '../../../data/comments.json');

function _readFile() {
  return fs.readFileSync(BOOKS_FILE_PATH, 'utf8');
}

export default class CommentsService {
  static getComments(request) {
    let commentsList = JSON.parse(_readFile());
    commentsList.comments = commentsList.comments.filter(b => b.slug === request.params.slug);
    commentsList.meta.count = commentsList.comments.length;
    return JSON.stringify(commentsList);
  }

  static addComment(request) {
      let comment = request.payload;
      comment.slug = request.params.slug;
      let commentsList = JSON.parse(_readFile());
      commentsList.comments.push(comment);
      commentsList.meta.count += 1;
      let data = JSON.stringify(commentsList);
      fs.writeFileSync(`${process.cwd()+'/data/comments.json'}`, data);
      commentsList.comments = commentsList.comments.filter(b => b.slug === request.params.slug);
      commentsList.meta.count = commentsList.comments.length;
      return commentsList
  }
}
