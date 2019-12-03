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

import './auth.css';
import LoginForm from './LoginForm'

function LoginPage() {

	let history = useHistory();
	let location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };

	return (
		<Container>
			<Row>
				<Col md={5} className="mx-auto">
					<div id="first">
						<picture>
							<img alt="Logo Largo" width="100%" src="images/logolargo.png" />
						</picture>
						<div className="myform form">
							<div className="logo mb-3">
								<Col md={12} className="text-center">
									<h1>Inicio de sesión</h1>
								</Col>
							</div>
							<LoginForm from={from} history={history} />
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default LoginPage;
