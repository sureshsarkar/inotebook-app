import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const host = "http://localhost:5000";

const Login = (props) => {

    const [crediantion, setCrediantion] = useState({ email: "", password: "" });
    const history = useNavigate();

    const handelLogin = async (e) => {
        e.preventDefault();

        var url = `${host}/api/auth/login`;
        const email = crediantion.email; const password = crediantion.password;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyNTZkODk0NGVjYmI2MzQyMTNiNTM4In0sImlhdCI6MTY4MDQ2MjU4MX0.uTs-x0VPsGH1czZkp7kSbwU_cDSW7dq8qu08RoiWAN4"
            },
            body: JSON.stringify({ email, password })
        });
        const rData = await response.json();
        if (rData.success === true) {
            //save to auth and redirect to other page
            localStorage.setItem('token', rData.authtoken);
            props.showAlert("Login successfully", "success")
            history("/")

        } else {
            props.showAlert("Failed to login", "danger")
        }

    }

    // On typing note 
    const onChange = (e) => {
        setCrediantion({ ...crediantion, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-3">
            <h1>Login now </h1>

            <form>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" className="form-control my-2" placeholder="Enter email" minLength={10} maxLength={10} onChange={onChange} value={crediantion.email} required id="email" name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password*</label>
                    <input type="password" className="form-control my-2" placeholder="Enter password" minLength={5} onChange={onChange} value={crediantion.password} required id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handelLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login
