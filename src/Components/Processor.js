import React, { useEffect } from 'react';
import Item from './Item';
import '../css/Motherboard.css';
import { getProducts } from '../action';
import { connect ,useDispatch,useSelector} from 'react-redux';
import { processorAction } from '../action';
const Motherboard = (props) => {

    useEffect(() => {
        props.getProducts('Processor');
    }, []);
    const tab=useSelector(state=>state.tab);
    console.log(tab);
    const dispatch=useDispatch();
    useEffect(()=>{dispatch(processorAction())},[]);
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
