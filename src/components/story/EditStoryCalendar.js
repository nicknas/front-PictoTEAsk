import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import './story.css';
import Select from 'react-select';
import Auth from '../../auth';


class EditStoryCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.params = this.props.location.state.data;
        this.state = {
            timeIni: this.params.task.hora_inicio.substr(0, 5),
            timeFin: this.params.task.hora_fin.substr(0, 5),    
            selectedOption: {value: this.params.task.enlace, label: this.params.task.texto}
            
        }
        this.options = [];
		console.log(this.props.location);
        this.auth = new Auth();
        this.editStory = this.editStory.bind(this);
    }

    editStory() {
        let formDataEditStory = new FormData();
        formDataEditStory.append("Tini", this.state.timeIni.concat(":00"));
        formDataEditStory.append("Tfin", this.state.timeFin.concat(":00"));
        formDataEditStory.append("Path_picto", '/picts/shared/cuento.jpg');
        formDataEditStory.append("Tutor", this.auth.token.id_tutor);
        formDataEditStory.append("Nino", this.params.kid.id); //Deber recibirlo por props
        formDataEditStory.append("Text", this.state.selectedOption.label);
        formDataEditStory.append("Dia", this.params.task.dia);//Deber recibirlo por props
        formDataEditStory.append("Tipo", "cuento");
        formDataEditStory.append("Tarea", this.params.task.id_tarea);
        formDataEditStory.append("Enlace", this.state.selectedOption.value);

        let addStoryRequest = new Request('https://pictoteask2.000webhostapp.com/updtTask.php', {method: "POST", body: formDataEditStory});
        fetch(addStoryRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((storyCalendar) => {
                if (!storyCalendar.error) {
                    this.props.history.push({
                        pathname: '/viewStoryCalendar',
                        'state': {
                            from: {'pathname': this.props.location.pathname },
                            data: {
                                kid: this.params.kid,
                                task: storyCalendar.task
                            }
            
                        }
                    });
                }
            });
    }

    handleTimeChangeIni = time => {
        if (time > this.state.timeFin && this.state.timeFin != "") {
            this.setState({timeIni: this.state.timeFin});
        }
        else {
            this.setState({timeIni: time});
        }
        
    }

    handleTimeChangeFin = time => {
        if (time > this.state.timeIni) {
            this.setState({timeFin: time});
        }
        else {
            this.setState({timeFin: this.state.timeIni});
        }
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption }

        );
    };

    goBackToViewStory = () => {
        this.props.history.push({
            pathname: '/viewStoryCalendar',
            'state': {
                from: {'pathname': this.props.location.pathname },
                data: {
                    kid: this.params.kid,
                    task: this.params.task
                }

            }
        });
    }

    componentDidMount() {
        let formDataGetStories = new FormData();
        formDataGetStories.append("id_tutor", this.auth.token.id_tutor);
        let getStoriesRequest = new Request('https://pictoteask2.000webhostapp.com/getStoriesTutor.php', { method: 'POST', body: formDataGetStories });
        fetch(getStoriesRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((stories) => {
                if (!stories.error) {
                    stories.stories.forEach((story) => {
                        this.options.push({ label: story.nombre, value: story.id_cuento});
                    });
                }
                else {
                    this.setState({ listStories: [], viewStories: true });
                }
            });
    }

    render() {
        let stateButton = <Button disabled className="mybtn" style={{borderRadius: 50 + 'px'}} color="success" onClick={this.editStory} size="lg" block>Guardar</Button>;
        if (this.state.selectedOption != null && this.state.timeFin.length != 0 && this.state.timeIni.length != 0) {
            stateButton = <Button active className="mybtn" style={{borderRadius: 50 + 'px'}} color="success" onClick={this.editStory} size="lg" block>Guardar</Button>;
        }
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
                                    <h1>Editar cuento</h1>
                                </Col>
                            </div>
                            
                            <Container>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Cuento:</b>
                                        <Select className="time-picker"
                                            value={this.state.selectedOption}
                                            onChange={this.handleChange}
                                            options={this.options}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                        <TimePicker format={"HH:mm"} className="time-picker" onChange={this.handleTimeChangeIni}
                                            value={this.state.timeIni}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        <TimePicker format={"HH:mm"} className="time-picker" onChange={this.handleTimeChangeFin}

                                            value={this.state.timeFin}
                                        />
                                    </Row>
                                </Col>


                                <Container>
                                    
                                    {stateButton}
                                    <Button color="danger" onClick={this.goBackToViewStory} style={{borderRadius: 50 + 'px'}} size="lg" block>Cancelar</Button>

                                </Container>
                            </Container>
                            
                        </div>


                    </Row>
                </Col>
            </Container>



        );
    }
}
export default withRouter(EditStoryCalendar);
