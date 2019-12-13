import React from 'react'
import { withRouter } from 'react-router-dom';

import ViewKids from './ViewKids'
import Auth from '../../auth'
import { domainToASCII } from 'url';
const enlace = 'https://pictoteask.000webhostapp.com'
class KidsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listKids: []
        };
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
                    listKids.push({ id: data.kids[i].id_kid, name: data.kids[i].nick, state: data.kids[i].state });
                }
                console.log(listKids);
                this.setState({ listKids: listKids });
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

        let { listKids } = this.state;
        let auxkids = listKids;
        listKids = listKids.filter(item => {
            return item.id != id;
        });
        this.setState({ listKids: listKids });

        fetch(`${enlace}/delKid.php`, {
            method: 'POST',
            body: formDataDelKid
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(
                fetch(`${enlace}/delTutoria.php`, {
                    method: 'POST',
                    body: formDataDisassociateKid
                }).then(response => response.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        if (response.error) this.setState({ listKids: auxkids });
                        window.location.reload();
                    }));
    }


    render() {
        let from = "/groupspage";
        let from2 = "/associatekid";

        return (
            <ViewKids from={from} from2={from2} history={this.props.history} listKids={this.state.listKids} deleteKid={this.deleteKid} />
        );
    }

}
export default withRouter(KidsPage);
