import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import SaobracjanaCard from '../Components/SaobracjanaCard.tsx';
import { backend_url, storageKey } from '../Data/data.ts';
import axios from 'axios';
import { SudskiSlucaj, opisiStatusaNalog } from '../Data/interfaces.ts';

function ProveraOsobeSud() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const [slucajevi, setSlucajevi] = useState<SudskiSlucaj[]>([])

    const getSlucajevi = () => {
        axios.get(backend_url + "Policajac/Provera/Sud/" + getValues("jmbg"), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(
            res => { if (res.data !== null){
                setSlucajevi(res.data as SudskiSlucaj[]) 
            } 
            }
        ).catch(err => { alert(err.message) })
    }
    return (
        <>
            <h1 className='mb-5'>Provera osobe u sudu:</h1>
            <div className='container card mb-4 p-2'>
                <form className='row p-2 mb-3'>
                    <div className="form-group col-auto align-self-center">
                        <div className='row'>
                            <label className='fs-4 mb-2 col-auto align-self-center' htmlFor="opis">Unesite JMBG osobe:</label>
                            <div className='col-auto align-self-center'>
                                <input
                                    type="text"
                                    className="form-control border-primary-subtle align-self-center"
                                    {...register("jmbg", { maxLength: 13, required: true })}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary  col-auto  align-self-center" onClick={handleSubmit(getSlucajevi)}>Pretraži</button>
                </form>
                {slucajevi.length !== 0 && (
                    <>
                        <h3 className='mb-5'>Aktivni slučajevi u sudu:</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Datum</th>
                                    <th>Naslov</th>
                                    <th>Opis</th>
                                    <th>Status slučaja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slucajevi.map(slucaj => {
                                    return (
                                        <tr key={slucaj.naslov + slucaj.datum.toString()}>
                                            <td>{new Date(slucaj.datum).toLocaleDateString('en-US')}</td>
                                            <td>{slucaj.naslov}</td>
                                            <td>{slucaj.opis}</td>
                                            <td>{opisiStatusaNalog[slucaj.status]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table></>
                )}
                {!slucajevi.length && getValues("jmbg") && (
                    <>
                        <h1 className='my-5'>Osoba nema aktivnih slučajeva u sudu</h1>
                    </>
                )}
            </div >
        </>
    )
}

export default ProveraOsobeSud