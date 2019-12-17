import React from 'react'
import { Container, Row, Col, Button, Alert } from 'reactstrap';
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
        this.state = {
            idTask: 0,
            initialTime: "00:00",
            endTime: "00:00",
            selectedOption: null,
            errorAlert: false,
            error_msg:""
        }
        this.params = "";
        this.handleChange = this.handleChange.bind(this);
        this.addGame = this.addGame.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() {
        this.setState({ errorAlert: false, error_msg: "" });
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption }

        );
    };
    goBackToCalendar = () => {
        this.props.history.push({
            pathname: '/calendar',
            'state': {
                'from': {'pathname': this.props.location.pathname },
                'data': this.props.location.state.data.kid
            }
        });
    }

    handleChangeIni = time => {
        
            
        
        
            this.setState({initialTime: time});
        
    }

    handleChangeEnd = time => {
        
            this.setState({endTime: time});
       
    }
    addGame(event) {
        event.preventDefault();

        if (this.state.selectedOption != null && this.state.initialTime < this.state.endTime) {
            let enlace = 99901;
            let auth = new Auth();
            let formDataTasks = new FormData();

            formDataTasks.append("Tini", this.state.initialTime.concat(":00"));
            formDataTasks.append("Tfin", this.state.endTime.concat(":00"));
            formDataTasks.append("Path_picto", "/picts/shared/juego.jpg");
            formDataTasks.append("Tutor", auth.token.id_tutor);
            formDataTasks.append("Nino", this.params.kid.id);
            formDataTasks.append("Text", "");
            formDataTasks.append("Dia", this.params.moment.format("YYYY-MM-DD"));
            formDataTasks.append("Tipo", "juego");
            formDataTasks.append("Enlace", enlace);


            fetch('https://pictoteask2.000webhostapp.com/addTask.php', {
                method: "POST",
                body: formDataTasks
            }).then(response => response.json())
                .then(task => {
                   
                    if (!task.error) {
                        this.setState({ idTask: task.task.id_tarea });
                        this.props.history.push({
                            pathname: '/calendar',
                            'state': {
                                'from': {'pathname': this.props.location.pathname },
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
            if(this.state.initialTime >= this.state.endTime){
                this.setState({ errorAlert: true,  error_msg: "La hora de fin debe ser mayor que la hora de inicio" });
            }
            else{
                this.setState({ errorAlert: true,  error_msg: "Debes seleccionar un juego" });
            }
        }

    }

    componentDidMount() {
        if(typeof this.props.location.state == 'undefined'){
            this.props.history.push("/calendar");
        }
        else{
            this.params = this.props.location.state.data;
        }
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
                                    <h1>Añadir juego</h1>
                                </Col>
                            </div>

                            <Container>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                        <TimePicker  format={"HH:mm"} onChange={this.handleChangeIni} className="time-picker"
            
                                            value={this.state.initialTime}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        <TimePicker  format={"HH:mm"} className="time-picker" onChange={this.handleChangeEnd}

                                            value={this.state.endTime}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Juego:</b>
                                        <Select className="time-picker"
                                            value={this.selectedOption}
                                            onChange={this.handleChange}
                                            options={options}

                                        />
                                    </Row>
                                </Col>
                                <Alert color="danger" isOpen={this.state.errorAlert} toggle={this.onDismiss}>
                                    {this.state.error_msg}
                            </Alert>
                                <Container>

                                    <Button onClick={this.addGame} className="btnactiv" color="primary" size="lg" block>Crear</Button>

                                    <Button onClick={this.goBackToCalendar} className="btnactiv" color="secondary" size="lg" block>Cancelar</Button>

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
