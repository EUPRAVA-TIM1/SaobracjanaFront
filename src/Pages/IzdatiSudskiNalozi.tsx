import React, { useState, useEffect } from 'react'
import jwtDecode from "jwt-decode";
import { Dokument, SudskiNalog, opisiStatusaNalog } from '../Data/interfaces.ts';
import axios from 'axios';
import { file_service_url, backend_url, storageKey } from '../Data/data.ts';
import { useForm } from 'react-hook-form';


function IzdatiSudskiNalozi() {
    const [nalozi, setNalozi] = useState<SudskiNalog[]>([])
    const [reload,setReload] = useState(false)
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    
    interface ResponseData {
        name: string;
    }

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
    }, [reload])

    const onSubmit = (id) => {
        const dto = {
            dokumenti: [] as Dokument[],
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
                        dto.dokumenti.push({UrlDokumenta: data.name});
                    })
                    .catch((err) => {
                        alert("Postoji problem sa čuvanjem dokumenta u sistemu pokušajte ponovo kasnije");
                        throw err; // Propagate the error to Promise.all
                    });
                uploadPromises.push(uploadPromise);
            }

            Promise.all(uploadPromises)
                .then(() => {
                  axios.put(backend_url+"Policajac/Sud/Nalozi/Dokazi/" + id,dto,{headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(storageKey)
                }}).then(res => {
                    setReload(!reload)
                  }).catch(err => {
                    alert("Postoji problem sa prilaganjem dokumenta sudu pokušajte ponovo kasnije");
                  })
                })
                .catch(() => {
                    alert("Postoji problem sa čuvanjem dokumenta u sistemu pokušajte ponovo kasnije");
                });
        }

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {nalozi.map(nalog => {
                        return (
                            <tr key={nalog.id}>
                                <td>{new Date(nalog.datum).toLocaleDateString('en-US')}</td>
                                <td>{nalog.naslov}</td>
                                <td>{nalog.komentar}</td>
                                <td>{nalog.optuzeni}</td>
                                <td>{nalog.JMBGoptuzenog}</td>
                                <td className={`list-group-item ${nalog.StatusSlucaja === 'POTREBNI_DOKAZI' ? "text-danger" : ""}`}>{opisiStatusaNalog[nalog.StatusSlucaja]}</td>
                                <td>{nalog.dokumenti.map((dokeument, index) => {
                                    return (<a key={dokeument.UrlDokumenta} className="mx-1" href={file_service_url + "/" + dokeument.UrlDokumenta} target='_blank'>{"dokument" + index}</a>)
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