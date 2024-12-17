import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ mobileNo, setMobileNo ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmedPassword, setConfirmedPassword ] = useState("");
    const [ isActive, setIsActive ] = useState (false);

    useEffect(() => {

        if ((firstName !== "" && lastName !== "" && mobileNo !== "" && email !== "" && password !== '' && confirmedPassword !== "") && (password === confirmedPassword)) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

        if (user.id) {
            navigate('/workout')
        }

    }, [email, password, confirmedPassword, navigate, user.id])

    function registerUser(e) {

        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                mobileNo: mobileNo,
                email: email,
                password: password

            })
        })
            .then(res => res.json())
            .then(data => {

                //determine the returned data. Especially useful when the given API is online.
                console.log(data);

                //data will only contain an email property if we can properly save our user.
                if (data.message === "Registered Successfully") {

                    setFirstName('');
                    setLastName('');
                    setMobileNo('');
                    setEmail('');
                    setPassword('');
                    setConfirmedPassword('');

                    Swal.fire({
                        title: "Registration Successful",
                        icon: "success",
                        text: "Thank you for registering!",
                        confirmButtonText: "Go to Login"
                    })
                    .then(() => {
                        // Navigate to the login page after successful registration
                        navigate("/login");
                    });

                }

            })
    }


    return (

        <div className='container'>
            <div className="row d-flex justify-content-center mt-5 pt-5">
                <div className="col-lg-6 col-10 border p-4 rounded-2">
                    <Form onSubmit={(e) => registerUser(e)}>
                    <h1 className='mb-3'>Register</h1>
                        <Form.Group className='mb-3'>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control type='text' placeholder='First Name' className='mb-2' required
                            value={firstName}
                            onChange={e => {setFirstName(e.target.value)}}/>

                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type='text' placeholder='Last Name' className='mb-2' required
                            value={lastName}
                            onChange={e => {setLastName(e.target.value)}}/>

                            <Form.Label>Email:</Form.Label>
                            <Form.Control type='email' placeholder='Email' className='mb-2' required
                            value={email}
                            onChange={e => {setEmail(e.target.value)}}/>

                            <Form.Label>Mobile No:</Form.Label>
                            <Form.Control type='number' placeholder='Mobile No' className='mb-2' required
                            value={mobileNo}
                            onChange={e => {setMobileNo(e.target.value)}}/>
                            
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type='password' placeholder='Password' className='mb-2' required
                            value={password}
                            onChange={e => {setPassword(e.target.value)}}/>
                            
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control type='password' placeholder='Confirm Password' className='mb-2' required
                            value={confirmedPassword}
                            onChange={e => {setConfirmedPassword(e.target.value)}}/>

                            {password !== confirmedPassword && confirmedPassword.length > 0 && (
                                    <small className="text-danger">Passwords do not match</small>
                                )}

                        </Form.Group>
                        {isActive
                                ? <Button variant="dark" type='submit'>Register</Button>
                                : <Button variant="dark" type='submit' disabled>Register</Button>
                            }
                    </Form>

                </div>
            </div>
        </div>
    )
}