import React,{useState,useEffect} from 'react'

const Right = ({iteam}) => {

  const [price,setPrice]=useState(0)

  useEffect(() => {
    totalAmount()
  }, [iteam]);
  const totalAmount=()=>{
    let price=0;
    iteam.map((item)=>{
      price=item.price.cost+price
    })
    setPrice(price)
  }
  return (
    <div className='right_buy'>
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
        <div className="cost_right">
            <p>Your Order is Eligible for FREE Delivery.</p><br/>
            <span style={{color:"#565959"}}>Select this option at checkout. Details</span>
            <h3>Subtotal ({iteam.length}items): <strong style={{fontWeight:700,color:"#111"}}>₹{price}.00</strong></h3>
            <button className='rightbuy_btn'>Proceed to Buy</button>
            <div className="emi">Emi Available </div>
        </div>
    </div>
  )
}

export default Right