import React from 'react'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Auth from '../../auth';

class CreateKid extends React.Component {
    constructor(props) {
        super(props);
        this.createKid = this.createKid.bind(this);
        this.input = React.createRef();
    }

    createKid(event) {
        event.preventDefault();


        let auth = new Auth();
        let bodyCreateKid = {Nick: this.input.current.value, Nombre: "Pepe", Apellido: "Jiménez", FechaNacimiento: "11-11-2019", Tutor:"7"};

        fetch('https://pictoteask.000webhostapp.com/registroNino.php', {
            method: "POST",
            body: JSON.stringify(bodyCreateKid),
            headers: {'X-AUTH-TOKEN': auth.token}
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(kid => {console.log('Success:', kid);
                          this.props.history.push({ pathname: '/kidspage'});
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