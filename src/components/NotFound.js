
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <p2 className='col-4 p-3 mx-auto'>
    <h3>Oops! Can't find this post.</h3>
    <p>
      <Link to="/">Go Back and try again...</Link>
    </p>
  </p2>
)

export default NotFound
