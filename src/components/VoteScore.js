import React from 'react'
import '../style.css'

export default function VoteScore (props) {
  return (
    <div className='votes-container mr-3'>
      <button
        type='button'
        className='btn btn-sm btn-success vote-up rounded-0'
        onClick={() => props.onVoteChange('upVote')}
      >
        <i className="fa  fa-thumbs-up" aria-hidden="true"></i>
      </button>

      <button
        type='button'
        className='btn btn-sm btn-danger vote-down rounded-0'
        onClick={() => props.onVoteChange('downVote')}
      >
        <i className="fa  fa-thumbs-down" aria-hidden="true"></i>
      </button>

      <h3 className='vote-score mb-0'>
        {props.voteScore}
      </h3>

    </div>
  )
}
