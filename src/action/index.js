import axios from "axios";
// import { useSelector } from "react-redux";
// const token=useSelector(state=>state.token);
export const addItem = (id) => {
    return {
        type: 'ADD_ITEM',
        payload: id
    };
};

export const subItem = (id) => {
    return {
        type: 'SUB_ITEM',
        payload: id
    };
};

export const tokenAction=(token)=>{
    return{
        type:"token",
        payload:token
    }
};

export const getProducts = (TYPE) => {
    // console.log(TYPE);
    return async function (dispatch) {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:5000/api/products',
            headers: { type: TYPE }
        })

        dispatch({ type: 'FETCH_PRODUCTS', payload: response.data });
    };
}

export const makeZero = (id) => {
    return {
        type: 'MAKE_ZERO',
        payload: id
    };
}

export const addItemToCart = (id, quantity,token) => {
    //console.log(token)
    return async function (dispatch) {
        console.log(token)
        await axios.post(`http://localhost:5000/cart/${id}/${quantity}/${token}`);
        dispatch({ type: 'ADD_TO_CART', payload: 'Saved to DB' });
    }
}

export const getCartItems = (token) => {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:5000/cart/products/${token}`);

        dispatch({ type: 'FETCH_CART_ITEMS', payload: response.data });
    };
}

export const removeFromCart = (ID,token) => {
    // console.log(ID + ' ' + typeof (ID));
    console.log(token)
    return async function (dispatch) {
        const response = await axios.post(`http://localhost:5000/cart/products/remove`, {}, {
            headers: {
                id: ID,
                token:token,
            }
        });
         console.log(response.data);
        dispatch({ type: 'FETCH_CART_ITEMS', payload: response.data });
    }
}

export const motherboardAction=()=>{
    return {
        type:'Motherboard'
    };
};

export const graphicAction=()=>{
    return {
        type:'Graphic'
    };
};

export const memoryAction=()=>{
    return {
        type:'Memory'
    };
};

export const homeAction=()=>{
    return {
        type:'Home'
    };
};
export const processorAction=()=>{
    return {
        type:'Processor'
    };
};