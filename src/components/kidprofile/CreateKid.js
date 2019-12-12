import React from 'react'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap';
import Auth from '../../auth';

class CreateKid extends React.Component {
    constructor(props) {
        super(props);
        this.createKid = this.createKid.bind(this);
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
                console.log(kid);
                this.props.history.push({ pathname: '/kidspage' });
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

                            <Form onSubmit={this.createKid}>
                                <FormGroup>
                                    <Label >Nombre del niño*</Label>
                                    <input className="form-control"
                                        ref='nick' required={true} type="text" name="name" placeholder="Nombre" />
                                </FormGroup>
                                <Button type="submit" color="primary"  >Submit</Button>
                            </Form>
                        </div>
                    </Row>
                </Col>

            </Container>
        );
    }


}

export default withRouter(CreateKid);