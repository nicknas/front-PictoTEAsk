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
// import {fakeAuth as auth} from '../../auth'


class RegisterForm extends React.Component {

	constructor(props) {
			super(props);
			this.state = {error: false}

			this.handleSubmit = this.handleSubmit.bind(this)
	}

	//TODO: implement register
	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>Primer Nombre</Label>
					<Input
						ref="firstname" required={true}
						type="text" placeholder="Primer Nombre" />
				</FormGroup>
				<FormGroup>
					<Label>Apellido</Label>
					<Input
						ref="lastname" required={true}
						type="text" placeholder="Apellido" />
				</FormGroup>
				<FormGroup>
					<Label>Correo</Label>
					<Input
						ref="email" required={true}
						type="email" placeholder="Correo" />
				</FormGroup>
				<FormGroup>
					<Label>Contraseña</Label>
					<Input
						ref="pass" required={true}
						type="password" placeholder="Contraseña" />
				</FormGroup>
				<FormGroup>
					<Label>Validar Contraseña</Label>
					<Input
						ref="vpass" required={true}
						type="password" placeholder="Contraseña" />
				</FormGroup>
					<FormGroup tag="fieldset">
					<legend>Rol</legend>
					<FormGroup check>
						<Label check>
							<Input type="radio" name="radio1" />{' '}
							Padre
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" name="radio1" />{' '}
							Tutor
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" name="radio1" />{' '}
							Cuidador
						</Label>
					</FormGroup>
				</FormGroup>
				<FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="checkbox" />{' '}
							Acepto los terminos y condiciones
						</Label>
					</FormGroup>
				</FormGroup>
				<Col md={12} className="text-center">
					<Button type="submit" color="primary"
						className="btn-block mybtn tx-tfm">REGISTRARSE</Button>
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
