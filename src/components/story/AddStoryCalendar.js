import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import './story.css';
import Select from 'react-select';
import Auth from '../../auth';

const options = [];

class AddStoryCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeIni: "",
            timeFin: "",
            selectedOption: null
        }
        this.auth = new Auth();
        this.addStory = this.addStory.bind(this);
    }

    addStory() {
        let formDataAddStory = new FormData();
        formDataAddStory.append("Tini", this.state.timeIni.concat(":00"));
        formDataAddStory.append("Tfin", this.state.timeFin.concat(":00"));
        formDataAddStory.append("Path_picto", 'picts/shared/cuento.jpg');
        formDataAddStory.append("Tutor", this.auth.token.id_tutor);
        formDataAddStory.append("Nino", 32); //Deber recibirlo por props
        formDataAddStory.append("Text", "");
        formDataAddStory.append("Dia", "2000-01-19");//Deber recibirlo por props
        formDataAddStory.append("Tipo", "cuento");
        formDataAddStory.append("Enlace", this.state.selectedOption.value);

        let addStoryRequest = new Request('https://pictoteask.000webhostapp.com/addTask.php', {method: "POST", body: formDataAddStory});
        fetch(addStoryRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((storyCalendar) => {
                if (!storyCalendar.error) {
                    this.props.history.push('/calendar');
                }
            });
    }

    handleTimeChangeIni = time => {
        this.setState({timeIni: time});
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

    componentDidMount() {
        let formDataGetStories = new FormData();
        formDataGetStories.append("id_tutor", 7);
        let getStoriesRequest = new Request('https://pictoteask.000webhostapp.com/getStoriesTutor.php', { method: 'POST', body: formDataGetStories });
        fetch(getStoriesRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((stories) => {
                if (!stories.error) {
                    stories.stories.forEach((story) => {
                        options.push({ label: story.nombre, value: story.id_cuento});
                    });
                }
                else {
                    this.setState({ listStories: [], viewStories: true });
                }
            });
    }
    render() {
        let stateButton = <Button disabled className="mybtn" style={{borderRadius: 50 + 'px'}} color="success" onClick={this.addStory} size="lg" block>Crear</Button>;
        if (this.state.selectedOption != null && this.state.timeFin.length != 0 && this.state.timeIni.length != 0) {
            stateButton = <Button active className="mybtn" style={{borderRadius: 50 + 'px'}} color="success" onClick={this.addStory} size="lg" block>Crear</Button>;
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
                                    <h1>Añadir cuento</h1>
                                </Col>
                            </div>
                            
                            <Container>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Cuento:</b>
                                        <Select className="time-picker"
                                            value={this.selectedOption}
                                            onChange={this.handleChange}
                                            options={options}

                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                        <TimePicker className="time-picker" onChange={this.handleTimeChangeIni}
                                            value={this.state.timeIni}
                                        />
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        <TimePicker className="time-picker" onChange={this.handleTimeChangeFin}

                                            value={this.state.timeFin}
                                        />
                                    </Row>
                                </Col>


                                <Container>
                                    
                                    {stateButton}
                                    <Link to="/calendar" style={{borderRadius: 50 + 'px'}} className="btn btn-danger btn-lg btn-block" >Cancelar</Link>

                                </Container>
                            </Container>
                            
                        </div>


                    </Row>
                </Col>
            </Container>



        );
    }
}
export default withRouter(AddStoryCalendar);
