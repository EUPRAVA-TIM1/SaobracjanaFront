import React,{useEffect} from 'react'
import logo from '../img/PolicijaLogo.png'
import { useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios';
import {backend_url,storageKey} from '../Data/data.ts'

function NavLayout({ body,employeeRestricted }) {
  const location = useLocation();

  useEffect( () =>{
    axios.get(backend_url + '/Authorise', {headers: {
      'Authorization' : 'Bearer ' + localStorage.getItem(storageKey)
    }}).then(res => {
      if(employeeRestricted){
        axios.get(backend_url + 'Policajac/Authorise', {headers: {
          'Authorization' : 'Bearer ' + localStorage.getItem(storageKey)
        }}).then(res => {
        }).catch( err => {
            navigate("/Home")
        })
      }
    }).catch(err => {
        localStorage.removeItem(storageKey)
        window.location.replace("http://localhost:3000")  
    })
    
  },[location])

  const logOut= () => {
    localStorage.removeItem(storageKey)
    window.location.replace("http://localhost:3000")
  }

  const navigate = useNavigate();
  const home = () => {
      navigate("/Home")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-info mb-4">
        <div className="container-fluid px-4">
          <div className='d-flex align-items-center' onClick={home}>
            <img src={logo} className='img-fluid' style={{ maxHeight: "12vh" }}></img>
            <h3 className='text-light'>Saobraćjana policija</h3>
          </div>
          <button className="btn btn-warning  btn-lg ml-auto" onClick={logOut}>Izlogujte se</button>
        </div>
      </nav>
      <section className='bg-body-color h-max container'>
        {body}
      </section>
    </>
  )
}

export default NavLayout