import React,{useState} from 'react'
import logo from './images/amazon-logo-transparent.png'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {


    const [udata,setUdata]=useState({
        fname:'',
        email:'',
        mobile:'',
        password:'',
        cpassword:''
    })

    //console.log(udata)



    const adddata=(e)=>{
        const {name,value}=e.target
        setUdata(()=>{
            return{
                ...udata,
                [name]:value
            }
        })
    }

    const senddata=async(e)=>{
      e.preventDefault();
      const {fname,email,mobile,password,cpassword}=udata

      if(fname===""){
        toast.warn('Please Enter your Name', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else if(email===""){
        toast.warn('Invalid/not entered email', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else if(mobile===""){
        toast.warn('Invalid/not entered mobile no.', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else if(password===""){
        toast.warn('Please enter a valid password (6 characters)' , {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      else if(password!==cpassword){
        toast.warn('Password does not matches', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

      const res=await fetch("/register",{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          fname,email,mobile,password,cpassword
        })
      });


      const data=await res.json()
      //console.log(data)

      if(res.status===422 || !data){
        toast.warn('Invalid details entered!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      
      }
      else if(res.status===409||!data){
        toast.warn('email already exists!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
      
      else{
        toast.success('Data successfully saved', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""})
      }

    }



  return (
    <section>
      <div className="sign_header">
        <img src={logo} alt=''/>
      </div>
      <div className="sign_form">
        <form method='POST'>
          <h1>Sign-Up</h1>
          <div className="form_data">
            <label htmlFor='fname'>Your name</label>
            <input type='text'
            onChange={adddata}
            value={udata.fname} name='fname' id='fname'/>

          </div>
          <div className="form_data">
            <label htmlFor='email'>Email</label>
            <input type='text'
            onChange={adddata}
            value={udata.email} name='email' id='email'/>

          </div>
          <div className="form_data">
            <label htmlFor='number'>Mobile No.</label>
            <input type='text'
            onChange={adddata}
            value={udata.mobile} name='mobile' id='mobile'/>

          </div>
          <div className="form_data">
            <label htmlFor='password'>Password</label>
            <input type='password'
            onChange={adddata}
            value={udata.password} placeholder='At least 6 characters' name='password' id='password'/>

          </div>
          <div className="form_data">
            <label htmlFor='cpassword'>Password Again</label>
            <input type='password'
            onChange={adddata}
            value={udata.cpassword}  name='cpassword' id='cpassword'/>

          </div>
          <button className='signin_btn' onClick={senddata}>Continue</button>

          <div className="signin_info">
            <p>Already have an account?&emsp; 
            <Link to='/login'>Sign In</Link>
            </p>
          </div>
        </form>
        <ToastContainer/>
      </div>
      
    </section>
  )
}

export default Signup