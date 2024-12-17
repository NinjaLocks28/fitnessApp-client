import { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {



    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);


    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        if (email !== '' && password !== '') {
            setIsActive(true)
        } else {
            setIsActive(false)
        }

        if (user.id) {
            navigate('/workout');
        }

    }, [email, password, navigate, user.id]);

    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password

            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data.message === "Email and password do not match") {
                    setErrorMessage("Email and password do not match");
                } else {
                    localStorage.setItem('token', data.access);
                    retrieveUserDetails(data.access);

                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to Ninja Fitness Tracker!"
                    });

                    navigate('/workout');

                }






            })

        setEmail('');
        setPassword('');

    }

    const retrieveUserDetails = (token) => {

        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("Login Retrieved User:", data)
                setUser({
                    id: data.user._id,
                    isAdmin: data.user.isAdmin
                });

            })

    };

    return (
        <div className='container'>
            <div className="row d-flex justify-content-center mt-5 pt-5 ">
                <div className="col-lg-6 col-10 border rounded-2 p-4">
                    <Form onSubmit={(e) => authenticate(e)}>
                        <h1 className='mb-3'>Login</h1>

                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}

                        <Form.Group className='mb-3'>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Email'
                                className='mb-2'
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                className='mb-2'
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {isActive
                            ? <Button variant='dark' type='submit'>Login</Button>
                            : <Button variant="dark" type='submit' disabled>Login</Button>
                        }
                    </Form>
                </div>
            </div>
        </div>
    )
}