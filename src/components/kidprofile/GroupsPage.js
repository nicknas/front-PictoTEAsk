import React from 'react'

import {withRouter} from 'react-router-dom';

import ViewGroups from './ViewGroups'
const auth = 'https://pictoteask.000webhostapp.com'

class GroupsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listGroups: []
        }
        this.goToGroup = this.goToGroup.bind(this);
    }

    goToGroup(id, name){
        this.props.setGroupSelected();
    }

    componentDidMount() {
        let grouplist = [];
        let listGroups = [];
        let formData = new FormData()
        formData.append('Tutor', 7);
        fetch(`${auth}/getGrupoTutor.php`, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then((data) => {

                for (let i = 0; i < data.Grupos.length; i++) {
                    listGroups.push({ name: data.Grupos[i][2], id: data.Grupos[i][0] });
                }
                console.log(listGroups);
                this.setState({ listGroups: listGroups });
        });
        
    }
  
    render() {
        let from = "/kidspage";
        let from2 = "/creategroup";
        let from3 = "/viewgroup";
    
        return (
            <ViewGroups from={from} from2={from2} from3={from3} history={this.props.history} setGroupSelected={this.props.setGroupSelected} listGroups={this.state.listGroups} goToGroup={this.goToGroup}/>
        );
    }

}
export default withRouter(GroupsPage);

