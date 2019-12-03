import React from 'react'
import {Link} from 'react-router-dom'
import {
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap'


// TODO: change auth with backend
import {auth} from '../../auth'


class LoginForm extends React.Component {

	constructor(props) {
			super(props);
			this.state = {error: false}

			this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();

		const email = this.refs.email.value;
		const pass = this.refs.pass.value;

		let {from, history} = this.props;

		auth.login(email, pass, (loggedIn) => {
			if (!loggedIn) {
				return this.setState({error: true})
			}

			console.log(from)
			history.replace(from);
		})
	}


	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>Correo</Label>
					<input className="form-control"
						ref="email" required={true}
						type="email" placeholder="Correo" />
				</FormGroup>
				<FormGroup>
					<Label>Contraseña</Label>
					<input className="form-control"
						ref="pass" required={true}
						type="password" placeholder="Contraseña" />
				</FormGroup>
				<Col md={12} className="text-center">
					<Button type="submit" color="primary"
						className="btn-block mybtn tx-tfm">INICIAR SESIÓN</Button>
				</Col>
				<Col md={12}>
					<div className="login-or">
						<hr className="hr-or" />
						<span className="span-or">o</span>
					</div>
				</Col>
				<Col md={12} className="mb-3">
					<div className="text-center">
						<div className="social btn mybtn">
							<i className="fa fa-google-plus"></i> inicia sesión con Google
						</div>
					</div>
				</Col>
				<Col md={12} className="mb-3">
					<div className="text-center">
						<div className="social btn mybtn">
							<i className="fa fa-facebook-f"></i> inicia sesión con  Facebook
						</div>
					</div>
				</Col>
				<FormGroup>
					<div className="text-center">No tienes cuenta? <Link to="/signup">Regístrate</Link></div>
				</FormGroup>
			</Form>
		)
	}
}

export default LoginForm;
