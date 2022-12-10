import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Prof = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        console.log(name);
        console.log(username);
        if(selectedFile)
        { 
            console.log(selectedFile.name);
            console.log(selectedFile.type);
            console.log(selectedFile.size);
            let formData = new FormData();
             formData.append("file", selectedFile);


            axios.post(`${process.env.REACT_APP_URL}/app/google-drive`, formData, { //push the file data
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status === "No file uploaded.") 
                {
                    alert(response.data);
                }
                else //file is succesfully uploaded
                {
                    console.log("File uploaded now we will create the user.");
                    const registered = {
                        fullName:name,
                        username: username,
                        email: email,
                        password: pass,
                        licence: response.data.id
                    }
                    axios.post(`${process.env.REACT_APP_URL}/app/prosignup`, registered) //push the user data
                    .then(response => {
                        if(response.data === "Username taken" || response.data === "Email already used." || response.data === "Can't leave fields empty") //form errors
                        {
                            alert(response.data);
                            axios.post(`${process.env.REACT_APP_URL}/app/drivedelete`, registered)
                        }   
                        else 
                        {
                            alert("Request is being progressed, check back when the admins confirm your licence !");
                            navigate('/');
                        }
                    })
                }
            })  
        }
    else
        alert("ADD A FILE");
    }

    return (
        <div className="auth-form-container">
            <h2>Prof Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} onChange = {(e) => setName(e.target.value)} name="name" id="name" placeholder="full Name" />
            <label htmlFor="name">Username</label>
            <input value={username} onChange = {(e) => setUsername(e.target.value)} name="username" id="username" placeholder="username" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="file">Add your license as a pdf</label>
            <input onChange={(e) => setSelectedFile(e.target.files[0])} type="file" id="file" name="file" accept="application/pdf" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
    </div>
    )
}
