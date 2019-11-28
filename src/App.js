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
import KidsPage from './components/kidprofile/KidsPage'
import CreateGroup from './components/kidprofile/CreateGroup'
import CreateKid from './components/kidprofile/CreateKid'
import AssociateKid from './components/kidprofile/AssociateKid'


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
			<Route path="/groupspage">
				<GroupsPage />
			</Route>
			<Route path="/creategroup">
				<CreateGroup />
			</Route>
			<Route path="/createkid">
				<CreateKid />
			</Route>
			<Route path="/associatekid">
				<AssociateKid />
			</Route>
			

			<Route path="/kidspage">
				<KidsPage />
			</Route>
			<PrivateRoute path="/">
				<Pictogram />
			</PrivateRoute>
		</Switch>
	</Router>
)

