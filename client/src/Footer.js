import React from 'react'
import './Footer.css'
import logo from './images/amazon.png'

const Footer=()=> {

    const year=new Date().getFullYear();
    return (
        <footer>
            <div className="footer_container">
                <div className="footr_deatils_one">
                    <h3>Get To Know Us</h3>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Press Release</p>
                    <p>Amazon Cares</p>
                    <p>Gift a Smile</p>
                    <p>Amazon Science</p>
                </div>
                <div className="footr_deatils_one">
                    <h3>Connect With Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>

                </div>
                <div className="footr_deatils_one forres">
                    <h3>Make Money With Us</h3>
                    <p>Sell on Amazon</p>
                    <p>Sell under Amazon Accelerator</p>
                    <p>Amazon Global Selling</p>
                    <p>Become an Affiliate</p>
                    <p>Fulfilment by Amazon</p>
                    <p>Advertise Your Products</p>
                    <p>Amazon Pay on Merchants</p>
                    
                </div>
                <div className="footr_deatils_one forres">
                    <h3>Let Us Help You</h3>
                    <p>COVID-19 and Amazon</p>
                    <p>Your Account</p>
                    <p>Returns Centre</p>
                    <p>100% Purchase Protection</p>
                    <p>Amazon App Download</p>
                    <p>Amazon Assistant Download</p>
                    <p>Help</p>
                </div>
            </div>
            <div className="lastdetails">
                <img src={logo} alt="" />
                <p>Conditions of Use and Sale&emsp;&emsp;Privacy Notice&emsp;&emsp;Interest-Based Ads&emsp;&emsp;©1996-{year},Amazon.com or its affiliates</p>
            </div>
        </footer>
    )
}

export default Footer