import React from 'react';
import {Row, Col, Card, CardImg, CardBody, CardTitle, Fade, Modal, ModalBody, ModalHeader, Label, Input, ModalFooter, Button} from 'reactstrap';
import './story.css';
import { thisExpression } from '@babel/types';

class StoryList extends React.Component {
    constructor(props) {
        super(props);
        this.createStories = this.createStories.bind(this);
        this.goToStory = this.goToStory.bind(this);
        this.state = {deleteModalOpened: false, addModalOpened: false, deleteModalOpened: false, storyToDelete: {}, storyToAdd: ""};
        this.addStory = this.addStory.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.handleStoryName = this.handleStoryName.bind(this);
        this.saveNewStory = this.saveNewStory.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteStory = this.deleteStory.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    openDeleteModal(e) {
        let storyId = e.currentTarget.parentNode.parentNode.parentNode.getAttribute('id');
        let storyName = e.currentTarget.parentNode.previousSibling.innerText;
        this.setState({storyToDelete: {name: storyName, id: storyId}, deleteModalOpened: true});
        e.stopPropagation();
    }

    deleteStory() {
        this.props.deleteStory(this.state.storyToDelete.id);
        this.setState({deleteModalOpened: false, storyToDelete: ""});
    }

    handleStoryName(e) {
        this.setState({storyToAdd: e.target.value});
    } 

    addStory() {
        this.setState({addModalOpened: true});
    }

    saveNewStory() {
        this.props.addStory(this.state.storyToAdd);
        this.setState({addModalOpened: false, storyToAdd: ""});
    }

    closeAddModal() {
        this.setState({storyToAdd: "", addModalOpened: false});
    }

    closeDeleteModal() {
        this.setState({storyToDelete: "", deleteModalOpened: false});
    }

    createStories() {
        let cuentos = [];
        this.props.listStories.forEach((row) => {
            cuentos.push(<li><Card key={row.name} id={row.id} onClick={this.goToStory} style={{maxWidth: "600px", marginTop: "10px", marginBottom: "10px"}}><Row className="no-gutters"><Col><CardImg className="imgCard" src="images/iconoCuento.png" alt="..."/></Col><Col><CardBody><CardTitle className="nombreCarpeta"><h5>{row.name}</h5></CardTitle></CardBody></Col><Col><img onClick={this.openDeleteModal} className="imgPapelera" src="images/papelera.png" alt=""/></Col></Row></Card></li>);
        });
        cuentos.push(<li><Card onClick={this.addStory} style={{maxWidth: "600px", marginTop: "10px", marginBottom: "10px"}} className="cardNew"><Row className="no-gutters"><Col style={{width: "100%"}}><CardImg className="imgNew" src="images/botonNew.svg" alt="..."/></Col><Col><CardBody><CardTitle><h5 className="nombreCarpeta">Nuevo cuento</h5></CardTitle></CardBody></Col></Row></Card></li>);
        return cuentos;
    }

    goToStory(e) {
        let storyName = e.currentTarget.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        let storyId = e.currentTarget.getAttribute('id');
        this.props.selectStory(storyName, storyId);
    }

    render() {
        let cuentos = this.createStories();
        return (
            <Fade in={true}>
                <h2>Cuentos</h2>
                <ul>
                    {cuentos}
                </ul>
                <Modal isOpen={this.state.addModalOpened} toggle={this.closeAddModal}>
                    <ModalHeader toggle={this.closeAddModal}>Añadir cuento</ModalHeader>
                    <ModalBody><Label for="">Nombre del cuento</Label><Input type="text" onChange={this.handleStoryName} /></ModalBody>
                    <ModalFooter><Button color="success" onClick={this.saveNewStory}>Guardar</Button><Button color="secondary" onClick={this.closeAddModal}>Cancelar</Button></ModalFooter>
                </Modal>
                <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                    <ModalHeader toggle={this.closeDeleteModal}>Borrar cuento</ModalHeader>
                    <ModalBody>¿Está seguro de que quiere borrar el cuento {this.state.storyToDelete.name}?</ModalBody>
                    <ModalFooter><Button color="danger" onClick={this.deleteStory}>Borrar</Button><Button color="secondary" onClick={this.closeAddModal}>Cancelar</Button></ModalFooter>
                </Modal>
            </Fade>
        );
    }
}
export default StoryList;