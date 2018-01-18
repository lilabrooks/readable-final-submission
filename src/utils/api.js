
const API = 'http://localhost:3001'

let token = localStorage.token
if (!token) {
  localStorage.token = Math.random().toString(36).substr(2, 9)
  token = localStorage.token
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

// ---------------------------
// Categories method
//

export const fetchCategories = () =>
  fetch(`${API}/categories/`, { headers })
    .then(response => response.json())
    .then(data => data.categories)

// ---------------------------
// Posts methods
//

export const fetchPost = (postId) =>
  fetch(`${API}/posts/${postId}`, { headers })
    .then(response => response.json())

export const fetchPosts = (category) => {
  if (category) {
    return fetch(`${API}/${category}/posts`, { headers })
      .then(response => response.json())
  } else {
    return fetch(`${API}/posts`, { headers })
      .then(response => response.json())
  }
}

export const createPost = (post) => {
  const body = JSON.stringify(post)

  return fetch(`${API}/posts/`, { method: 'POST', headers, body })
    .then(response => response.json())
}

export const updatePost = (id, details) => {
  const body = JSON.stringify(details)

  return fetch(`${API}/posts/${id}`, { method: 'PUT', headers, body })
    .then(response => response.json())
}

export const voteForPost = (post, option) => {
  const body = JSON.stringify({ option })

  return fetch(`${API}/posts/${post.id}`, { method: 'POST', headers, body })
    .then(response => response.json())
}

export const deletePost = (postId) => {
  return fetch(`${API}/posts/${postId}`, { method: 'DELETE', headers })
}

// ---------------------------
// Comemnts methods
//

export const fetchComments = (postId) =>
  fetch(`${API}/posts/${postId}/comments`, { headers })
    .then(response => response.json())

export const createComment = (comment) => {
  const body = JSON.stringify(comment)

  return fetch(`${API}/comments/`, { method: 'POST', headers, body })
    .then(response => response.json())
}

export const updateComment = (id, details) => {
  const body = JSON.stringify(details)

  return fetch(`${API}/comments/${id}`, { method: 'PUT', headers, body })
    .then(response => response.json())
}

export const deleteComment = (commentId) => {
  return fetch(`${API}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(response => response.json())
}

export const voteForComment = (comment, option) => {
  const body = JSON.stringify({ option })

  return fetch(`${API}/comments/${comment.id}`, { method: 'POST', headers, body })
    .then(response => response.json())
}
