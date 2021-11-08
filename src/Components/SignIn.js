import React, { useState } from 'react';
import axios from 'axios';

import '../css/SignIn.css';

const SignIn = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const formSubmit = async (event) => {
        event.preventDefault();
        console.log('form submit')
        const response = await axios.post("http://localhost:5000/add-user", {}, {
            headers: {
                dbType: 'User',
                name: `${firstname} ${lastname}`,
                email: email,
                password: pass,
            }
        });
    }

    return (
        <div className="mainContainer">
            <form className="ui form">
                <div className="field">
                    <label>Name</label>
                    <div className="two fields">
                        <div className="field">
                            <input type="text" value={firstname} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
                        </div>
                        <div className="field">
                            <input type="text" value={lastname} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Email ID</label>
                    <input type="text" value={email} placeholder="john@gmail.com" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" value={pass} placeholder="Enter Password" onChange={e => setPass(e.target.value)} />
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input type="checkbox" tabindex="0" className="hidden" />
                        <label>I agree to the Terms and Conditions</label>
                    </div>
                </div>
                <button className="ui button" type="submit" onClick={formSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default SignIn;