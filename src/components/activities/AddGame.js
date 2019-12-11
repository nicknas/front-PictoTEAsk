import React from 'react'
import { Container, Row, Col, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import TimePicker from 'react-time-picker';
import '../kidprofile/groups.css'
import Select from 'react-select';

const options = [
    { value: 'adivinapicto', label: 'Adivina el picto' },
   
  ];

class AddGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '00:00',
            selectedOption:  null
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
                                    <h1>Añadir juego</h1>
                                </Col>
                            </div>
                            <Container>
                                <Row className="myrow2">

                                    <b>Hora inicio:</b>
                                    <TimePicker className="time-picker"
                                        value={this.state.time}
                                    />
                                </Row>
                                <Row className="myrow2">
                                    <b>Hora fin:</b>
                                    <TimePicker className="time-picker"

                                        value={this.state.time}
                                    />
                                </Row>
                                <Row className="myrow2">
                                    <b>Juego:</b>
                                    <Select className="time-picker"
                                        value={this.selectedOption}
                                        onChange={this.handleChange}
                                        options={options}
                                    />
                                </Row>
                            </Container>
                        </div>


                    </Row>
                </Col>
            </Container>



        );
    }
}
export default withRouter(AddGame);
