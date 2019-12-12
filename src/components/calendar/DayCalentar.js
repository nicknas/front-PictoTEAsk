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


class DayCalendar extends React.Component {

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
					<div className="text-center">No tienes cuenta? <Link to="/signup">Regístrate</Link></div>
				</FormGroup>
			</Form>
		)
	}
}

export default LoginForm;
