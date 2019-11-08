import React from 'react'
import {
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input
} from 'reactstrap'

import {fakeAuth as auth} from '../../auth'


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
					<Label>Email adress</Label>
					<Input
						ref="email" required={true}
						type="email" placeholder="Enter Email" />
				</FormGroup>
				<FormGroup>
					<Label>Password</Label>
					<Input
						ref="pass" required={true}
						type="password" placeholder="password" />
				</FormGroup>
				<Col md={12} className="text-center">
					<Button type="submit" color="primary"
						className="btn-block mybtn tx-tfm">Login</Button>
				</Col>
				<Col md={12}>
					<div className="login-or">
						<hr className="hr-or" />
						<span className="span-or">or</span>
					</div>
				</Col>
				<Col md={12} className="mb-3">
					<div className="text-center">
						<div className="social btn mybtn">
							<i className="fa fa-google-plus"></i> Signup using Google
						</div>
					</div>
				</Col>
				<Col md={12} className="mb-3">
					<div className="text-center">
						<div className="social btn mybtn">
							<i className="fa fa-facebook-f"></i> Signup using Facebook
						</div>
					</div>
				</Col>
				<FormGroup>
					<div className="text-center">Don't  have account? <div>Sign up here</div></div>
				</FormGroup>
			</Form>
		)
	}
}

export default LoginForm;
