import React, { useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";
import { PrekrsajniNalog, opisiKrivica } from '../Data/interfaces.ts';
import axios from 'axios';
import { file_service_url, backend_url, storageKey } from '../Data/data.ts';
import KreirajSudskiNalog from '../Components/KreirajSudskiNalog.tsx';

function ProslediNalog() {
    const [nalozi, setNalozi] = useState<PrekrsajniNalog[]>([])
    const [nalogSelected, setNalogSelected] = useState<PrekrsajniNalog|null>(null)

    useEffect(() => {
        const jmbg = jwtDecode(localStorage.getItem(storageKey)!).sub
        axios.get(`${backend_url + "Policajac/Nalozi/NotIzvrseni/" + jmbg}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res => {
            setNalozi(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const createNalog = (nalog) => {
        setNalogSelected(nalog)
    }

    return (
        <>
            <h1 className='mb-5'>Prosledi nalog sudu:</h1>
            <div className='container'>
                <h4 className='mb-4 text-secondary'>Molim vas izaberite nalog koji želite da prosledite:</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Datum</th>
                            <th>Opis</th>
                            <th>Izdato za:</th>
                            <th>Tip prekršaja</th>
                            <th>Jedinica mere</th>
                            <th>Vrednost</th>
                            <th>Slike</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nalozi.map(nalog => {
                            return (
                                <tr key={nalog.id} style={{cursor: 'pointer'}} onClick={() => createNalog(nalog)}>
                                    <td>{new Date(nalog.datum).toLocaleDateString('en-US')}</td>
                                    <td>{nalog.opis}</td>
                                    <td>{nalog.izdatoZa}</td>
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
                {nalogSelected  && (<KreirajSudskiNalog idPrekrsajnog={nalogSelected.id} izdatoOdStrane={nalogSelected.izdatoOdStrane} 
                izdatoZa={nalogSelected.izdatoZa} JMBGZapisanog={nalogSelected.JMBGZapisanog} prekrsaj={nalogSelected.tipPrekrsaja}></KreirajSudskiNalog>)}
            </div>
        </>
    )
}

export default ProslediNalog