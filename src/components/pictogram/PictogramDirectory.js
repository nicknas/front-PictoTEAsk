import React from 'react';
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, Fade} from 'reactstrap';
import './pictogram.css';
import SearchPictogram from './SearchPictogram';
import SelectPictogram from './SelectPictogram';
import {FaArrowLeft} from 'react-icons/fa';

class PictogramDirectory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentSelected: {}, addNewPictoView: false, imagesSearched: []};
        this.selectImageCard = this.selectImageCard.bind(this);
        this.createNewPictogram = this.createNewPictogram.bind(this);
        this.returnToDirectory = this.returnToDirectory.bind(this);
        this.getImagesSearched = this.getImagesSearched.bind(this);
        this.returnToDirectories = this.returnToDirectories.bind(this);
        this.addNewPicto = this.addNewPicto.bind(this);
        this.createImageCards = this.createImageCards.bind(this);
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
        if (this.props.nameDirectory === "común") {
            let formDataFolders = new FormData();
            formDataFolders.append("idTutors", 7);
            let foldersRequest = new Request('https://pictoteask.000webhostapp.com/readFolderPicts.php', {method: 'POST', body: formDataFolders});
            let listPaths = [];
            fetch(foldersRequest)
            .then(response => {if (response.ok) return response.json();})
            .then((data) => {
                
                for (let i = 0; i < 10; i++) {
                    listPaths.push({name: data.sources[i].nombre, img: 'https://pictoteask.000webhostapp.com/' + data.sources[i].path});
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
                this.setState({imageCards: listImageRows});
                
            });            

        }
        else {
            if (listPaths.length === 0) {
                let columnaAdd = <div className="col- columna"><Card onClick={this.createNewPictogram} className="cardNew" style={{width: "175px"}}><CardImg className="imgNew" top src="images/botonNew.svg"/><CardBody><h5><CardTitle>Añadir pictograma</CardTitle></h5></CardBody></Card></div>;
                this.setState({imageCards: [<Row>{columnaAdd}</Row>]})
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
            this.setState({imageCards: listImageRows});
        }
        
    }

    selectImageCard(e) {
        if (this.state.currentSelected !== e.currentTarget) {
            if (this.state.currentSelected.className !== undefined) {
                let currentSelect = this.state.currentSelected;
                currentSelect.className = "card";
            }
            e.currentTarget.className = "card border border-primary";
            let imageSelected = {name: e.currentTarget.childNodes[1].children[0].innerText, img: e.currentTarget.childNodes[0].src};
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
    componentDidMount() {
        this.createImageCards(this.props.images);
    }
    render() {
        let view;
        if (!this.state.addNewPictoView) {
            view = (<Fade in={true}>
                        <h2><span onClick={this.returnToDirectories} className="btn btn-outline-primary"><FaArrowLeft/></span>{this.props.nameDirectory}</h2>
                        {this.state.imageCards}
                    </Fade>);
        }
        else {
            view = (<Fade in={true}>
                        <Row>
                            <SearchPictogram images={this.getImagesSearched} addNewPicto={this.createNewPictogram} goBack={this.returnToDirectory}/>
                        </Row>
                        <Row>
                            <SelectPictogram fadeSelect={this.state.imagesSearched.length === 0 ? false : true} imageSelected={this.addNewPicto} images={this.state.imagesSearched} goBack={this.returnToDirectory}/>
                        </Row>
                    </Fade>);
        }
        return view;
    }
}
export default PictogramDirectory;