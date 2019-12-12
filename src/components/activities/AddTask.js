import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import '../kidprofile/groups.css'
class AddTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '00:00',
        }
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
                            <div className="logo mb-3">
                                <Col md={12} className="text-center">
                                    <h1>Añadir tarea</h1>
                                </Col>
                            </div>
                            <Container>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                        <TimePicker className="time-picker"
                                            value={this.state.time}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        <TimePicker className="time-picker"

                                            value={this.state.time}
                                        />
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
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <picture>
                                            <img src="../images/botonNew.svg" className="group-image" /> Añadir niño
                                                </picture>
                                    </Row>
                                </Col>
                                
                                <Container>

                                    <Button className="btnactiv" color="primary" size="lg" block>Crear</Button>

                                    <Button className="btnactiv" color="danger" size="lg" block>Cancelar</Button>

                                </Container>
                            </Container>
                        </div>
                    </Row>
                </Col>
            </Container>
        );
    }


}

export default withRouter(AddTask);