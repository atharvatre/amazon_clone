import { React, useContext, useEffect, useState } from 'react'
import './Header.css'
import logo from './images/Amazon logo (2).png'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from '@mui/material';
import { Avatar } from '@mui/material';
import { Logincontext } from './context/ContextProvider'
import Drawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Header() {

    const { account, setAccount } = useContext(Logincontext)
    //console.log(account)
    
    const history=useNavigate()

    const [anchorEl, setAnchorEl] =useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const[text,setText]=useState("")
    console.log(text);
    const[liopen,setLiopen]=useState(true)

    const { products } = useSelector(state => state.getproductsdata);


    const [dropen, setDropen] = useState(false)


    const getdetailvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await res.json()
        //console.log(data)
        if (res.status !== 201) {
            console.log('error')
        } else {
            console.log('data valid')
            setAccount(data)
        }
    }

    const handleopen = () => {
        setDropen(true)
    }
    const handledrclose = () => {
        setDropen(false)
    }

    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data2 = await res2.json()
        //console.log(data)
        if (res2.status !== 201) {
            console.log('error')
        } else {
            setAccount(false)
            console.log('data valid')
            toast.success("Logout successful!",{
                position:"top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
        history("/")
    }

    const getText=(iteams)=>{
        setText(iteams)
        setLiopen(false)
    }

    useEffect(() => {
        getdetailvaliduser()
    }, [])

    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className='hamburgur' onClick={handleopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>
                    <Drawer 
                        open={(dropen)}
                        onClose={handledrclose} >

                        <Rightheader userlog={logoutuser} logclose={handledrclose}/>
                    </Drawer>
                    <div className="navlogo">
                        <Link to='/'>
                            <img className='header__logo' src={logo} alt='amazon logo' />
                        </Link>
                    </div>
                    <div className="nav_searchbaar">
                        <input  type="text" name=""
                        onChange={(e)=>getText(e.target.value)}
                        placeholder='Search Your Products'
                        id=""/>
                        <div className='search_icon'>
                            <SearchIcon className='header__searchIcon' />

                        </div>

                        {/*search filter*/}

                        {
                            text &&
                            <List className='extrasearch' hidden={liopen}>
                               { products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                                <ListItem>
                                    <Link to={`/getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
                                    {product.title.longTitle}
                                    </Link>
                                </ListItem>
                               ))}
                            </List>
                        }
                    </div>
                </div>
                <div className="right">
                    <div className="nav_btn">

                        {
                            account ? <span className='header__optionLineOne'>
                                Hello, {account.fname}
                            </span> : <Link to='/login'> <span className='header__optionLineOne'>
                                Sign In
                            </span>
                            </Link>
                        }

                    </div>
                    {
                        account ? <Link to='/buynow'>
                            <div className="cart_btn">
                                <Badge badgeContent={account.carts.length} color="primary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                                <p>Cart</p>
                            </div>
                        </Link> : <Link to='/login'>
                            <div className="cart_btn">
                                <Badge badgeContent={0} color="primary">
                                    <ShoppingCartIcon id='icon' />
                                </Badge>
                                <p>Cart</p>
                            </div>
                        </Link>
                    }
                    {
                        account ? <Avatar className='avtar2'
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>{account.fname[0]}</Avatar> :
                            <Avatar className='avtar'
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}></Avatar>
                    }

                 
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        {
                            account? <MenuItem  onClick={logoutuser}><LogoutIcon style={{fontSize:16,marginRight:3}}/>Logout</MenuItem>:""

                        }
                    </Menu>
                </div>
            </nav>
            <ToastContainer/>
        </header>

    )
}

export default Header