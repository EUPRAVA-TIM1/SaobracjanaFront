import React from 'react'
import { VozackaCardProps, opisiStatusaVozacke } from '../Data/interfaces.ts'
import { unserialize } from 'php-serialize';

function VozackaCard({vozacka} : VozackaCardProps) {

    const expired = vozacka.statusVozackeDozvole === 'ISTEKLA' || vozacka.statusVozackeDozvole === 'ODUZETA';
    const matches = vozacka.katergorijeVozila.match(/s:\d+:"([^"]+)"/g);
    const values = matches!.map((match) => match.match(/"([^"]+)"/)[1]);
  
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
          <strong>Kategorije vozila:</strong> {values.join(', ')}
        </p>
        <p className="card-text">
          <strong>Datum izdavanja:</strong> {new Date(vozacka.datumIzdavavanja.MojDatum).toLocaleDateString('en-US')}
        </p>
        <p className="card-text">
          <strong>Datum isteka:</strong> {new Date(vozacka.datumIsteka.MojDatum).toLocaleDateString('en-US')}
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