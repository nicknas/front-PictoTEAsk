import React from 'react'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'
import './story.css'

class ViewStoryCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.params = this.props.location.state.data;
        this.state = {
            deleteModalOpened: false
        }
        console.log(this.props.location)
    }

    goBackToCalendar = () => {
        this.props.history.push({
            pathname: '/calendar',
            'state': {
                'from': {'pathname': this.props.location.pathname },
                'data': this.params.kid
            }
        });
    }

    goToEditStory = () => {
        this.props.history.push({
            pathname: '/editStoryCalendar',
            'state': {
                from: {'pathname': this.props.location.pathname },
                data: {
                    kid: this.params.kid,
                    task: this.params.task
                }

            }
        });
    }

    closeDeleteModal = () => {
        this.setState({deleteModalOpened: false});
    }

    openDeleteModal = () => {
        this.setState({deleteModalOpened: true});
    }

    deleteStoryCalendar = () => {
        let formDataDeleteStory = new FormData();
        formDataDeleteStory.append();
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
                    <Row>
                        <div className="myform form">
                            <div className="logo mb-3">
                                <Col md={12} className="text-center">
                                    <h1>Ver cuento</h1>
                                </Col>
                            </div>
                            
                            <Container>

                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Título:</b>
                                        
                                            
                                    </Row>
                                </Col>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                       
                                        {this.state.initTime}
                                        
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        {this.state.endTime}
                                        
                                    </Row>
                                </Col>


                                <Container>

                                    <Button onClick={this.goToEditStory} color="success" size="lg" block>Editar</Button>
                                    <Button color="danger" onClick={this.openDeleteModal} size="lg" block>Eliminar</Button>
                                    <Button color="danger" onClick={this.goBackToCalendar} style={{borderRadius: 50 + 'px'}} size="lg" block>Cancelar</Button>

                                </Container>
                                <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                                    <ModalHeader toggle={this.closeDeleteModal}>Borrar cuento</ModalHeader>
                                    <ModalBody>¿Está seguro de que quiere borrar la tarea {this.params.task.text}?</ModalBody>
                                    <ModalFooter><Button color="danger" onClick={this.deleteStoryCalendar}>Borrar</Button><Button color="secondary" onClick={this.closeDeleteModal}>Cancelar</Button></ModalFooter>
                                </Modal>
                            </Container>
                            
                        </div>


                    </Row>
                </Col>
            </Container>



        );
    }
}
export default withRouter(ViewStoryCalendar);
