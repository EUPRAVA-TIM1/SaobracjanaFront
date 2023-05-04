import React from 'react'
import {Commponent} from '../Data/commponent'

function ComponnetCard({Commponent : commponent}) {
  return (
<div className="card text-center mb-3  h-100 text-bg-secondary p-3">
  <div className="card-body">
    <h3 className="card-title">{commponent.title}</h3>
    <p className="card-text">{commponent.desc}</p>
  </div>
    <a href="#" className="btn btn-info btn-lg">Pređi na stranicu</a>
</div>
  )
}

export default ComponnetCard