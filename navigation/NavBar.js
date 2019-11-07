import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';
import Title from './Title'
import { InputGroup, InputGroupAddon, Input, Button, Container, Row, Col } from 'reactstrap';
import RatingsView from '../kidprofile/RatingsView';



const links = [
    { url: "/", nombre: "Home" },
    { url: "/profile", nombre: "Perfil" },
    { url: "/ratings", nombre: "Valoraciones" }
]

class NavBar extends React.Component {
    render() {
        return (


            <Nav vertical>
                <NavItem>
                    <NavLink href="#">Perfil</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Valoraciones</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Calendario</NavLink>
                </NavItem>
            </Nav>


        );
    };
}

export default NavBar;