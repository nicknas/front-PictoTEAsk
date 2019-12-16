import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, Fade, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import '../story/story.css'
import './activities.css'
import '../kidprofile/groups.css'
import Pictogram from '../pictogram/Pictogram';

const enlace = 'https://pictoteask2.000webhostapp.com'

class SeeTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorAlert: false,
            addNewPictoView: false,
            currentSelected: {},

            idTask: 0,
            timeini: "",
            timefin: "",
            id_tutor: 0,
            texto: "",
            picto: "",
            tipo: "tarea",
            enlace: 0,

            subtareas: []
        }
        this.params = this.props.location.state.data;
    }
    onChangeI = time => {
        if (time > this.state.timefin) {
            this.setState({ timeini: this.state.timefin });
        }
        else {
            this.setState({ timeini: time });
        }
    }
    onChangeF = time => {
        if (time > this.state.timeini) {
            this.setState({ timefin: time });
        }
        else {
            this.setState({ timefin: this.state.timeini });
        }
    }
    getSubTasks() {
        let listasubtareas = [];
        let formDataTasks = new FormData();
        formDataTasks.append("id_task", this.state.idTask);

        let request = new Request(`${enlace}/getSubTask.php`,
            {
                method: 'POST',
                body: formDataTasks,
            }
        );
        fetch(request)
            .then((response) => { if (response.ok) return response.json(); })
            .then(data => {
                console.log("Data", data);
                if (!data.error) {
                    for (let i = 0; i < data.subtareas.length; i++) {
                        listasubtareas.push({
                            id_subtarea: data.subtareas[i].id_subtarea,
                            id_tarea: data.subtareas[i].id_tarea,
                            path_pictrograma: data.subtareas[i].path_pictrograma,
                            texto: data.subtareas[i].texto,
                            orden: data.subtareas[i].orden
                        });
                    }
                    this.setState({ subtareas: listasubtareas });
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
    }
    goBackToCalendar = () => {
        this.props.history.push({
            pathname: '/calendar',
            'state': {
                'from': { 'pathname': this.props.location.pathname },
                'data': this.params.kid
            }
        });
    }
    componentDidMount() {
        this.setState({ idTask: this.params.task.id_tarea });
        this.setState({ timeini: this.params.task.hora_inicio });
        this.setState({ timefin: this.params.task.hora_fin });
        this.setState({ id_tutor: this.params.task.id_tutor });
        this.setState({ texto: this.params.task.texto });
        this.setState({ picto: this.params.task.path_picto });
        this.setState({ tipo: this.params.task.tipo });
        this.setState({ enlace: this.params.task.enlace });

        if (this.state.enlace == 1) this.getSubTasks();

    }
    addNewPicto() {
        this.state.pictos.push(this.state.currentSelected);
        console.log(this.state);
        this.setState({ addNewPictoView: false });
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
        let listImageRows = [];
        console.log("listapaths", listPaths);
        listImageRows.push(<div><Card style={{ width: "175px" }}><CardImg top src={enlace.concat(this.state.picto)} /></Card></div>);
        if (listPaths.length !== 0) {
            for (let i = 0; i < listPaths.length; i++) {
                console.log("Imagenesubtareas", enlace.concat(listPaths[i].path_pictrograma));
                listImageRows.push(
                    <div>
                        <Card style={{ width: "175px" }}><CardImg top src={enlace.concat(listPaths[i].path_pictrograma)} /></Card>
                        <Button variant="danger">Eliminar</Button>
                    </div>
                );
            }
        }
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
    editSubTask(subt) {
        let formDataTasks = new FormData();

        formDataTasks.append("id_subtask", subt.id_subtarea);
        formDataTasks.append("text", subt.texto);
        formDataTasks.append("path", subt.path_pictrograma);
        formDataTasks.append("orden", subt.orden);

        fetch('https://pictoteask2.000webhostapp.com/updtSubTask.php', {
            method: "POST",
            body: formDataTasks
        }).then(response => response.json())
            .then(task => {
                console.log(task);
                if (!task.error) {
                    console.log(task);
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
    }
    editTask(event) {
        event.preventDefault();
        let formDataTasks = new FormData();

        formDataTasks.append("Tini", this.state.timeini);
        formDataTasks.append("Tfin", this.state.timefin);
        formDataTasks.append("Path_picto", this.state.picto);
        formDataTasks.append("Task", this.state.idTask);
        formDataTasks.append("Tutor", this.state.id_tutor);
        formDataTasks.append("Nino", this.params.kid.id); //Deber recibirlo por props
        formDataTasks.append("Text", this.state.texto);
        formDataTasks.append("Dia", this.params.moment.format("YYYY-MM-DD"));//Deber recibirlo por props
        formDataTasks.append("Tipo", this.state.tipo);
        formDataTasks.append("Enlace", this.state.enlace);


        fetch('https://pictoteask2.000webhostapp.com/updtTask.php', {
            method: "POST",
            body: formDataTasks
        }).then(response => response.json())
            .then(task => {
                console.log(task);
                if (!task.error) {
                    if (enlace == 1)
                        for (let i = 0; i < this.state.subtareas.length; i++)
                            this.editSubTask(this.state.subtareas[i]);
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
    }
    delSubtask(id) {
        let formDataTasks = new FormData();

        formDataTasks.append("id_subtask", id);

        fetch('https://pictoteask2.000webhostapp.com/delSubTask.php', {
            method: "POST",
            body: formDataTasks
        }).then(response => response.json())
            .then(task => {
                console.log(task);
                if (!task.error) {
                    console.log("Subtarea Eliminada", this.state);
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
    }
    delTask(event) {
        event.preventDefault();
        let enlace = 0;
        if (this.state.pictos.length > 1) enlace = 1;
        let formDataTasks = new FormData();

        formDataTasks.append("Task", this.task.idTask);

        fetch('https://pictoteask2.000webhostapp.com/delTask.php', {
            method: "POST",
            body: formDataTasks
        }).then(response => response.json())
            .then(task => {
                console.log(task);
                if (!task.error) {
                    if (enlace == 1)
                        for (let i = 0; i < this.state.subtareas.length; i++)
                            this.delSubTasks(this.state.subtareas[i].id_subtarea);
                    this.props.history.push({ pathname: '/kidspage' });
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
    }
    render() {
        const imageCards = this.createImageCards(this.state.subtareas);
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
                                    <h1>Ver tarea</h1>
                                </Col>
                            </div>
                            <Container>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                        <TimePicker format={"HH:mm:ss"} onChange={this.onChangeI} className="time-picker"
                                            value={this.state.timeini}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        <TimePicker format={"HH:mm:ss"} onChange={this.onChangeF} className="time-picker"
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

                                    <Button onClick={(event) => this.editTask(event)} className="btnactiv" color="success" size="lg" block>Editar</Button>

                                    <Button onClick={(event) => this.delTask(event)} className="btnactiv" color="danger" size="lg" block>Eliminar</Button>
                                    <Button color="danger" onClick={this.goBackToCalendar} style={{ borderRadius: 50 + 'px' }} size="lg" block>Cancelar</Button>
                                </Container>
                            </Container>
                        </div>
                    </Row>
                </Col>
            </Container>
        );
    }


}

export default withRouter(SeeTask);