import React from 'react';
import { useEffect } from 'react';
import MyCarousel from './Carousel.js';
import { useSelector,useDispatch } from 'react-redux';
import { homeAction } from '../action/index.js';

const Home = () => {
    const dispatch=useDispatch();
    useEffect(()=>{dispatch(homeAction())},[]);
    return (
        <div>
            <MyCarousel />
        </div>
    );
}

export default Home;