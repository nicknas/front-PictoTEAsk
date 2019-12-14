import React from 'react'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Button, Alert } from 'reactstrap';
import Auth from '../../auth';

class CreateKid extends React.Component {
    constructor(props) {
        super(props);
        this.createKid = this.createKid.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

        this.state = {
            errorAlert: false
        }
    }
    onDismiss() {
        this.setState({ errorAlert: false });
    }
    goBack() {
        this.props.history.push({ pathname: '/kidspage' });
    }

    createKid(event) {
        event.preventDefault();


        let auth = new Auth();
        let formDataKids = new FormData();
        formDataKids.append("Tutor", auth.token.id_tutor);
        formDataKids.append("Apellido", "Pepito");
        formDataKids.append("Nombre", "Sanchez");
        formDataKids.append("Nick", this.refs.nick.value);
        formDataKids.append("FechaNacimiento", "2000-01-01");
        fetch('https://pictoteask.000webhostapp.com/registroNino.php', {
            method: "POST",
            body: formDataKids
        }).then(response => response.json())
            .then(kid => {
                if (!kid.error) {
                    console.log(kid);
                    this.props.history.push({ pathname: '/kidspage' });
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
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
                                    <h1>Registrar un niño</h1>
                                </Col>
                            </div>
                            <Alert color="danger" isOpen={this.state.errorAlert} toggle={this.onDismiss}>
                                Ya existe un niño con ese nick, prueba con otro nick distinto
                            </Alert>

                            <Form onSubmit={this.createKid}>
                                <FormGroup>
                                    <Label >Nombre del niño*</Label>
                                    <input className="form-control"
                                        ref='nick' required={true} type="text" name="name" placeholder="Nombre" />
                                </FormGroup>
                                <Col md={12} className="myrow">
                                    <Button type="submit" color="primary"
                                        className="btn-block mybtn tx-tfm">REGISTRAR NIÑO</Button>
                                </Col>
                            </Form>
                            <Col md={12} className="myrow" onClick={this.goBack}>
                                <Button type="submit" color="secondary"
                                    className="btn-block mybtn tx-tfm">VOLVER</Button>
                            </Col>
                        </div>
                    </Row>
                </Col>

            </Container>
        );
    }


}

export default withRouter(CreateKid);