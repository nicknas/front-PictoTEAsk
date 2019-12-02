import React from 'react'
import {
    useHistory,
    useLocation
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateKid extends React.Component {
    
    constructor(props) {
            super(props);
            this.state = {error: false}

            this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();

        const nick = this.refs.text.value;

    }
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
                                        <h1>Crear niño</h1>
                                    </Col>
                                </div>

                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label>Nickname del niño</Label>
                                        <Input
                                            ref="text" required={true}
                                            type="text" placeholder="Introduce el nick" />
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

export default CreateKid;