import React from 'react'
import {Input, Button, Container, Form, Label} from 'reactstrap';
import {FaArrowLeft} from 'react-icons/fa';
import './pictogram.css';

class SearchPictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isSearched: false, searchValue: ''}
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.returnToDirectory = this.returnToDirectory.bind(this);
    }
    returnToDirectory() {
        this.props.goBack();
    }

    handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onload = function(e) {
            const content = e.target.result;
            console.log(content)
        }
        fileData.readAsDataURL(file);
    }

    handleSearchClick() {
        this.setState({isSearched: !this.state.isSearched});
        let listElements = [];
        let formDataFolders = new FormData();
        formDataFolders.append("palabra", this.state.searchValue);
        let foldersRequest = new Request('https://pictoteask2.000webhostapp.com/search.php', {method: 'POST', body: formDataFolders});
        fetch(foldersRequest).then(response => response.json()).then(response => {
            for (let i = 0; i < response.sources.length; i++) {
                listElements.push({name: response.sources[i].nombre, img: 'https://pictoteask2.000webhostapp.com/' + response.sources[i].path});
            }
            this.props.images(listElements);
        });            
        
    }
    handleSearchKeyPress(e) {
        if (e.key === "Enter") {
            this.handleSearchClick();
        }
    }
    updateSearchValue(e) {
        this.setState({searchValue: e.target.value});
    }
    render() {
        return (
            <Container className="contenedor">
                <Form inline>
                    <span onClick={this.returnToDirectory} className="btn btn-outline-primary"><FaArrowLeft/></span>
                    <Input id="cajaBuscar" className="mr-sm-2" type="search" value={this.state.searchValue} onChange={this.updateSearchValue} onKeyPress={this.handleSearchKeyPress} placeholder="Escribe para buscar" aria-label="Search" />
                    <Button className="my-2 my-sm-0 botonBuscar" onClick={this.handleSearchClick} color="outline-primary">Buscar</Button>
                    <Label className="btn btn-outline-secondary my-2 my-sm-0 cardNew botonBuscar">
                        Importar <Input type="file" className="btn btn-outline-secondary my-2 my-sm-0 cardNew" onChange={(e) => this.handleChangeFile(e.target.files[0])}/>
                    </Label>
                </Form>
            </Container>
        );
    }
}

export default SearchPictogram;