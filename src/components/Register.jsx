import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register(){
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    username: "",
    password: ""
  })

    function handleChange(event){
      const {name, value} = event.target;
      setDetails((previousVal)=>{
        return {...previousVal, [name]: value}
      })
    }

  async function createUser(){
    try{
      const response = await axios.post("http://localhost:4000/createUser", {
        username:  details.username,
        password: details.password,
        name: details.name 
      })
      if(response.data.userId){
        navigate(`/keeper/${response.data.userId}`);
      }
    } catch(err){
      console.log(err);
      alert(err.response.data.err);
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    createUser();
  }

  return (
    <div>
      <Header/>
      <div>
        <div className="card_body">
          <h2 className='mt-5'>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input onChange={handleChange} type="string" className="form-control" name="name" required/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input onChange={handleChange} type="email" className="form-control" name="username" required/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input onChange={handleChange} type="password" className="form-control" name="password" required/>
            </div>

            <button className="btn btn-primary" type="submit">Register</button>
          </form>
          <div className="login-opt">
            <p>Already have an Account?  <a href="/"> Login Here</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;