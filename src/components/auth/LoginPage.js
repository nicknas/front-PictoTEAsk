import React from 'react'
import {
	useHistory,
	useLocation
} from 'react-router-dom'

import LoginForm from './LoginForm'

function LoginPage() {

	let history = useHistory();
	let location = useLocation();

	let { from } = location.state || { from: { pathname: "/" } };

	return <LoginForm from={from} history={history} />
}

export default LoginPage;
