import React from 'react'
import { StanicaCardProps } from '../Data/interfaces'

function StanicaCard({stanica}:StanicaCardProps) {
    return (
        <div className="card text-bg-warning mb-3">
            <div className="card-header"><h5>{stanica.adresa}</h5></div>
            <div className="card-body">
                <h5 className="card-title">Opstina: {stanica.opstina.PTT},{stanica.opstina.Naziv}</h5>
                <h5 className="card-title">Kontakt telefon: {stanica.brojTelefona}</h5>
                <h5 className="card-title">E-Mail: {stanica.email}</h5>
                <h5 className="card-title">Radi od: {stanica.vremeOtvaranja}</h5>
                <h5 className="card-title">Radi Do: {stanica.vremeZatvaranja}</h5>
            </div>
        </div>
    )
}

export default StanicaCard