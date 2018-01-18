import React from 'react'
import moment from 'moment'
import '../style.css'

export default function PostDetails (props) {
  return (

    <div>
      <span>Submitted by: </span>
      <span className='item-author'> {props.item.author} </span>
      <span>at: </span>
      <span className='item-timestamp'>
        { moment(props.item.timestamp).format('MMMM Do YYYY, h:mm a') }
      </span>
    </div>

  )
}
