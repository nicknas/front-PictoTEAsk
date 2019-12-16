import React from 'react'
import { Container, Row, Col, Fade, Button, Badge } from 'reactstrap'
import StoryList from './StoryList';
import { Link, withRouter } from 'react-router-dom';
import StoryContent from './StoryContent';
import Auth from '../../auth';
import {FaArrowLeft} from 'react-icons/fa';

class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStories: [],
            viewStories: true,
            storySelected: { name: "", id: "", pictos: [] }
        };
        this.auth = new Auth();
        this.addNewPicto = this.addNewPicto.bind(this);
        this.selectStory = this.selectStory.bind(this);
        this.goBackToStories = this.goBackToStories.bind(this);
        this.addNewStory = this.addNewStory.bind(this);
        this.deleteStory = this.deleteStory.bind(this);
        this.params = this.props.location.state.data;
    }


    addNewPicto(picto) {
        let storySelected = this.state.storySelected;
        let formDataAddPicto = new FormData();
        formDataAddPicto.append("id_tutor", this.auth.token.id_tutor);
        formDataAddPicto.append("id_cuento", storySelected.id);
        formDataAddPicto.append("path", picto.img.replace('https://pictoteask2.000webhostapp.com', ''));
        let addPictoRequest = new Request('https://pictoteask2.000webhostapp.com/addPage.php', { method: 'POST', body: formDataAddPicto });
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
        formDataAddStory.append("id_tutor", this.auth.token.id_tutor);
        formDataAddStory.append("nombre", nameStory);
        let addStoryRequest = new Request('https://pictoteask2.000webhostapp.com/createStory.php', { method: 'POST', body: formDataAddStory });
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
        formDataDeleteStory.append("id_tutor", this.auth.token.id_tutor);
        formDataDeleteStory.append("id_cuento", idStory);
        let deleteStoryRequest = new Request('https://pictoteask2.000webhostapp.com/deleteStory.php', { method: 'POST', body: formDataDeleteStory });
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
        formDataGetStories.append("id_tutor", this.auth.token.id_tutor);
        let listStories = [];
        let getStoriesRequest = new Request('https://pictoteask2.000webhostapp.com/getStoriesTutor.php', { method: 'POST', body: formDataGetStories });
        fetch(getStoriesRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((stories) => {
                if (!stories.error) {
                    stories.stories.forEach((story) => {
                        listStories.push({ name: story.nombre, id: story.id_cuento, pictos: [] });
                    });
                    this.setState({ listStories: listStories, viewStories: true });
                }
                else {
                    this.setState({ listStories: [], viewStories: true });
                }
            });
    }

    selectStory(storyName, storyId) {
        let story = { name: storyName, id: storyId, pictos: [] }
        let formDataGetPictosStory = new FormData();
        formDataGetPictosStory.append("id_cuento", story.id);
        let getPictosStoryRequest = new Request('https://pictoteask2.000webhostapp.com/getPagesStory.php', { method: 'POST', body: formDataGetPictosStory });
        fetch(getPictosStoryRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((storyPicts) => {
                if (!storyPicts.error) {
                    let cont = 0;
                    storyPicts.pages.forEach(id => {

                        let formDataGetPictoStory = new FormData();
                        formDataGetPictoStory.append("id_pagina", id);
                        let getPictoStoryRequest = new Request('https://pictoteask2.000webhostapp.com/getPagesStory.php', { method: 'POST', body: formDataGetPictoStory });
                        fetch(getPictoStoryRequest)
                            .then(response => response.json())
                            .catch(error => console.error('Error:', error))
                            .then((picto) => {
                                story.pictos.push({ img: 'https://pictoteask2.000webhostapp.com' + picto.page.path });
                                this.setState({ viewStories: false, storySelected: story });
                            });
                    });
                }
                else {
                    this.setState({ viewStories: false, storySelected: story });
                }
            });

    }

    goToCalendar = () => {
        this.props.history.push({
            pathname: '/calendar',
            'state': {
                'from': {'pathname': this.props.location.pathname },
                'data': this.params
            }
        });
    }

    componentDidMount() {
        let formDataGetStories = new FormData();
        formDataGetStories.append("id_tutor", this.auth.token.id_tutor);
        let listStories = [];
        let getStoriesRequest = new Request('https://pictoteask2.000webhostapp.com/getStoriesTutor.php', { method: 'POST', body: formDataGetStories });
        fetch(getStoriesRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((stories) => {
                if (!stories.error) {
                    stories.stories.forEach((story) => {
                        listStories.push({ name: story.nombre, id: story.id_cuento, pictos: [] });
                    });
                    this.setState({ listStories: listStories });
                }
                else {
                    this.setState({ listStories: [] });
                }
            });
    }

    render() {
        let view;
        if (this.state.viewStories) {
            view = <StoryList listStories={this.state.listStories} selectStory={this.selectStory} addStory={this.addNewStory} deleteStory={this.deleteStory} />;
        }
        else {
            view = <StoryContent newPicto={this.addNewPicto} goBack={this.goBackToStories} imageSelected={this.getImageSelected} nameStory={this.state.storySelected.name} images={this.state.storySelected.pictos} />;
        }
        return (
            <Container className="contenedor">
                <center>
                    <Row style={{ paddingBottom: 10 + 'px' }}>
                        <Col>
                            <img src="../images/logolargo.png" width="440px" height="100px" />
                        </Col>
                    </Row>
                </center>

                <center>
                    <Row className="mx-auto">
                    <Col md={{ size: 4, offset: 3}} >
								<br/>
								<ul className="list-group list-group-horizontal" style={{ width: 25 + 'em' }}>
									<Link to="/" type="button" className="btn btn-primary list-group-item list-group-item-action"><FaArrowLeft/></Link>
                                <Button onClick={this.goToCalendar} color="primary" className="list-group-item list-group-item-action">Calendarios</Button>
                                <Link type="button" className="list-group-item list-group-item-action">Valoraciones</Link>
                                <Link to="/stories" type="button" className="list-group-item list-group-item-action grupo bot active">Cuentos</Link>
                            </ul>
                        </Col>
                    </Row>
                </center>
                {view}
            </Container>

        );
    }
}

export default withRouter(Story);