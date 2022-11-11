import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';

export const UserSettings = (props) => {
    var [pass, setPass] = useState('');
    var [name, setName] = useState('');
    var [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state.email;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '')
            name = location.state.fullName;
        if (username === '')
            username = location.state.username;
        if (pass === '')
            pass = location.state.password;
        console.log(pass);
        console.log(name);
        console.log(username);
        const registered = {
            fullName: name,
            username: username,
            email: email,
            password: pass
        }

        axios.post('http://localhost:4000/app/userSettings', registered)
        .then(response =>
            {
                if( response.data !== "done")
                {
                    alert("Username is taken!");
                }
                else 
                {
                    alert("Changes applied, login again!");
                    navigate('/');
                }
            }
            )
        
    }

    return (
        <div className="auth-form-container">
            <h2>Settings</h2>
            <h2>email: {location.state.email}</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} onChange = {(e) => setName(e.target.value)} name="name" id="name" placeholder={location.state.fullName} />
            <label htmlFor="name">Username</label>
            <input value={username} onChange = {(e) => setUsername(e.target.value)} name="username" id="username" placeholder={location.state.username} />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Change</button>
        </form>
        <button className="link-btn" onClick={() => axios.post('http://localhost:4000/app/delete', {email: email})
        .then(response =>
            {
                if( response.data === "done")
                {
                    alert("Your account is deleted!");
                    navigate('/login');
                }
                else 
                {
                    alert("something funny happened ERROR");
                    navigate('/');
                }
            }
            )}>Want to delete your account? Click here.</button>
    </div>
    )
}