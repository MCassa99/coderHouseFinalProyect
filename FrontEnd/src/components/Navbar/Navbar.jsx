import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../UI/Logo/Logo.jsx';
import CartWidget from '../CartWidget/CartWidget.jsx';
import { Link } from 'react-router-dom';
import UserProfile from '../../assets/default_profile.png';

const NavbarComponent = () => {

    return (
        <>
            <Navbar expand="md" className="navprop">
                <Container>
                    <Link id='logo-func' to="/">
                        <Navbar.Brand>
                            <Logo />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav variant='underline' className="me-auto">
                            <LinkContainer to="/travelvip"><Nav.Link className='navprop' id='TravelVIP'>TravelVIP</Nav.Link></LinkContainer>
                            <LinkContainer to="/category/paquetes"><Nav.Link className='navprop' id='Paquetes'>Paquetes</Nav.Link></LinkContainer>
                            <LinkContainer to="/category/vuelos"><Nav.Link className='navprop' id='Vuelos'>Vuelos</Nav.Link></LinkContainer> 
                            <LinkContainer to="/category/hoteles"><Nav.Link className='navprop' id='Hoteles'>Hoteles</Nav.Link></LinkContainer>
                            <LinkContainer to="/cotizador"><Nav.Link className='navprop' id='Cotizador'>Cotizador</Nav.Link></LinkContainer>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/cart"><Nav.Link className='cart d-flex align-items-center justify-content-center'><CartWidget /></Nav.Link></LinkContainer>
                            <NavDropdown title={<img src={UserProfile} alt="User Profile" style={{ width: 35, height: 35, marginRight: 1}} />} id="user-dropdown">
                                <NavDropdown.Item><LinkContainer to='/profile'><Nav.Link>Perfil</Nav.Link></LinkContainer></NavDropdown.Item>
                                <NavDropdown.Item><LinkContainer to='/settings'><Nav.Link>Ajustes</Nav.Link></LinkContainer></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item><LinkContainer to='/logout'><Nav.Link>Cerrar Sesión</Nav.Link></LinkContainer></NavDropdown.Item>
                            </NavDropdown>
                        </Nav> 
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavbarComponent;
