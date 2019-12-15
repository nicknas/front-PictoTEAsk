import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom'
import './story.css'

class ViewStoryCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '00:00',
            selectedOption: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption }

        );
    };
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
                                    <h1>Ver cuento</h1>
                                </Col>
                            </div>
                            
                            <Container>

                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Título:</b>
                                        
                                        {this.state.game}
                                            
                                    </Row>
                                </Col>

                                <Col md={12} className="mx-auto">

                                    <Row className="myrow2">

                                        <b>Hora inicio:</b>
                                       
                                        {this.state.initTime}
                                        
                                    </Row>
                                </Col>
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Hora fin:</b>
                                        {this.state.endTime}
                                        
                                    </Row>
                                </Col>


                                <Container>

                                    <Button color="success" size="lg" block>Editar</Button>
                                    <Button color="danger" size="lg" block>Eliminar</Button>
                                    <Link to="/calendar" className="btn btn-lg btn-secondary btn-block">Cancelar</Link>

                                </Container>
                            </Container>
                            
                        </div>


                    </Row>
                </Col>
            </Container>



        );
    }
}
export default withRouter(ViewStoryCalendar);
