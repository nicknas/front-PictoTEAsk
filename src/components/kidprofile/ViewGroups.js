import React from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, ButtonGroup, Media, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './groups.css'
import CreateGroup from './CreateGroup';


const auth = 'https://pictoteask.000webhostapp.com'

class ViewGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listGroups: [],
            deleteModalOpened: false,
            addModalOpened: false,
            deleteModalOpened: false,
            groupToDelete: "",
            groupToAdd: ""
        };
        
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.gokids = this.gokids.bind(this);
        this.goCreateGroup = this.goCreateGroup.bind(this);
        this.goGroup = this.goGroup.bind(this);

    }

    componentDidMount() {
        let grouplist = [];
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
                console.log(listGroups);
                this.setState({ listGroups: listGroups });
        });
        
    }

    goGroup(event) {
        event.preventDefault();

        let { from3, history } = this.props;
        this.props.goToGroup(event.currentTarget.childNodes[0].innerText);
        history.replace(from3);
    }

    gokids(event) {

        event.preventDefault();

        let { from, history } = this.props;


        history.replace(from);


    }

    goCreateGroup(event) {

        event.preventDefault();

        let { from2, history } = this.props;


        history.replace(from2);


    }

    closeDeleteModal() {
        this.setState({ groupToDelete: "", deleteModalOpened: false });
    }

    deleteGroup() {
        let listGroups = this.state.groups;
        this.props.deleteGroup(this.state.groupToDelete);
        this.setState({ deleteModalOpened: false, groupToDelete: "" });
    }

    openDeleteModal(event) {
        let groupName = event.currentTarget.parentNode.previousSibling.innerText;
        this.setState({ groupToDelete: groupName, deleteModalOpened: true });
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
                            <Row class="mx-auto">
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

                                    {this.state.listGroups.map(item => (
                                        <Row className="myrow" onClick={this.goGroup}>
                                            <Col md={10} >
                                                <picture>
                                                    <img src="../images/defaultGroup.jpg" className="group-image" />{item.name}
                                                </picture>
                                            </Col>
                                            <Col md={2} >
                                                <picture onClick={this.openDeleteModal}>
                                                    <img src="../images/papelera.png" width="25px" />
                                                </picture>
                                            </Col>
                                            <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                                                <ModalHeader toggle={this.closeDeleteModal}>Borrar grupo</ModalHeader>
                                                <ModalBody>¿Está seguro de que quiere borrar el grupo {this.state.groupToDelete}?</ModalBody>
                                                <ModalFooter><Button color="danger" onClick={this.deleteGroup}>Borrar</Button><Button color="secondary" onClick={this.closeDeleteModal}>Cancelar</Button></ModalFooter>
                                            </Modal>
                                        </Row>

                                    ))}
                                    <Row onClick={this.goCreateGroup}>
                                        <Col>
                                            <picture>
                                                <img src="../images/botonNew.svg" className="group-image" /> <font color="#3E8EDE">Crear grupo</font>
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