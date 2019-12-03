import React from 'react'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateKid extends React.Component {
    constructor(props) {
        super(props);
        this.createKid = this.createKid.bind(this);
        this.input = React.createRef();
    }

    createKid(event) {
        event.preventDefault();


        let formDataKids = new FormData();
        formDataKids.append("Tutor", 7);
        formDataKids.append("Apellido", "Pepito");
        formDataKids.append("Nombre", "Sánchez");
        formDataKids.append("Nick", this.input.current.value);

        fetch('https://pictoteask.000webhostapp.com/registroNino.php', {
            method: "POST",
            body: formDataKids
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

        this.props.history.push({ pathname: '/kidspage', param: this.input.current.value });
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
                                    <Input innerRef={this.input} required={true} type="text" name="name" placeholder="Nombre" />
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