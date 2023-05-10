import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { backend_url, file_service_url, storageKey } from '../Data/data.ts';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { KreirajNalogProps } from '../Data/interfaces.ts';

function KreirajSudskiNalog({ idPrekrsajnog, izdatoOdStrane, JMBGZapisanog, izdatoZa }: KreirajNalogProps) {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate();
    interface ResponseData {
        name: string;
    }

    const onSubmit = () => {
        const dto = {
            naslov: getValues("naslov"),
            opis: getValues("opis"),
            izdatoOdStrane: izdatoOdStrane,
            optuzeni: izdatoZa,
            JMBGoptuzenog: JMBGZapisanog,
            JMBGSluzbenika: jwtDecode(localStorage.getItem(storageKey)!).sub,
            statusSlucaja: "KREIRAN",
            dokumenti: [] as string[],
        }

        if (getValues("files").length > 0) {
            const uploadPromises = [] as Promise<void>[];

            const uploadPromise = axios.get(`${backend_url + "Nalog/" + idPrekrsajnog}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
                }
            }).then((res) => {
                    const data: ResponseData = res.data;
                    dto.dokumenti.push(data.name);
                })
                .catch((err) => {
                    alert("Postoji problem sa čuvanjem slika u sistemu pokušajte ponovo kasnije");
                    throw err; // Propagate the error to Promise.all
                });
            uploadPromises.push(uploadPromise);

            for (let i = 0; i < getValues("files").length; i++) {
                const formData = new FormData();
                formData.append("file", getValues("files")[i]);
                const uploadPromise = axios
                    .post(file_service_url, formData)
                    .then((res) => {
                        const data: ResponseData = res.data;
                        dto.dokumenti.push(data.name);
                    })
                    .catch((err) => {
                        alert("Postoji problem sa čuvanjem slika u sistemu pokušajte ponovo kasnije");
                        throw err; // Propagate the error to Promise.all
                    });
                uploadPromises.push(uploadPromise);
            }

            Promise.all(uploadPromises)
                .then(() => {
                    postNalog(dto);
                })
                .catch(() => {
                    alert("Postoji problem sa čuvanjem slika u sistemu pokušajte ponovo kasnije");
                });
        } else {
            postNalog(dto);
        }
    }

    const postNalog = (dto) => {
        axios.post(backend_url + "Policajac/Sud/Nalozi", dto, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
            }
        }).then(res => {
            navigate("/Home");
        }).catch(err => {
            alert("Postoji problem pri kreiranju naloga, molimo vas da pokušate ponovo kasnije");
        });
    }

    return (
        <>
            <h1 className='mb-5'>Kreiraj sudski nalog:</h1>
            <ul className="list-group list-group-flush fs-4">
                <li className="list-group-item"><strong>Izdato od strane:</strong> {izdatoOdStrane}</li>
                <li className="list-group-item"><strong>Izdato za:</strong> {izdatoZa} , <strong>JMBG:</strong>  {JMBGZapisanog}</li>
            </ul>
            <form>
                {errors.naslov && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="opis">Unesite naslov:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("naslov", { required: true, maxLength: 100 })}
                    />
                </div>
                {errors.opis && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="opis">Unesite opis:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("opis", { required: true, maxLength: 300 })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="files" className="form-label fs-4 mb-2">Prinesite dostupne fajlove(pdf slučaja se automastki dodaje)</label>
                    <input {...register("files")} className="form-control mb-4" type="file" id="files" multiple accept="image/*,application/pdf" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '50%', marginLeft: '25%' }} onClick={handleSubmit(onSubmit)}>Prosledi</button>
            </form>
        </>
    )
}

export default KreirajSudskiNalog