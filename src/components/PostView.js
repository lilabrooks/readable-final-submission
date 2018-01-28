import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import CommentsCount from './CommentsCount'
import PostDetails from './PostDetails'
import SortBy from './SortBy'
import VoteScore from './VoteScore'

import {
    fetchPost,
    voteForPost,
    deletePost,
    createComment,
    updateComment,
    voteForComment,
    deleteComment,
    updateSortCommentsBy
} from '../actions'


class PostView extends Component {
    state = {
        commentModalOpen: false,
        id: null,
        author: '',
        body: '',
        formIsValid: false,
        authorIsValid: false,
        commentIsValid:false
    }

    componentDidMount () {
        if (!this.props.post) {
            this.props.fetchPost(this.props.match.params.id)
        }
    }

    deletePost = () => {
        this.props
            .deletePost(this.props.post)
            .then(() => this.props.history.replace('/'))
    }

    editComment = comment => {
        const { author, body, id } = comment
        this.setState({
            commentModalOpen: true,
            id,
            author,
            body,
            formIsValid: true,
            authorIsValid: true,
            commentIsValid:true

        })
        this.showCommentModal()
    }

    showCommentModal = () => {
        this.setState({ commentModalOpen: true })
    }

    closeCommentModal = () => {
        this.setState({
            commentModalOpen: false,
            id: null,
            author: '',
            body: ''
        })
    }

    handleChange = event => {

        const name = event.target.name
        const value = event.target.value

        this.setState({[name]: value},
            () => { this.validateField( name, value) });


    }

    handleSaveComment = event => {
        event.preventDefault()

        const { author, body, id } = this.state
        const timestamp = Date.now()

        if (id) {
            this.props.updateComment(id, { body, timestamp })
        } else {
            const comment = {
                author,
                body,
                timestamp,
                id: Math.random().toString(36).substr(-8),
                parentId: this.props.post.id
            }

            this.props.createComment(comment)
        }

        this.closeCommentModal()
    }


    validateField(field,value) {

        let authorValid = this.state.authorIsValid
        let commentValid = this.state.commentIsValid

        switch (field) {

            case 'author':
                authorValid = value.length>=3
                break
            case 'body':
                commentValid = value.length>=6
                break
            default:
                break
        }

        let formValid = authorValid && commentValid

        this.setState({ formIsValid: formValid, authorIsValid: authorValid, commentIsValid: commentValid })

    }


    validationError(isValid) {
        return ( isValid ? 'd-none' : 'd-block' )
    }

    render () {
        const { post, comments } = this.props

        return (
            <div className='container py-3 post-details'>

                {post &&
                <div className='media'>
                    <VoteScore
                        voteScore={post.voteScore}
                        onVoteChange={option => this.props.voteForPost(post, option)}
                    />
                    <div className='media-body'>
                        <div className='mb-3'>

                            <h4 className='mb-0'>
                                {post.title}
                                <Link to='/' className='close'>×</Link>
                            </h4>

                            <small className='text-muted'>
                  <span className='badge badge-primary align-middle mr-2'>
                    {post.category}
                  </span>
                                <PostDetails item={post} />
                            </small>
                        </div>
                        <p className='lead'>{post.body}</p>
                        <div className='row mt-5'>
                            <div className='col col-md-auto py-2'>
                                <div className='btn-group v-buttons'>

                                    <Link to={`${post.id}/edit`} className='btn btn-secondary'>
                                        <i className="fa  fa-pencil-square-o" aria-hidden="true"></i>
                                        Edit Post
                                    </Link>

                                    <button
                                        className='btn btn-danger ml-auto'
                                        onClick={this.deletePost}
                                    >
                                        <i className="fa  fa-trash-o" aria-hidden="true"></i>
                                        Delete Post
                                    </button>
                                </div>
                            </div>

                            <div className='col flex-nowrap py-2'>

                                <CommentsCount
                                    className='mr-3'
                                    count={(comments || []).length}
                                />

                                <button
                                    className='btn btn-primary'
                                    onClick={() => this.showCommentModal()}
                                >
                                    <i className="fa  fa-comment" aria-hidden="true"></i>
                                    Add Comment
                                </button>

                                <SortBy
                                    sortBy={this.props.sortBy}
                                    onSortByChange={sortBy =>
                                        this.props.updateSortCommentsBy(sortBy)}
                                />
                            </div>
                        </div>
                        {comments.map(comment => (
                            <div key={comment.id} className='media mt-3'>
                                <VoteScore
                                    voteScore={comment.voteScore}
                                    onVoteChange={option =>
                                        this.props.voteForComment(comment, option)}
                                />
                                <div className='media-body'>
                                    <small className='text-muted'>
                                        <PostDetails item={comment} />
                                        <button
                                            className='btn btn-link btn-sm ml-2 btn-info'
                                            onClick={() => this.editComment(comment)}
                                        >
                                            <i className="fa  fa-pencil-square-o" aria-hidden="true"></i>
                                            Edit
                                        </button>
                                        <button
                                            className='btn btn-link btn-sm text-danger btn-danger'
                                            onClick={() => this.props.deleteComment(comment)}
                                        >
                                            <i className="fa  fa-trash-o" aria-hidden="true"></i>
                                            Delete
                                        </button>
                                    </small>
                                    <p>{comment.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                }

                <Modal
                    className='modal fade show'
                    overlayClassName='modal-backdrop fade show'
                    isOpen={this.state.commentModalOpen}
                    onRequestClose={this.closeCommentModal}
                    contentLabel='Modal'
                >

                    <div className='modal-dialog'>
                        <form className='modal-content' onSubmit={this.handleSaveComment}>
                            <div className='modal-header'>
                                {this.state.id ? 'Edit' : 'Add'} Comment
                                <button
                                    className='close'
                                    onClick={event => {
                                        event.preventDefault()
                                        this.closeCommentModal()
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <div className='modal-body'>
                                {!this.state.id &&
                                <div className='form-group'>
                                    <input
                                        id='comment-author'
                                        name='author'
                                        value={this.state.author}
                                        onChange={this.handleChange}
                                        type='text'
                                        className='form-control'
                                        placeholder='Author'
                                    />
                                </div>
                                }
                                <div className={`small font-italic text-danger ml-3 ${ this.validationError(this.state.authorIsValid) }`}>Must be at least 3 characters long.</div>
                                <div className='form-group'>
                  <textarea
                      id='comment-body'
                      name='body'
                      value={this.state.body}
                      onChange={this.handleChange}
                      rows='3'
                      className='form-control'
                      placeholder='Comment'
                  />
                                </div>
                                <div className={`small font-italic text-danger ml-3 ${ this.validationError(this.state.commentIsValid) }`}>Must be at least 6 characters long.</div>
                            </div>
                            <div className='modal-footer'>
                                <button type='submit' className='btn btn-primary' disabled={!this.state.formIsValid}>Save</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps ({ posts, comments }, ownProps) {
    const activePost = posts.byId[ownProps.match.params.id]
    const filteredComments = filter(comments.byId, {
        parentId: activePost && activePost.id
    })

    return {
        post: activePost,
        comments: sortBy(filteredComments, comment => -comment[comments.sortBy]),
        sortBy: comments.sortBy
    }
}

function mapDispatchToProps (dispatch) {
    return {
        fetchPost: id => dispatch(fetchPost(id)),
        voteForPost: (post, option) => dispatch(voteForPost(post, option)),
        deletePost: post => dispatch(deletePost(post)),
        createComment: comment => dispatch(createComment(comment)),
        updateComment: (id, details) => dispatch(updateComment(id, details)),
        voteForComment: (comment, option) =>
            dispatch(voteForComment(comment, option)),
        deleteComment: comment => dispatch(deleteComment(comment)),
        updateSortCommentsBy: sortBy => dispatch(updateSortCommentsBy(sortBy))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
