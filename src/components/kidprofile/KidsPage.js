import React from 'react'
import { withRouter } from 'react-router-dom';

import ViewKids from './ViewKids'
import Auth from '../../auth'
import { domainToASCII } from 'url';

const enlace = 'https://pictoteask2.000webhostapp.com'

class KidsPage extends React.Component {
    constructor(props) {
        super(props);
				this.state = {
					listKids: []
				}
        this.deleteKid = this.deleteKid.bind(this);
    }

    componentDidMount() {
        let auth = new Auth();
        let listKids = [];
        let formDataViewKids = new FormData();
        formDataViewKids.append("Tutor", auth.token.id_tutor);
        let request = new Request(`${enlace}/getNinosTutor.php`,
            {
                method: 'POST',
                body: formDataViewKids,
            }
        );
        fetch(request)
            .then((response) => { if (response.ok) return response.json(); })
            .then(data => {
                for (let i = 0; i < data.kids.length; i++) {
                    if(data.kids[i].state == "ACCEPTED"){
											listKids.push({
												id: data.kids[i].id_kid,
												name: data.kids[i].nick,
												state: data.kids[i].state
											});
                    }
                }

								this.setState({listKids})
            });
    }

    deleteKid(id) {
        let auth = new Auth();
        let formDataDelKid = new FormData();
        formDataDelKid.append('id_nino', id);
        formDataDelKid.append('id_tutor', auth.token.id_tutor);

        let formDataDisassociateKid = new FormData();
        formDataDisassociateKid.append('Nino', id);
        formDataDisassociateKid.append('Tutor', auth.token.id_tutor);

        let {listKids} = this.state;
        let auxkids = listKids;

        listKids = listKids.filter(item => {
            return item.id != id;
        });

				this.setState({listKids})

        fetch(`${enlace}/delKid.php`, {
            method: 'POST',
            body: formDataDelKid
        }).then(response => response.json())
				.then((response) => {
						if (response.error) this.setState({listKids: auxkids});
				});
    }


    render() {

        return (
					<ViewKids
						from="/groupspage"
						from2="/associatekid"
						parent={this}
						location={this.props.location}
						history={this.props.history}
						listKids={this.state.listKids}
						deleteKid={this.deleteKid} />
        );
    }

}
export default withRouter(KidsPage);
