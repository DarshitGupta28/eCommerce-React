import React, { useEffect,useState } from 'react';
import { connect,useSelector,useDispatch } from 'react-redux';
import {Route,Switch, Link } from 'react-router-dom';
import { tokenAction } from '../action';
import '../css/Navbar.css';
import { getCartItems } from '../action';
import Motherboard from './Motherboard';


const Navbar = (props) => {
    useEffect(() => {
        props.getCartItems();
    }, [])
  //  const curtab=props.tab;
    //const [tab, settab] = useState('Home');
    const tab=useSelector(state=>state.tab);
    const token=useSelector(state=>state.token);
    const dispatch =useDispatch()
    function logout(){
        dispatch(tokenAction(''))
    }
    //console.log(tab);
    return (
        <div className="Navbar">
            <div className="ui secondary pointing menu">
                <Link to="/" className="item" 
                    style={{
                        backgroundColor: tab == "Home" ? "yellowgreen" : "unset",
                    }}
                >
                    Home
                </Link>
                <Link to={{pathname:"/motherboard"}} className="item" 
                    style={{
                        backgroundColor: tab == "Motherboard" ? "yellowgreen" : "unset",
                    }}
                >Motherboard
                </Link>
                
               
                <Link to="/memory" className="item"
                style={{
                    backgroundColor: tab == "Memory" ? "yellowgreen" : "unset",
                }}>
                    Memory
                </Link>
                <Link to="/processor" className="item"
                style={{
                    backgroundColor: tab == "Processor" ? "yellowgreen" : "unset",
                }}>
                    Processor
                </Link>
                <Link to="/graphics-card" className="item"
                style={{
                    backgroundColor: tab == "Graphic" ? "yellowgreen" : "unset",
                }}>
                    Graphics Card
                </Link>
                <Link to="/add" className="item">
                    Add Item
                </Link>
                <div className="right menu temp">
                    <Link to="/cart" className="item">
                        <i className="shopping cart large icon cartIcon" ></i>
                    </Link>
                    <div className="circle">{props.items.length}</div>
                    <Link to="/sign-in" className="ui item">
                        Sign Up
                    </Link>
                    {token==''?<Link to="/log-in" className="ui item">Log In</Link>:
                        <button onClick={logout}>Logout</button>
                    }
                    
                </div>
            </div>
        </div>
    );
    // const changeColor = ()=>{

    // }

}

const mapStateToProps = state => {
    // console.log(state.cartItems);
    return {
        items: state.cartItems,
    }
}

export default connect(mapStateToProps, { getCartItems })(Navbar);