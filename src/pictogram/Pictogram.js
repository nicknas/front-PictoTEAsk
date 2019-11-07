import React from 'react'
import SearchPictogram from './SearchPictogram'
import {Container, Row, Col, Fade, Button, Badge} from 'reactstrap'
import SelectPictogram from './SelectPictogram'
import UploadPictogram from './UploadPictogram'

class Pictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imageList: [], fadeSelectExistent: false, fadeSelectNew: false};
        this.handleFadeSelectExistent = this.handleFadeSelectExistent.bind(this);
        this.handleFadeSelectNew = this.handleFadeSelectNew.bind(this);
        this.getImageList = this.getImageList.bind(this);
    }

    getImageList(listPaths) {
        this.setState({imageList: listPaths});
    }

    handleFadeSelectExistent() {
        this.setState({fadeSelectExistent: true, fadeSelectNew: false});
    }

    handleFadeSelectNew() {
        this.setState({fadeSelectExistent: false, fadeSelectNew: true});
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="5" sm="5" md="5" lg="5" xl="5"><Button width="100%" color="primary" onClick={this.handleFadeSelectExistent}>Choose an existing pictogram</Button></Col><Col xs="2" sm="2" md="2" lg="2" xl="2"><Badge className="text-center" color="dark">Or</Badge></Col><Col xs="5" sm="5" md="5" lg="5" xl="5"><Button onClick={this.handleFadeSelectNew}>Upload a new pictogram</Button></Col>
                </Row>
                <Fade in={this.state.fadeSelectExistent && !this.state.fadeSelectNew}>
                    <Row><SearchPictogram images={this.getImageList}/></Row>
                    <Row className="overflow-auto"><SelectPictogram images={this.state.imageList} fadeSelect={this.state.imageList.length === 0 ? false : true}/></Row>
                </Fade>
                <Fade in={!this.state.fadeSelectExistent && this.state.fadeSelectNew}>
                    <Row><UploadPictogram/></Row>
                </Fade>
            </Container> 
        );    
    }
}

export default Pictogram;