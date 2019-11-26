import React from 'react';
import CreateAssociateKid from './AssociateKid';
import {
    useHistory,
    useLocation
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class ViewKids extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col md={5} className="mx-auto">
                        <picture>
                            <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                        </picture>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <center>
                            <Row className="row fila" style="width: 440px; margin-left: 155px">
                                <br></br>
                                <ul className="list-group list-group-horizontal" style="width: 25rem;">
                                    <Button type="button" className="list-group-item list-group-item-action active">
                                        Niños
                                    </Button>
                                    <Button type="button" className="list-group-item list-group-item-action">
                                        Grupos
                                    </Button>
                                </ul>
                            </Row>
                        </center>
                        <Row className="row fila" style="margin-left: 155px">
                            <Col className="col -">
                                <div className="card" style="width: 25rem;">
                                    <div className="card-body">
                                        <h5 className="card-title">Niños</h5>
                                        <p className="card-text">
                                            <img width="50px" style="opacity: 0.3;" src="images/defaultProfile.jpg" />
                                            HarryPotter86
                                            <Button type="button" className="boton" style="border: none; background: none;">
                                                <img src="images/papelera.png" width="20px" />
                                            </Button>
                                        </p>
                                        <p className="card-text">
                                            <img width="50px" style="opacity: 0.3;" src="images/defaultProfile.jpg" />
                                            HermioneGrangerSuper
                                            <Button type="button" className="boton" style="border: none; background: none;">
                                                <img src="images/papelera.png" width="20px" />
                                            </Button>
                                        </p>

                                        <p className="card-text">
                                            <div href="CreateAssociateKid.js" style="text-decoration: none;">
                                                <img src="images/botonNew.svg" width="50px" style="opacity: 0.6;" /> 
                                                Añadir niño
                                            </div>
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }


}

export default ViewKids;