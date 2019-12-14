import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import '../kidprofile/groups.css'
import Select from 'react-select';

const options = [
    { value: 'adivinapicto', label: 'Adivina el picto' },

];

class ViewGame extends React.Component {
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
                                    <h1>Ver juego</h1>
                                </Col>
                            </div>
                            
                            <Container>

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
                                <Col md={12} className="mx-auto">
                                    <Row className="myrow2">
                                        <b>Juego:</b>
                                        
                                            {this.state.game}
                                            
                                    </Row>
                                </Col>

                                <Container>

                                    <Button className="btnactiv" color="primary" size="lg" block>Editar</Button>
                                    <Button className="btnactiv" color="danger" size="lg" block>Eliminar</Button>
                                    <Button className="btnactiv" color="secondary" size="lg" block>Cancelar</Button>

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
