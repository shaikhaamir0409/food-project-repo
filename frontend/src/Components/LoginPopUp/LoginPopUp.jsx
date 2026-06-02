import React,{useContext, useState} from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets/frontend_assets/assets';
import { StoreContext } from '../../Context/Context';
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext) 
  
    const [currentState,setCurretState] = useState("Sign Up");
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))  
    }

    const onLogin = async (event) =>{
      event.preventDefault()
      let newUrl = url;
      if (currentState === "Login") {
        newUrl += "/api/user/login"
      }else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }else{
        alert(response.data.message)
      }
    }

  

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currentState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Email'required /> 
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter Password' required />
        </div>
        <button type='submit'>{currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By cotinuing,i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState==="Login"
        ? <p>Create a new account? <span onClick={()=>setCurretState("Sign Up")}>Click here</span></p>
        :<p>Already have a account? <span onClick={()=>setCurretState("Login")}>Login here</span></p>
        } 
      </form>
    </div>
  )
}

export default LoginPopUp
