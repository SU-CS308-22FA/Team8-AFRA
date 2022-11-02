import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        console.log(name);
        console.log(username);

        const registered = {
            fullName:name,
            username: username,
            email: email,
            password: pass
        }

        axios.post('/app/signup', registered)
        .then(response => {
            if (response.data === "Username taken" || response.data === "Email already used." || response.data === "Can't leave fields empty")
                alert(response.data);
            else 
                navigate("/settings/user",  {state: response.data});
        }
        )
        
        
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} onChange = {(e) => setName(e.target.value)} name="name" id="name" placeholder="full Name" />
            <label htmlFor="name">Username</label>
            <input value={username} onChange = {(e) => setUsername(e.target.value)} name="username" id="username" placeholder="username" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
    </div>
    )
}
