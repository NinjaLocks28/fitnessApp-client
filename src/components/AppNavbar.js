import { useState, useContext } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

import Logo from '../assets/ninjas-fitness.png'

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    return(
        <Navbar expand="lg" className='bg-body-tertiary'>
            <Container>
            <Navbar.Brand as={Link} to="/"><img src={Logo} alt="" height={'40px'} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-md-auto">
                        <Nav.Link as={NavLink} to="/" exact="true" className="px-3 fw-semibold">Home</Nav.Link>
                        {
                            user.id
                            ?
                            <>
                                <Nav.Link as={Link} to="/workout" className="px-3 fw-semibold">My Workout</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className="px-3 fw-semibold">Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="/login" className="px-3 fw-semibold">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="px-3 fw-semibold">Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
}
