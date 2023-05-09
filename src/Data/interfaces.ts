export interface Commponent{
    title : string,
    desc: string,
    url: string
}

export interface Stanica{
    id : string,
    adresa: string,
    brojTelefona: string,
    email : string,
    vremeOtvaranja : string,
    vremeZatvaranja : string
    opstina : Opstina
}

export interface Opstina{
    Naziv: string,
    PTT: string
}

export interface PrekrsajniNalog{
    id : string,
    datum : string,
    opis: string,
    izdatoOdStrane: string,
    izdatoZa: string,
    JMBGZapisanog: string,
    tipPrekrsaja: string,
    jedinicaMere: string |null,
    vrednost: string | null,
    slike: string[]
}

export interface PrekrsajniNalogCardProps{
    nalog : PrekrsajniNalog
}

export interface StanicaCardProps {
    stanica: Stanica;
}

export interface CommponentCardProps{
    commponent: Commponent;
}

  export const opisiKrivica = {
    "POJAS": "Nenošenje sigurnosnog pojasa",
    "PREKORACENJE_BRZINE": "Prekoračenje brzine",
    "PIJANA_VOZNJA": "Vožnja pod dejstvom alkohola",
    "TEHNICKA_NEISPRAVNOST": "Tehnička neispravnost vozila",
    "PRVA_POMOC": "Ne posedovanje prve pomoći",
    "NEMA_VOZACKU": "Neposedovanje vozačke dozvole",
    "REGISTRACIJA": "Neregistrivano vozilo"
  };