import React from 'react'
import {
    useHistory,
    useLocation
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateKid extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }
    handleSubmit(event) {
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
                                        <Input innerRef={this.input} type="text" name="name" placeholder="Introduce el nick" />

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