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
					<Label>First Name</Label>
					<Input
						ref="firstname" required={true}
						type="text" placeholder="Enter Firstname" />
				</FormGroup>
				<FormGroup>
					<Label>Last Name</Label>
					<Input
						ref="lastname" required={true}
						type="text" placeholder="Enter Lastname" />
				</FormGroup>
				<FormGroup>
					<Label>Email adress</Label>
					<Input
						ref="email" required={true}
						type="email" placeholder="Enter Email" />
				</FormGroup>
				<FormGroup>
					<Label>Password</Label>
					<Input
						ref="pass" required={true}
						type="password" placeholder="Enter Password" />
				</FormGroup>
				<FormGroup>
					<Label>Valid Password</Label>
					<Input
						ref="vpass" required={true}
						type="password" placeholder="Enter Password" />
				</FormGroup>
					<FormGroup tag="fieldset">
					<legend>Rol</legend>
					<FormGroup check>
						<Label check>
							<Input type="radio" name="radio1" />{' '}
							Father
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
							Carer
						</Label>
					</FormGroup>
				</FormGroup>
				<FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="checkbox" />{' '}
							I accept the Terms Of Use
						</Label>
					</FormGroup>
				</FormGroup>
				<Col md={12} className="text-center">
					<Button type="submit" color="primary"
						className="btn-block mybtn tx-tfm">Register</Button>
				</Col>
				<Col md={12}>
					<FormGroup>
						<div className="text-center">
							<Link to="/login">Already have an account?</Link>
						</div>
					</FormGroup>
				</Col>

			</Form>
		)
	}
}

export default RegisterForm;
