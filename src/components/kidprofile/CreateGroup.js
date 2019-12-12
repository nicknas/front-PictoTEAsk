import React from 'react'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateGroup extends React.Component {
    constructor(props) {
        super(props);
        this.createGroup = this.createGroup.bind(this);
        this.input = React.createRef();
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.push({ pathname: '/groupspage' });
    }
    createGroup(event) {
        event.preventDefault();

        let formDataGroup = new FormData();
        formDataGroup.append("Tutor", 7);
        console.log(this.input.current.value);
        formDataGroup.append("Nombre_grupo", this.input.current.value);

        fetch('https://pictoteask.000webhostapp.com/addGrupo.php', {
            method: "POST",
            body: formDataGroup
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
        this.props.history.push({ pathname: '/groupspage' });
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
                                    <h1>Crear un grupo</h1>
                                </Col>
                            </div>

                            <Form onSubmit={this.createGroup}>
                                <FormGroup>
                                    <Label >Nombre del grupo*</Label>
                                    <Input innerRef={this.input} type="text" name="name" placeholder="Nombre" />
                                </FormGroup>
                                
                                <Col md={12} className="myrow">
                                    <Button type="submit" color="primary"
                                        className="btn-block mybtn tx-tfm">CREAR GRUPO</Button>
                                </Col>
                                
                               
                            </Form>
                            <Col md={12} className="text-center" onClick={this.goBack}>
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

export default withRouter(CreateGroup);