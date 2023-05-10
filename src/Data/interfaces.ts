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

export interface SaobracjanaDozvola {
    marka: string;
    model: string;
    godinaProizvodnje: number;
    boja: string;
    regBroj: string;
    snagaMotora: number;
    maksimalnaBrzina: number;
    brojSedista: number;
    tezina: number;
    tipVozila: string;
    statusRegistracije: string;
    prijavljenaKradja: string|null;
}

export interface VozackaDozvola {
    brojVozackeDozvole: string;
    kategorijeVozila: string[];
    datumIzdavavanja: string;
    datumIsteka: string;
    brojKaznenihPoena: number;
    statusVozackeDozvole: string;
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

export interface VozackaCardProps{
    vozacka: VozackaDozvola;
}

export interface KreirajNalogProps{
    idPrekrsajnog: string,
    izdatoOdStrane: string,
    izdatoZa: string,
    JMBGZapisanog: string,
}

export interface SudskiNalog{
    id: number,
    datum: string,
    naslov: string,
    opis: string,
    optuzeni: string,
    JMBGoptuzenog: string,
    statusSlucaja: string,
    dokumenti: string[],
}

export interface SaobracjanaCardProps{
    saobracajna: SaobracjanaDozvola;
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

  export const opisiStatusaVozacke = {
    "AKTIVNA": "Aktivna",
    "ISTEKLA": "Istekla",
    "ODUZETA": "Oduzeta",
    "U_PROCESU_IZDAVANJA": "U procesu izdavanja",
    "OSTALO": "Ostalo",
  };

  export const opisiStatusaSaobracjane = {
    "ODOBRENA": "Aktivna",
    "ODBIJEA": "Odbijena",
    "NA_CEKANJU": "U procesu izdavanja",
  };

  export const opisiStatusaNalog ={
    "POSLAT": "Poslat",
    "U_PROCESU": "Procesuira se",
    "ODBIJEN": "Odbijen",
    "PRESUDJEN": "Presuđeno",
    "POTREBNI_DOKAZI": "Potrebni dodatni dokazi"
  }

  export const opisiTipaVozila = {
    "PUTNICKO_VOZILO": "Putničko vozilo",
    "TERETNO_VOZILO": "Teretno vozilo",
    "AUTOBUS": "Autobus",
    "KAMION": "Kamion",
    "MOTORNI_BICIKL": "Motorni bicikl",
    "SKUTER" : "Skuter",
    "MOTORNA_TRICIKLA": "Motorni tricikl",
    "MOTORNA_CETVOTOCIKLA": "Motorni četvorocikl",
    "PRIKLJUCNO_VOZILO": "Priključno vozilo",
    "SPECIJALNO_VOZILO": "Specijalno vozilo",
  };