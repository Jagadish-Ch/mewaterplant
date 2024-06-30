import axios from 'axios';
import React, { useState } from 'react';
import '../Styles/Login.css';
import '../Styles/Home.css';

import { baseURL } from '../Components/baseURL';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const isValidUserLogin = (boolValue) =>{
  return boolValue;
}

const Login = ({setIsValidUser}) => {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const validUser = async(event) =>{
        
        event.preventDefault();
        const result = await axios.get(`${baseURL}/admin?${userName}&${password}`);
        console.log(result.data.length)
        try{
          if(userName==="" || password===""){
            alert("Please Fill the UserName and Password....!");
          }
          else if(result.data.length!==0){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Logined Successfully....!",
              showConfirmButton: false,
              timer: 1000
            })
            //sessionStorage.setItem("username", userName);
            //sessionStorage.setItem("password", password);
            //props.stateChange(true);
            setIsValidUser(true);
            setUserName("")
            setPassword("")
            setTimeout(() => {
              navigate('/home')
            }, 500);
          }
          else{
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Invalid UserName and Password....!",
              showConfirmButton: false,
              timer: 2000
            })
            
            setUserName("")
            setPassword("")
          };
        }catch(error){
            event.preventDefault();
            console.log(error);
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Error Occured....!",
              text : 'Please Check the Console for Error.',
              showConfirmButton: false,
              timer: 2000
            })
            setUserName("")
            setPassword("")
        }
    }
  return (
    <div>
      

      
      <div className='form-visible'>
    <div className='empty-space box'>
    <div className='login-form center-box'>
    
      <form onSubmit={validUser} id="login-input-form">
      <h1 className='login-title'>Login...</h1><br></br>
        <div className="input-block">
          <input type="text" name="input-text"  required spellCheck="false"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
          />
          <span className="placeholder">
            User-Name*
          </span>
        </div><br></br>
        <div className="input-block">
          <input type="text" name="input-text" required spellCheck="false"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <span className="placeholder">
          Password*
          </span>
        </div><br></br><br></br>
        <Link to={`/login?key=${userName}`}><input className="btn-center btn save" type="submit" value="Login"/></Link>
      </form>
      </div>
    </div>
    </div>
    </div>
  )
}



export default Login;
