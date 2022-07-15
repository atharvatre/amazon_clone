import React,{useEffect} from "react";
import "./App.css";
import Header from "./Header";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";

//import { type } from "@testing-library/user-event/dist/type";
import Banner from "./Banner";
import Footer from "./Footer";
import Signup from "./Signup";
import Productdetail from './Productdetail'
import NewNav from "./Newnav";
import Buynow from "./Buynow";
import Maincomp from "./Maincomp";
function App() {
  
  
      
    
    
  return (
    // BEM
    <Router>
      <div className="app">
      
        <Routes>
          <Route path='/login' element={[<Login/>]}/>
          <Route path='/register' element={[<Signup/>]}/>
          <Route path='/getproductsone/:id' element={[<Header/>,<NewNav/>,<Productdetail/>,<Footer/>]}/>
          <Route path="/buynow" element={[<Header/>,<NewNav/>,<Buynow/>,<Footer/>]}/>
        

          
          <Route path="/" element={[<Header />,<NewNav/>,<Maincomp/>,<Footer/>]}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
