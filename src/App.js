import React from 'react'
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"

import {fakeAuth as auth} from './auth'
import LoginPage from './components/auth/LoginPage'
import Pictogram from './components/pictogram/Pictogram'

function PrivateRoute({ children, ...rest}) {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				auth.isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
}

export default () => (
	<Router>
		<Switch>
			<Route path="/login">
				<LoginPage />
			</Route>
			<PrivateRoute path="/">
				<Pictogram />
			</PrivateRoute>
		</Switch>
	</Router>
)

