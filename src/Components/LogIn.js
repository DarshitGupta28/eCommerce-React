import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../css/SignIn.css';
import { tokenAction } from '../action';
import { useDispatch ,useSelector} from 'react-redux';
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    //const [tok,setTok]=useState('');
    const dispatch=useDispatch();
    // const onFormSubmit = () => {

    // }
    const tok=useSelector(state=>state.token);
    // useEffect(() => {
    //     return <h1>Successfull</h1>
    // }, [token]);
    
    const onFormSubmit = async (event) => {
        event.preventDefault();
        console.log('login form submit')
        axios.post("http://localhost:5000/login", {}, {
            headers: {
               // dbType: 'User',
                //name: `${firstname} ${lastname}`,
                email: email,
                password: pass,
            }
        }).then(function(response){
            //setTok(response.data.token)
            dispatch(tokenAction(response.data.id))
            console.log(response)
            // console.log(email)
            // console.log(pass)
            // console.log(tok);
        })
        .catch(function(error){
            dispatch(tokenAction(' '))
        })
        
        // if(response.status==200)
        // {
        //     setTok(response.data.token);
        // }
    }
    return (
        <div className="mainContainer">
            <form className="ui form">
                <div className="field">
                    <label>Email ID</label>
                    <input type="text" value={email} placeholder="john@gmail.com" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" value={pass} placeholder="Enter Password" onChange={e => setPass(e.target.value)} />
                </div>
                <button className="ui button" type="submit" onClick={onFormSubmit}>Log In</button>
                
                
            </form>
            <p>{tok==''?tok:tok=='U'?"Failed":"Login Successful"}</p>
        </div>
    );
}

export default LogIn;