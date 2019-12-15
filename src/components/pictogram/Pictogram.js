import React from 'react'
import {Container, Row, Col, Fade, Button, Badge} from 'reactstrap'
import PictogramDirectories from './PictogramDirectories';
import PictogramDirectory from './PictogramDirectory';
import Auth from '../../auth';

class Pictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDirectories: [], 
            viewDirectories: true, 
            imageSelected: {}, 
            directorySelected: {name: "", pictos: []}
        };
        this.auth = new Auth();
        this.getImageSelected = this.getImageSelected.bind(this);
        this.addNewPicto = this.addNewPicto.bind(this);
        this.selectDirectory = this.selectDirectory.bind(this);
        this.goBackToDirectories = this.goBackToDirectories.bind(this);
        this.addNewDirectory = this.addNewDirectory.bind(this);
        this.deleteDirectory = this.deleteDirectory.bind(this);
    }

    getImageSelected(imageSelected) {
        this.setState({imageSelected: imageSelected});
        this.props.getImageSelected(imageSelected);
    }

    addNewPicto(picto) {
        let directorySelected = this.state.directorySelected;  
        let formDataAddToFolder = new FormData(); 
        formDataAddToFolder.append("carpeta", directorySelected.name);
        formDataAddToFolder.append("idTutor", this.auth.token.id_tutor);
        formDataAddToFolder.append("path", picto.img.replace('https://pictoteask.000webhostapp.com/', ''));
        let addToFolderRequest = new Request('https://pictoteask.000webhostapp.com/addToFolder.php', {method: 'POST', body: formDataAddToFolder});
        fetch(addToFolderRequest)
            .then((response) => {
                return response.json();
            })
            .catch(error => console.error("Error", error))
            .then((data) => {
                this.selectDirectory(directorySelected.name);
            });
    }

    addNewDirectory(nameDirectory) {
        let listDirectories = this.state.listDirectories;
        let formDataAddFolder = new FormData();
        
        formDataAddFolder.append("carpeta", nameDirectory);
        formDataAddFolder.append("idTutor", this.auth.token.id_tutor);
        let addFolderRequest = new Request('https://pictoteask.000webhostapp.com/createFolderPicts.php', {method: "POST", body: formDataAddFolder});
        fetch(addFolderRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((success) => {
                console.log('Success:', success);
                this.goBackToDirectories();
            });
        
    }

    deleteDirectory(nameDirectory) {
        let formDataDeleteFolder = new FormData(); 
        formDataDeleteFolder.append("carpeta", nameDirectory);
        formDataDeleteFolder.append("idTutor", this.auth.token.id_tutor);
        let addToFolderRequest = new Request('https://pictoteask.000webhostapp.com/deleteFolder.php', {method: 'POST', body: formDataDeleteFolder});
        fetch(addToFolderRequest)
            .then((response) => {
                return response.json();
            })
            .catch(error => console.error("Error", error))
            .then((data) => {
                this.goBackToDirectories();
            });
    }

    goBackToDirectories() {
        let formDataDirectories = new FormData();
        formDataDirectories.append("idTutor", this.auth.token.id_tutor);
        let request = new Request('https://pictoteask.000webhostapp.com/readFolderPicts.php', {method: "POST", body: formDataDirectories});
        fetch(request)
            .then((response) => response.json())
            .catch(error => console.error('Error:', error))
            .then((folders) => {
                let listDirectories = [{name: "común", pictos: []}];
                folders.sources.forEach((row) => {
                    listDirectories.push({name: row.nombre, pictos: []});
                });
                this.setState({listDirectories: listDirectories, viewDirectories: true});
            });
    }

    selectDirectory(nameDirectory) {
        let directory = {name: "", pictos: []};
        directory.name = nameDirectory;
        let formDataDirectory = new FormData(); 
        if (directory.name !== "común") {
            formDataDirectory.append("idTutor", this.auth.token.id_tutor);
            formDataDirectory.append("carpeta", directory.name);
        }
        let request = new Request('https://pictoteask.000webhostapp.com/readFolderPicts.php', {method: "POST", body: formDataDirectory});
        fetch(request)
            .then((response) => response.json())
            .catch(error => console.error('Error:', error))
            .then((folder) => {
                if (directory.name === "común") {
                    for (let i = 0; i < 10; i++) {
                        directory.pictos.push({name: folder.sources[i].nombre, img: 'https://pictoteask.000webhostapp.com/' + folder.sources[i].path});
                    }
                }
                else {
                    folder.sources.forEach((row) => {
                        directory.pictos.push({name: row.nombre, img: 'https://pictoteask.000webhostapp.com/' + row.path});
                    });
                }
                    
                    this.setState({viewDirectories: false, directorySelected: directory});
                });
    }

    componentDidMount() {
        let formDataDirectories = new FormData();
        formDataDirectories.append("idTutor", this.auth.token.id_tutor);
        let request = new Request('https://pictoteask.000webhostapp.com/readFolderPicts.php', {method: "POST", body: formDataDirectories});
        fetch(request)
            .then((response) => response.json())
            .catch(error => console.error('Error:', error))
            .then((folders) => {
                let listDirectories = [{name: "común", pictos: []}];
                folders.sources.forEach((row) => {
                    listDirectories.push({name: row.nombre, pictos: []});
                });
                this.setState({listDirectories: listDirectories});
            });
            
    } 

    render() {
        let view;
        if (this.state.viewDirectories) {
            view = <PictogramDirectories idTutor={this.state.idTutor} listDirectories={this.state.listDirectories} selectDirectory={this.selectDirectory} addDirectory={this.addNewDirectory} deleteDirectory={this.deleteDirectory}/>;
        }
        else {
            view = <PictogramDirectory idTutor={this.state.idTutor} newPicto={this.addNewPicto} goBack={this.goBackToDirectories} imageSelected={this.getImageSelected} nameDirectory={this.state.directorySelected.name} images={this.state.directorySelected.pictos}/>;
        }
        return (
            <Container className="contenedor">
                {view}
            </Container>

        );    
    }
}

export default Pictogram;