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
import RegisterPage from './components/auth/RegisterPage'
import GroupsPage from './components/kidprofile/GroupsPage'
import KidsPage from './components/kidprofile/KidsPage'
import CreateGroup from './components/kidprofile/CreateGroup'
import CreateKid from './components/kidprofile/CreateKid'
import ViewGroup from './components/kidprofile/ViewGroup'
import AssociateKid from './components/kidprofile/AssociateKid'
import Story from './components/story/Story'
import StoryContent from './components/story/StoryContent'

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
		this.state = {listGroups: [{ name: "Primer ciclo primaria", kids: [{name: "Hermione"}] },
		{ name: "Segundo ciclo primaria", kids: [{name: "Harry"}] }
		],
			groupSelected: {name: "", kids: []}
		};
		this.addNewGroup = this.addNewGroup.bind(this);
		this.deleteGroup = this.deleteGroup.bind(this);
		this.viewGroup = this.viewGroup.bind(this);
		this.addKidToGroup = this.addKidToGroup.bind(this);
	}
	addKidToGroup(kidNick){
		let gs = this.state.groupSelected;
		gs.kids.push({name:kidNick});
		this.setState({groupSelected:gs});
	}
	addNewGroup(nameGroup) {
		const listGroups = this.state.listGroups;
		listGroups.push({name: nameGroup, kids: []});
		this.setState({listGroups: listGroups});
	}
	viewGroup(nameGroup) {
		const groupSelected = this.state.listGroups.find((group) => group.name === nameGroup);
		this.setState({groupSelected: groupSelected})
	}
	deleteGroup(nameGroup) {
		let listGroups = this.state.listGroups;
		listGroups = listGroups.filter((group) => {return group.name !== nameGroup});
		this.setState({listGroups: listGroups});
	}
	render() {
		return (
				<Router>
					<Switch>
						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/signup">
							<RegisterPage />
						</Route>
						<Route path="/groupspage">
							<GroupsPage listGroups={this.state.listGroups} goToGroup={this.viewGroup} deleteGroup={this.deleteGroup}/>
						</Route>
						<Route path="/creategroup">
							<CreateGroup createGroup={this.addNewGroup} />
						</Route>
						<Route path="/viewgroup">
							<ViewGroup nameGroup={this.state.groupSelected.name} listKids={this.state.groupSelected.kids} addKidToGroup={this.addKidToGroup}/>
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
						<PrivateRoute path="/" component={KidsPage}/>
					</Switch>
				</Router>
		);
	}
} export default App;
