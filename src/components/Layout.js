import React, { Component } from 'react'
import { connect } from 'react-redux'
import Categories from './Categories'
import { updateCategory } from '../actions'
import PostList from './PostList'

class Layout extends Component {
  componentDidMount () {
    this.updateCategory(this.props)
  }

  componentWillUpdate (nextProps) {
    this.updateCategory(nextProps)
  }

  updateCategory (props) {
    const category = props.match.params.category
    if (category !== props.category) {
      props.updateCategory(category)
    }
  }

  render () {
    return (

      <div className='flex-center row w-100 no-gutters px-0'>
        <div className=' py-3 sidebar'>
          <Categories />
        </div>

        <div className='w900p'>
          <PostList />
        </div>
      </div>

    )
  }
}

function mapStateToProps ({ category }) {
  return {
    category: category.active
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateCategory: category => dispatch(updateCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
