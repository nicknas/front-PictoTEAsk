import React from 'react'

import { withRouter } from 'react-router-dom';
import Auth from '../../auth';
import ViewGroups from './ViewGroups'
const enlace = 'https://pictoteask2.000webhostapp.com'

class GroupsPage extends React.Component {
    constructor(props) {
        super(props);

        this.deleteGroup = this.deleteGroup.bind(this);
				this.listKids = []

				this.state = {
					listGroups: []
				}

    }

    componentDidMount() {

				let state = this.props.location.state || {from: {}}

				if (state.from.pathname == '/' ||
			  	state.from.pathname == '/kidspage' ||
					state.from.pathname == '/creategroup' ||
					state.from.pathname == '/viewgroup') {

					this.listKids = state.data || []
				}

        if(this.listKids.length == 0){
            this.props.history.push("/kidspage");
        }
        else{
					let auth = new Auth();
					let listGroups = [];
					let formData = new FormData()
					formData.append('Tutor', auth.token.id_tutor);
					fetch(`${enlace}/getGrupoTutor.php`, {
							method: 'POST',
							body: formData
					}).then(res => res.json())
							.then((data) => {

									for (let i = 0; i < data.Grupos.length; i++) {
										listGroups.push({
											name: data.Grupos[i].nombre,
											id: data.Grupos[i].id_group
										});
									}
									this.setState({listGroups});
            });
        }

    }



    deleteGroup(id) {
        let formData = new FormData();
        let auth = new Auth();
        formData.append('id_group', id);
        formData.append('Tutor', auth.token.id_tutor);
        fetch(`${enlace}/delGroup.php`, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(() => {
                let listGroups = [];
                let formData = new FormData()
                formData.append('Tutor', auth.token.id_tutor);
                fetch(`${enlace}/getGrupoTutor.php`, {
                    method: 'POST',
                    body: formData
                }).then(res => res.json())
                    .then((data) => {

                        for (let i = 0; i < data.Grupos.length; i++) {
													listGroups.push({
														name: data.Grupos[i].nombre,
														id: data.Grupos[i].id_group
													});
                        }

                        this.setState({listGroups});
                    });
            }
            );

    }


    render() {
        return (
					<ViewGroups
						from="/kidspage"
						from2="/creategroup"
						from3="/viewgroup"
						parent={this}
						history={this.props.history}
						location={this.props.location}
						listGroups={this.state.listGroups}
						deleteGroup={this.deleteGroup} />
        );
    }

}
export default withRouter(GroupsPage);

