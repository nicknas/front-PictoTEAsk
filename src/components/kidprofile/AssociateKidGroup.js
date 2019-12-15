import React from 'react'
import {
    useHistory,
    useLocation
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class AssociateKidGroup extends React.Component {
    constructor(props) {
        super(props);
        this.associateKidGroup = this.associateKidGroup.bind(this);
        this.input = React.createRef();
    }
    associateKidGroup(event) {
        event.preventDefault();

        let formDataKidGroup = new FormData();
        formDataKidGroup.append("id_tutor", 7);
        formDataKidGroup.append("id_group", 7);
        formDataKidGroup.append("id_kid", this.input.current.value);

        fetch('https://pictoteask.000webhostapp.com/addKidToGroup.php', {
            method: "POST",
            body: formDataGroup
        }).then(response => response.json())

        this.props.history.push({ pathname: '/associatekidgroup', param: this.input.current.value });
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
                            <div className="myform form">
                                <div className="logo mb-3">
                                    <Col md={12} className="text-center">
                                        <h1>Asociar un niño</h1>
                                        <p style="margin-top: -5px;font-size: 14px; opacity: 0.8;">Grupo: Primer ciclo primaria</p>
                                    </Col>
                                </div>

                                <Form onSubmit={this.associateKidGroup}>
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
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }


}

export default AssociateKidGroup;
