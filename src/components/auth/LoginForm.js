import React from 'react'
import {Link} from 'react-router-dom'
import {
	Col,
	Button,
	Form,
	FormGroup,
	Alert,
	Label
} from 'reactstrap'


// TODO: change auth with backend
import Auth from '../../auth'


class LoginForm extends React.Component {

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

	componentDidMount() {

		if (this.auth.isAuthenticated){
			this.props.history.replace(this.props.from)
		}

	}

	handleSubmit(event) {
		event.preventDefault();

		const email = this.refs.email.value;
		const pass = this.refs.pass.value;

		let {from, history} = this.props;

		this.setState({error: false, loading: true})

		this.auth.login(email, pass, (loggedIn, info) => {
			if (!loggedIn) {
				this.refs.pass.value = ''
				return this.setState({
					error: true,
					loading: false,
					info: info,
				})
			}

			history.replace(from);
			window.location.reload();
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
				<Col md={12}><br />
				{this.state.error && (
							<Alert color="danger"> {this.state.info} </Alert>
				)}
        {this.state.loading && (
							<Alert color="info"> Cargando... </Alert>
        )}
				</Col>
				<FormGroup>
					<div className="text-center">¿No tienes cuenta? <Link to="/signup">Regístrate</Link></div>
				</FormGroup>
			</Form>
		)
	}
}

export default LoginForm;
