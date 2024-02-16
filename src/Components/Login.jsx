import React from 'react'
import { useState } from 'react';
import axiosInstance from '../Help/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import{toast} from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Components/Login.css"
//import See from "../Assests/See.mp4";
import See from "../Assests/See.jpg";

const Login = () => {
  let navigate=useNavigate()
  let [state,setState]=useState({
    userEmail:"",
    password:""
  });

let {userEmail,password}=state

let handledata=(e)=>{
  let name=e.target.name
  let value=e.target.value
  setState({...state,[name]:value})
 }

 let handleSubmit= async (e)=>{
  e.preventDefault()
  try{
    let payload={
      userEmail,
      password
    }
    let {data}=await axiosInstance.post("/authenticate",payload)
    console.log(data);


    let token=data.token
    let role=data.role
    // let uid=data.userId

    if(token){
      localStorage.setItem("token", token)
      localStorage.setItem("role",role)
      // localStrorage.setItem("uid",userId)
     
      toast.success("logged in successfully")
      navigate("/")
    }


  }catch{
    console.log("not working");
  }
 }



  return (
    <>
    <div className="loginBg">
        <img className="See_video" src={See} alt="See Image" />
    </div>
    <div className="Main_login" >
    <div className="Sub_login"  >
      <form action=""  onSubmit={handleSubmit}>
      <h2>LOGIN FORM</h2>  <br />  <br />
                 <label htmlFor="proname">UserEmail  </label>
                  <input type="text"  id="proname" name="userEmail" value={userEmail} onChange={handledata}/> <i id="mail_icon"  class="fa-solid fa-envelope"></i> <br /> <br />   

                 <label htmlFor="pass"> Password   </label>
                  <input type="password" id="pass" name="password" value={password} onChange={handledata}/>  <i  id="pass_icon" class="fa-solid fa-lock"></i> <br /> <br /> <br />  
                   <button id= "btn_for_login" >Login</button>

                  </form>
    </div>
    </div>
    </>
  )
}

export default Login
