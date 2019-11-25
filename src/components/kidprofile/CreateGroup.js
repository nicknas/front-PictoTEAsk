import React from 'react'
import {
	useHistory,
	useLocation
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateGroup extends React.Component {

    render() {
        return (
            <Container>
                <Row>
                    <Col md={5} className="mx-auto">
                        <div id="first">
                            <picture>
                                <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                            </picture>
                            <div className="myform form">
                                <div className="logo mb-3">
                                    <Col md={12} className="text-center">
                                        <h1>Crear un grupo</h1>
                                    </Col>
                                </div>



                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label>Nombre del grupo*</Label>
                                        <Input
                                            ref="nombre" required={true}
                                            type="nombre" placeholder="Nombre" />
                                    </FormGroup>

                                    <Col md={12} className="text-center">
                                        <Button type="submit" color="primary"
                                            className="btn-block mybtn tx-tfm">Crear grupo</Button>
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

export default CreateGroup;