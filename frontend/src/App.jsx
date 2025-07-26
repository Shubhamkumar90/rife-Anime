import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import { Generate } from './pages/Generate';
import LandingPage from './pages/Landing';
import Signin from './pages/Signin';
import {Signup} from './pages/Signin';

import Prot from './Components/prot';
import { Prot2 } from './Components/prot2';
// import { SignUp } from '@clerk/clerk-react';


function App() {
  
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/generate' element={<Prot><Generate></Generate></Prot>}></Route>
          <Route path='/' element={<Prot2><LandingPage></LandingPage></Prot2>}></Route>
          <Route path='/login' element={<Signin></Signin>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App;
