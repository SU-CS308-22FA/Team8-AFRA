import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const registered = {
            email: email,
            password: pass
        }

        axios.post('http://localhost:4000/app/signin', registered)
            .then(response => {
                if(response.data === "User not found" || response.data === "wrong password")
                {
                    alert(response.data);
                }   
                else 
                    navigate("/settings/user",  {state: response.data});
            })
    }


    
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
        </div>
    )
}
