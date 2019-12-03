import React from 'react';
import {Row, Col, Card, CardImg, CardBody, CardTitle, Fade, Modal, ModalBody, ModalHeader, Label, Input, ModalFooter, Button} from 'reactstrap';
import './pictogram.css';
import { thisExpression } from '@babel/types';

class PictogramDirectories extends React.Component {
    constructor(props) {
        super(props);
        this.createDirectories = this.createDirectories.bind(this);
        this.goToFolder = this.goToFolder.bind(this);
        this.state = {deleteModalOpened: false, addModalOpened: false, deleteModalOpened: false, directoryToDelete: "", directoryToAdd: ""};
        this.addDirectory = this.addDirectory.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.handleDirectoryName = this.handleDirectoryName.bind(this);
        this.saveNewDirectory = this.saveNewDirectory.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deleteDirectory = this.deleteDirectory.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    openDeleteModal(e) {
        let directoryName = e.currentTarget.parentNode.previousSibling.innerText;
        this.setState({directoryToDelete: directoryName, deleteModalOpened: true});
        e.stopPropagation();
    }

    deleteDirectory() {
        this.props.deleteDirectory(this.state.directoryToDelete);
        this.setState({deleteModalOpened: false, directoryToDelete: ""});
    }

    handleDirectoryName(e) {
        this.setState({directoryToAdd: e.target.value});
    } 

    addDirectory() {
        this.setState({addModalOpened: true});
    }

    saveNewDirectory() {
        this.props.addDirectory(this.state.directoryToAdd);
        this.setState({addModalOpened: false, directoryToAdd: ""});
    }

    closeAddModal() {
        this.setState({directoryToAdd: "", addModalOpened: false});
    }

    closeDeleteModal() {
        this.setState({directoryToDelete: "", deleteModalOpened: false});
    }


    createDirectories() {
        let carpetas = [];

        this.props.listDirectories.forEach((row) => {
            carpetas.push(<li><Card onClick={this.goToFolder} style={{maxWidth: "600px", marginTop: "10px", marginBottom: "10px"}}><Row className="no-gutters"><Col><CardImg className="imgCard" src="images/folder.jpg" alt="..."/></Col><Col><CardBody><CardTitle className="nombreCarpeta"><h5>{row.name}</h5></CardTitle></CardBody></Col><Col><img onClick={this.openDeleteModal} className="imgPapelera" src="images/papelera.png" alt=""/></Col></Row></Card></li>);
        });
        carpetas.push(<li><Card onClick={this.addDirectory} style={{maxWidth: "600px", marginTop: "10px", marginBottom: "10px"}} className="cardNew"><Row className="no-gutters"><Col style={{width: "100%"}}><CardImg className="imgNew" src="images/botonNew.svg" alt="..."/></Col><Col><CardBody><CardTitle><h5 className="nombreCarpeta">Nueva Carpeta</h5></CardTitle></CardBody></Col></Row></Card></li>);
        return carpetas;
    }

    goToFolder(e) {
        let directoryName = e.currentTarget.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        this.props.selectDirectory(directoryName);
    }

    render() {
        let carpetas = this.createDirectories();
        return (
            <Fade in={true}>
                <h2>Carpetas</h2>
                <ul>
                    {carpetas}
                </ul>
                <Modal isOpen={this.state.addModalOpened} toggle={this.closeAddModal}>
                    <ModalHeader toggle={this.closeAddModal}>Añadir carpeta</ModalHeader>
                    <ModalBody><Label for="">Nombre de la carpeta</Label><Input type="text" onChange={this.handleDirectoryName} /></ModalBody>
                    <ModalFooter><Button color="success" onClick={this.saveNewDirectory}>Guardar</Button><Button color="secondary" onClick={this.closeAddModal}>Cancelar</Button></ModalFooter>
                </Modal>
                <Modal isOpen={this.state.deleteModalOpened} toggle={this.closeDeleteModal}>
                    <ModalHeader toggle={this.closeDeleteModal}>Borrar carpeta</ModalHeader>
                    <ModalBody>¿Está seguro de que quiere borrar la carpeta {this.state.directoryToDelete}?</ModalBody>
                    <ModalFooter><Button color="danger" onClick={this.deleteDirectory}>Borrar</Button><Button color="secondary" onClick={this.closeAddModal}>Cancelar</Button></ModalFooter>
                </Modal>
            </Fade>
        );
    }
}
export default PictogramDirectories;