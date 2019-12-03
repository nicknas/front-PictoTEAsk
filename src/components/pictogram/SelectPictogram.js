import React from 'react';
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, Collapse} from 'reactstrap';
import './pictogram.css';
 
class SelectPictogram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentSelected: {}};
        this.selectImageCard = this.selectImageCard.bind(this);
    }

    createImageCards(listPaths) {
        if (listPaths.length === 0) {
            return [];
        }
        listPaths = this.listToMatrix(listPaths, 3);
        let listImageRows = [];
        listPaths.forEach((row) => {
            let listImageCols = [];
            row.forEach((col) => {
                listImageCols.push(<div className="col- columna"><Card onClick={this.selectImageCard} style={{width: "175px"}}><CardImg top src={col.img}/><CardBody><h5><CardTitle>{col.name}</CardTitle></h5></CardBody></Card></div>);
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
            this.setState({currentSelected: e.currentTarget});
        }
        else {
            let imageSelected = {name: e.currentTarget.childNodes[1].childNodes[0].childNodes[0].innerHTML, img: e.currentTarget.childNodes[0].src};
            this.props.imageSelected(imageSelected);
            this.props.goBack();
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
            <Container className="contenedor">
                <Collapse isOpen={this.props.fadeSelect}>
                    {imageCards}
                </Collapse>
            </Container>
        );
    }
}

export default SelectPictogram;