import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import '../kidprofile/groups.css'
class SeeActivity extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Col md={5} className="mx-auto">
                    <Row className="myrow">

                        <picture>
                            <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                        </picture>
                    </Row>
                    <Row >
                        <div className="myform form">
                            <Container>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b><a>08:50</a>
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b><a>09:00</a>
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Pictos</b>
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <div className="hora">
                                            <img className="img-thumbnail foto" src="../images/lavar_los_dientes.png" width="80px" />
                                            <Button type="button" class="boton" ><img src="../images/estrella.png" width="20px" /></Button>
                                        </div>
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <div className="hora">
                                            <img className="img-thumbnail foto" src="../images/cepillo_y_pasta_de_dientes.png" width="80px" />
                                            <Button type="button" class="boton" ><img src="../images/estrella1.png" width="20px" /></Button>
                                        </div>
                                    </Row>
                                </Col>

                                <Container>

                                    <Button className="btnactiv" color="primary" size="lg" block>Editar</Button>

                                    <Button className="btnactiv" color="danger" size="lg" block>Eliminar</Button>

                                </Container>
                            </Container>
                        </div>
                    </Row>
                </Col>
            </Container>
        );
    }


}

export default withRouter(SeeActivity);