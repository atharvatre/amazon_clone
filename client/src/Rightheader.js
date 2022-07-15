import React,{useContext} from 'react'
import { Avatar, Divider } from '@mui/material';
import { Logincontext } from './context/ContextProvider'
import { Link } from 'react-router-dom';
import './Rightheader.css'
import flag from './images/Flag-India.png'
import LogoutIcon from '@mui/icons-material/Logout';
const Rightheader = ({userlog,logclose}) => {

    const { account, setAccount } = useContext(Logincontext)

  return (  
    
        <div className="rightheader">
            <div className="right_nav">
                {
                    account? <Avatar className='avtar2'>{account.fname[0]}</Avatar>:
                    <Avatar className='avtar'></Avatar>
                }
                {account? <h3>Hello,{account.fname}</h3>:<h3>Hello, User</h3>}
            </div>
            <div className="nav_btn">
                <Link to='/'>Home</Link>
                <Link to='/'>Shop by Category</Link>

                <Divider style={{width:"100%",marginLeft:"-20px"}}/>
                <Link to='/'>Today's deal</Link>
                {
               
                account?   <Link to='/'>Your Orders</Link>: <Link to='/login'>Your Orders</Link>
                }
                <Divider style={{width:"100%",marginLeft:"-20px"}}/>
                <div className="flag">
                    <link to='/'>Settings</link>
                    <img src={flag} alt=''/>
                </div>
                {
                    account ?
                        <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => userlog()} style={{ cursor: "pointer", fontWeight: 500 }}>Log Out</h3>
                        </div>
                        : <Link to="/login">Sign in</Link>
                }
            </div>
        </div>
    
  )
}

export default Rightheader