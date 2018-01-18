import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

class Categories extends Component {
  render () {
    return (
      <div>

        <p>
          <Link to='/' ><i className="fa  fa-home" aria-hidden="true"></i>Home</Link>
        </p>

        <ul className='nav flex-column mt-3'>

          {this.props.categories.map(category => {
            return (
              <li className='nav-item' key={category.name}>

                <NavLink
                  to={`/${category.path}`}
                  activeClassName='bg-primary text-white'
                  isActive={() => category.path === this.props.active}
                  className='nav-link category-item'
                >
                  {category.name}
                </NavLink>

              </li>
            )
          })}

        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ category }) {
  return {
    categories: category.list,
    active: category.active
  }
}

export default connect(mapStateToProps)(Categories)
