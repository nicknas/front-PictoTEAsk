import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, Fade, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import '../kidprofile/groups.css'
import '../story/story.css'
import './activities.css'
import { FaArrowLeft } from 'react-icons/fa';
import Pictogram from '../pictogram/Pictogram';
import Auth from '../../auth';

class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idTask: 0,
            timeini: "",
            timefin: "",
            currentSelected: {},
            addNewPictoView: false,
            pictos: [],
            estrellas: [],
            errorAlert: false
        }
        this.params = this.props.location.state.data;
        this.selectImageCard = this.selectImageCard.bind(this);
        this.createNewPictogram = this.createNewPictogram.bind(this);
        this.addNewPicto = this.addNewPicto.bind(this);
        this.closeAddModal = this.closeAddModal.bind(this);
        this.getImageSelected = this.getImageSelected.bind(this);
        this.addTask = this.addTask.bind(this);
        this.addSubTasks = this.addSubTasks.bind(this);
    }

    onChangeI = time => {
        if (time > this.state.timefin && this.state.timefin != "") {
            this.setState({timeini: this.state.timefin});
        }
        else {
            this.setState({timeini: time});
        }
    }
    onChangeF = time => {
        if (time > this.state.timeini) {
            this.setState({timefin: time});
        }
        else {
            this.setState({timefin: this.state.timeini});
        }
    }
    addNewPicto() {
        this.state.pictos.push(this.state.currentSelected);
        this.setState({ addNewPictoView: false });
        if (this.state.estrellas.length === 0)
            this.state.estrellas.push("fav");
        else
            this.state.estrellas.push("nofav");
    }

    goBackToCalendar = () => {
        this.props.history.push({
            pathname: '/calendar',
            'state': {
                'from': {'pathname': this.props.location.pathname },
                'data': this.props.location.state.data.kid
            }
        });
    }

    getImageSelected(imageSelected) {
        this.setState({ currentSelected: imageSelected });
    }

    closeAddModal() {
        this.setState({ currentSelected: {}, addNewPictoView: false });
    }

    createNewPictogram() {
        this.setState({ addNewPictoView: true });
    }

    getImagesSearched(listImages) {
        this.setState({ imagesSearched: listImages });
    }

    createImageCards(listPaths) {
        if (listPaths.length === 0) {
            let columnaAdd = <div className="col- columna"><Card onClick={this.createNewPictogram} className="cardNew" style={{ width: "175px" }}><CardImg className="imgNew" top src="images/botonNew.svg" /><CardBody><h5><CardTitle>Añadir pictograma</CardTitle></h5></CardBody></Card></div>;
            return [<Row>{columnaAdd}</Row>];
        }
        let listImageRows = [];
        let pathstar;
        for (let i = 0; i < listPaths.length; i++) {
            if (this.state.estrellas[i] == "fav") pathstar = "../images/estrella.png";
            else pathstar = "../images/estrella1.png";
            listImageRows.push(
                <div>
                    <Card onClick={this.selectImageCard} style={{ width: "175px" }}><CardImg top src={listPaths[i].img} /><CardBody><h5><CardTitle>{listPaths[i].name}</CardTitle></h5></CardBody></Card>
                    <Button type="button" className="botonestrella"><img src={pathstar} width="20px" /></Button>
                </div>
            );
        }
        let columnaAdd = <div><Card onClick={this.createNewPictogram} className="cardNew" style={{ width: "175px" }}><CardImg className="imgNew" top src="images/botonNew.svg" /><CardBody><h5><CardTitle>Añadir pictograma</CardTitle></h5></CardBody></Card></div>;
        listImageRows.push(<Row>{columnaAdd}</Row>);
        return listImageRows;
    }

    selectImageCard(e) {
        if (this.state.currentSelected !== e.currentTarget) {
            if (this.state.currentSelected.className !== undefined) {
                let currentSelect = this.state.currentSelected;
                currentSelect.className = "card";
            }
            e.currentTarget.className = "card border border-primary";
            let imageSelected = { name: e.currentTarget.childNodes[1].children[0].innerHTML, img: e.currentTarget.childNodes[0].src };
            this.props.imageSelected(imageSelected);
            this.setState({ currentSelected: e.currentTarget });
        }
    }
    addSubTasks(idTutor) {
        for (let i = 1; i < this.state.pictos.length; i++) {
            let formDataSubTasks = new FormData();
            formDataSubTasks.append("id_task", this.state.idTask);
            formDataSubTasks.append("text", "");
            formDataSubTasks.append("path", this.state.pictos[i].img.replace('https://pictoteask2.000webhostapp.com', ''));
            formDataSubTasks.append("id_tutor", idTutor);
            formDataSubTasks.append("orden", i);

            fetch('https://pictoteask2.000webhostapp.com/addSubTask.php', {
                method: "POST",
                body: formDataSubTasks
            }).then(response => response.json())
                .then(subtask => {
                    if (!subtask.error) {
                    }
                    else {
                        this.setState({ errorAlert: true });
                    }
                });

        }
    }
    addTask(event) {
        event.preventDefault();
        let enlace = 0;
        if (this.state.pictos.length > 1) enlace = 1;
        let auth = new Auth();
        let formDataTasks = new FormData();

        formDataTasks.append("Tini", this.state.timeini.concat(":00"));
        formDataTasks.append("Tfin", this.state.timefin.concat(":00"));
        formDataTasks.append("Path_picto", this.state.pictos[0].img.replace('https://pictoteask2.000webhostapp.com', ''));
        formDataTasks.append("Tutor", auth.token.id_tutor);
        formDataTasks.append("Nino", this.params.kid.id); //Deber recibirlo por props
        formDataTasks.append("Text", "");
        formDataTasks.append("Dia", this.params.moment.format("YYYY-MM-DD"));//Deber recibirlo por props
        formDataTasks.append("Tipo", "tarea");
        formDataTasks.append("Enlace", enlace);


        fetch('https://pictoteask2.000webhostapp.com/addTask.php', {
            method: "POST",
            body: formDataTasks
        }).then(response => response.json())
            .then(task => {
                if (!task.error) {
                    this.setState({idTask: task.task.id_tarea});
                    if (enlace == 1)
                        this.addSubTasks(auth.token.id_tutor);
                    this.goBackToCalendar();
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
    }

    render() {
        const imageCards = this.createImageCards(this.state.pictos);
        return (
            <Container>
                <Col md={5} className="mx-auto">
                    <Row className="myrow">

                        <picture>
                            <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                        </picture>
                    </Row>
                    <Row >
                        <div className="myform form">
                            <div className="logo mb-3">
                                <Col md={12} className="text-center">
                                    <h1>Añadir tarea</h1>
                                </Col>
                            </div>
                            <Container>

                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora inicio:</b>
                                        <TimePicker  format={"HH:mm"}  className="time-picker" onChange={this.onChangeI}
                                            value={this.state.timeini}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        <TimePicker  format={"HH:mm"} className="time-picker" onChange={this.onChangeF}
                                            value={this.state.timefin}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Pictos</b>
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <Fade in={true}>
                                            {imageCards}
                                            <Modal isOpen={this.state.addNewPictoView} toggle={this.closeAddModal}>
                                                <ModalHeader toggle={this.closeAddModal}>Añadir pictograma</ModalHeader>
                                                <ModalBody><Pictogram getImageSelected={this.getImageSelected} /></ModalBody>
                                                <ModalFooter><Button color="success" onClick={this.addNewPicto}>Guardar</Button><Button color="secondary" onClick={this.closeAddModal}>Cancelar</Button></ModalFooter>
                                            </Modal>
                                        </Fade>
                                    </Row>
                                </Col>

                                <Container>

                                    <Button onClick={(event) => this.addTask(event)} className="btnactiv" color="primary" size="lg" block>Crear</Button>

                                    <Button color="danger" onClick={this.goBackToCalendar} style={{borderRadius: 50 + 'px'}} size="lg" block>Cancelar</Button>

                                </Container>
                            </Container>
                        </div>
                    </Row>
                </Col>
            </Container>
        );
    }


}

export default withRouter(AddTask);
