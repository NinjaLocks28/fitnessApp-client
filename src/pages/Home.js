import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';

import '../index.css'

import Logo from '../assets/ninjas-fitness.png'


export default function Home() {

    const { user } = useContext(UserContext);

    return (
        <>
        <div className='container d-flex justify-content-center' id='home'>
            <div className='text-center'>
                <h1>Welcome to</h1>
                <img className="img-fluid" src={Logo} alt='home-vector'></img>
                <div className='d-flex justify-content-center my-2'>
                <p className='col-8'>Ninja Fitness Tracker helps you track workouts, monitor progress, and stay motivated to achieve your fitness goals.</p>
                </div>
                <Link className=" py-3 px-5 btn fw-semibold bg-dark text-white" to={user.id ? '/workout' : 'login'}>GET STARTED</Link>
            </div>

        </div>
        </>
    )
}

