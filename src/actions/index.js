import * as API from '../utils/api'
import {
  RECEIVE_CATEGORIES,
  UPDATE_CATEGORY,
  GET_POSTS,
  GET_POST,
  POST_ADDED,
  POST_UPDATED,
  POST_DELETED,
  UPDATE_SORT_BY,
  GET_COMMENTS,
  COMMENT_ADDED,
  COMMENT_UPDATED,
  COMMENT_DELETED,
  UPDATE_SORT_COMMENTS_BY
} from './types.js'

// ---------------------------
// Categories methods
// ---------------------------

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  return API.fetchCategories().then(categories => {
    dispatch(receiveCategories(categories))
  })
}

export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
})

// ---------------------------
// Posts methods
// ---------------------------

export const getPosts = posts => ({
  type: GET_POSTS,
  posts
})

export const fetchPosts = category => dispatch => {
  return API.fetchPosts(category).then((posts = []) => {
    posts.forEach(post => dispatch(fetchComments(post.id)))
    dispatch(getPosts(posts))
  })
}

export const getPost = post => ({
  type: GET_POST,
  post
})

export const fetchPost = id => dispatch => {
  return API.fetchPost(id).then(post => {
    dispatch(fetchComments(post.id))
    dispatch(getPost(post))
  })
}

export const postCreated = post => ({
  type: POST_ADDED,
  post
})

export const createPost = post => dispatch => {
  return API.createPost(post).then(createdPost => {
    dispatch(postCreated(createdPost))
  })
}

export const postUpdated = post => ({
  type: POST_UPDATED,
  post
})

export const updatePost = (id, details) => dispatch => {
  return API.updatePost(id, details).then(updatedPost => {
    dispatch(postUpdated(updatedPost))
  })
}

export const postDeleted = post => ({
  type: POST_DELETED,
  post
})

export const deletePost = post => dispatch => {
  return API.deletePost(post.id).then(() => {
    dispatch(postDeleted(post))
  })
}

export const voteForPost = (post, option) => dispatch => {
  return API.voteForPost(post, option).then(updatedPost => {
    dispatch(postUpdated(updatedPost))
  })
}

export const updateSortBy = sortBy => ({
  type: UPDATE_SORT_BY,
  sortBy
})

// ---------------------------
// Comments methods
//

export const receiveComments = (postId, comments) => ({
  type: GET_COMMENTS,
  postId,
  comments
})

export const fetchComments = postId => dispatch => {
  return API.fetchComments(postId).then(comments => {
    dispatch(receiveComments(postId, comments))
  })
}

export const commentCreated = comment => ({
  type: COMMENT_ADDED,
  comment
})

export const createComment = comment => dispatch => {
  return API.createComment(comment).then(createdComment => {
    dispatch(commentCreated(createdComment))
  })
}

export const commentUpdated = comment => ({
  type: COMMENT_UPDATED,
  comment
})

export const updateComment = (id, details) => dispatch => {
  return API.updateComment(id, details).then(updatedComment => {
    dispatch(commentUpdated(updatedComment))
  })
}

export const commentDeleted = comment => ({
  type: COMMENT_DELETED,
  comment
})

export const deleteComment = comment => dispatch => {
  return API.deleteComment(comment.id).then(() => {
    dispatch(commentDeleted(comment))
  })
}

export const voteForComment = (comment, option) => dispatch => {
  return API.voteForComment(comment, option).then(updatedComment => {
    dispatch(commentUpdated(updatedComment))
  })
}

export const updateSortCommentsBy = sortBy => ({
  type: UPDATE_SORT_COMMENTS_BY,
  sortBy
})
