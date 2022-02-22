import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

const CustomNavbar = () => {
    return (
        <Container fluid>
            <Navbar bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand href='/'>Todo-App</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link href='/create'>Create Todo</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Container>
    )
}

export default CustomNavbar