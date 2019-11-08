import React from 'react'
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, Collapse} from 'reactstrap'
 
class SelectPictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentSelected: {}};
        this.selectImageCard = this.selectImageCard.bind(this);
    }

    createImageCards(listPaths) {
        listPaths = this.listToMatrix(listPaths, 3);
        let listImageRows = [];
        listPaths.forEach((row) => {
            let listImageCols = [];
            row.forEach((col) => {
                listImageCols.push(<Col xs="4" sm="4" md="4" lg="4" xl="4"><Card onClick={this.selectImageCard}><CardImg top width="100%" src={col.img}/><CardBody><CardTitle>{col.name}</CardTitle></CardBody></Card></Col>);
            });
            listImageRows.push(<Row>{listImageCols}</Row>);
        });
        return listImageRows;
    }

    selectImageCard(e) {
        if (this.state.currentSelected !== e.currentTarget) {
            if (this.state.currentSelected.className !== undefined) {
                let currentSelect = this.state.currentSelected;
                currentSelect.className = "card";
            }
            e.currentTarget.className = "card border border-primary";
            let imageSelected = {name: e.currentTarget.childNodes[1].children[0].innerHTML, img: e.currentTarget.childNodes[0].src};
            this.props.imageSelected(imageSelected);
            this.setState({currentSelected: e.currentTarget});
        }
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
            <Container>
                <Collapse isOpen={this.props.fadeSelect}>
                    {imageCards}
                </Collapse>
            </Container>
        );
    }
}

export default SelectPictogram;