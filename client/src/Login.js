import { Link } from 'react-router-dom'
import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import logo from './images/amazon-logo-transparent.png'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Logincontext} from './context/ContextProvider'

const Login = () => {

  const history=useNavigate('')

  const [logdata,setData]= useState({
    email:'',
    password:'',

  })
  console.log(logdata)

  const {account,setAccount}=useContext(Logincontext)

  const adddata=(e)=>{
    const {name, value}=e.target;

    setData(()=>{
      return{
        ...logdata,
        [name]:value
      }
    })
  }


  const senddata=async(e)=>{

    e.preventDefault();

    const {email,password}=logdata
    

    const res=await fetch("/login",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        email,password
      })
    });

    const data=await res.json()
    console.log(data)

    if( res.status===404||!data){
      //console.log("invalid details")
      toast.warn('Please enter all the details', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else if(res.status===400){
      toast.warn('Incorrect Password', {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }

    else{
      //console.log("data valid")
      setAccount(data)
      toast.success('Sign-In Successfull', {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setData({...logdata,email:"",password:""})
        history('/')
    }

  }



  return (
    <section>
      <Link to="/">
      <div className="sign_header">
        <img src={logo} alt=''/>
      </div>
      </Link>
      <div className="sign_form">
        <form method="POST">
          <h1>Sign-In</h1>
          <div className="form_data">
            <label htmlFor='email'>Email</label>
            <input type='text' 
            onChange={adddata}
            value={logdata.email}
            name='email' id='email'/>

          </div>
          <div className="form_data">
            <label htmlFor='password'>Password</label>
            <input type='password'
            onChange={adddata}
            value={logdata.password} placeholder='At least 6 characters' name='password' id='password'/>

          </div>
          <button className='signin_btn' onClick={senddata}>Continue</button>
        </form>
      </div>
      <Link to ='/register'>
        <div className="create_accountinfo">
          <p>New to Amazon?</p>
          <button>Create Your Amazon Account</button>
        </div>
      </Link>
      <ToastContainer/>
    </section>
  )
}

export default Login