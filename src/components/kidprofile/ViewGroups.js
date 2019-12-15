import React from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, ButtonGroup, Media, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './groups.css'
import CreateGroup from './CreateGroup';



class ViewGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idToDelete:"",
            deleteModalOpened: false,
            addModalOpened: false,
            deleteModalOpened: false,
            groupToDelete: "",
            groupToAdd: ""
        };
        this.input = React.createRef();
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.gokids = this.gokids.bind(this);
        this.goCreateGroup = this.goCreateGroup.bind(this);
        this.goGroup = this.goGroup.bind(this);

    }


    goGroup(event) {
        event.preventDefault();
        let id = event.currentTarget.getAttribute('id');
        let name = event.currentTarget.getAttribute('name');

        let { from3, history, location} = this.props;

				history.push({
					pathname: from3,
					'state': {
						'from': {'pathname': location.pathname },
						'data': {
							group:  {id, name},
							kids:   this.props.parent.listKids
						}
					}
				})
    }

    gokids(event) {

        event.preventDefault();

        let { from, history } = this.props;

        history.push(from);
    }

    goCreateGroup(event) {

        event.preventDefault();

        let { from2, history, location} = this.props;

				history.push({
					pathname: from2,
					'state': {
						'from': {'pathname': location.pathname },
						'data': this.props.parent.listKids
					}
				})
    }

    closeDeleteModal() {
        this.setState({ groupToDelete: "", idToDelete: "", deleteModalOpened: false });
    }

    deleteGroup(event) {
        event.preventDefault();

        this.props.deleteGroup(this.state.idToDelete);
        this.setState({ deleteModalOpened: false, groupToDelete: "" });
    }

    openDeleteModal(event, id) {
        let groupName = event.currentTarget.parentNode.previousSibling.innerText;
        this.setState({ groupToDelete: groupName, idToDelete: id, deleteModalOpened: true });
        event.stopPropagation();
    }


    render() {

        return (
            <Container>
                <Row>
                    <Col md={5} className="mx-auto">
                        <Row>
                            <picture>
                                <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                            </picture>
                        </Row>
                        <Container>
                            <Row className="mx-auto">
                                <Col md={6} className="btncol">
                                    <Button type="submit" color="primary"
                                        className="btn-block btnwhite tx-tfm" onClick={this.gokids}>Niños</Button>
                                </Col>
                                <Col md={6} className="btncol" >
                                    <Button type="submit" color="primary"
                                        className="btn-block btnblue tx-tfm" >Grupos</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Container className='group-list'>
                                    <h5>Grupos</h5>
                                    {this.props.listGroups.map((item) =>

                                        <Row id={item.id} key={item.id} name={item.name} className="myrow" onClick={this.goGroup}>
                                            <Col style={{'cursor': 'pointer'}} md={10} >
                                                <picture>
                                                    <img src="images/defaultGroup.jpg" className="group-image" />{item.name}
                                                </picture>
                                            </Col>
                                            <Col md={2} >
                                                <picture style={{'cursor': 'pointer'}} onClick={(event) => this.openDeleteModal(event, item.id)}>
                                                    <img src="images/papelera.png" width="25px" />
                                                </picture>
                                            </Col>
                                            <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                                                <ModalHeader toggle={this.closeDeleteModal}>Borrar grupo</ModalHeader>
                                                <ModalBody>¿Está seguro de que quiere borrar el grupo {this.state.groupToDelete}?</ModalBody>
                                                <ModalFooter  ><Button id={item.id} key={item.id} color="danger" onClick={this.deleteGroup}>Borrar</Button><Button color="secondary" onClick={this.closeDeleteModal}>Cancelar</Button></ModalFooter>
                                            </Modal>
                                        </Row>

                                    )}
                                    <Row onClick={this.goCreateGroup}>
                                        <Col>
                                            <picture style={{'cursor': 'pointer'}}>
                                                <img src="images/botonNew.svg" className="group-image" /> <font color="#3E8EDE">Crear grupo</font>
                                            </picture>
                                        </Col>

                                    </Row>



                                </Container>

                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }

}

export default ViewGroups;
