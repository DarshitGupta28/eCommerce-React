import React from 'react';
import { useSelector } from 'react-redux';
import '../css/Footer.css';
const Footer = () => {
    const tab=useSelector(state=>state.tab);
    
    return (
       
        
        <div className="Footer">
            <img src="/images/shoplogo.jfif" />
            <div className="mainInfo">
                <div className="copyrightAndName">
                    <i className="copyright outline icon big"></i>
                    <span className="year">2021 - </span>
                    {tab==='Graphic'?<img src="/images/myname.png" />:<img src="/images/myname2.jpg"/>}
                </div>
                <div className="icons">
                    {/* <i class="envelope icon huge"></i> */}
                    {/* <i class="facebook icon"></i> */}
                    <a href="https://www.facebook.com/ThePiyushSharan" target="_blank">
                        <i className="facebook f icon huge"></i>
                    </a>
                    <a href="https://github.com/pi-sharan" target="_blank">
                        <i className="github icon huge"></i>
                    </a>
                    {/* <i class="instagram icon huge"></i> */}
                    <a href="https://www.linkedin.com/in/piyush-sharan-16456645/" target="_blank">
                        <i className="linkedin icon huge"></i>
                    </a>
                </div>
            </div>

        </div>
    );
}

export default Footer;