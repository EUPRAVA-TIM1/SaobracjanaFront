import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backed_url } from '../Data/data.ts'
import { Stanica } from '../Data/interfaces'
import StanicaCard from '../Components/StanicaCard.tsx'

function StanicePage() {
    const [stanice, setStanice] = useState<Stanica[]>([])
    useEffect(() => {
        axios.get(backed_url + "Stanice").then(res => {
            setStanice(res.data)
        }).catch(err => {
            console.log(err)
        })
    })

    return (
    <div className='row row-cols-2 g-4'>
        {stanice.map(stanica => {
            return (<div className='col' key={stanica.id}><StanicaCard stanica={stanica}></StanicaCard></div>)
        })}
    </div>
    )
}

export default StanicePage