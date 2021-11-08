import React, { useEffect } from 'react';
import Item from './Item';
import '../css/Motherboard.css';
import { getProducts, getCartItems } from '../action';
import { useDispatch,useSelector,connect } from 'react-redux';
import { render } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { motherboardAction } from '../action';
const Motherboard = (props) => {
    
    useEffect(() => {
        props.getProducts('Motherboard');
    }, []);
    const dispatch=useDispatch();
    useEffect(()=>{dispatch(motherboardAction())},[]);
   // settab('Motherboard')
    const renderList = props.prodList.map(({ id, img, price, title }) => {
        return <Item key = {id} id={id} title={title} src={img} price={price} />;
    })


    return (
        
        <div className="ItemContainer">
        
            <div className="ItemGrid">
                {renderList}
                {/* {console.dir(renderList)} */}

            </div>
        </div>
    );
}
//useDispatch
const mapStateToProps = state => {
    return ({
        prodList: state.prodList,
        
    })
}


export default connect(mapStateToProps, { getProducts, getCartItems })(Motherboard);
