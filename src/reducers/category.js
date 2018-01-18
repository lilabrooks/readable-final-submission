import { RECEIVE_CATEGORIES, UPDATE_CATEGORY } from '../actions'

const INITIAL_STATE = {
  list: []
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        list: action.categories
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        active: action.category
      }
    default:
      return state
  }
}
