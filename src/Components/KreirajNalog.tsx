import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { backend_url, file_service_url, storageKey } from '../Data/data.ts';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function KreirajNalog() {

    const { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const navigate = useNavigate()

    interface ResponseData {
        name: string;
    }

    const onSubmit = async () => {
        const vrednost = getValues("vrednost")
        const dto = {
            opis: getValues("opis"),
            izdatoOdStrane: getValues("izdatoOdStrane"),
            izdatoZa: getValues("izdatoZa"),
            JMBGZapisanog: getValues("JMBGZapisanog"),
            JMBGSluzbenika: jwtDecode(localStorage.getItem(storageKey)!).sub ,
            tipPrekrsaja: getValues("tipPrekrsaja"),
            jedinicaMere: getValues("jedinicaMere") === "" ? null : getValues("jedinicaMere"),
            vrednost:  parseFloat(vrednost),
            slike: [] as string[],
        }
        if (getValues("files").length > 0) {
            const uploadPromises = [] as Promise<void>[];
        
            for (let i = 0; i < getValues("files").length; i++) {
              const formData = new FormData();
              formData.append("file", getValues("files")[i]);
              const uploadPromise = axios
                .post(file_service_url, formData)
                .then((res) => {
                  const data: ResponseData = res.data;
                  dto.slike.push(data.name);
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

     const postNalog = (dto: { opis: any; izdatoOdStrane: any; izdatoZa: any; JMBGZapisanog: any; JMBGSluzbenika: any; tipPrekrsaja: any; jedinicaMere: any; vrednost: any; slike: string[]; }) => {
        axios.post(backend_url + "Policajac/Nalozi", dto, {
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
            <h1 className='mb-5'>Kreiraj prekršajni nalog:</h1>
            <form>
                {errors.opis && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="opis">Unesite opis događaja:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("opis", { required: true, maxLength: 300 })}
                    />
                </div>
                {errors.izdatoOdStrane && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="izdatoOdStrane">Unesite vaše ime:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("izdatoOdStrane", { required: true, maxLength: 60 })}
                    />
                </div>
                {errors.izdatoZa && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="izdatoZa">Unesite ime lica kome pišete nalog:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("izdatoZa", { required: true, maxLength: 60 })}
                    />
                </div>
                {errors.JMBGZapisanog && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate uneti ovo polje(13 karaktera)</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="JMBGZapisanog">Unesite JMBG lica kome pišete nalog:</label>
                    <input
                        type="text"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("JMBGZapisanog", { required: true, maxLength: 13, minLength: 13 })}
                    />
                </div>
                {errors.tipPrekrsaja && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Morate izabrati ovo polje</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className='form-group'>
                    <label htmlFor='tipPrekrsaja' className='fs-4 mb-2'>Krivično delo:</label>
                    <select className='form-control' {...register('tipPrekrsaja', { required: true })}>
                        <option value='POJAS'>Pojas nije vezan</option>
                        <option value='PREKORACENJE_BRZINE'>Prekoračenje brzine</option>
                        <option value='PIJANA_VOZNJA'>Pijana vožnja</option>
                        <option value='TEHNICKA_NEISPRAVNOST'>Tehnička neispravnost</option>
                        <option value='PRVA_POMOC'>Nemanje prve pomoći</option>
                        <option value='NEMA_VOZACKU'>Nema vozačku</option>
                        <option value='REGISTRACIJA'>Registracija istekla</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='jedinicaMere' className='fs-4 mb-2'>Jedinica mere:</label>
                    <select className='form-control' {...register('jedinicaMere')}>
                        <option value="">--</option>
                        <option value='promil'>Promili</option>
                        <option value='km/h'>km/h brzine</option>
                    </select>
                </div>
                {errors.vrednost && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <p className='fs-5'>Vrednost mora biti veća od nule</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="form-group">
                    <label className='fs-4 mb-2' htmlFor="vrednost">Vrednost:</label>
                    <input
                        type="number"
                        className="form-control mb-4 border-primary-subtle"
                        {...register("vrednost", { min: 0.1 , valueAsNumber: true})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="files" className="form-label fs-4 mb-2">Prinesite dostupne slike</label>
                    <input {...register("files")} className="form-control mb-4" type="file" id="files" multiple accept='image/*' />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '50%', marginLeft: '25%' }} onClick={handleSubmit(onSubmit)}>Prijavi</button>
            </form>
        </>
    )
}

export default KreirajNalog

