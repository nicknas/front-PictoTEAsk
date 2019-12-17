import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import '../kidprofile/groups.css'
import Select from 'react-select';
import Auth from '../../auth';

const options = [
    { value: 'adivinapicto', label: 'Adivina el picto' },

];

class AddGame extends React.Component {
    constructor(props) {
        super(props);
        this.params = this.props.location.state.data;
        this.state = {
            initialTime: this.params.task.hora_inicio.substr(0, 5),
            endTime: this.params.task.hora_fin.substr(0, 5),
            selectedOption: options[0],

        }
        this.updateGame = this.updateGame.bind(this);
    }
    updateGame(event) {
        event.preventDefault();
        console.log( this.params);
        if (this.state.selectedOption != null && this.state.initialTime < this.state.endTime) {
            let enlace = 99901;
            let auth = new Auth();
            let formDataTasks = new FormData();
            
            console.log(this.params);
            formDataTasks.append("Tarea", this.params.task.id_tarea);
            formDataTasks.append("Tini", this.state.initialTime.concat(":00"));
            formDataTasks.append("Tfin", this.state.endTime.concat(":00"));
            formDataTasks.append("Path_picto", "/picts/shared/juego.jpg");
            formDataTasks.append("Tutor", auth.token.id_tutor);
            formDataTasks.append("Nino", this.params.kid.id);
            formDataTasks.append("Text", "");
            formDataTasks.append("Dia", this.params.moment.format("YYYY-MM-DD"));
            formDataTasks.append("Tipo", "juego");
            formDataTasks.append("Enlace", enlace);


            fetch('https://pictoteask2.000webhostapp.com/updtTask.php', {
                method: "POST",
                body: formDataTasks
            }).then(response => response.json())
                .then(task => {

                    if (!task.error) {
                        this.setState({ idTask: task.task.id_tarea });
                        this.props.history.push({
                            pathname: '/calendar',
                            'state': {
                                'from': { 'pathname': this.props.location.pathname },
                                'data': this.params.kid
                            }
                        });
                    }
                    else {
                        this.setState({ errorAlert: true, error_msg: "Ya hay una tarea en esas horas" });

                    }
                });

        }
        else {
            if (this.state.initialTime >= this.state.endTime) {
                this.setState({ errorAlert: true, error_msg: "La hora de fin debe ser mayor que la hora de inicio" });
            }
            else {
                this.setState({ errorAlert: true, error_msg: "Debes seleccionar un juego" });
            }
        }
    }
    goBackToCalendar = () => {
        this.props.history.push({
            pathname: '/calendar',
            'state': {
                'from': { 'pathname': this.props.location.pathname },
                'data': this.props.location.state.data.kid
            }
        });
    }
    handleChange = selectedOption => {
        this.setState(
            { selectedOption }

        );
    };
    handleChangeIni = time => {




        this.setState({ initialTime: time });

    }

    handleChangeEnd = time => {

        this.setState({ endTime: time });

    }
    render() {

        return (
            <Container>

                <Col md={5} className="mx-auto">
                    <Row className="myrow">

                        <picture>
                            <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                        </picture>
                    </Row>
                    <Row>
                        <div className="myform form">
                            <div className="logo mb-3">
                                <Col md={12} className="text-center">
                                    <h1>Editar juego</h1>
                                </Col>
                            </div>

                            <Container>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                        <TimePicker format={"HH:mm"} onChange={this.handleChangeIni} className="time-picker"
                                            value={this.state.initialTime}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        <TimePicker format={"HH:mm"} onChange={this.handleChangeEnd} className="time-picker"

                                            value={this.state.endTime}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Juego:</b>
                                        <Select className="time-picker"
                                            value={this.state.selectedOption}
                                            onChange={this.handleChange}
                                            options={options}

                                        />
                                    </Row>
                                </Col>

                                <Container>

                                    <Button className="btnactiv" color="primary" size="lg" block onClick={this.updateGame}>Aceptar</Button>

                                    <Button className="btnactiv" color="secondary" size="lg" block onClick={this.goBackToCalendar}>Cancelar</Button>

                                </Container>
                            </Container>

                        </div>


                    </Row>
                </Col>
            </Container>



        );
    }
}
export default withRouter(AddGame);
