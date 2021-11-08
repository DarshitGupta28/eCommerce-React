import React, { useEffect } from 'react';
import Item from './Item';
import '../css/Motherboard.css';
import { getProducts } from '../action';
import { connect,useDispatch,useSelector } from 'react-redux';
import { memoryAction } from '../action';
const Motherboard = (props) => {
    const dispatch=useDispatch();
    useEffect(() => {
        props.getProducts('Memory');
        
        dispatch(memoryAction())
    }, []);
    
  //  useEffect(()=>{},[]);
    const renderList = props.prodList.map(({ id, img, price, title }) => {
        return <Item id={id} title={title} src={img} price={price} />;
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

const mapStateToProps = state => {
    return ({
        prodList: state.prodList,
    })
}


export default connect(mapStateToProps, { getProducts })(Motherboard);
