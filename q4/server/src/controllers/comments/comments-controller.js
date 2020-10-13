'use strict';

import Boom from 'boom';

import CommentsService from '../../services/comments/comments-service';

function getCommentsList(request, h) {
  const comments = CommentsService.getComments(request);
  return comments;
}

function addComment(request, h) {
    const comments = CommentsService.addComment(request);
  return comments;
}

export default {
    getCommentsList: getCommentsList,
    addComment: addComment
};
