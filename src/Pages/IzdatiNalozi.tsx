import React, { useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";
import { PrekrsajniNalog, opisiKrivica } from '../Data/interfaces.ts';
import axios from 'axios';
import { file_service_url, backend_url, storageKey } from '../Data/data.ts';

function IzdatiNalozi() {


    const [nalozi, setNalozi] = useState<PrekrsajniNalog[]>([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const jmbg = jwtDecode(localStorage.getItem(storageKey)!).sub
        axios.get(`${backend_url + "Policajac/Nalozi/" + jmbg}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res => {
            setNalozi(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [reload])

    const openPdf = (id) => {
        axios.get(`${backend_url + "Nalog/" + id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res => {
            window.open(`${file_service_url + "/" + res.data.name}`, '_blank');
        }).catch(err => {
            console.log(err)
        })

    }

    const izvrsiKaznu = (id) => {
        axios.put(backend_url + "Policajac/Nalozi/Izvrsi/" + id,null,{headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
        }}).then(res => {
            setReload(!reload)
        }).catch(err => {
            alert("Postoji problem sa izvršavanjem kazne pokušajte ponovo kasnije");
        })
    }

    return (
        <>
            <h1 className='mb-5'>Moji prekršajni nalozi:</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>PDF</th>
                        <th>Datum</th>
                        <th>Opis</th>
                        <th>Izdato za:</th>
                        <th>Tip prekršaja</th>
                        <th>Jedinica mere</th>
                        <th>Vrednost</th>
                        <th>Slike</th>
                        <th>Kazna izdata:</th>
                    </tr>
                </thead>
                <tbody>
                    {nalozi.map(nalog => {
                        return (
                            <tr key={nalog.id}>
                                <td><button className='btn btn-info mx-2' onClick={() => openPdf(nalog.id)}> Otvori</button></td>
                                <td>{new Date(nalog.datum).toLocaleDateString('en-US')}</td>
                                <td>{nalog.opis}</td>
                                <td>{nalog.izdatoZa}</td>
                                <td>{opisiKrivica[nalog.tipPrekrsaja]}</td>
                                <td>{nalog.jedinicaMere == null ? "/" : nalog.jedinicaMere}</td>
                                <td>{nalog.vrednost == null ? "/" : nalog.vrednost}</td>
                                <td>{nalog.slike.map((url, index) => {
                                    return (<a key={url} className="mx-1" href={file_service_url + "/" + url} target='_blank'>{"slika" + index}</a>)
                                })}</td>
                                <td className='text-center'>{nalog.kaznaIzvrsena ? "DA" : (<button className='btn btn-info mx-2' onClick={() => izvrsiKaznu(nalog.id)}>Izvrsi</button>)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default IzdatiNalozi