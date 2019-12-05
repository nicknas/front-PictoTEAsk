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
        this.associateKid = this.associateKid.bind(this);
        this.input = React.createRef();
    }
    associateKid(event) {
        event.preventDefault();

        let formDataKidTutor = new FormData();
        formDataKidTutor.append("id_tutor", 7);
        formDataKidTutor.append("id_kid", this.input.current.value);

        fetch('https://pictoteask.000webhostapp.com/addKidToTutor.php', {
            method: "POST",
            body: formDataKidTutor
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        
        this.props.history.push({ pathname: '/associatekid', param: this.input.current.value });
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

                                <Form onSubmit={this.associateKid}>
                                    <FormGroup>
                                        <Label>Nickname del niño</Label>
                                        <Input
                                            innerRef={this.input} required={true}
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