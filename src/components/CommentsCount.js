import React from 'react'

export default function CommentsCount (props) {
  const { count = 0 } = props
  return (

    <div className={props.className}>
      <span>This post has: </span>  {count} comment{count !== 1 && 's'}
    </div>

  )
}
