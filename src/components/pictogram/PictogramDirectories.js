import React from 'react';
import {Container, Row, Col, Card, CardImg, CardBody, CardTitle, Fade} from 'reactstrap';
import './pictogram.css';

class PictogramDirectories extends React.Component {
    constructor(props) {
        super(props);
        this.createDirectories = this.createDirectories.bind(this);
        this.goToFolder = this.goToFolder.bind(this);
    }

    createDirectories() {
        let carpetas = [];
        this.props.listDirectories.forEach((row) => {
            carpetas.push(<li><Card onClick={this.goToFolder} style={{maxWidth: "600px", marginTop: "10px", marginBottom: "10px"}}><Row className="no-gutters"><Col><CardImg className="imgCard" src="images/folder.jpg" alt="..."/></Col><Col><CardBody><CardTitle className="nombreCarpeta"><h5>{row.name}</h5></CardTitle></CardBody></Col><Col><img className="imgPapelera" src="images/papelera.png" alt=""/></Col></Row></Card></li>);
        });
        carpetas.push(<li><Card style={{maxWidth: "600px", marginTop: "10px", marginBottom: "10px"}} className="cardNew"><Row className="no-gutters"><Col style={{width: "100%"}}><CardImg className="imgNew" src="images/botonNew.svg" alt="..."/></Col><Col><CardBody><CardTitle><h5 className="nombreCarpeta">Nueva Carpeta</h5></CardTitle></CardBody></Col></Row></Card></li>);
        return carpetas;
    }

    goToFolder(e) {
        let directoryName = e.currentTarget.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        this.props.selectDirectory(directoryName);
    }

    render() {
        let carpetas = this.createDirectories();
        return (
            <Fade in={true}>
                <h2>Carpetas</h2>
                <ul>
                    {carpetas}
                </ul>
            </Fade>
        );
    }
}
export default PictogramDirectories;