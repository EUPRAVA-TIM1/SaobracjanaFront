import React, { useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";
import { PrekrsajniNalog, opisiKrivica } from '../Data/interfaces.ts';
import axios from 'axios';
import { backend_url, file_service_url, storageKey } from '../Data/data.ts';

function MojiNalozi() {

    const [nalozi, setNalozi] = useState<PrekrsajniNalog[]>([])
    useEffect(() => {
        const jmbg = jwtDecode(localStorage.getItem(storageKey)!).sub
        axios.get(`${backend_url + "Gradjanin/Nalozi/" + jmbg}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res => {
            setNalozi(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <h1 className='mb-5'>Moji prekršajni nalozi:</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Datum</th>
                        <th>Opis</th>
                        <th>Izdao/la</th>
                        <th>Tip prekršaja</th>
                        <th>Jedinica mere</th>
                        <th>Vrednost</th>
                        <th>Slike</th>
                    </tr>
                </thead>
                <tbody>
                    {nalozi.map(nalog => {
                        return (
                            <tr key={nalog.id}>
                                <td>{new Date(nalog.datum).toLocaleDateString('en-US')}</td>
                                <td>{nalog.opis}</td>
                                <td>{nalog.izdatoOdStrane}</td>
                                <td>{opisiKrivica[nalog.tipPrekrsaja]}</td>
                                <td>{nalog.jedinicaMere == null ? "/" : nalog.jedinicaMere}</td>
                                <td>{nalog.vrednost == null ? "/" : nalog.vrednost}</td>
                                <td>{nalog.slike.map((url, index) => {
                                    return (<a key={url} className="mx-1" href={file_service_url + "/" + url} target='_blank'>{"slika" + index}</a>)
                                })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default MojiNalozi