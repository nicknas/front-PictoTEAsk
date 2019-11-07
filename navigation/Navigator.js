import React from 'react'
import NavBar from './NavBar'
import { Nav, NavItem, NavLink } from 'reactstrap';
import Title from './Title'
import { InputGroup, InputGroupAddon, Input, Button, Container, Row, Col } from 'reactstrap';
import RatingsView from '../kidprofile/RatingsView';



const links = [
    { url: "/", nombre: "Home" },
    { url: "/profile", nombre: "Perfil" },
    { url: "/ratings", nombre: "Valoraciones" }
]

class Navigator extends React.Component {
    render() {
        return (
            <div>
                <Row>

                    <Col>
                        <Title />
                    </Col>
                </Row>
                <Row>
                    <Col xs="2" style={{ backgroundColor: 'grey' }}>

                        <NavBar/>

                    </Col>

                    <Col>
                        <RatingsView />
                    </Col>
                </Row>
            </div>
        );
    };
}

export default Navigator;