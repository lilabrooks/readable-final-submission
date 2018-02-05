import keyBy from 'lodash/keyBy'
import omitBy from 'lodash/omitBy'

import {
  GET_POSTS,
  GET_POST,
  POST_ADDED,
  POST_UPDATED,
  POST_DELETED,
  UPDATE_SORT_BY
} from '../actions/types.js'

const INITIAL_STATE = {
  byId: {},
  sortBy: 'voteScore'
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...keyBy(action.posts.filter(post => post.id), 'id')
          // [action.posts.id]: action.posts
        }
      }
    case GET_POST:
    case POST_ADDED:
    case POST_UPDATED:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post
        }
      }
    case POST_DELETED:
      return {
        ...state,
        byId: omitBy(state.byId, { id: action.post.id })
      }
    case UPDATE_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy
      }
    default:
      return state
  }
}
