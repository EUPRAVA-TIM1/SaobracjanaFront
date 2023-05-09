import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import VozackaCard from '../Components/VozackaCard.tsx';
import SaobracjanaCard from '../Components/SaobracjanaCard.tsx';
import { backend_url, storageKey } from '../Data/data.ts';
import axios from 'axios';
import KreirajNalog from '../Components/KreirajNalog.tsx';
import { SaobracjanaDozvola, VozackaCardProps, VozackaDozvola } from '../Data/interfaces.js';

function ProveraOsobeMup() {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const [vozackaDozvola, setVozacka] = useState<VozackaDozvola|null>(null)
    const [saobracjana, setSaobracjana] = useState<SaobracjanaDozvola|null>(null)


    const getVozacka = () => {
        axios.get(backend_url + "Policajac/Provera/VozackaDozvola/Mup/" + getValues("brojVozacke"), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(
            res => { setVozacka(res.data as VozackaDozvola) }
        ).catch(err => { alert(err.message) })
    }

    const getSaobracjana = () => {
        axios.get(backend_url + "Policajac/Provera/SaobracjanaDozvola/Mup/" + getValues("tablica"), {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(
            res => { setSaobracjana(res.data as SaobracjanaDozvola) }
        ).catch(err => { alert(err.message) })
    }

    return (
        <>
            <h1 className='mb-5'>Provera osobe/vozila:</h1>
            <div className='container card mb-4 p-2'>
                <form className='row p-2 mb-3'>
                    <div className="form-group col-auto align-self-center">
                        <div className='row'>
                            <label className='fs-4 mb-2 col-auto align-self-center' htmlFor="opis">Unesite broj vozačke:</label>
                            <div className='col-auto align-self-center'>
                                <input
                                    type="text"
                                    className="form-control border-primary-subtle col-sm-4 align-self-center"
                                    {...register("brojVozacke", { maxLength: 13 })}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary  col-auto align-self-center" onClick={handleSubmit(getVozacka)}>Pretraži</button>
                </form>
                {vozackaDozvola && (<VozackaCard vozacka={vozackaDozvola}></VozackaCard>)}
            </div>
            <div className='container card mb-4 p-2'>
                <form className='row p-2 mb-3'>
                    <div className="form-group col-auto align-self-center">
                        <div className='row'>
                            <label className='fs-4 mb-2 col-auto align-self-center' htmlFor="opis">Unesite broj tablice:</label>
                            <div className='col-auto align-self-center'>
                                <input
                                    type="text"
                                    className="form-control border-primary-subtle align-self-center"
                                    {...register("tablica", { maxLength: 7 })}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary  col-auto  align-self-center" onClick={handleSubmit(getSaobracjana)}>Pretraži</button>
                </form>
                {saobracjana && (<SaobracjanaCard saobracajna={saobracjana}></SaobracjanaCard>)}
            </div>
            <div className='container card mb-4 p-2'>
               {(vozackaDozvola || saobracjana)  && (<KreirajNalog></KreirajNalog>)}
            </div>
        </>
    )
}

export default ProveraOsobeMup



