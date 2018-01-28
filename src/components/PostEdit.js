import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost, fetchPost, updatePost } from '../actions'

class PostEdit extends Component {
    state = {
        category: '',
        author: '',
        title: '',
        body: '',
        formIsValid: false,
        authorIsValid: false,
        titleIsValid: false,
        contentIsValid: false
    }

    componentDidMount () {
        const post = this.props.post
        if (post) {
            this.updateStateFromPost(post)
        } else {
            this.setInitialCategory(this.props.categories)
            if (this.props.match.params.id) {
                this.props.fetchPost(this.props.match.params.id)
            }
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.post) {
            this.updateStateFromPost(nextProps.post)
        } else {
            this.setInitialCategory(nextProps.categories)
        }
    }

    updateStateFromPost ({ title, body }) {
        this.setState({ title, body })
    }

    setInitialCategory (categories) {
        if (categories.length && !this.state.category) {
            this.setState({ category: categories[0].path })
        }
    }

    handleChange = event => {

        const name = event.target.name
        const value = event.target.value

        console.log('name is: ' + name )

        this.setState({[name]: value},
            () => { this.validateField(name, value) });

    }

    handleSubmit = event => {
        event.preventDefault()

        const { author, title, body } = this.state
        let category = this.state.category

        let id
        let postSaved


        if (this.props.post) {
            id = this.props.post.id
            category = this.props.post.category
            postSaved = this.props.updatePost(id, { title, body })
        } else {
            id = Math.random().toString(36).substr(-8)
            postSaved = this.props.createPost({
                id,
                timestamp: Date.now(),
                author,
                title,
                body,
                category
            })
        }

        postSaved.then(() => this.props.history.push(`/${category}/${id}`))
    }

    handleCancel = event => {
        event.preventDefault()
        this.props.history.goBack()
    }

    validateField(field,value) {

    let titleValid = this.state.titleIsValid
    let authorValid = this.state.authorIsValid
    let contentValid = this.state.contentIsValid

        switch(field) {

            case 'title':
                titleValid = value.length >=4
                console.log('title valid: ' + titleValid)
                break
            case 'author':
                authorValid = value.length >=3
                console.log('author valid: ' + authorValid)
                break
            case 'body':
                contentValid = value.length >=6
                console.log('content valid: ' + contentValid)
                break
            default:
                break

        }


        let formValid = titleValid && authorValid && contentValid

        this.setState({ titleIsValid: titleValid, authorIsValid: authorValid, contentIsValid: contentValid, formIsValid: formValid })


        let titlevalid = this.state.titleIsValid ? 'YES' : 'NO'
        let authorvalid = this.state.authorIsValid ? 'YES' : 'NO'
        let contentvalid = this.state.contentIsValid ? 'YES' : 'NO'
        let formvalid = this.state.formIsValid ? 'YES' : 'NO'

        console.log( 'title is valid: ' + titlevalid  )
        console.log( 'author is valid: ' + authorvalid  )
        console.log( 'content is valid: ' + contentvalid  )
        console.log( 'form is valid: ' + formvalid  )

}


validationError(isValid) {
        return ( isValid ? 'd-none' : 'd-block' )
}


    render () {
        return (
            <div className='container py-3 new-post border'>

                <h3>
                    {
                        this.props.post ? 'Edit Post' : 'Add New Post'

                    }

                </h3>

                <div className="cancel">
                    <Link to='/' className='close'><i className="fa  fa-close" aria-hidden="true"></i></Link>
                </div>

                <form onSubmit={this.handleSubmit}>

                    {!this.props.post &&
                    <div className='form-group row'>
                        <label className='col-2 col-form-label' htmlFor='post-author'>
                            Author
                        </label>
                        <div className='col-10'>
                            <input
                                id='post-author'
                                name='author'
                                value={this.state.author}
                                onChange={this.handleChange}
                                type='text'
                                className='form-control'
                                placeholder='Author'
                            />
                        </div>
                        <div className={`small font-italic text-danger ml-3 ${ this.validationError(this.state.authorIsValid) }`}>Must be at least 3 characters long.</div>
                    </div>
                    }

                    <div className='form-group row'>
                        <label className='col-2 col-form-label' htmlFor='post-title'>
                            Title
                        </label>
                        <div className='col-10'>
                            <input
                                id='post-title'
                                name='title'
                                value={this.state.title}
                                onChange={this.handleChange}
                                type='text'
                                className='form-control'
                                placeholder='Title'
                            />
                        </div>
                        <div className={`small font-italic text-danger ml-3 ${ this.validationError(this.state.titleIsValid) }`}>Must be at least 4 characters long.</div>
                    </div>

                    <div className='form-group row'>
                        <label className='col-2 col-form-label' htmlFor='post-body'>
                            Content
                        </label>
                        <div className='col-10'>
              <textarea
                  id='post-body'
                  name='body'
                  value={this.state.body}
                  onChange={this.handleChange}
                  rows='3'
                  className='form-control'
              />
                        </div>
                        <div className={`small font-italic text-danger ml-3 ${ this.validationError(this.state.contentIsValid) }`}>Must be at least 6 characters long.</div>
                    </div>

                    {!this.props.post &&
                    <div className='form-group row'>
                        <label className='col-2 col-form-label' htmlFor='post-category'>
                            Category
                        </label>
                        <div className='col-10'>
                            <select
                                id='post-category'
                                name='category'
                                value={this.state.category}
                                onChange={this.handleChange}
                                className='form-control'
                            >
                                {this.props.categories.map(category => (
                                    <option key={category.path} value={category.path}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    }

                    <div className='row'>
                        <div className='col-10 offset-2'>
                            <button className='btn btn-primary' type='submit' disabled={!this.state.formIsValid}>
                                {
                                    this.props.post ? 'Edit' : 'Add'
                                }
                                </button>
                            <button className='btn btn-primary' onClick={this.handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

function mapStateToProps ({ category, posts }, ownProps) {
    const categories = category.list
    return {
        categories,
        post: posts.byId[ownProps.match.params.id]
    }
}

function mapDispatchToProps (dispatch) {
    return {
        createPost: post => dispatch(createPost(post)),
        fetchPost: id => dispatch(fetchPost(id)),
        updatePost: (id, details) => dispatch(updatePost(id, details))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PostEdit)
)
