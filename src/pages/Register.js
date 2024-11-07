import { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext'; 

export default function Register() {


    const { user } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password !== "" && confirmPassword !== "") 
           && (mobileNo.length === 11) && (password === confirmPassword)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    function registerUser(e) {
        e.preventDefault();

    }

    if (user.id !== null) {
        return <Navigate to="/blog" />;
    }

    return (
        <Form onSubmit={(e) => registerUser(e)}>
			<h1 className="my-5 text-center">Register</h1>

			<Form.Group>
				<Form.Label>First Name:</Form.Label>
				{/* 2 Way Data Binding - we are connected the two variables and states together */}
				<Form.Control type="text" placeholder="Enter First Name" required value={firstName} onChange={e => {setFirstName(e.target.value)}} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Last Name:</Form.Label>
				<Form.Control type="text" placeholder="Enter Last Name" required value={lastName} onChange={e => {setLastName(e.target.value)}}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control type="email" placeholder="Enter Email" required value={email} onChange={e => {setEmail(e.target.value)}}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Mobile No:</Form.Label>
				<Form.Control type="text" placeholder="Enter 11 Digit No." required value={mobileNo} onChange={e => {setMobileNo(e.target.value)}}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control type="password" placeholder="Enter Password" required value={password} onChange={e => {setPassword(e.target.value)}}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}}/>
			</Form.Group>
			{/* Conditional rendering where the submit button is only enabled when the isActive is set to true */}
			{	
				// if isActive state hook is set to true
				isActive ? 
					// display the enabled button
					<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
				// else, the isActive state hook is set to false
				:
					// display the disabled button
					<Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
			}
		</Form>
    );
}
