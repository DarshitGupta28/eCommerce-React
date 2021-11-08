import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import '../css/Cart.css';
import { getCartItems } from '../action';
import CartItem from '../Components/CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
    const token=useSelector(state=>state.token);
    useEffect(() => {
        props.getCartItems(token);
    }, [token]);

    const renderList = props.cartItems.map(obj => {
        return <CartItem obj={obj} key={Math.random()*1000}/>
    })
    return (
        <div className="CartItems">
            {renderList}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems,
        itemById: state.itemById
    };
}

export default connect(mapStateToProps, { getCartItems })(Cart);