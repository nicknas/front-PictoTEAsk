import React from 'react'
import {Link} from 'react-router-dom'
import {
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Alert
} from 'reactstrap'


import Auth from '../../auth'


class RegisterForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			error: false,
			info: '',
			loading: false
		}

		this.auth = new Auth()

		this.handleSubmit = this.handleSubmit.bind(this)
	}


	handleSubmit(event) {
		event.preventDefault();

		this.setState({
			error: false,
			loading: true
		})

		let {
			email,
			pass, vpass, terms
		} = this.refs

		if (pass.value != vpass.value) {
			return this.setState({
				error: true,
				loading: false,
				info: 'Las Contraseñas no coinciden.'
			})
		}

		if (!terms.checked) {
			return this.setState({
				error: true,
				loading: false,
				info: 'Para continuar aceptar los terminos y condiciones.'
			})
		}

		let {from, history} = this.props;

		this.setState({error: false, loading: true})

		this.auth.register(
			'demo',
			'demo',
			email.value,
			pass.value,
			vpass.value,
			(loggedIn, info) => {
				if (!loggedIn) {
					return this.setState({
						error: true,
						loading: false,
						info: info,
					})
				}

				history.replace(from);
				location.reload();
			}
		)
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
				<FormGroup>
					<Label>Validar Contraseña</Label>
					<input className="form-control"
						ref="vpass" required={true}
						type="password" placeholder="Contraseña" />
				</FormGroup>
				<FormGroup>
					<FormGroup check>
						<Label check>
							<input ref="terms" type="checkbox" />{' '}
							Acepto los terminos y condiciones
						</Label>
					</FormGroup>
				</FormGroup>
				<Col md={12} className="text-center">
					<Button type="submit" color="primary"
						className="btn-block mybtn tx-tfm">REGISTRARSE</Button>
				</Col>
				<Col md={12}><br />
				{this.state.error && (
							<Alert color="danger"> {this.state.info} </Alert>
				)}
        {this.state.loading && (
							<Alert color="info"> Cargando... </Alert>
        )}
				</Col>
				<Col md={12}>
					<FormGroup>
						<div className="text-center">
							<Link to="/login">Ya tienes cuenta? inicia sesión</Link>
						</div>
					</FormGroup>
				</Col>

			</Form>
		)
	}
}

export default RegisterForm;
