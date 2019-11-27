import React from 'react'
import { Jumbotron, Container, Row, Col, Form, FormGroup, Label, Input, Button, ButtonGroup } from 'reactstrap';
import './groups.css'
class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [{ name: "primer ciclo primaria", kids: [] },
            { name: "segundo ciclo primaria", kids: [] },
            ],
        };
        this.gokids = this.gokids.bind(this);
    }
    gokids(event) {

        event.preventDefault();



        let { from, history } = this.props;


        history.replace(from);


    }
    render() {
        return (
            <Row class="mx-auto">
                <Col md={6} className="btncol">
                    <Button type="submit" color="primary"
                        className="btn-block btnwhite tx-tfm" onClick={this.gokids}>Niños</Button>
                </Col>
                <Col md={6} className="btncol" >
                    <Button type="submit" color="primary"
                        className="btn-block btnblue tx-tfm" >Grupos</Button>
                </Col>
            </Row>
        );
    }

}

export default Group;