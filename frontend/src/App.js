import React, { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Login, {isValidUserLogin} from './inputForm/Login';
import Home from './Components/Home';
import Order from './Components/Order';
import ReturnCan from './Components/ReturnCan';
import Report from './Components/Report';
import Pending from './Components/Pending';
import PageNotFound from './Components/PageNotFound';

import './Styles/MBLCardData.css';




function App() {

  
  const [isValidUser, setIsValidUser] = useState(true);
  

  /*const handleChange =(userName, password)=>{
    //setIsValidUser(boolValue);
    const ss = window.sessionStorage
    if(ss.getItem("username")===userName && ss.getItem("password")==password){
      setIsValidUser(bool)
    }
  }*/
  
  return (
    <div>
      
      <Routes>
        <Route path='/' exact element={<Login setIsValidUser={setIsValidUser} />} />
        {isValidUser && <Route path="/home" exact element={<Home/>} />}
        {isValidUser && <Route path="/order" element={<Order/>} />}
        {isValidUser && <Route path="/returncan/:id" element={<ReturnCan/>} />}
        {isValidUser && <Route path="/report/:id" element={<Report/>} />}
        {isValidUser && <Route path="/pending" element={<Pending/>} />}
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      
      
    </div>
  );
  
}

export default App;
