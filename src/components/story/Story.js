import React from 'react'
import {Container, Row, Col, Fade, Button, Badge} from 'reactstrap'
import StoryList from './StoryList';
import StoryContent from './StoryContent';

class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStories:     [{name: "caperucita", pictos: []}, 
                              {name: "3 cerditos", pictos: [{name: "animal_5", img: "images/pictos/animal_5.jpg"}, {name: "animal_9", img: "images/pictos/animal_9.jpg"}, {name: "animal_10", img: "images/pictos/animal_10.jpg"}]},
                             ], 
            viewStories: true, 
            storySelected: {name: "", pictos: []}
        };
        this.addNewPicto = this.addNewPicto.bind(this);
        this.selectStory = this.selectStory.bind(this);
        this.goBackToStories = this.goBackToStories.bind(this);
        this.addNewStory = this.addNewStory.bind(this);
        this.deleteStory = this.deleteStory.bind(this);
    }


    addNewPicto(picto) {
        let storySelected = this.state.storySelected;
        storySelected.pictos.push(picto);
        let listStories = this.state.listStories;
        listStories[listStories.findIndex((story) => {return story.name === storySelected.name})] = storySelected;
        this.setState({listStories: listStories, storySelected: storySelected});
    }

    addNewStory(nameStory) {
        let listStories = this.state.listStories;
        listStories.push({name: nameStory, pictos: []});
        this.setState({listStories: listStories});
    }

    deleteStory(nameStory) {
        let listStories = this.state.listStories;
        listStories = listStories.filter((story) => {return story.name !== nameStory});
        this.setState({listStories: listStories});
    }

    goBackToStories() {
        this.setState({viewStories: true});
    }

    selectStory(nameStory) {
        let story = this.state.listStories.find((story) => {return story.name === nameStory});
        this.setState({viewStories: false, storySelected: story});
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
                {view}
            </Container>

        );    
    }
}

export default Story;