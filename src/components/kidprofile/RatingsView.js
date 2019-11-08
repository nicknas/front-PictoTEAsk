import React from 'react'
import { Jumbotron, Container } from 'reactstrap';


class RatingsView extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron fluid >
                    <Container fluid>
                        <h1 className="display-3" align="center">Valoraciones de Pepe</h1>
                    </Container>
                </Jumbotron>
            </div>
        );
    };
}

export default RatingsView;