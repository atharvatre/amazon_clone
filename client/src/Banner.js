import React from 'react'
import Carousel from 'react-material-ui-carousel'
import home1 from './images/amazon home1.png'
import home2 from './images/amazon home2.png'
import home3 from './images/amazone home3.png'
import './Banner.css'


    const data = [
        home1,
        home2,
        home3
        

]
function Banner() {
  return (
    <Carousel className='carasousel'
    autoPlay={true}
    animation='slide'
    indicators={false}
    navButtonsAlwaysVisible={true}
    cycleNavigation={true}
    
    navButtonsProps={{
        style:{
            backgroundColor: "transparent",
            color:"white",
            borderRadius:0,
            marginTop:-22,
            height:"80px",

        }
    }}>
        {
            data.map((imag,i)=>{
                return(
                    <img className='banner_img'src={imag} alt=""/>
                )
            })
        }
    </Carousel>
  )
}

export default Banner