import React from 'react'
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
	useHistory,
	withRouter
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

// temp
import WeekCalendar from './components/calendar/WeekCalendar'

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
	constructor(props) {
		super(props);
		this.state = {
			groupSelected: {}
		};

		this.viewGroup = this.viewGroup.bind(this);
		this.addKidToGroup = this.addKidToGroup.bind(this);
		this.setGroupSelected = this.setGroupSelected.bind(this);
	}
	addKidToGroup(kidNick){
		let gs = this.state.groupSelected;
		gs.kids.push({name:kidNick});
		this.setState({groupSelected:gs});
	}

	viewGroup(nameGroup) {
		const groupSelected = this.state.listGroups.find((group) => group.name === nameGroup);
		this.setState({groupSelected: groupSelected})
	}

	setGroupSelected(idg, group){
		this.setState({ groupSelected: {name: group, id: idg} });
	}
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
						<Route path="/draw">
							<WeekCalendar />
						</Route>
						<PrivateRoute path="/addGame">
							<AddGame/>
						</PrivateRoute>
						<PrivateRoute path="/groupspage">
							<GroupsPage setGroupSelected={this.setGroupSelected}/>
						</PrivateRoute>
						<PrivateRoute path="/creategroup">
							<CreateGroup />
						</PrivateRoute>
						<PrivateRoute path="/viewgroup">
							<ViewGroup groupSelected={this.groupSelected}/>
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
						<PrivateRoute path="/stories/:storyName">
							<StoryContent/>
						</PrivateRoute>
						<PrivateRoute path="/">
							<KidsPage/>
						</PrivateRoute>
					</Switch>
				</Router>
		);
	}
} export default App;
