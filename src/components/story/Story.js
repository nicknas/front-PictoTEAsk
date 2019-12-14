import React from 'react'
import {Container, Row, Col, Fade, Button, Badge} from 'reactstrap'
import StoryList from './StoryList';
import {Link} from 'react-router-dom';
import StoryContent from './StoryContent';

class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStories: [],
            viewStories: true, 
            storySelected: {name: "", id: "", pictos: []}
        };
        this.addNewPicto = this.addNewPicto.bind(this);
        this.selectStory = this.selectStory.bind(this);
        this.goBackToStories = this.goBackToStories.bind(this);
        this.addNewStory = this.addNewStory.bind(this);
        this.deleteStory = this.deleteStory.bind(this);
    }


    addNewPicto(picto) {
        let storySelected = this.state.storySelected;
        let formDataAddPicto = new FormData();
        formDataAddPicto.append("id_tutor", 7);
        formDataAddPicto.append("id_cuento", storySelected.id);
        formDataAddPicto.append("path", picto.img.replace('https://pictoteask.000webhostapp.com', ''));
        let addPictoRequest = new Request('https://pictoteask.000webhostapp.com/addPage.php', {method: 'POST', body: formDataAddPicto});
        fetch(addPictoRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((page) => {
                if (!page.error) {
                    this.selectStory(storySelected.name, storySelected.id);
                }
            })
    }

    addNewStory(nameStory) {
        let formDataAddStory = new FormData();
        formDataAddStory.append("id_tutor", 7);
        formDataAddStory.append("nombre", nameStory);
        let addStoryRequest = new Request('https://pictoteask.000webhostapp.com/createStory.php', {method: 'POST', body: formDataAddStory});
        fetch(addStoryRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((story) => {
                console.log('Story:', story);
                this.goBackToStories();
            });
    }

    deleteStory(idStory) {
        let formDataDeleteStory = new FormData();
        formDataDeleteStory.append("id_tutor", 7);
        formDataDeleteStory.append("id_cuento", idStory);
        let deleteStoryRequest = new Request('https://pictoteask.000webhostapp.com/deleteStory.php', {method: 'POST', body: formDataDeleteStory});
        fetch(deleteStoryRequest)
            .then(response => response.json())
            .catch(error => console.error("Error:", error))
            .then((story) => {
                if (!story.error) {
                    this.goBackToStories();
                }
            });
    }

    goBackToStories() {
        let formDataGetStories = new FormData();
        formDataGetStories.append("id_tutor", 7);
        let listStories = [];
        let getStoriesRequest = new Request('https://pictoteask.000webhostapp.com/getStoriesTutor.php', {method: 'POST', body: formDataGetStories});
        fetch(getStoriesRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((stories) => {
                if (!stories.error) {
                    stories.pages.forEach((story) => {
                        listStories.push({name: story.nombre, id: story.id_cuento, pictos: []});
                    });
                    this.setState({listStories: listStories, viewStories: true});
                }
                else {
                    this.setState({listStories: [], viewStories: true});
                }
            });
    }

    selectStory(storyName, storyId) {
        let story = {name: storyName, id: storyId, pictos: []}
        let formDataGetPictosStory = new FormData();
        formDataGetPictosStory.append("id_cuento", story.id);
        let getPictosStoryRequest = new Request('https://pictoteask.000webhostapp.com/getPagesStory.php', {method: 'POST', body: formDataGetPictosStory});
        fetch(getPictosStoryRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((storyPicts) => {
                if (!storyPicts.error) {
                    let cont = 0;
                    storyPicts.stories.forEach(id => {
                        
                       let formDataGetPictoStory = new FormData();
                       formDataGetPictoStory.append("id_pagina", id);
                       let getPictoStoryRequest = new Request('https://pictoteask.000webhostapp.com/getPagesStory.php', {method: 'POST', body: formDataGetPictoStory});
                       fetch(getPictoStoryRequest)
                            .then(response => response.json())
                            .catch(error => console.error('Error:', error))
                            .then((picto) => {
                                story.pictos.push({img: 'https://pictoteask.000webhostapp.com' + picto.page.path});
                                this.setState({viewStories: false, storySelected: story});
                            });
                    });
                }
                else {
                    this.setState({viewStories: false, storySelected: story});
                }
            });
        
    }

    componentDidMount() {
        let formDataGetStories = new FormData();
        formDataGetStories.append("id_tutor", 7);
        let listStories = [];
        let getStoriesRequest = new Request('https://pictoteask.000webhostapp.com/getStoriesTutor.php', {method: 'POST', body: formDataGetStories});
        fetch(getStoriesRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((stories) => {
                if (!stories.error) {
                    stories.stories.forEach((story) => {
                        listStories.push({name: story.nombre, id: story.id_cuento, pictos: []});
                    });
                    this.setState({listStories: listStories});
                }
                else {
                    this.setState({listStories: []});
                }
            });
    }

    render() {
        let view;
        if (this.state.viewStories) {
            view = <StoryList listStories={this.state.listStories} selectStory={this.selectStory} addStory={this.addNewStory} deleteStory={this.deleteStory}/>;
        }
        else {
            view = <StoryContent newPicto={this.addNewPicto} goBack={this.goBackToStories} imageSelected={this.getImageSelected} nameStory={this.state.storySelected.name} images={this.state.storySelected.pictos}/>;
        }
        return (
            <Container className="contenedor">
                <center>
                    <Row style={{paddingBottom: 10 + 'px'}}>
                        <Col>
                            <img src="../images/logolargo.png" width="440px" height="100px" />
                        </Col>
                    </Row>
                </center>
                
                    <Row className="mx-auto">
                        <Col className="columna">
                                <Row className="fila">
                                    <br/>
                                    <ul className="list-group list-group-horizontal" style={{width: 25 + 'em'}}>
                                        <Link to="/draw" type="button" className="list-group-item list-group-item-action">Calendarios</Link>
                                        <Link type="button" className="list-group-item list-group-item-action">Valoraciones</Link>
                                        <Link to="/stories" type="button" className="list-group-item list-group-item-action grupo bot active">Cuentos</Link>
                                    </ul>
                                </Row>
                        </Col>
                    </Row>
                {view}
            </Container>

        );    
    }
}

export default Story;