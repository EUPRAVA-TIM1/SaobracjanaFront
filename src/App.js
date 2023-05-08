import './App.css';
import HomePage from './Pages/HomePage.tsx';
import NavLayout from './Pages/NavLayout.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RedirectPage from './Pages/RedirectPage.tsx';
import StanicePage from './Pages/StanicePage.tsx';
import MojiNalozi from './Pages/MojiNalozi.tsx';
import KradjaVozila from './Pages/KradjaVozila.tsx';
import IzdatiNalozi from './Pages/IzdatiNalozi.tsx';
import KreirajNalog from './Pages/KreirajNalog.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<NavLayout body={<HomePage></HomePage>} />}>
        </Route>
        <Route
          path='/Home'
          element={<NavLayout body={<HomePage></HomePage>} />}>
        </Route>
        <Route
          path='/Stanice'
          element={<NavLayout body={<StanicePage></StanicePage>}/>}>
        </Route>
        <Route
        path='/MojiNalozi'
        element={<NavLayout body={<MojiNalozi></MojiNalozi>}></NavLayout>}
        ></Route>
          <Route
        path='/PrijaviKradju'
        element={<NavLayout body={<KradjaVozila></KradjaVozila>}></NavLayout>}
        ></Route>
        <Route
        path='/IzdatiNalozi'
        element={<NavLayout body={<IzdatiNalozi></IzdatiNalozi>}></NavLayout>}></Route>
         <Route
        path='/IzdajNalog'
        element={<NavLayout body={<KreirajNalog></KreirajNalog>}></NavLayout>}></Route>
        <Route
          path="/redirekcija/:jwt"
          element={<NavLayout body={<RedirectPage></RedirectPage>}></NavLayout>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
