import React from 'react'
import {Container, Row, Col, Fade, Button, Badge} from 'reactstrap'
import PictogramDirectories from './PictogramDirectories';
import PictogramDirectory from './PictogramDirectory';

class Pictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listDirectories: [{name: "acciones", pictos: []}, 
                              {name: "animales", pictos: [{name: "animal_5", img: "images/pictos/animal_5.jpg"}, {name: "animal_9", img: "images/pictos/animal_9.jpg"}, {name: "animal_10", img: "images/pictos/animal_10.jpg"}]},
                              {name: "colegio", pictos: []},
                              {name: "comida", pictos: []},
                              {name: "días de la semana", pictos: []},
                              {name: "familia", pictos: []}
                             ], 
            viewDirectories: true, 
            imageSelected: {}, 
            directorySelected: {name: "", pictos: []}
        };
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
        directorySelected.pictos.push(picto);
        let listDirectories = this.state.listDirectories;
        listDirectories[listDirectories.findIndex((directory) => {return directory.name === directorySelected.name})] = directorySelected;
        this.setState({listDirectories: listDirectories, directorySelected: directorySelected});
    }

    addNewDirectory(nameDirectory) {
        let listDirectories = this.state.listDirectories;
        listDirectories.push({name: nameDirectory, pictos: []});
        this.setState({listDirectories: listDirectories});
    }

    deleteDirectory(nameDirectory) {
        let listDirectories = this.state.listDirectories;
        listDirectories = listDirectories.filter((directory) => {return directory.name !== nameDirectory});
        this.setState({listDirectories: listDirectories});
    }

    goBackToDirectories() {
        this.setState({viewDirectories: true});
    }

    selectDirectory(nameDirectory) {
        let directory = this.state.listDirectories.find((directory) => {return directory.name === nameDirectory});
        this.setState({viewDirectories: false, directorySelected: directory});
    }

    render() {
        let view;
        if (this.state.viewDirectories) {
            view = <PictogramDirectories listDirectories={this.state.listDirectories} selectDirectory={this.selectDirectory} addDirectory={this.addNewDirectory} deleteDirectory={this.deleteDirectory}/>;
        }
        else {
            view = <PictogramDirectory newPicto={this.addNewPicto} goBack={this.goBackToDirectories} imageSelected={this.getImageSelected} nameDirectory={this.state.directorySelected.name} images={this.state.directorySelected.pictos}/>;
        }
        return (
            <Container className="contenedor">
                {view}
            </Container>

        );    
    }
}

export default Pictogram;