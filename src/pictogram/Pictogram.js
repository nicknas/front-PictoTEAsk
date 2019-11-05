import React from 'react'
import SearchPictogram from './SearchPictogram'
import {Container, Row} from 'reactstrap'
import SelectPictogram from './SelectPictogram';

class Pictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imageList: []}
    }

    getImageList(listPaths) {
        this.setState({imageList: listPaths});
    }

    render() {
        return (
            <Container>
                <Row><SearchPictogram images={this.getImageList.bind(this)}/></Row>
                <Row><SelectPictogram images={this.state.imageList}/></Row>
            </Container> 
        );    
    }
}

export default Pictogram;