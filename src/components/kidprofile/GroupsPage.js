import React from 'react'

import { withRouter } from 'react-router-dom';

import ViewGroups from './ViewGroups'
const auth = 'https://pictoteask.000webhostapp.com'

class GroupsPage extends React.Component {
    constructor(props) {
        super(props);
        this.goToGroup = this.goToGroup.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
    }

    goToGroup(id, name) {
        this.props.setGroupSelected(id, name);
    }

    componentDidMount() {

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
               
                this.props.setListGroup(listGroups);
            });


    }



    deleteGroup(id) {
        let formData = new FormData();
      
        formData.append('id_group', id);
        formData.append('Tutor', 7);
        fetch(`${auth}/delGroup.php`, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(() => {
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
                      
                        this.props.setListGroup(listGroups);
                    });
            }
            );

    }


    render() {
        let from = "/kidspage";
        let from2 = "/creategroup";
        let from3 = "/viewgroup";

        return (
            <ViewGroups from={from} from2={from2} from3={from3} history={this.props.history} setGroupSelected={this.props.setGroupSelected} listGroups={this.props.listGroups} goToGroup={this.goToGroup} deleteGroup={this.deleteGroup} />
        );
    }

}
export default withRouter(GroupsPage);

