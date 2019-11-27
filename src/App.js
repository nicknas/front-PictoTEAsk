import React from 'react'
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"

import {fakeAuth as auth} from './auth'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import Pictogram from './components/pictogram/Pictogram'
import GroupsPage from './components/kidprofile/GroupsPage'
import ViewKids from './components/kidprofile/ViewKids'
import CreateGroup from './components/kidprofile/CreateGroup'

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
			<Route path="/signup">
				<RegisterPage />
			</Route>
			<Route path="/groups">
				<GroupsPage />
			</Route>
			<Route path="/kidspage">
				<ViewKids />
			</Route>
			<Route path="/createGroup">
				<CreateGroup />
			</Route>
			<PrivateRoute path="/">
				<Pictogram />
			</PrivateRoute>
		</Switch>
	</Router>
)

