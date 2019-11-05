import React from 'react'
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle} from 'reactstrap'
 
class SelectPictogram extends React.Component {
    constructor(props) {
        super(props);
        this.createImageCards = this.createImageCards.bind(this);
        this.state = {imageList: []}
    }
    componentWillReceiveProps(nextProps) {
        this.createImageCards(nextProps);
    }
    createImageCards(nextProps) {
        let mtxImages = nextProps.images;
        mtxImages = this.listToMatrix(mtxImages, 3);
        let listImageRows = [];
        mtxImages.forEach((row) => {
            let listImageCols = [];
            row.forEach((col) => {
                listImageCols.push(<Col xs="3" sm="3" md="3" lg="3" xl="3"><Card><CardImg top width="100%" src={col}/><CardBody><CardTitle>ABC</CardTitle></CardBody></Card></Col>);
            });
            listImageRows.push(<Row>{listImageCols}</Row>);
        });
        this.setState({imageList: listImageRows});
    }
    listToMatrix(list, elementsPerSubArray) {
        var matrix = [], i, k;
    
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
    
            matrix[k].push(list[i]);
        }
    
        return matrix;
    }
    render() {
        return (
            <Container className="overflow-auto">
                {this.state.imageList}
            </Container>
        );
    }
}

export default SelectPictogram;