import React from 'react'
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom"


import Auth from './auth'
import LoginPage from './components/auth/LoginPage'
import LogoutHeader from './components/auth/LogoutHeader'
import RegisterPage from './components/auth/RegisterPage'
import GroupsPage from './components/kidprofile/GroupsPage'
import KidsPage from './components/kidprofile/KidsPage'
import CreateGroup from './components/kidprofile/CreateGroup'
import CreateKid from './components/kidprofile/CreateKid'
import ViewGroup from './components/kidprofile/ViewGroup'
import AssociateKid from './components/kidprofile/AssociateKid'
import Story from './components/story/Story'
import StoryContent from './components/story/StoryContent'
import SeeActivity from './components/activities/SeeActivity'
import SeeTask from './components/activities/SeeTask'
import AddTask from './components/activities/AddTask'
import AddGame from './components/activities/AddGame'
import ViewGame from './components/activities/ViewGame'
import EditGame from './components/activities/EditGame'
import CalendarPage from './components/calendar/CalendarPage'
import AddStoryCalendar from './components/story/AddStoryCalendar'
import ViewStoryCalendar from './components/story/ViewStoryCalendar'
import EditStoryCalendar from './components/story/EditStoryCalendar'


const auth = 'https://pictoteask.000webhostapp.com'

function PrivateRoute({ children, ...rest}) {

	let auth = new Auth()

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

class App extends React.Component {

	render() {
		return (
				<Router>

					<LogoutHeader />

					<Switch>
						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/signup">
							<RegisterPage />
						</Route>
						<PrivateRoute path="/calendar">
							<CalendarPage />
						</PrivateRoute>
						<PrivateRoute path="/addGame">
							<AddGame/>
						</PrivateRoute>
						<PrivateRoute path="/editGame">
							<EditGame/>
						</PrivateRoute>
						<PrivateRoute path="/viewGame">
							<ViewGame/>
						</PrivateRoute>
						<PrivateRoute path="/groupspage">
							<GroupsPage />
						</PrivateRoute>
						<PrivateRoute path="/creategroup">
							<CreateGroup />
						</PrivateRoute>
						<PrivateRoute path="/viewgroup">
							<ViewGroup />
						</PrivateRoute>
						<PrivateRoute path="/createkid">
							<CreateKid/>
						</PrivateRoute>
						<PrivateRoute path="/associatekid" >
							<AssociateKid/>
						</PrivateRoute>
						<PrivateRoute path="/stories">
							<Story />
						</PrivateRoute>
						<PrivateRoute path="/seeactivity">
							<SeeActivity />
						</PrivateRoute>
						<PrivateRoute path="/seetask">
							<SeeTask />
						</PrivateRoute>
						<PrivateRoute path="/addtask">
							<AddTask />
						</PrivateRoute>
						<PrivateRoute path="/addStoryCalendar">
							<AddStoryCalendar />
						</PrivateRoute>
						<PrivateRoute path="/viewStoryCalendar">
							<ViewStoryCalendar />
						</PrivateRoute>
						<PrivateRoute path="/editStoryCalendar">
							<EditStoryCalendar />
						</PrivateRoute>
						<PrivateRoute path="/">
							<KidsPage />
						</PrivateRoute>
					</Switch>
				</Router>
		);
	}
}

export default App;
