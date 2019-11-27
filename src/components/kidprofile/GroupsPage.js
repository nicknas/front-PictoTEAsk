import React from 'react'
import {
	useHistory,
	useLocation
} from 'react-router-dom'
import {
	Container,
	Row,
	Col
} from 'reactstrap'

import Groups from './Groups'

function GroupsPage() {

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/kidspage" } };
    return (
        <Container>
                <Row>
                    <Col md={5} className="mx-auto">
                        <Row>
                            <picture>
                                <img alt="Logo Largo" width="100%" src="images/logolargo.png" />
                            </picture>
                        </Row>
                        <Groups from={from} history={history} />
                    </Col>
                </Row>
            </Container>
    );
}
export default GroupsPage;
