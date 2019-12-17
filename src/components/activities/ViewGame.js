import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'

import '../kidprofile/groups.css'



class ViewGame extends React.Component {
    constructor(props) {
        super(props);
        this.params = this.props.location.state.data;
       
        this.state = {
            initialTime: this.params.task.hora_inicio.substr(0, 5),
            endTime: this.params.task.hora_fin.substr(0, 5),
            selectedOption: 'Adivina el picto',
            
        }
        
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
    goToEditGame = () => {
        this.props.history.push({
            pathname: '/editGame',
            'state': {
                from: {'pathname': this.props.location.pathname },
                data: {
                    kid: this.params.kid,
                    task: this.params.task,
                    moment: this.params.moment
                }

            }
        });
    }
    deleteGame = () => {
        let formDataDeleteGame = new FormData();
        formDataDeleteGame.append("Task", this.params.task.id_tarea);
        let deleteTaskRequest = new Request('https://pictoteask2.000webhostapp.com/delTask.php', {method: 'POST', body: formDataDeleteGame});
        fetch(deleteTaskRequest)
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((task) => {
                if (!task.error) {
                    this.props.history.push({
                        pathname: '/calendar',
                        'state': {
                            'from': {'pathname': this.props.location.pathname },
                            'data': this.params.kid
                        }
                    });
                }
            });
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
                                    <h1>Ver juego</h1>
                                </Col>
                            </div>
                            
                            <Container>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:   </b>
                                       
                                            {this.state.initialTime}
                                        
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:   </b>
                                        {this.state.endTime}
                                        
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Juego:   </b>
                                        
                                            {this.state.selectedOption}
                                            
                                    </Row>
                                </Col>

                                <Container>

                                    <Button className="btnactiv" color="primary" size="lg" block onClick={this.goToEditGame}>Editar</Button>
                                    <Button className="btnactiv" color="danger" size="lg" block onClick={this.deleteGame} >Eliminar</Button>
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
export default withRouter(ViewGame);
