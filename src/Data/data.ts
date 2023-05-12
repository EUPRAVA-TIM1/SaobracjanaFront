import { Commponent } from "./interfaces"

export const allCommponents : Commponent[] = [
    {
        title: "Provera dokumenta",
        desc: "Proverite dokumenta lica",
        url: "/ProveraMup"
    },
    {
        title: "Provera u sudu",
        desc: "Proverite da li se vrši sudski postupak protiv lica",
        url: "/ProveraSud"
    },
    {
        title: "Izdavanje prekršajnih naloga",
        desc: "Izdajte novi prekršajni nalog",
        url: "/IzdajNalog"
    },
    {
        title: "Prosledi nalog sudu",
        desc: "Prosledite prekršajni nalog sudu",
        url: "/ProslediNalog"
    },
    {
        title: "Izdati nalozi",
        desc: "Pregledajte sve prekršajne naloge koje ste izdali",
        url: "/IzdatiNalozi"
    },
    {
        title: "Status prosleđenih naloga",
        desc: "Pogledajte status vaših naloga u sudu",
        url: "/StatusNaloga"
    },
]

export const gradjajninCommponents : Commponent[] = [
    {
        title: "Prijava krađe vozila",
        desc: "Prijavite krađu vozila",
        url: "/PrijaviKradju"
    },
    {
        title: "Moji nalozi",
        desc: "Pregledajte sve prekršajne naloge koji su napisani na vaše ime",
        url: "/MojiNalozi"
    },
    {
        title: "Policijske stanice",
        desc: "Pogledajte sve aktivne policjske stanice u zemlji",
        url: "/Stanice"
    },
]

export const backend_url = "http://localhost:8002/saobracajna/"
export const sso_url = "http://localhost:8000/sso"

export const storageKey = "milicija-token"

export const file_service_url = 'http://localhost:8001/api/files'

