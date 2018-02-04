import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, Switch, withRouter } from 'react-router-dom'

import { fetchCategories } from './actions/index'
import Layout from './components/Layout'
import PostEdit from './components/PostEdit'
import PostView from './components/PostView'

class App extends Component {
  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {
    return (
      <div className='flex-center flex-column'>
        <nav className='navbar navbar-expand-lg navbar-dark red'>
          <Link to='/' className='navbar-brand'>Readable</Link>
          <p>A Simple Anonymous Content & Comments App</p>
        </nav>
        <Switch>
          <Route exact path='/' component={Layout} />
          <Route exact path='/add' component={PostEdit} />
          <Route exact path='/:category' component={Layout} />
          <Route exact path='/:category/:id' component={PostView} />
          <Route exact path='/:category/:id/edit' component={PostEdit} />
        </Switch>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
