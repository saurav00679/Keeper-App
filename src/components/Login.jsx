import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Login(){
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({
        username: "",
        password:""
    })

    async function handleSubmit(event){
      event.preventDefault();

      try{
        const response = await axios.post('http://localhost:4000/login', { username:  userDetail.username, password: userDetail.password });
        navigate(`/keeper/${response.data.userId}`);
      } catch (err){
          alert(err?.response?.data?.err);
      }
    }

    function handleChange(event){
      const {name, value} = event.target;

      setUserDetail((previousVal)=>{
        return {
          ...previousVal,
          [name]: value
        }
      })
    }

    return (
    <div>
      <Header/>
      <div className='register-form'>
        <h2 className='top mt-5'>Login to Continue</h2>
        <form className='login-page' onSubmit={handleSubmit}>
          <input onChange={handleChange} type='text' placeholder='Enter Your Username' name='username' required/>
          <input onChange={handleChange} type='password' placeholder='Enter the password' name='password' required/>
          <button className="btn btn-primary" type='submit'>Login</button>
        </form>
        <p>Don't have an Account? <a href='/register'>Create Account</a></p>
      </div>
    </div>
    )
}
export default Login;