import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, ButtonGroup, Media, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './groups.css'
class GroupList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [{ name: "Primer ciclo primaria", kids: [] },
            { name: "Segundo ciclo primaria", kids: [] },
            ],
            deleteModalOpened: false,
            addModalOpened: false,
            deleteModalOpened: false,
            groupToDelete: "",
            groupToAdd: ""
        };
        this.createGroupList = this.createGroupList.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.gokids = this.gokids.bind(this);
    }
    gokids(event) {

        event.preventDefault();



        let { from, history } = this.props;


        history.replace(from);


    }

    closeDeleteModal() {
        this.setState({ groupToDelete: "", deleteModalOpened: false });
    }

    deleteGroup() {
        let listGroups = this.state.groups;
            for( var i = 0; i < listGroups.length; i++){ 
                if (listGroups[i].name != this.state.groupToDelete) {
                    listGroups.splice(i, 1); 
                }
             }
            
        this.setState({groups: listGroups});
        this.setState({ deleteModalOpened: false, groupToDelete: "" });
    }

    openDeleteModal(event) {
        let groupName = event.currentTarget.parentNode.previousSibling.innerText;
        this.setState({ groupToDelete: groupName, deleteModalOpened: true });
        event.stopPropagation();
    }

    createGroupList() {
        let grouplist = [];

        this.state.groups.forEach((row) => {
            grouplist.push(
                <Row>
                    <Col md={10}>
                        <picture>
                            <img src="../images/defaultGroup.jpg" className="group-image" /> {row.name}

                        </picture>
                    </Col>
                    <Col md={2}>
                        <picture onClick={this.openDeleteModal}>
                            <img src="../images/papelera.png" width="25px" />
                        </picture>
                    </Col>
                    <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                        <ModalHeader toggle={this.closeDeleteModal}>Añadir carpeta</ModalHeader>
                        <ModalBody>¿Está seguro de que quiere borrar el grupo {this.state.groupToDelete}?</ModalBody>
                        <ModalFooter><Button color="danger" onClick={this.deleteGroup}>Borrar</Button><Button color="secondary" onClick={this.closeDeleteModal}>Cancelar</Button></ModalFooter>
                    </Modal>
                </Row>
            );
        });
        //grouplist.push(<li><Card onClick={this.createGroup} style={{ maxWidth: "600px", marginTop: "10px", marginBottom: "10px" }} className="cardNew"><Row className="no-gutters"><Col style={{ width: "100%" }}><CardImg className="imgNew" src="images/botonNew.svg" alt="..." /></Col><Col><CardBody><CardTitle><h5 className="nombreCarpeta">Crear grupo</h5></CardTitle></CardBody></Col></Row></Card></li>);
        return grouplist;
    }
    render() {
        let group = this.createGroupList();
        return (
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

                        {group}



                    </Container>

                </Row>
            </Container>
        );
    }

}

export default GroupList;