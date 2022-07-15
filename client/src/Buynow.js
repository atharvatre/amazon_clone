import React, { useState, useEffect } from 'react'
import { Divider } from '@mui/material'
import Prod_image from '../src/images/garminjpg.png'
import './Buynow.css'
import Option from './Option'
import Subsum from './Subsum'
import Right from './Right'





const Buynow = () => {

    const [cartdata, setCartData] = useState("")
    console.log(cartdata.carts)

    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log("error")
        } else {
            setCartData(data.carts)
        }
    }

    useEffect(() => {
        getdatabuy();

    }, []);



    return (
        <>{
            cartdata.length ? <div className='buynow_section'>
                <div className="buynow_container">
                    <div className="left_buy">
                        <h1>Shopping Cart</h1>
                        <p>Select all items</p>
                        <span className='buy_price'>Price</span>
                        <Divider />
                        {
                            cartdata.map((e, k) => {
                                return (
                                    <>
                                        <div className="item_containert">

                                            <img src={e.detailUrl} alt="product image" />
                                            <div className="item_details">
                                                <h3>{e.title.longTitle}</h3>
                                                <small>in, {e.title.shortTitle}</small>
                                                <h3 className='diffrentprice'>₹14499</h3>
                                                <p className='unusuall'>Usually dispatched in 2 days.</p>
                                                <p>Eligible for FREE Shipping</p>
                                                <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                <Option deletedata={e.id} get={getdatabuy}/>
                                            </div>
                                            <h3 className='item_price'>₹{e.price.cost}</h3>
                                        </div>
                                        <Divider />
                                    </>
                                )
                            })
                        }

                        
                        <Subsum iteam={cartdata} />
                    </div>
                    <Right iteam={cartdata}/>
                </div>
            </div> :
                ""
        }

        </>

    )
}

export default Buynow