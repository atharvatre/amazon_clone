import React from 'react'
import './Productdetail.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
//import Prod_image from '../src/images/garminjpg.png'
import { Divider } from '@mui/material'
import {Logincontext} from './context/ContextProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Productdetail = () => {


  const { id } = useParams("");
  //console.log(id)
  const {account,setAccount}=useContext(Logincontext)



  const [inddata, setInddata] = useState("");
  console.log(inddata)
  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    if (res.status !== 201) {
      console.log("no data available")
    }
    else {
      console.log("getdata")
      setInddata(data)
    }


    // console.log(data);
  }


  useEffect(() => {
    getinddata()

  }, [id]);


  //add to cart function

  const addtocart=async(id)=>{
    const checkres= await fetch(`/addcart/${id}`,{
      method:"POST",
      headers:{
        Accept:'application/json',
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
         inddata
      }),
      credentials:"include"
    });


    const data1=await checkres.json()
    console.log(data1)

    if(checkres.status===401 ||!data1){
      console.log("user Invalid")
      alert("user invalid")
    }else{
      //alert("data added in your cart")
      toast.info('Item added in your Cart', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      setAccount(data1)
    }
  }




  return (
    <div className='cart_section'>

      {inddata && Object.keys(inddata).length &&  
      <div className="cart_container">
        <div className="left_cart">
          <img src={inddata.detailUrl} alt=''></img>
          <div className="cart_btn">
            <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>
              Add to Cart
            </button>
            <button className='cart_btn2'>Buy Now</button>
          </div>
        </div>
        <div className="right_cart">
          <h3>{inddata.title.shortTitle}</h3>
          <h4>{inddata.title.longTitle}</h4>
          <Divider className='divider' />
          <p className="mrp">M.R.P. : ₹{inddata.price.mrp}</p>
          <p>Deal of the Day:<span style={{ color: '#B12704' }}> ₹{inddata.price.cost}</span></p>
          <p>You Save : <span style={{ color: '#B12704' }}>₹{inddata.price.mrp-inddata.price.cost} ({inddata.price.discount})</span></p>

          <div className="discount_box">
            <h5>Discount: <span style={{ color: '#111' }}>{inddata.discount}</span></h5>
            <h4>Free Delivery: <span style={{ color: '#111', fontWeight: '600' }}>June 25-June 30 </span> Details</h4>
            <p>Fastest Delivery: <span style={{ color: '#111', fontWeight: '600' }}>Tomorrow 11AM</span></p>
          </div>
          <p className='description'>About the Item: <span style={{ color: "#565959", fontSize: 18, fontWeight: 500, letterSpacinf: "0.4px" }}>{inddata.description}</span></p>
        </div>
      </div>
      }
      <ToastContainer/>
    </div>
  
  )
}

export default Productdetail