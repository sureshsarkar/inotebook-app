import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const host = "http://localhost:5000";


const Signup = () => {
    // set state function initialized
    const history = useNavigate();
    const [crediantion, setCrediantion] = useState({ name: "", email: "", password: "", cpassword: "" });

    // submit data function 
    const handelSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = crediantion;

        // check password
        if (password !== cpassword) {
            alert("Please enter Same password");
            setCrediantion({ cpassword: "" })
            return false;
        }
        // console.log(name, email, password)

        var url = `${host}/api/auth/createuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });
        const rData = await response.json();

        if (rData.success === true) {
            //save to auth and redirect to other page
            localStorage.setItem('token', rData.authtoken);
            history("/")
        } else {
            alert("Failed to Signup: " + rData.error);
        }

    }

    // On typing note 
    const onChange = (e) => {
        setCrediantion({ ...crediantion, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h1>Signup now </h1>

            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control my-2" placeholder="Enter name" minLength={5} required id="name" value={crediantion.name} name="name" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" className="form-control my-2" placeholder="Enter email" minLength={5} required id="email" value={crediantion.email} name="email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password*</label>
                    <input type="password" className="form-control my-2" placeholder="Enter password" minLength={5} required id="password" value={crediantion.password} name="password" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirm Password*</label>
                    <input type="password" className="form-control my-2" placeholder="Enter Confirm password" minLength={5} required id="cpassword" value={crediantion.cpassword} name="cpassword" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handelSignup}>Login</button>
            </form>
        </div>
    )
}

export default Signup
