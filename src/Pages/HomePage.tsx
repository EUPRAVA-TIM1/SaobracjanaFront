import React from 'react'
import { allCommponents,gradjajninCommponents } from '../Data/data.ts' 
import ComponnetCard from '../Components/ComponnetCard.tsx'

function HomePage() {
  return (
    <div className='row row-cols-2 g-4'>
    {gradjajninCommponents.map(commponent =>{
        return (<div className='col' key={commponent.title}><ComponnetCard commponent={commponent} ></ComponnetCard></div>)
    })}    
    </div>
  )
}

export default HomePage