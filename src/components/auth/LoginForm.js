import React from 'react'

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
			<form onSubmit={this.handleSubmit}>
				<input
					ref="email" required={true}
					type="email" placeholder="email"
					className="form-control no-border-radius"/>

				<input
					ref="pass" required={true}
					type="password" placeholder="password"
					className="form-control no-border-radius"/>
					{
						this.state.error &&
						<div
							className="alert alert-danger no-border-radius"
							role="alert">Error email or password.
						</div>
					}
				<button type="submit"className="btn btn-warning no-border-radius">Login</button>
			</form>
		)
	}
}

export default LoginForm;
