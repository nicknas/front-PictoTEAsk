import React from 'react'
import {Container, Row, Col, Fade, Button, Badge} from 'reactstrap'
import StoryList from './StoryList';

class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStories: [{name: "caperucita", pictos: []}, 
                          {name: "3 cerditos", pictos: [{name: "animal_5", img: "images/pictos/animal_5.jpg"}, {name: "animal_9", img: "images/pictos/animal_9.jpg"}, {name: "animal_10", img: "images/pictos/animal_10.jpg"}]}
                         ]
        };
        this.addNewStory = this.addNewStory.bind(this);
        this.deleteStory= this.deleteStory.bind(this);
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

    render() {
        return (
            <Container className="contenedor">
                <StoryList listStories={this.state.listStories} addStory={this.addNewStory} deleteStory={this.deleteStory} />;
            </Container>

        );    
    }
}

export default Story;