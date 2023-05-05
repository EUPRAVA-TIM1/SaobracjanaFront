import React from 'react'
import {CommponentCardProps} from '../Data/interfaces'
import { useNavigate } from 'react-router-dom'

function ComponnetCard({commponent} : CommponentCardProps) {
  const navigate = useNavigate();

  const redirect = () =>{navigate(commponent.url)} 

  return (
<div className="card text-center mb-3  h-100 text-bg-secondary p-3">
  <div className="card-body">
    <h3 className="card-title">{commponent.title}</h3>
    <p className="card-text">{commponent.desc}</p>
  </div>
    <button  className="btn btn-info btn-lg" onClick={redirect}>Pređi na stranicu</button>
</div>
  )
}

export default ComponnetCard