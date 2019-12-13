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
import DayCalendar from './components/calendar/DayCalendar'


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
	constructor(props) {
		super(props);
		this.state = {
			groupSelectedId: "",
			groupSelectedName: "",
			listKidsGroup: [],
			listGroups: []
		};
		
		this.setKidsGroup = this.setKidsGroup.bind(this);
		this.setGroupSelected = this.setGroupSelected.bind(this);
		this.setListGroup = this.setListGroup.bind(this);
	}
	
	setKidsGroup(listKidsGroup){
		this.setState({ listKidsGroup });
	}
	setListGroup(listGroups){
		this.setState({ listGroups: listGroups });
	}
	setGroupSelected(groupSelectedId, groupSelectedName){
		
		this.setState({groupSelectedId: groupSelectedId});
		this.setState({groupSelectedName: groupSelectedName});
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
							<DayCalendar />
						</Route>
						<PrivateRoute path="/addGame">
							<AddGame/>
						</PrivateRoute>
						<PrivateRoute path="/groupspage">
							<GroupsPage setGroupSelected={this.setGroupSelected} setListGroup={this.setListGroup} listGroups={this.state.listGroups}/>
						</PrivateRoute>
						<PrivateRoute path="/creategroup">
							<CreateGroup setListGroup={this.setListGroup}/>
						</PrivateRoute>
						<PrivateRoute path="/viewgroup">
							<ViewGroup groupSelectedId={this.state.groupSelectedId} groupSelectedName={this.state.groupSelectedName} listGroups={this.state.listGroups} listKidsGroup={this.state.listKidsGroup} setKidsGroup={this.setKidsGroup} groupSelectedName={this.state.groupSelectedName}/>
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
