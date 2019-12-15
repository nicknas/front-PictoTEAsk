import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardImg, CardBody, CardTitle, Fade, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import '../story/story.css'
import './activities.css'
import '../kidprofile/groups.css'
import Pictogram from '../pictogram/Pictogram';

const enlace = 'https://pictoteask.000webhostapp.com'

class SeeTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorAlert: false,
            addNewPictoView: false,
            currentSelected: {},

            idTask: 0,
            timeini: '00:00:00',
            timefin: '00:00:00',
            id_tutor: 0,
            texto: "",
            picto: "",
            tipo: "tarea",
            enlace: 0,

            subtareas : []
        }
    }
    onChangeI = timeini => this.setState({ timeini })
    onChangeF = timefin => this.setState({ timefin })
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
                    this.setState({subtareas:listasubtareas});
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
    }
    componentDidMount() {
        let formDataTasks = new FormData();
        formDataTasks.append("date", "2000-01-17");
        formDataTasks.append("id_nino", 32);

        let request = new Request(`${enlace}/getTaskDate.php`,
            {
                method: 'POST',
                body: formDataTasks,
            }
        );
        fetch(request)
            .then((response) => { if (response.ok) return response.json(); })
            .then(data => {
                if (!data.error) {
                    this.setState({idTask : data.Tareas[0].id_tarea});
                    this.setState({timeini : data.Tareas[0].hora_inicio});
                    this.setState({timefin : data.Tareas[0].hora_fin});
                    this.setState({id_tutor : data.Tareas[0].id_tutor});
                    this.setState({texto : data.Tareas[0].texto});
                    this.setState({picto : data.Tareas[0].path_picto});
                    this.setState({tipo : data.Tareas[0].tipo});
                    this.setState({enlace : data.Tareas[0].enlace});

                    if (this.state.enlace == 1) this.getSubTasks();
                }
                else {
                    this.setState({ errorAlert: true });
                }
            });
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
        console.log("listapaths",listPaths);
        listImageRows.push(<div><Card style={{ width: "175px" }}><CardImg top src={enlace.concat(this.state.picto)} /></Card></div>);
        if (listPaths.length !== 0) {
            for (let i = 0; i < listPaths.length; i++) {
                console.log("Imagenesubtareas", enlace.concat(listPaths[i].path_pictrograma));
                listImageRows.push(
                    <div>
                        <Card style={{ width: "175px" }}><CardImg top src={enlace.concat(listPaths[i].path_pictrograma)} /></Card>
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
    editTask(event) {
        event.preventDefault();
        let formDataTasks = new FormData();

        formDataTasks.append("Tini", this.state.timeini);
        formDataTasks.append("Tfin", this.state.timefin);
        formDataTasks.append("Path_picto", this.state.picto);
        formDataTasks.append("Task", this.state.idTask);
        formDataTasks.append("Tutor", this.state.id_tutor);
        formDataTasks.append("Nino", 32); //Deber recibirlo por props
        formDataTasks.append("Text", this.state.texto);
        formDataTasks.append("Dia", "2000-01-17");//Deber recibirlo por props
        formDataTasks.append("Tipo", this.state.tipo);
        formDataTasks.append("Enlace", this.state.enlace);


        fetch('https://pictoteask.000webhostapp.com/updtTask.php', {
            method: "POST",
            body: formDataTasks
        }).then(response => response.json())
            .then(task => {
                console.log(task);
                if (!task.error) {
                    this.setState({ idTask: task.task.id_tarea });
                    if (enlace == 1)
                        this.addSubTasks(auth.token.id_tutor);
                    this.props.history.push({ pathname: '/kidspage' });
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

        fetch('https://pictoteask.000webhostapp.com/delTask.php', {
            method: "POST",
            body: formDataTasks
        }).then(response => response.json())
            .then(task => {
                console.log(task);
                if (!task.error) {
                    this.setState({ idTask: task.task.id_tarea });
                    if (enlace == 1)
                        this.addSubTasks(auth.token.id_tutor);
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

                                    <Button onClick={(event) => this.editTask(event)} className="btnactiv" color="primary" size="lg" block>Editar</Button>

                                    <Button onClick={(event) => this.delTask(event)} className="btnactiv" color="danger" size="lg" block>Eliminar</Button>

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