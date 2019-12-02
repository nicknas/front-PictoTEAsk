import React from 'react';
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, Fade, Modal} from 'reactstrap';
import './story.css';
import Pictogram from '../pictogram/Pictogram.js';
import {FaArrowLeft} from 'react-icons/fa';

class StoryContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentSelected: {}, addNewPictoView: false, imagesSearched: []};
        this.selectImageCard = this.selectImageCard.bind(this);
        this.createNewPictogram = this.createNewPictogram.bind(this);
        this.returnToDirectory = this.returnToDirectory.bind(this);
        this.getImagesSearched = this.getImagesSearched.bind(this);
        this.returnToDirectories = this.returnToDirectories.bind(this);
        this.addNewPicto = this.addNewPicto.bind(this);
    }

    addNewPicto(pictogram) {
        this.props.newPicto(pictogram);
        this.setState({addNewPictoView: false});
    }

    createNewPictogram() {
        this.setState({addNewPictoView: true});
    }

    returnToDirectory() {
        this.setState({imagesSearched: []});
        this.setState({addNewPictoView: false});
    }

    getImagesSearched(listImages) {
        this.setState({imagesSearched: listImages});
    }

    returnToDirectories() {
        this.props.goBack();
    }

    createImageCards(listPaths) {
        if (listPaths.length === 0) {
            return [];
        }
        listPaths = this.listToMatrix(listPaths, 3);
        let listImageRows = [];
        listPaths.forEach((row, i) => {
            let listImageCols = [];
            row.forEach((col) => {
                listImageCols.push(<div className="col- columna"><Card onClick={this.selectImageCard} style={{width: "175px"}}><CardImg top src={col.img}/><CardBody><h5><CardTitle>{col.name}</CardTitle></h5></CardBody></Card></div>);
            });
            if (i === (listPaths.length - 1) && listImageCols.length < 3) {
                listImageCols.push(<div className="col- columna"><Card onClick={this.createNewPictogram} className="cardNew" style={{width: "175px"}}><CardImg className="imgNew" top src="images/botonNew.svg"/><CardBody><h5><CardTitle>Añadir pictograma</CardTitle></h5></CardBody></Card></div>);
                listImageRows.push(<Row>{listImageCols}</Row>);
            }
            else if (i === (listPaths.length - 1) && listImageCols.length === 3) {
                listImageRows.push(<Row>{listImageCols}</Row>);
                let columnaAdd = <div className="col- columna"><Card onClick={this.createNewPictogram} className="cardNew" style={{width: "175px"}}><CardImg className="imgNew" top src="images/botonNew.svg"/><CardBody><h5><CardTitle>Añadir pictograma</CardTitle></h5></CardBody></Card></div>;
                listImageRows.push(<Row>{columnaAdd}</Row>);
            }
            else {
                listImageRows.push(<Row>{listImageCols}</Row>);
            }
            
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

        return (<Fade in={true}>
                    <h2><span onClick={this.returnToDirectories} className="btn btn-outline-primary"><FaArrowLeft/></span>{this.props.nameDirectory}</h2>
                    {imageCards}
                    <Modal>
                        <Pictogram/>
                    </Modal>
                </Fade>);
        
    }
}
export default StoryContent;