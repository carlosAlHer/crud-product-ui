import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const NavBar = () => {
    return (

        <Navbar bg="dark" data-bs-theme="dark" className="w-100 mt-2">
            
                <Nav className="me-auto w-100 d-flex">
                    <Link to="/list-prd" className="nav-link">List Products</Link>
                    <Link to="/list-categ" className="nav-link">List Categories</Link>
                    <Link to="/form-prd" className="nav-link">Register Products</Link>
                    <Link to="/form-categ" className="nav-link">Register Cagegories</Link>     
                </Nav>
            
        </Navbar>
    )
}
