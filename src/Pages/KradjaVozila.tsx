import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { backend_url, storageKey } from '../Data/data.ts';
import { useNavigate } from 'react-router-dom';

function KradjaVozila() {

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = () => {
        const dto = {
            prijavio: getValues("prijavio"),
            kontaktTelefon: getValues("kontaktTelefon"),
            brojRegistracije: getValues("brojRegistracije"),
            JMBGVlasnika: getValues("JMBGVlasnika")
        }
        axios.post(backend_url + "KradjaVozila",  dto , {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res =>{
            navigate("/Home")
        }).catch(err =>{
            alert("Postoji problem pri slanju prijave, molimo vas da pokušate ponovo kasnije")
        })
    }

    return (
        <>
            <h1 className='mb-5'>Prijavite krađu vozila:</h1>
            <form>
                {errors.prijvio && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="prijvio">Unesite vaše ime:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("prijvio", { required: true, maxLength: 60 })}
                    />
                </div>
                {errors.kontaktTelefon && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje (13 karaktera)</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="kontaktTelefon">Kontakt Telefon:</label>
                    <input
                        type="tel"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("kontaktTelefon", { required: true, minLength: 10, maxLength: 13 })}
                    />
                </div>
                {errors.brojRegistracije && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje(od 3 do 7 karaktera)</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="brojRegistracije">Broj registracijske tablice:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("brojRegistracije", { required: true, minLength: 3, maxLength: 7 })}
                    />
                </div>
                {errors.JMBGVlasnika && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje(tačno 13 karaktera)</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="JMBGVlasnika">JMBG Vlasnika:</label>
                    <input
                        type="tel"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("JMBGVlasnika", { required: true, minLength: 13, maxLength: 13 })}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '50%', marginLeft: '25%' }} onClick={handleSubmit(onSubmit)}>Prijavi</button>
            </form>
        </>)
}

export default KradjaVozila