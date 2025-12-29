import { useState } from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom";
import './App.css'
import Events from './pages/Events';
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Events/>}></Route>
             <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
                <Route path="/create" element={<CreateEvent />} />
               
        </Routes>
    
    </BrowserRouter>
  )
}

export default App
