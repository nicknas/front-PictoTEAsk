import React from 'react'
import {Link} from 'react-router-dom'
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Auth from '../../auth';

class AssociateKid extends React.Component {
    constructor(props) {
        super(props);
        this.associateKid = this.associateKid.bind(this);
        this.input = React.createRef();
    }
    associateKid(event) {
        event.preventDefault();

        let auth = new Auth();
        let formDataKidTutor = new FormData();
        formDataKidTutor.append("id_tutor", auth.token.id_tutor);
        formDataKidTutor.append("id_kid", this.refs.id_kid.value);
        fetch('https://pictoteask.000webhostapp.com/addKidToTutor.php', {
            method: "POST",
            body: formDataKidTutor,
        }).then(response => response.json())
            .then(association => {
                console.log(association)
                this.props.history.push({ pathname: '/kidspage'});
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

                                <Form onSubmit={this.associateKid}>
                                    <FormGroup>
                                        <Label>Nickname del niño</Label>
                                        <input className="form-control"
                                            ref='id_kid' required={true}
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

export default withRouter(AssociateKid);