import React from 'react'
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, Fade} from 'reactstrap'
 
class SelectPictogram extends React.Component {

    createImageCards(listPaths) {
        listPaths = this.listToMatrix(listPaths, 3);
        let listImageRows = [];
        listPaths.forEach((row) => {
            let listImageCols = [];
            row.forEach((col) => {
                listImageCols.push(<Col xs="4" sm="4" md="4" lg="4" xl="4"><Card><CardImg top width="100%" src={col}/><CardBody><CardTitle>ABC</CardTitle></CardBody></Card></Col>);
            });
            listImageRows.push(<Row>{listImageCols}</Row>);
        });
        return listImageRows;
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
        const imageCards = this.createImageCards(this.props.images);
        return (
            <Fade in={this.props.fadeSelect}>
                <Container>
                    {imageCards}
                </Container>
            </Fade>
        );
    }
}

export default SelectPictogram;