import React from 'react'
import {useHistory} from 'react-router-dom'
import {
	Container,
	Row,
	Col
} from 'reactstrap'

import './auth.css';
import RegisterForm from './RegisterForm'

function RegisterPage() {

	let history = useHistory();

	let from = { pathname: "/login" };

	return (
		<Container>
			<Row>
				<Col md={5} className="mx-auto">
					<div id="first">
						<picture>
							<img alt="Logo Largo" width="100%" src="logolargo.png" />
						</picture>
						<div className="myform form">
							<div className="logo mb-3">
								<Col md={12} className="text-center">
									<h1>Signup</h1>
								</Col>
							</div>
							<RegisterForm from={from} history={history} />
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default RegisterPage;
