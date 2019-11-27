import React from 'react'
import {
	Container,
	Row,
    Col
} from 'reactstrap'

import GroupList from './GroupList'

class Group extends React.Component {
    constructor(props) {
        super(props);
        
    }
   
    render() {
        return (
            <Container>
                <Row>
                    <Col md={5} className="mx-auto">
                        <Row>
                            <picture>
                                <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                            </picture>
                        </Row>
                        <GroupList from={this.props.from} history={this.props.history} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Group;