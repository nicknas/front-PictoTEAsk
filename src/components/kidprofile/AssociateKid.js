import React from 'react'
import {Link} from 'react-router-dom'
import {
    useHistory,
    useLocation
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class AssociateKid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: false}

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
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
                                            <hr className="hr-or"/>
                                            <span className="span-or">or</span>
                                        </div>
                                    </Col>

                                    <FormGroup>
                                        <div className="text-center">¿Desea <Link to='/createkid'>crear un niño</Link>?</div>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }


}

export default AssociateKid;