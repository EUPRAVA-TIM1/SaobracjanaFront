import React, { useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";
import { SudskiNalog, opisiStatusaNalog } from '../Data/interfaces.ts';
import axios from 'axios';
import { file_service_url, backend_url, storageKey } from '../Data/data.ts';

function IzdatiSudskiNalozi() {
    const [nalozi, setNalozi] = useState<SudskiNalog[]>([])
    useEffect(() => {
        const jmbg = jwtDecode(localStorage.getItem(storageKey)!).sub
        axios.get(`${backend_url + "Policajac/Sud/Nalozi/" + jmbg}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res => {
            setNalozi(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const openPdf =  (id) => {
        axios.get(`${backend_url + "Nalog/" + id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res => {
            window.open(`${file_service_url+"/"+res.data.name}`, '_blank');
        }).catch(err => {
            console.log(err)
        })

    }

  return (
    <>
    <h1 className='mb-5'>Nalozi prosleđeni sudu:</h1>
    <table className="table table-hover">
        <thead>
            <tr>
                <th>Datum</th>
                <th>Naslov</th>
                <th>Opis</th>
                <th>Izdato za</th>
                <th>Jmbg upisanog</th>
                <th>Status slučaja</th>
                <th>Priloženi dokumenti</th>
            </tr>
        </thead>
        <tbody>
            {nalozi.map(nalog => {
                return (
                    <tr key={nalog.id}>
                        <td>{new Date(nalog.datum).toLocaleDateString('en-US')}</td>
                        <td>{nalog.naslov}</td>
                        <td>{nalog.opis}</td>
                        <td>{nalog.optuzeni}</td>
                        <td>{nalog.JMBGoptuzenog}</td>
                        <td>{opisiStatusaNalog[nalog.statusSlucaja]}</td>
                        <td>{nalog.dokumenti.map((url, index) => {
                            return (<a key={url} className="mx-1" href={file_service_url + "/" + url} target='_blank'>{"dokument" + index}</a>)
                        })}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
</>
  )
}

export default IzdatiSudskiNalozi