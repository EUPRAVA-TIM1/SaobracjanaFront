import React from 'react'
import { VozackaCardProps, opisiStatusaVozacke } from '../Data/interfaces.ts'

function VozackaCard({vozacka} : VozackaCardProps) {

    const expired = vozacka.statusVozackeDozvole === 'ISTEKLA' || vozacka.statusVozackeDozvole === 'ODUZETA';
  return (
    <div className={`card ${expired ? 'border-danger' : ''}`}>
      <div className="card-header">
        <h4>Vozačka Dozvola</h4>
      </div>
      <div className="card-body">
        <p className="card-text">
          <strong>Broj vozačke dozvole:</strong> {vozacka.brojVozackeDozvole}
        </p>
        <p className="card-text">
          <strong>Kategorije vozila:</strong> {vozacka.kategorijeVozila.join(', ')}
        </p>
        <p className="card-text">
          <strong>Datum izdavanja:</strong> {new Date(vozacka.datumIzdavavanja).toLocaleDateString('en-US')}
        </p>
        <p className="card-text">
          <strong>Datum isteka:</strong> {new Date(vozacka.datumIsteka).toLocaleDateString('en-US')}
        </p>
        <p className="card-text">
          <strong>Broj kaznenih poena:</strong> {vozacka.brojKaznenihPoena}
        </p>
        <p className={`card-text ${expired ? 'text-danger' : ''}`}>
          <strong>Status vozačke dozvole:</strong> {opisiStatusaVozacke[vozacka.statusVozackeDozvole]}
        </p>
      </div>
    </div>
  );
}

export default VozackaCard