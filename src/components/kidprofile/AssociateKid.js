import React from 'react'
import { Link } from 'react-router-dom'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button,Alert } from 'reactstrap';
import Auth from '../../auth';

class AssociateKid extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            errorAlert: false
        }
        this.associateKid = this.associateKid.bind(this);
        this.input = React.createRef();
        this.goBack = this.goBack.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

    }
    onDismiss(){
        this.setState({errorAlert:false});
    }
    goBack() {
        this.props.history.push({ pathname: '/kidspage' });
    }


    associateKid(event) {
        event.preventDefault();

        let auth = new Auth();
        let formDataKidTutor = new FormData();
        formDataKidTutor.append("nick", this.refs.nick.value);
        formDataKidTutor.append("id_tutor", auth.token.id_tutor);

        fetch('https://pictoteask2.000webhostapp.com/addKidToTutor.php', {
            method: "POST",
            body: formDataKidTutor,
        }).then(response => response.json())
            .then(association => {
                if (!association.error) {
                    this.props.history.push({ pathname: '/kidspage' });
                }
                else{
                    this.setState({errorAlert:true});
                }
            });
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
                                <Alert color="danger" isOpen={this.state.errorAlert} toggle={this.onDismiss}>
                                    No se puede asociar el niño con ese nick, prueba con otro nick distinto que exista
                                </Alert>
                                <Form onSubmit={this.associateKid}>
                                    <FormGroup>
                                        <Label>Nickname del niño</Label>
                                        <input className="form-control"
                                            ref='nick' required={true}
                                            type="text" placeholder="Introduce el nickname" />
                                    </FormGroup>

                                    <Col md={12} className="myrow">
                                        <Button type="submit" color="primary"
                                            className="btn-block mybtn tx-tfm">Asociar niño</Button>

                                    </Col>

                                    <Col md={12} className="myrow" onClick={this.goBack}>
                                        <Button type="submit" color="secondary"
                                            className="btn-block mybtn tx-tfm">VOLVER</Button>
                                    </Col>
                                    <Col md={12}>

                                        <div className="login-or">
                                            <hr className="hr-or" />
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

export default withRouter(AssociateKid);
