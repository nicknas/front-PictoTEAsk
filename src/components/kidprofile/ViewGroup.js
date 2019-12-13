import React from 'react'
import './groups.css'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, ButtonGroup, Media, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
const auth = 'https://pictoteask.000webhostapp.com'

class ViewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kidToAdd: "",
            addModalOpened: false
        };
        this.openAddModal = this.openAddModal.bind(this);
        this.gokids = this.gokids.bind(this);
        this.goGroups = this.goGroups.bind(this);
        this.addKid = this.addKid.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.handleNickName = this.handleNickName.bind(this);
        this.saveNewKid = this.saveNewKid.bind(this);
    }
    handleNickName(e) {
        this.setState({ kidToAdd: e.target.value });
    }
    openAddModal(event) {

        this.setState({ addModalOpened: true });
        event.stopPropagation();
    }
    closeAddModal() {
        this.setState({ addModalOpened: false });
    }
    addKid(event) {
        this.props.addKidToGroup(event.currentTarget);
    }
    gokids(event) {
        event.preventDefault();

        this.props.history.push('/kidspage');
    }
    goGroups(event) {
        event.preventDefault();

        this.props.history.push('/groupspage');
    }

    saveNewKid() {
        this.props.addKidToGroup(this.state.kidToAdd);
        this.setState({ addModalOpened: false, kidToAdd: "" });
    }

    componentDidMount() {
        let listKids = [];
        let formData = new FormData()
        formData.append('Tutor', 7);
      
        formData.append('Nombre_grupo', this.props.groupSelectedName);
        fetch(`${auth}/getNinosGrupo.php`, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then((data) => {
                console.log(data);
               for (let i = 0; i < data.kids.length; i++) {
                    listKids.push(data.kids[i]);
                }
                this.props.setKidsGroup(listKids);
               
            });

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
                                        className="btn-block btnblue tx-tfm" onClick={this.goGroups} >Grupos</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Container className='group-list'>
                                    <h5>{this.props.groupSelectedName}</h5>
                                    
                                    {this.props.listKidsGroup.map((item) =>

                                        <Row id={item.id} key={item.id} className="myrow" onClick={(event) => this.goGroup(event)}>
                                            <Col md={10} >
                                                <picture>
                                                    <img src="../images/defaultGroup.jpg" className="group-image" />{item.name}
                                                </picture>
                                            </Col>
                                            <Col md={2} >
                                                <picture onClick={(event) => this.openDeleteModal(event, item.id)}>
                                                    <img src="../images/papelera.png" width="25px" />
                                                </picture>
                                            </Col>
                                            <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                                                <ModalHeader toggle={this.closeDeleteModal}>Borrar grupo</ModalHeader>
                                                <ModalBody>¿Está seguro de que quiere borrar el grupo {this.state.groupToDelete}?</ModalBody>
                                                <ModalFooter  ><Button id={item.id} key={item.id} color="danger" onClick={(event) => this.deleteGroup(event)}>Borrar</Button><Button color="secondary" onClick={this.closeDeleteModal}>Cancelar</Button></ModalFooter>
                                            </Modal>
                                        </Row>

                                    )}



                                </Container>

                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(ViewGroup);