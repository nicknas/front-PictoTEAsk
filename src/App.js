import React from 'react';

import LoginForm from './components/auth/LoginForm'
import Pictogram from './components/pictogram/Pictogram'

import {
	HashRouter as Router,
	Switch,
	Route
} from "react-router-dom"

export default () => (
	<Router>
		<Switch>
			<Route path="/" component={LoginForm} exact />
			<Route path="/pictogram" component={Pictogram} exact />
		</Switch>
	</Router>
)

