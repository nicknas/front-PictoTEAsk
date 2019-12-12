import React from 'react'
import './groups.css'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, ButtonGroup, Media, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    useHistory,
    useLocation,
    withRouter
} from 'react-router-dom'
class ViewGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kidToAdd: "",
            addModalOpened: false
        };
        this.openAddModal = this.openAddModal.bind(this);
        this.createKidsList = this.createKidsList.bind(this);
        this.gokids = this.gokids.bind(this);
        this.goGroups = this.goGroups.bind(this);
        this.addKid = this.addKid.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.handleNickName = this.handleNickName.bind(this);
        this.saveNewKid = this.saveNewKid.bind(this);
    }
    handleNickName(e) {
        this.setState({kidToAdd: e.target.value});
    }
    openAddModal(event) {
        
        this.setState({addModalOpened: true });
        event.stopPropagation();
    }
    closeAddModal() {
        this.setState({addModalOpened: false });
    }
    addKid(event){
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
        this.setState({addModalOpened: false, kidToAdd: ""});
    }

    createKidsList() {
        /*let grouplist = [];
        this.props.listKids.forEach((row) => {
            grouplist.push(
                <Row className="myrow">
                    <Col md={10} >
                        <picture>
                            <img src="../images/defaultProfile.jpg" className="group-image" />{row.name}
                        </picture>
                    </Col>
                </Row>
            );
        });
        
        
        grouplist.push(
            <Row onClick={this.openAddModal}>
                <Col>
                    <picture>
                        <img src="../images/botonNew.svg" className="group-image"  /> <font color="#3E8EDE">Añadir niño</font>
                        </picture>
                </Col>
                <Modal isOpen={this.state.addModalOpened} toggle={this.closeAddModal}>
                        <ModalHeader toggle={this.closeAddModal}>Añadir niño al grupo</ModalHeader>
                        <ModalBody><Label for="">Nick del niño</Label><Input type="text" onChange={this.handleNickName} /></ModalBody>
                        <ModalFooter><Button color="success" onClick={this.saveNewKid}>Guardar</Button><Button color="secondary" onClick={this.closeAddModal}>Cancelar</Button></ModalFooter>
                    </Modal>
            </Row>
            
        );

        
        return grouplist;*/
    }
    render() {
        let kids = this.createKidsList();
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
                                    <h5>{this.props.nameGroup}</h5>

                                    {kids}



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