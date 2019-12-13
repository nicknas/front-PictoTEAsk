import React from 'react'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
const auth = 'https://pictoteask.000webhostapp.com'
class CreateGroup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state ={
            errorAlert: false
        }
      
        this.createGroup = this.createGroup.bind(this);
        this.input = React.createRef();
        this.goBack = this.goBack.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss(){
        this.setState({errorAlert:false});
    }
    goBack() {
        this.props.history.push({ pathname: '/groupspage' });
    }
    createGroup(event) {
        event.preventDefault();

        let formDataGroup = new FormData();
        formDataGroup.append("Tutor", 7);

        formDataGroup.append("Nombre_grupo", this.input.current.value);

        fetch('https://pictoteask.000webhostapp.com/addGrupo.php', {
            method: "POST",
            body: formDataGroup
        }).then(response => response.json())
            .then((data) => {
                if (data.error_msg == "Creada correctamente") {
                    let listGroups = [];
                    let formData = new FormData()
                    formData.append('Tutor', 7);
                    fetch(`${auth}/getGrupoTutor.php`, {
                        method: 'POST',
                        body: formData
                    }).then(res => res.json())
                        .then((data) => {

                            for (let i = 0; i < data.Grupos.length; i++) {
                                listGroups.push({ name: data.Grupos[i][2], id: data.Grupos[i][0] });
                            }
                            this.props.setListGroup(listGroups);
                            this.props.history.push({ pathname: '/groupspage' });
                        });
                }
                else {
                    this.setState({errorAlert:true});
                }
            }
            );
        
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
                            <Col md={12} className="myrow" onClick={this.goBack}>
                                <Button type="submit" color="secondary"
                                    className="btn-block mybtn tx-tfm">VOLVER</Button>
                            </Col>
                            
                            <Alert color="danger" isOpen={this.state.errorAlert} toggle={this.onDismiss}>
                                Ya existe un grupo con ese nombre, prueba con otro distinto
                            </Alert>
                            
                        </div>
                    </Row>
                </Col>
            </Container>
        );
    }


}

export default withRouter(CreateGroup);