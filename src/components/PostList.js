import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPosts, deletePost, updateSortBy, voteForPost } from '../actions'
import CommentsCount from './CommentsCount'
import PostDetails from './PostDetails'
import SortBy from './SortBy'
import VoteScore from './VoteScore'
import countBy from 'lodash/countBy'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'

import '../style.css'

class PostList extends Component {
  componentDidMount () {
    this.props.fetchPosts(this.props.category)
  }

  componentWillUpdate ({ category }) {
    if (category !== this.props.category) {
      this.props.fetchPosts(category)
    }
  }

  validPosts (posts) {
    return posts.filter((post) => post.id != null)
  }

  render () {
    return (
      <div>

        <div className='top-bar'>
          <form className='my-lg-0'>
            <Link to='/add' className='btn btn-primary'>New Post</Link>
            <SortBy
              sortBy={this.props.sortBy}
              onSortByChange={sortBy => this.props.updateSortBy(sortBy)}
            />
          </form>
        </div>

        {/* instead of mapping this.props.post directly ..... ? */}

        {this.validPosts(this.props.posts).map(post => (
          <div className='post-item media my-4 border border-light' key={post.id}>

            <VoteScore
              voteScore={post.voteScore}
              onVoteChange={option => this.props.voteForPost(post, option)}
            />

            <div className='media-body' key={post.id}>
              <h5 className='mt-0'>

                <Link
                  className='badge badge-primary mr-3'
                  to={`/${post.category}`}
                >
                  {post.category}
                </Link>

                <Link
                  className='post-title align-bottom'
                  to={`/${post.category}/${post.id}`}
                >
                  {post.title}
                </Link>

              </h5>

              <small className='text-muted'>
                <Link
                  className='post-summary'
                  to={`/${post.category}/${post.id}`}
                >

                  <CommentsCount
                    className='mr-3'
                    count={this.props.commentsCount[post.id]}
                  />

                  <PostDetails item={post} />

                </Link>

                <Link
                  className='btn btn-sm btn-info'
                  to={`/${post.category}/${post.id}/edit`}
                >
                  <i className="fa  fa-pencil" aria-hidden="true"></i>
                                    Edit
                </Link>

                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => { if (window.confirm('Are you sure you want to delete this post?')) this.props.deletePost(post) }}
                >
                  <i className="fa  fa-trash" aria-hidden="true"></i>
                                    Delete
                </button>

              </small>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps ({ category, posts, comments }) {
  const filteredPosts = category.active
    ? filter(posts.byId, { category: category.active })
    : values(posts.byId)

  return {
    category: category.active,
    posts: sortBy(filteredPosts, post => -post[posts.sortBy]),
    commentsCount: countBy(comments.byId, 'parentId'),
    sortBy: posts.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: category => dispatch(fetchPosts(category)),
    deletePost: post => dispatch(deletePost(post)),
    updateSortBy: sortBy => dispatch(updateSortBy(sortBy)),
    voteForPost: (post, option) => dispatch(voteForPost(post, option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
