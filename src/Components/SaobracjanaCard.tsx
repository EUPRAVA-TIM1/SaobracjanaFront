import React from 'react'
import { SaobracjanaCardProps, opisiStatusaSaobracjane, opisiTipaVozila } from '../Data/interfaces.ts'

function SaobracjanaCard({saobracajna} : SaobracjanaCardProps) {

  const isPrijavljenaKradja = saobracajna.prijavljenaKradja != null;

  return (
    <div className={`card ${isPrijavljenaKradja ? 'border-danger' : ''}`}>
    <div className="card-body">
    <div className="card-header">
        <h4>Saobraćajna Dozvola</h4>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item"><strong>Marka:</strong> {saobracajna.marka}</li>
        <li className="list-group-item"><strong>Model:</strong> {saobracajna.model}</li>
        <li className="list-group-item"><strong>Godina proizvodnje:</strong> {saobracajna.godinaProizvodnje}</li>
        <li className="list-group-item"><strong>Boja:</strong> {saobracajna.boja}</li>
        <li className="list-group-item"><strong>Registarski broj:</strong> {saobracajna.regBroj}</li>
        <li className="list-group-item"><strong>Snaga motora:</strong> {saobracajna.snagaMotora} kW</li>
        <li className="list-group-item"><strong>Maksimalna brzina:</strong> {saobracajna.maksimalnaBrzina} km/h</li>
        <li className="list-group-item"><strong>Broj sedišta:</strong> {saobracajna.brojSedista}</li>
        <li className="list-group-item"><strong>Težina:</strong> {saobracajna.tezina} kg</li>
        <li className="list-group-item"><strong>Tip vozila:</strong> {opisiTipaVozila[saobracajna.tipVozila]}</li>
        <li className="list-group-item"><strong>Status registracije:</strong> {opisiStatusaSaobracjane[saobracajna.statusRegistracije]}</li>
        <li className={`list-group-item ${isPrijavljenaKradja ? "text-danger" : ""}`}><strong>Prijavljena krađa:</strong> {isPrijavljenaKradja ? new Date(saobracajna.prijavljenaKradja as string).toLocaleDateString('en-US') : "N/A"}</li>
      </ul>
    </div>
  </div>
  )
}

export default SaobracjanaCard