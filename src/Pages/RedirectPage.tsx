import React from 'react'
import useLocalStorage from '../Hooks/useLocalStorageHook'
import { useEffect } from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { storageKey } from '../Data/data.ts';

function RedirectPage() {
    const {jwt} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(jwt && jwt != undefined){
            localStorage.setItem(storageKey,jwt)
            navigate("/Home")
        }else{
            window.location.replace("http://localhost:3000")
        }
    },[jwt])
    

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "85vh"}}>
            <div className="spinner-border text-info mx-4" style={{height: "150px",width: "150px"}}>
            </div>
            <h1 className="text-info text-lg ">Redirectiing...</h1>
        </div>

    )
}

export default RedirectPage