import React, { useEffect, useState } from 'react'
import { allCommponents, gradjajninCommponents } from '../Data/data.ts'
import ComponnetCard from '../Components/ComponnetCard.tsx'
import axios from 'axios'
import { backend_url, storageKey } from '../Data/data.ts'

function HomePage() {
  const [isZaposleni, setIsZaposleni] = useState(false)
  const [zaposleniMode, setZaposleniMode] = useState(false)
  useEffect(() => {
    axios.get(backend_url + 'Policajac/Authorise', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
      }
    }).then(res => {
      setIsZaposleni(true)
    }).catch(err => {
      setIsZaposleni(false)
    })
  }, [])
  return (<>
    {(!isZaposleni || (isZaposleni && !zaposleniMode)) && (
      <>
        {isZaposleni && <button className="btn btn-warning  btn-lg ml-auto mb-5" onClick={() => setZaposleniMode(true)}>Pogledaj opcije za zaposlenog</button>}
        <div className='row row-cols-2 g-4'>
          {gradjajninCommponents.map(commponent => {
            return (<div className='col' key={commponent.title}><ComponnetCard commponent={commponent} ></ComponnetCard></div>)
          })}
        </div>
      </>
    )}
    {isZaposleni && zaposleniMode && (
      <>
      <button className="btn btn-warning  btn-lg ml-auto mb-5" onClick={() => setZaposleniMode(false)}>Pogledaj opcije za gradjanina</button>
      <div className='row row-cols-2 g-4'>
        {allCommponents.map(commponent => {
          return (<div className='col' key={commponent.title}><ComponnetCard commponent={commponent} ></ComponnetCard></div>)
        })}
      </div>
        </>
    )}
  </>
  )
}


export default HomePage