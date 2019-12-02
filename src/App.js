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
import GroupsPage from './components/kidprofile/GroupsPage'
import KidsPage from './components/kidprofile/KidsPage'
import CreateGroup from './components/kidprofile/CreateGroup'
import CreateKid from './components/kidprofile/CreateKid'
import AssociateKid from './components/kidprofile/AssociateKid'
import Story from './components/story/Story'
import StoryContent from './components/story/StoryContent'

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
			
			<Route path="/stories">
				<Story />
			</Route>
			<Route path="/stories/:storyName">
				<StoryContent/>
			</Route>
			<PrivateRoute path="/">
				<KidsPage/>
			</PrivateRoute>
		</Switch>
	</Router>
)

