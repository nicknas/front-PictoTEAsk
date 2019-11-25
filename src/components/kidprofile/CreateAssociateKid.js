import React from 'react'
import {
    useHistory,
    useLocation
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateAssociateKid extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col md={5} className="mx-auto">

                        <div id="first">
                            <picture>
                                <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                            </picture>

                            <div className="myform form ">
                                <div className="logo mb-3">
                                    <Col md={12} className="text-center">
                                        <h1>Asociar un niño</h1>
                                    </Col>
                                </div>

                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label>Nickname del niño</Label>
                                        <Input
                                            ref="nick" required={true}
                                            type="text" placeholder="Introduce el nickname" />
                                    </FormGroup>

                                    <Col md={12} className="text-center">
                                        <Button type="submit" color="primary"
                                            className="btn-block mybtn tx-tfm">Asociar niño</Button>
                                    </Col>

                                    <Col md={12}>
                                        <div className="login-or">
                                            <hr className="hr-or"></hr>
                                            <span className="span-or">o</span>
                                        </div>
                                    </Col>

                                    <FormGroup>
                                        <p className="text-center">¿Desea <a href="#" id="signup">crear un niño</a>?</p>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                        <div id="second">
                            <picture>
                                <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                            </picture>

                            <div className="myform form ">
                                <div className="logo mb-3">
                                    <Col md={12} className="text-center">
                                        <h1>Crear niño</h1>
                                    </Col>
                                </div>

                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label>Nickname del niño</Label>
                                        <Input
                                            ref="email" required={true}
                                            type="email" placeholder="Introduce el Email" />
                                    </FormGroup>

                                    <Col md={12} className="text-center">
                                        <Button type="submit" color="primary"
                                            className="btn-block mybtn tx-tfm">Crear niño</Button>
                                    </Col>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }


}

export default CreateAssociateKid;