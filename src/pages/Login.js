//                               s63
import { useState, useEffect, useContext } from 'react';

import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

//s64
import {Notyf} from 'notyf';

export default function Login() {

    // s63
    const { user, setUser } =  useContext(UserContext);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isActive, setIsActive] = useState(true);

    // s64
    const notyf = new Notyf();

    // s63
    function retrieveUserDetails(accessToken) {

        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: { Authorization: ` Bearer ${accessToken}` }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })

        })

    }

    useEffect(() => {
        if (loginEmail !== "" && loginPassword !== "") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [loginEmail, loginPassword]);



    function authenticate(e) {
        e.preventDefault();
    
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: loginEmail, 
                password: loginPassword 
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
            // s63
            //if (data.message === "User logged in successfully")
            if (data.access !== undefined ) {
                notyf.success('Thank you for logging in.');
                console.log(data.access);

                // s62
                localStorage.setItem('token', data.access);

                //s63
                retrieveUserDetails(data.access);
                
                setLoginEmail('');
                setLoginPassword('');

            } else if (data.message === "Incorrect email or password") {

                notyf.error("Incorrect email or password");

            } else if (data.message === "No email found") {

                 notyf.error("Email does not exist");

            } else {

                 notyf.error("Something went wrong");
            }
        })
    }

    return (


    	// localStorage.getItem("token") !== null ?
        user.id !==null ?
               <Navigate to="/courses" />
           :

        <Form onSubmit={authenticate}>
            <h1 className="my-5 text-center">Login</h1>

            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
            </Form.Group>
            {
                isActive ?
                    <Button variant="primary" type="submit" id="loginBtn">Login</Button>
                    :
                    <Button variant="danger" type="submit" id="loginBtn" disabled>Login</Button>
            }
        </Form>
    );
}

