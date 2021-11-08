import React from 'react';
import { connect } from 'react-redux';

import '../css/Item.css';
import AddSubItem from './AddSubItem.js';
import { makeZero, addItemToCart, getCartItems } from '../action';
import { useSelector } from 'react-redux';

const Item = (props) => {
    const token=useSelector(state=>state.token);
    const addToCart = async (id) => {
        console.log(token);
        await props.makeZero(id);
        await props.addItemToCart(id, props.items[id],token);
        await props.getCartItems(token);
    }
    
    // console.log(props.cartItems);

    return (
        <div className="fullItem">
            <img src={props.src} alt="Not Available" />

            <div className="titleItem">
                {props.title}
            </div>

            <div className="priceAndButton">
                <div className="priceItem">
                    &#8377;{props.price}
                </div>
                <AddSubItem id={props.id} />
            </div>
            <div className="CartAndBuy">
                <div className="ui buttons">

                {token==''?"":<button className="ui button" onClick={() => addToCart(props.id)}>Add to Cart</button>}
                    <div className="or"></div>
                    <button className="ui positive button">Buy Now</button>
                </div>
            </div>
        </div>


    );
}

const mapStateToProps = state => {
    return {
        items: state.items,
        cartItems: state.cartItems
    }
}

export default connect(mapStateToProps, { makeZero, addItemToCart, getCartItems })(Item);