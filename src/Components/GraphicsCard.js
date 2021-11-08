import React, { useEffect } from 'react';
import Item from './Item';
import '../css/Motherboard.css';
import { getProducts } from '../action';
import { connect ,useDispatch,useSelector} from 'react-redux';
import { graphicAction } from '../action';
const Motherboard = (props) => {

    useEffect(() => {
        props.getProducts('Graphics');
    }, []);
    const dispatch=useDispatch();
    useEffect(()=>{dispatch(graphicAction())},[]);
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
