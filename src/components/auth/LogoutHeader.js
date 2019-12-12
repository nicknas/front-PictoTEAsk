import React from 'react'
import {Link} from 'react-router-dom'

import './auth.css';
import Auth from '../../auth'

class LogoutHeader extends React.Component {

	auth = new Auth()

	logout(event) {
		event.preventDefault()

		let auth = new Auth()
		auth.logout(Function())
		location.reload();
	}

	render() {
		return (
			<div>
			{ this.auth.isAuthenticated && (
				<div className="logout">
					<a className="link" onClick={this.logout}>Cerrar sesión</a>
				</div>
			)}
			</div>
		)
	}
}

export default LogoutHeader;
