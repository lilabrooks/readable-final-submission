import { combineReducers } from 'redux'
import category from './category'
import posts from './posts'
import comments from './comments'

export default combineReducers({ category, posts, comments })
